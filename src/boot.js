/* ProfileExE — Boot Module
   Wires all data + utilities into the globals that the app renderer expects.
   This is the ONLY file that touches window.* globals.
   Imported as <script type="module" src="/src/boot.js"> in index.html.    */

"use strict";

import { esc, fnv1a, rng, mix, fmt, store, copyText, download, toast } from "./utils.js";
import { THEMES, theme, applyTheme } from "./data/themes.js";
import { ASCII, asciiText } from "./data/ascii.js";
import TEMPLATES from "./data/templates/index.js";

export function template(id){
  for(var i=0;TEMPLATES.length>i;i++)if(TEMPLATES[i].id===id)return TEMPLATES[i];
  return TEMPLATES[0];
}

// Expose everything the app renderer block reads from window.__PX__
window.__PX__ = {
  esc, fnv1a, rng, mix, fmt, store, copyText, download, toast,
  theme, applyTheme, ASCII, asciiText, THEMES,
  template, TEMPLATES
};

// Expose the template array the app renderer reads from window.__TEMPLATES__
window.__TEMPLATES__ = TEMPLATES;

// Signal that boot is complete (the decoder polls this)
window.__PX_BOOTED__ = 1;
