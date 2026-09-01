/* ProfileExE — Template: GAMEBOY
   Vibe: 8-bit Nintendo Game Boy quest cartridge & inventory.

   Editing guide:
   - Each string in the md array is one line of markdown
   - Use \x3c for < (avoids CDN tag-stripping issues)
   - Use \" for double-quotes inside strings
   - Badge URLs: keep & as & (not &amp;) — they go into img src attrs
   - After editing: save → Vite HMR reloads instantly in dev        */

"use strict";

var md = [
  "\x3cdiv align=\"center\">",
  "  \x3cimg src=\"https://capsule-render.vercel.app/api?type=rect&color=1f2716&text=%E2%96%B8%20[YOUR%20NAME].GB%20%C2%B7%20PRESS%20START&height=150&fontSize=34&fontColor=9bbc0f&stroke=9bbc0f&strokeWidth=1.5&desc=8-BIT%20CARTRIDGE%20%C2%B7%20WORLD%201-1%20LOADED&descAlignY=65&descColor=c4d64f\" width=\"100%\" alt=\"GameBoy Banner\"/>",
  "  \x3cimg src=\"https://readme-typing-svg.demolab.com?font=Press+Start+2P&size=11&pause=1000&color=9BBC0F&center=true&vCenter=true&width=580&height=28&lines=PRESS+START+%E2%96%B8+LEVEL+99+PLAYER;INVENTORY%3A+FULL-STACK+CODE;BOSS+FIGHTS+WON%3A+100%25;SAVING+GAME+TO+MEMORY...\" alt=\"GameBoy Typing\"/>",
  "  \x3cbr/>",
  "  \x3cimg src=\"https://img.shields.io/badge/PLAYER_1-READY-9bbc0f?style=flat-square&logo=nintendoswitch&logoColor=0f130a\"/>",
  "  \x3cimg src=\"https://img.shields.io/badge/LIVES-INF-c4d64f?style=flat-square\"/>",
  "  \x3cimg src=\"https://komarev.com/ghpvc/?username=[YOUR-USERNAME]&color=9bbc0f&style=flat-square&label=COINS\"/>",
  "\x3c/div>",
  "",
  "```",
  "┌──────────────────────────────────────────────────────────────┐",
  "│ PLAYER    : @[YOUR-USERNAME]                                 │",
  "│ CLASS     : Full-Stack Developer [LVL 99]                    │",
  "│ WORLD     : [YOUR LOCATION]                                  │",
  "│ QUEST     : Building top-tier applications with zero bugs    │",
  "└──────────────────────────────────────────────────────────────┘",
  "```",
  "",
  "\x3cdetails open>",
  "\x3csummary>\x3cb>▸ 01 // ITEM INVENTORY (STACK)\x3c/b>\x3c/summary>",
  "",
  "\x3cdiv align=\"center\">",
  "  \x3ca href=\"https://skillicons.dev\">\x3cimg src=\"https://skillicons.dev/icons?i=js,ts,react,nextjs,tailwind,nodejs,postgres,redis,docker,git,linux&theme=dark\" alt=\"Skills\"/>\x3c/a>",
  "\x3c/div>",
  "",
  "\x3c/details>",
  "",
  "\x3cdetails open>",
  "\x3csummary>\x3cb>▸ 02 // HIGH SCORES & TELEMETRY\x3c/b>\x3c/summary>",
  "",
  "\x3cdiv align=\"center\">",
  "  \x3cimg src=\"https://github-readme-stats-fast.vercel.app/api?username=[YOUR-USERNAME]&show_icons=true&hide_border=true&bg_color=1f2716&title_color=9bbc0f&text_color=dce8b8&icon_color=e8f0a0&border_radius=0\" alt=\"Stats\" height=\"150\"/>",
  "  \x3cimg src=\"https://streak-stats.demolab.com/?user=[YOUR-USERNAME]&hide_border=true&background=1f2716&ring=9bbc0f&fire=e8f0a0&currStreakLabel=c4d64f&currStreakNum=9bbc0f&sideNums=dce8b8&sideLabels=8a9768&border_radius=0\" alt=\"Streak\" height=\"150\"/>",
  "\x3c/div>",
  "",
  "\x3c/details>",
  "",
  "\x3cdetails open>",
  "\x3csummary>\x3cb>▸ 03 // WORLD MAP (DUNGEONS & PROJECTS)\x3c/b>\x3c/summary>",
  "",
  "- 🍄 **[Y2K-Profile](https://github.com/[YOUR-USERNAME]/Y2K-Profile)** — Primary flagship generator application · [Warp Pipe →](https://github.com/[YOUR-USERNAME]/Y2K-Profile)",
  "- ⭐ **[Zen-Sudoku](https://github.com/[YOUR-USERNAME]/Zen-Sudoku)** — Distraction-free Sudoku with ambient audio · [Warp Pipe →](https://github.com/[YOUR-USERNAME]/Zen-Sudoku)",
  "",
  "\x3c/details>",
  "",
  "\x3cdetails>",
  "\x3csummary>\x3cb>▸ 04 // 2-PLAYER LINK CABLE (CONNECT)\x3c/b>\x3c/summary>",
  "",
  "\x3cdiv align=\"center\">",
  "  \x3ca href=\"mailto:[Your Email]\">\x3cimg src=\"https://img.shields.io/badge/LINK_MAIL-9bbc0f?style=flat-square&logo=gmail&logoColor=0f130a\"/>\x3c/a>",
  "  \x3ca href=\"https://github.com/[YOUR-USERNAME]\">\x3cimg src=\"https://img.shields.io/badge/GITHUB-1f2716?style=flat-square&logo=github&logoColor=9bbc0f\"/>\x3c/a>",
  "  \x3ca href=\"https://linkedin.com/in/[YOUR-USERNAME]\">\x3cimg src=\"https://img.shields.io/badge/LINKEDIN-c4d64f?style=flat-square&logo=linkedin&logoColor=0f130a\"/>\x3c/a>",
  "\x3c/div>",
  "",
  "\x3c/details>"
].join("\n");

export default {
  id: "gameboy",
  vibe: "8-bit Nintendo Game Boy quest cartridge & inventory.",
  md: md,
};
