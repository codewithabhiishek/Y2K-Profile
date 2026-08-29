# PROFILE.EXE — Y2K GitHub Profile Toolkit

A free, open-source, self-hosted toolkit that turns any public GitHub username
into a polished profile README, themed SVG assets, and portfolio content.
Phosphor green, CRT glow, dial-up swagger. No paywalls, no watermarks, no
usage limits — ever.

## Run it

```bash
npm install
npm run dev      # or: npm run build && serve dist/
```

**That's it.** The entire application is a single self-contained
`index.html` — no module chain, no external JS, no build-time coupling.
It boots in any environment that can serve one HTML file (this is
deliberate: it survives dead dev servers, strict sandboxes, and static
hosting alike). Google Fonts are progressive enhancement only.

## What's inside

| mode | what it does | needs |
| ---- | ------------ | ----- |
| **A · GENERATE** | Fetches live GitHub data (profile, top repos, language mix, streaks, heatmap) and compiles a custom README with Claude. 4 tone presets, optional ASCII banner, split editor + live preview, one critique/refine pass (2-pass cost guard), copy/download. | your Anthropic key (pasted in-app, stored in localStorage, sent straight to `api.anthropic.com`) |
| **B · TEMPLATES** | 10 hand-written README templates — one per skin — with `[placeholder]` tokens, live themed preview, raw view, copy/download. | nothing. works instantly |
| **VISUALS** | Deterministic pixel avatar, github-readme-stats-style stat card, 3D-extruded wordmark — pure SVG, themed, downloadable, embeddable. | nothing (demo data built in; load your handle for real data) |
| **WRAPPED** | Year-in-review card (top language, most active month, streak, commit heatmap) + one-page portfolio builder from your top repos. | nothing |

## Themes

10 skins in one data array at the top of the first `<script>` block
(`THEMES`): PHOSPHOR-01, AMBER-88, CYBERGRID, ICE.CHROME, LIQUID CHROME,
ACID RAVE, RED ALERT, HOLO-FOIL, DMG-8BIT, AFTERBURNER. Every surface —
site chrome, template previews, SVG assets — reads the same CSS
variables. **Add a theme by appending one object.** No pink, no purple.

## Extending

- **New template** — append one entry to `window.__TEMPLATES__` (markdown as an
  array of lines). It appears in the gallery automatically.
- **New ASCII banner** — append one entry to `ASCII`. It appears in the
  generator's banner picker automatically.
- **Server deployment** — move the key handling behind a proxy: replace the
  `fetch` in `callClaude()` with a call to your route, read
  `ANTHROPIC_API_KEY` / `GITHUB_TOKEN` from env (see `.env.example`).

## Error handling

Invalid usernames (404), GitHub rate limits (403/429), rejected/missing
Anthropic keys, empty model responses, and unreachable networks all surface
as inline messages + toasts — never a crash. The demo dataset makes every
feature testable with zero network access.

## License

MIT — do what you want, keep it free.
