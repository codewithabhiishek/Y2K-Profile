/* ProfileExE — Template: GHOST
   Vibe: Brutalist monochrome terminal. High-contrast stark minimalist hacker.

   Editing guide:
   - Each string in the md array is one line of markdown
   - Use \x3c for < (avoids CDN tag-stripping issues)
   - Use \" for double-quotes inside strings
   - Badge URLs: keep & as & (not &amp;) — they go into img src attrs
   - After editing: save → Vite HMR reloads instantly in dev        */

"use strict";

var md = [
  "\x3cdiv align=\"center\">",
  "  \x3cimg src=\"https://capsule-render.vercel.app/api?type=rect&color=1a222c&text=%E2%96%B6%20[YOUR%20NAME]&height=150&fontSize=34&fontColor=c9d6e4&stroke=c9d6e4&strokeWidth=1.5&desc=GHOST%20SHELL%20%C2%B7%20MEMORY%20REGISTERS%20CLEAR&descAlignY=65&descColor=7fd4ff\" width=\"100%\" alt=\"Ghost Banner\"/>",
  "  \x3cimg src=\"https://readme-typing-svg.demolab.com?font=Space+Mono&size=13&pause=1000&color=C9D6E4&center=true&vCenter=true&width=580&height=28&lines=0x0000_FFFF+%C2%B7+NULL+POINTER+RESOLVED;MONOCHROME+ARCHITECT+%C2%B7+MINIMALIST+CRAFT;HIGH-EFFICIENCY+BYTECODE+EXECUTION;OPERATOR%3A+@[YOUR-USERNAME]\" alt=\"Ghost Typing\"/>",
  "  \x3cbr/>",
  "  \x3cimg src=\"https://img.shields.io/badge/MODE-BRUTALIST-c9d6e4?style=flat-square&logo=arch-linux&logoColor=0e141a\"/>",
  "  \x3cimg src=\"https://img.shields.io/badge/REGISTER-0x7F-7fd4ff?style=flat-square\"/>",
  "  \x3cimg src=\"https://komarev.com/ghpvc/?username=[YOUR-USERNAME]&color=c9d6e4&style=flat-square&label=PINGS\"/>",
  "\x3c/div>",
  "",
  "```",
  ":: GHOST SHELL MEMORY DUMP",
  ":: REG_0 = @[YOUR-USERNAME] | REG_1 = [YOUR LOCATION] | REG_2 = ZERO_COMPROMISE",
  "```",
  "",
  "\x3cdetails open>",
  "\x3csummary>\x3cb>01 // SYSTEM HEURISTICS\x3c/b>\x3c/summary>",
  "",
  "Stripped-down engineering philosophy: Maximum signal, zero noise. Crafting software where every byte has a purpose and every interaction is instant.",
  "",
  "\x3c/details>",
  "",
  "\x3cdetails open>",
  "\x3csummary>\x3cb>02 // INSTRUCTION SET (STACK)\x3c/b>\x3c/summary>",
  "",
  "\x3cdiv align=\"center\">",
  "  \x3ca href=\"https://skillicons.dev\">\x3cimg src=\"https://skillicons.dev/icons?i=ts,react,nextjs,nodejs,postgres,redis,docker,git,linux&theme=dark\" alt=\"Skills\"/>\x3c/a>",
  "\x3c/div>",
  "",
  "\x3c/details>",
  "",
  "\x3cdetails open>",
  "\x3csummary>\x3cb>03 // CORE TELEMETRY\x3c/b>\x3c/summary>",
  "",
  "\x3cdiv align=\"center\">",
  "  \x3cimg src=\"https://github-readme-stats-fast.vercel.app/api?username=[YOUR-USERNAME]&show_icons=true&hide_border=true&bg_color=1a222c&title_color=c9d6e4&text_color=e8eef5&icon_color=00b3ff&border_radius=4\" alt=\"Stats\" height=\"150\"/>",
  "  \x3cimg src=\"https://streak-stats.demolab.com/?user=[YOUR-USERNAME]&hide_border=true&background=1a222c&ring=c9d6e4&fire=00b3ff&currStreakLabel=7fd4ff&currStreakNum=c9d6e4&sideNums=e8eef5&sideLabels=7f93a8&border_radius=4\" alt=\"Streak\" height=\"150\"/>",
  "\x3c/div>",
  "",
  "\x3c/details>",
  "",
  "\x3cdetails open>",
  "\x3csummary>\x3cb>04 // DEPLOYED ARTIFACTS\x3c/b>\x3c/summary>",
  "",
  "- **[Y2K-Profile](https://github.com/[YOUR-USERNAME]/Y2K-Profile)** — Self-contained retro profile generation suite · [Execute →](https://github.com/[YOUR-USERNAME]/Y2K-Profile)",
  "- **[Zen-Sudoku](https://github.com/[YOUR-USERNAME]/Zen-Sudoku)** — Zero-bloat focus game · [Execute →](https://github.com/[YOUR-USERNAME]/Zen-Sudoku)",
  "",
  "\x3c/details>",
  "",
  "\x3cdetails>",
  "\x3csummary>\x3cb>05 // RAW PACKET INTERFACE\x3c/b>\x3c/summary>",
  "",
  "\x3cdiv align=\"center\">",
  "  \x3ca href=\"mailto:[Your Email]\">\x3cimg src=\"https://img.shields.io/badge/MAIL-c9d6e4?style=flat-square&logo=gmail&logoColor=0e141a\"/>\x3c/a>",
  "  \x3ca href=\"https://github.com/[YOUR-USERNAME]\">\x3cimg src=\"https://img.shields.io/badge/GH-1a222c?style=flat-square&logo=github&logoColor=c9d6e4\"/>\x3c/a>",
  "  \x3ca href=\"https://linkedin.com/in/[YOUR-USERNAME]\">\x3cimg src=\"https://img.shields.io/badge/LINK-7fd4ff?style=flat-square&logo=linkedin&logoColor=0e141a\"/>\x3c/a>",
  "\x3c/div>",
  "",
  "\x3c/details>"
].join("\n");

export default {
  id: "ghost",
  vibe: "Brutalist monochrome terminal. High-contrast stark minimalist hacker.",
  md: md,
};
