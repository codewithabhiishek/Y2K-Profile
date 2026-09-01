# PROFILE.EXE — Modularization Plan

> **Goal:** Split the monolithic `index.html` (3125 lines, ~212 KB) into small, focused source files while keeping the dev server, build output, and all app features 100% intact.

---

## Why This Matters

| Before | After |
| :--- | :--- |
| Edit theme colors → scroll to line ~410 in a 3125-line file | Open `src/data/themes.js` → 35 focused lines |
| Edit a template → search through 15 templates in one huge block | Open `src/data/templates/neoncity.js` → 90 lines |
| Add a new template → paste at end of the big array | Create file, add one import line |
| Debug a utility → Ctrl+F in 3125 lines | Open `src/utils.js` → ~80 lines |
| Build output | **Unchanged** — Vite still bundles into optimized HTML |

---

## What We Split — and What We Don't

### ✅ We DO split (safe data layer)

| Block | Lines | Moves To |
| :--- | :---: | :--- |
| Utility functions (esc, rng, store, toast…) | ~100 | `src/utils.js` |
| 10 theme color objects | ~35 | `src/data/themes.js` |
| 7 ASCII art presets | ~55 | `src/data/ascii.js` |
| 15 template markdowns | ~600 | `src/data/templates/*.js` (one file each) |
| Boot glue (wires globals) | ~20 | `src/boot.js` |

### ❌ We do NOT split (too risky)

| Block | Why |
| :--- | :--- |
| **App renderer block** (lines 1134–3101) | Uses `«`-encoding to prevent CDN tag-stripping. 2000 lines of UI logic. Decoding + re-splitting = high risk of breakage. Leave it in `index.html`. |
| **CSS `<style>` block** | Tightly coupled to the app block's class names. Keeping inline avoids Vite CSS injection ordering issues. |
| **Watchdog `<script>`** | Must be synchronous and first. Stays inline. |
| **App decoder `<script>`** | Synchronous loader — must run after globals are set. Stays inline. |

---

## Final File Structure

```
ProfileExE/
├── index.html                    ← ~600 lines (CSS + watchdog + boot import + app block + decoder)
├── src/
│   ├── utils.js                  ← Pure helper functions
│   ├── boot.js                   ← Wires window.__PX__ and window.__TEMPLATES__
│   └── data/
│       ├── themes.js             ← THEMES array (10 theme objects)
│       ├── ascii.js              ← ASCII art library (7 styles)
│       └── templates/
│           ├── index.js          ← Imports + re-exports all 15 templates
│           ├── phosphor.js       ← PHOSPHOR-01
│           ├── amber.js          ← AMBER-88
│           ├── cybergrid.js      ← CYBERGRID
│           ├── clean.js          ← ICE.CHROME
│           ├── ghost.js          ← LIQUID CHROME
│           ├── acid.js           ← ACID RAVE
│           ├── redline.js        ← RED ALERT
│           ├── ocean.js          ← HOLO-FOIL
│           ├── gameboy.js        ← DMG-8BIT
│           ├── heat.js           ← AFTERBURNER
│           ├── neoncity.js       ← NEON CITY  (new)
│           ├── cosmos.js         ← COSMOS     (new)
│           ├── sakura.js         ← SAKURA     (new)
│           ├── vaporwave.js      ← VAPORWAVE  (new)
│           └── matrix.js         ← MATRIX RAIN (new)
├── api/
│   └── generate.js
├── vite.config.js
└── README.md
```

---

## How It Works (Timing)

The critical concern is **load order**. The app decoder is a synchronous `<script>` at the bottom of `<body>` that expects `window.__PX__` and `window.__TEMPLATES__` to already be set.

```
index.html parse order:
1. <style>          → CSS (inline, instant)
2. <script>         → Watchdog (inline sync, sets __PX_WATCH__)
3. <script type="module" src="/src/boot.js">
   → Vite resolves all imports at build time
   → In PRODUCTION: Vite inlines this as a bundled <script type="module">
   → In DEV: Vite serves each file separately via native ESM
   ⚠ module scripts are DEFERRED — they run AFTER the sync scripts below
4. <div id="app">  → Shell HTML
5. <script type="text/plain" id="px-app">  → Inert encoded app block
6. <script>         → App DECODER (sync) — runs BEFORE the module!
```

**Problem**: Step 6 (sync decoder) runs before step 3 (module boot.js).

**Solution**: The decoder already checks `window.__PX_BOOTED__`. We modify it to wait:

```js
// Modified decoder in index.html
(function () {
  function run() {
    if (!window.__PX_BOOTED__) {
      // Boot module hasn't finished yet — wait 10ms and retry
      return setTimeout(run, 10);
    }
    // ... decode and inject app block ...
  }
  run();
})();
```

This is safe: in practice the module loads in <5ms (it's tiny data files), and the 6-second watchdog timer shows an error if it ever fails to boot.

---

## How to Add a New Template (After Modularization)

1. **Create the file**: `src/data/templates/mynewtheme.js`

```js
// src/data/templates/mynewtheme.js
export default {
  id: "mynewtheme",
  vibe: "Short description of the theme vibe.",
  md: [
    '<div align="center">',
    '  <img src="https://capsule-render.vercel.app/api?..." width="100%" alt="Banner"/>',
    // ... rest of your markdown lines ...
    '</div>',
  ].join("\n"),
};
```

2. **Register it**: Add one line to `src/data/templates/index.js`

```js
import mynewtheme from "./mynewtheme.js";

export default [
  // ... existing templates ...
  mynewtheme,   // ← add here
];
```

That's it. Vite picks it up instantly in dev via HMR.

---

## How to Edit a Theme Color

Open `src/data/themes.js` and find the theme by name:

```js
// src/data/themes.js
{ id: "phosphor", name: "PHOSPHOR-01", era: "1999 · CRT",
  c: {
    bg: "#030a05",
    pri: "#00ff66",   // ← change primary color here
    acc: "#d4ff3f",   // ← change accent here
    // ...
  }
}
```

Save → Vite HMR updates the browser instantly.

---

## Implementation Steps

This was done by the Python injection script `scripts/modularize.py`. To re-run or verify:

```bash
# Dry run (prints what would change, doesn't write)
node scripts/verify-templates.js

# Check all templates parse correctly
node -e "
  import('./src/data/templates/index.js').then(m => {
    console.log('Templates:', m.default.length);
    m.default.forEach(t => console.log(' -', t.id));
  });
"

# Start dev server
npm run dev

# Build for production (still single-file output)
npm run build
```

---

## Production Build

Vite bundles `src/boot.js` and all its imports into the HTML output. The production `dist/index.html` is still a **single self-contained file** — no external JS dependencies. The modularization only affects the **source** files, not the output.

---

## File Size Before → After

| File | Lines Before | Lines After |
| :--- | :---: | :---: |
| `index.html` | 3125 | ~600 |
| `src/utils.js` | — | ~90 |
| `src/data/themes.js` | — | ~40 |
| `src/data/ascii.js` | — | ~60 |
| `src/data/templates/` (15 files) | — | ~90 each |
| `src/data/templates/index.js` | — | ~20 |
| `src/boot.js` | — | ~25 |
