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

  return {
    name: "backend-ai-plugin",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === "/api/generate" && req.method === "POST") {
          let body = "";
          req.on("data", chunk => (body += chunk));
          req.on("end", async () => {
            try {
              const { system, user, apiKey } = JSON.parse(body || "{}");
              const env = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");
              const activeKey = apiKey || env.GROQ_API_KEY || env.AI_API_KEY || process.env.GROQ_API_KEY || process.env.AI_API_KEY || "";

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
                        { role: "system", content: system },
                        { role: "user", content: user }
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
                    console.warn(`[AI Engine] Model ${model} returned: ${lastError}. Trying fallback...`);
                  }
                } catch (e) {
                  lastError = e.message;
                }
              }

              if (!content) {
                res.statusCode = 429;
                res.setHeader("Content-Type", "application/json");
                return res.end(JSON.stringify({ error: lastError || "Failed to generate README across available AI models. Please ensure an API key is configured." }));
              }

              content = content.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
              content = content.replace(/^```[a-z]*\s*\n/i, "").replace(/\n```\s*$/, "");

              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ markdown: content }));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: err.message }));
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
