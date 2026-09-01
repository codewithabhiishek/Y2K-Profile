/* ProfileExE — Template: CLEAN
   Vibe: Minimalist executive engineering profile. Crisp architecture, clean typography.

   Editing guide:
   - Each string in the md array is one line of markdown
   - Use \x3c for < (avoids CDN tag-stripping issues)
   - Use \" for double-quotes inside strings
   - Badge URLs: keep & as & (not &amp;) — they go into img src attrs
   - After editing: save → Vite HMR reloads instantly in dev        */

"use strict";

var md = [
  "\x3cdiv align=\"center\">",
  "  \x3cimg src=\"https://capsule-render.vercel.app/api?type=waving&color=eef4f9&text=%E2%9C%A7%20[YOUR%20NAME]%20%E2%9C%A7&height=150&fontSize=34&fontColor=0a84d0&stroke=0a84d0&strokeWidth=1.5&desc=STAFF%20SOFTWARE%20ENGINEER%20%C2%B7%20DISTRIBUTED%20SYSTEMS&descAlignY=65&descColor=12b0c9\" width=\"100%\" alt=\"Clean Banner\"/>",
  "  \x3cimg src=\"https://readme-typing-svg.demolab.com?font=Inter&size=13&pause=1000&color=0A84D0&center=true&vCenter=true&width=580&height=28&lines=Staff+Software+Engineer+%C2%B7+Distributed+Systems;TypeScript+%2F+React+%2F+Next.js+%2F+Node.js;Engineering+High-Availability+Cloud+Platforms;Based+in+[YOUR+LOCATION]\" alt=\"Clean Typing\"/>",
  "  \x3cbr/>",
  "  \x3cimg src=\"https://img.shields.io/badge/FOCUS-DISTRIBUTED_SYSTEMS-0a84d0?style=flat-square&logo=cloudflare&logoColor=white\"/>",
  "  \x3cimg src=\"https://img.shields.io/badge/STACK-TYPESCRIPT-17324a?style=flat-square&logo=typescript&logoColor=white\"/>",
  "  \x3cimg src=\"https://komarev.com/ghpvc/?username=[YOUR-USERNAME]&color=0a84d0&style=flat-square&label=PROFILE+VIEWS\"/>",
  "\x3c/div>",
  "",
  "### ✦ Professional Overview",
  "",
  "Senior software architect focused on web performance, scalable microservices, and elegant developer experience. Dedicated to writing clear, test-driven, maintainable code with strict zero-regression standards.",
  "",
  "\x3cdetails open>",
  "\x3csummary>\x3cb>🛠️ Core Technical Competencies\x3c/b>\x3c/summary>",
  "",
  "\x3cdiv align=\"center\">",
  "  \x3ca href=\"https://skillicons.dev\">\x3cimg src=\"https://skillicons.dev/icons?i=ts,js,react,nextjs,nodejs,tailwind,python,postgres,docker,aws,git&theme=light\" alt=\"Skills\"/>\x3c/a>",
  "\x3c/div>",
  "",
  "\x3c/details>",
  "",
  "\x3cdetails open>",
  "\x3csummary>\x3cb>📊 Activity & Engineering Metrics\x3c/b>\x3c/summary>",
  "",
  "\x3cdiv align=\"center\">",
  "  \x3cimg src=\"https://github-readme-stats-fast.vercel.app/api?username=[YOUR-USERNAME]&show_icons=true&hide_border=true&bg_color=eef4f9&title_color=0a84d0&text_color=17324a&icon_color=f5a300&border_radius=8\" alt=\"Stats\" height=\"150\"/>",
  "  \x3cimg src=\"https://streak-stats.demolab.com/?user=[YOUR-USERNAME]&hide_border=true&background=eef4f9&ring=0a84d0&fire=f5a300&currStreakLabel=12b0c9&currStreakNum=0a84d0&sideNums=17324a&sideLabels=5c7690&border_radius=8\" alt=\"Streak\" height=\"150\"/>",
  "\x3c/div>",
  "",
  "\x3c/details>",
  "",
  "\x3cdetails open>",
  "\x3csummary>\x3cb>🚀 Key Deliverables & Projects\x3c/b>\x3c/summary>",
  "",
  "| Project | Description | Role | Link |",
  "| :--- | :--- | :--- | :--- |",
  "| **Y2K-Profile** | Interactive retro developer studio and profile generator | Author | [View Project →](https://github.com/[YOUR-USERNAME]/Y2K-Profile) |",
  "| **Hello-Museum** | Educational acoustic gallery of 120+ cultural greetings | Creator | [View Project →](https://github.com/[YOUR-USERNAME]/Hello-Museum) |",
  "",
  "\x3c/details>",
  "",
  "\x3cdetails>",
  "\x3csummary>\x3cb>📬 Contact & Network\x3c/b>\x3c/summary>",
  "",
  "\x3cdiv align=\"center\">",
  "  \x3ca href=\"mailto:[Your Email]\">\x3cimg src=\"https://img.shields.io/badge/Email-0a84d0?style=flat-square&logo=gmail&logoColor=white\"/>\x3c/a>",
  "  \x3ca href=\"https://github.com/[YOUR-USERNAME]\">\x3cimg src=\"https://img.shields.io/badge/GitHub-17324a?style=flat-square&logo=github&logoColor=white\"/>\x3c/a>",
  "  \x3ca href=\"https://linkedin.com/in/[YOUR-USERNAME]\">\x3cimg src=\"https://img.shields.io/badge/LinkedIn-0a84d0?style=flat-square&logo=linkedin&logoColor=white\"/>\x3c/a>",
  "\x3c/div>",
  "",
  "\x3c/details>"
].join("\n");

export default {
  id: "clean",
  vibe: "Minimalist executive engineering profile. Crisp architecture, clean typography.",
  md: md,
};
