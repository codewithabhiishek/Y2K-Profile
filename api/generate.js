// Vercel Serverless Function for ProfileExE AI Generation
const MODELS = [
  "qwen/qwen3.8-27b",
  "openai/gpt-oss-120b",
  "openai/gpt-oss-20b",
  "qwen/qwen3.6-27b",
  "groq/compound"
];

// In-memory rate limiting store (per container lifecycle)
const ipStore = new Map();
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5; // Max 5 compiles per 10 min
const MIN_COOLDOWN_MS = 10 * 1000; // Minimum 10s between requests

export default async function handler(req, res) {
  // Only accept POST
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const now = Date.now();
  const rawIp = req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || req.socket?.remoteAddress || "127.0.0.1";
  const clientIp = String(rawIp).split(",")[0].trim();

  try {
    let bodyData = req.body;
    if (typeof bodyData === "string") {
      try { bodyData = JSON.parse(bodyData || "{}"); } catch (e) { bodyData = {}; }
    } else if (!bodyData) {
      bodyData = {};
    }
    const { system, user, apiKey } = bodyData;
    const isCustomKey = Boolean(apiKey && String(apiKey).trim().length > 10);

    // Apply strict rate limiting ONLY if user is using the shared server API key
    if (!isCustomKey) {
      let record = ipStore.get(clientIp);
      if (!record || now - record.windowStart > WINDOW_MS) {
        record = { count: 0, windowStart: now, lastRequestTime: 0 };
        ipStore.set(clientIp, record);
      }

      // Check cooldown (minimum 10s between requests)
      const elapsedSinceLast = now - record.lastRequestTime;
      if (record.lastRequestTime > 0 && elapsedSinceLast < MIN_COOLDOWN_MS) {
        const waitSec = Math.ceil((MIN_COOLDOWN_MS - elapsedSinceLast) / 1000);
        res.setHeader("Retry-After", String(waitSec));
        return res.status(429).json({
          error: `Rate limit cooldown active. Please wait ${waitSec}s before compiling another README.`,
          retryAfter: waitSec
        });
      }

      // Check window limit
      if (record.count >= MAX_REQUESTS_PER_WINDOW) {
        const remainingSec = Math.ceil((WINDOW_MS - (now - record.windowStart)) / 1000);
        res.setHeader("Retry-After", String(remainingSec));
        return res.status(429).json({
          error: `Rate limit reached (${MAX_REQUESTS_PER_WINDOW} compiles / 10 min). Please wait ${remainingSec}s, or provide your own API key.`,
          retryAfter: remainingSec
        });
      }

      // Increment counters
      record.count++;
      record.lastRequestTime = now;

      res.setHeader("X-RateLimit-Limit", String(MAX_REQUESTS_PER_WINDOW));
      res.setHeader("X-RateLimit-Remaining", String(Math.max(0, MAX_REQUESTS_PER_WINDOW - record.count)));
      res.setHeader("X-RateLimit-Reset", String(Math.ceil((record.windowStart + WINDOW_MS) / 1000)));
    }

    const activeKey = (apiKey && apiKey.trim()) || process.env.GROQ_API_KEY || process.env.AI_API_KEY || "";

    if (!activeKey) {
      return res.status(503).json({
        error: "AI backend key is not configured on server. Please enter a custom Groq API key in the UI."
      });
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
        }
      } catch (e) {
        lastError = e.message;
      }
    }

    if (!content) {
      const safeError = String(lastError || "Upstream AI service is currently busy.")
        .replace(/gsk_[a-zA-Z0-9_\-]+/g, "[REDACTED]")
        .replace(/sk-[a-zA-Z0-9_\-]+/g, "[REDACTED]");

      return res.status(502).json({ error: safeError });
    }

    content = content.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
    content = content.replace(/^```[a-z]*\s*\n/i, "").replace(/\n```\s*$/, "");

    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    return res.status(200).json({ markdown: content });
  } catch (err) {
    const safeErr = String(err.message || "Internal server error")
      .replace(/gsk_[a-zA-Z0-9_\-]+/g, "[REDACTED]")
      .replace(/sk-[a-zA-Z0-9_\-]+/g, "[REDACTED]");

    return res.status(500).json({ error: safeErr });
  }
}
