import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

function backendAiPlugin() {
  const MODELS = [
    "qwen/qwen3.8-27b",
    "openai/gpt-oss-120b",
    "openai/gpt-oss-20b",
    "qwen/qwen3.6-27b",
    "groq/compound"
  ];

  // In-memory rate limiting store
  // ip -> { count, windowStart, lastRequestTime }
  const ipStore = new Map();
  const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
  const MAX_REQUESTS_PER_WINDOW = 5; // Max 5 compiles per 10 min
  const MIN_COOLDOWN_MS = 10 * 1000; // Minimum 10s between requests

  // Clean up stale rate-limit records every 5 minutes
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of ipStore.entries()) {
      if (now - record.windowStart > WINDOW_MS && now - record.lastRequestTime > WINDOW_MS) {
        ipStore.delete(ip);
      }
    }
  }, 5 * 60 * 1000);

  // Global rate limiter to protect total upstream quota
  let globalCount = 0;
  let globalWindowStart = Date.now();
  const GLOBAL_MAX_PER_MINUTE = 25;

  return {
    name: "backend-ai-plugin",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === "/api/generate" && req.method === "POST") {
          const now = Date.now();
          const rawIp = req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "127.0.0.1";
          const clientIp = String(rawIp).split(",")[0].trim();

          // Reset global window
          if (now - globalWindowStart > 60 * 1000) {
            globalCount = 0;
            globalWindowStart = now;
          }

          let body = "";
          req.on("data", chunk => {
            body += chunk;
            if (body.length > 32 * 1024) {
              res.statusCode = 413;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Payload too large (max 32KB)." }));
              req.destroy();
            }
          });

          req.on("end", async () => {
            try {
              if (res.writableEnded) return;

              const { system, user, apiKey } = JSON.parse(body || "{}");
              const isCustomKey = Boolean(apiKey && String(apiKey).trim().length > 10);

              // Apply strict rate limiting ONLY if user is using the shared server API key
              if (!isCustomKey) {
                // Check global rate limit
                if (globalCount >= GLOBAL_MAX_PER_MINUTE) {
                  res.statusCode = 429;
                  res.setHeader("Content-Type", "application/json");
                  res.setHeader("Retry-After", "30");
                  return res.end(JSON.stringify({
                    error: "Global server capacity reached. Please wait 30 seconds before retrying.",
                    retryAfter: 30
                  }));
                }

                // Check per-IP rate limit
                let record = ipStore.get(clientIp);
                if (!record || now - record.windowStart > WINDOW_MS) {
                  record = { count: 0, windowStart: now, lastRequestTime: 0 };
                  ipStore.set(clientIp, record);
                }

                // Check cooldown (minimum 10s between requests)
                const elapsedSinceLast = now - record.lastRequestTime;
                if (record.lastRequestTime > 0 && elapsedSinceLast < MIN_COOLDOWN_MS) {
                  const waitSec = Math.ceil((MIN_COOLDOWN_MS - elapsedSinceLast) / 1000);
                  res.statusCode = 429;
                  res.setHeader("Content-Type", "application/json");
                  res.setHeader("Retry-After", String(waitSec));
                  return res.end(JSON.stringify({
                    error: `Rate limit cooldown active. Please wait ${waitSec}s before compiling another README.`,
                    retryAfter: waitSec
                  }));
                }

                // Check window limit
                if (record.count >= MAX_REQUESTS_PER_WINDOW) {
                  const remainingSec = Math.ceil((WINDOW_MS - (now - record.windowStart)) / 1000);
                  res.statusCode = 429;
                  res.setHeader("Content-Type", "application/json");
                  res.setHeader("Retry-After", String(remainingSec));
                  return res.end(JSON.stringify({
                    error: `Rate limit reached (${MAX_REQUESTS_PER_WINDOW} compiles / 10 min). Please wait ${remainingSec}s, or provide your own API key.`,
                    retryAfter: remainingSec
                  }));
                }

                // Increment rate limit counters
                record.count++;
                record.lastRequestTime = now;
                globalCount++;

                // Add RateLimit headers to response
                res.setHeader("X-RateLimit-Limit", String(MAX_REQUESTS_PER_WINDOW));
                res.setHeader("X-RateLimit-Remaining", String(Math.max(0, MAX_REQUESTS_PER_WINDOW - record.count)));
                res.setHeader("X-RateLimit-Reset", String(Math.ceil((record.windowStart + WINDOW_MS) / 1000)));
              }

              // Load master server key strictly inside Node.js backend
              const env = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");
              const activeKey = (apiKey && apiKey.trim()) || env.GROQ_API_KEY || env.AI_API_KEY || process.env.GROQ_API_KEY || process.env.AI_API_KEY || "";

              if (!activeKey) {
                res.statusCode = 503;
                res.setHeader("Content-Type", "application/json");
                return res.end(JSON.stringify({
                  error: "AI backend key is not configured on server. Please enter a custom Groq API key in the UI."
                }));
              }

              let lastError = null;
              let content = "";

              for (const model of MODELS) {
                try {
                  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${activeKey}`
                    },
                    body: JSON.stringify({
                      model,
                      temperature: 0.7,
                      max_tokens: 2048,
                      messages: [
                        { role: "system", content: system || "You are an elite README generator." },
                        { role: "user", content: user || "Generate a GitHub profile README." }
                      ]
                    })
                  });

                  if (response.ok) {
                    const data = await response.json();
                    content = data.choices?.[0]?.message?.content || "";
                    if (content) break;
                  } else {
                    const errJson = await response.json().catch(() => ({}));
                    lastError = errJson?.error?.message || `HTTP ${response.status} on ${model}`;
                    console.warn(`[AI Engine] Model ${model} warning: ${lastError}. Trying fallback...`);
                  }
                } catch (e) {
                  lastError = e.message;
                }
              }

              if (!content) {
                // Sanitize any key fragments from error messages
                const safeError = String(lastError || "Upstream AI service is currently busy.")
                  .replace(/gsk_[a-zA-Z0-9_\-]+/g, "[REDACTED]")
                  .replace(/sk-[a-zA-Z0-9_\-]+/g, "[REDACTED]");

                res.statusCode = 502;
                res.setHeader("Content-Type", "application/json");
                return res.end(JSON.stringify({ error: safeError }));
              }

              // Strip chain of thought tags and raw markdown backticks
              content = content.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
              content = content.replace(/^```[a-z]*\s*\n/i, "").replace(/\n```\s*$/, "");

              res.setHeader("Content-Type", "application/json");
              // Security header to ensure browsers do not cache AI generations
              res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
              res.end(JSON.stringify({ markdown: content }));
            } catch (err) {
              const safeErr = String(err.message || "Internal server error")
                .replace(/gsk_[a-zA-Z0-9_\-]+/g, "[REDACTED]")
                .replace(/sk-[a-zA-Z0-9_\-]+/g, "[REDACTED]");

              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: safeErr }));
            }
          });
          return;
        }
        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), backendAiPlugin()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    hmr: {
      port: 3000,
    },
  },
});
