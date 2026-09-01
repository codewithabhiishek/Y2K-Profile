/* ProfileExE — ASCII Art Library
   7 pre-built ASCII art styles for use in the AI README compiler.
   To add a style: append an object with {id, label, text} and
   add a matching <option> in the compiler UI.                 */

"use strict";

export var ASCII = [
 {id:"banner",label:"BANNER",text:[
"██████╗ ██████╗  ██████╗ ███████╗██╗██╗     ███████╗",
"██╔══██╗██╔══██╗██╔═══██╗██╔════╝██║██║     ██╔════╝",
"██████╔╝██████╔╝██║   ██║█████╗  ██║██║     █████╗  ",
"██╔═══╝ ██╔══██╗██║   ██║██╔══╝  ██║██║     ██╔══╝  ",
"██║     ██║  ██║╚██████╔╝██║     ██║███████╗███████╗",
"╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝╚══════╝"].join("\n")},
 {id:"matrix",label:"MATRIX",text:[
"┌──[ NEURAL MATRIX INTERFACE v4.0 ]────────────────────────────┐",
"│ 01000011 01011001 01000010 01001110 01000101 01010100 01010011 │",
"│ > DECK_IP : 192.168.0.255   |  CIPHER: AES-256-GCM QUANTUM   │",
"│ > STATUS  : ROOT ACCESS     |  ICE BREAKER: ARMORED NOMINAL  │",
"│ > STREAM  : 100 Gbps FIBER  |  NEURAL LOAD: 100% SYNCHRONIZED│",
"└──────────────────────────────────────────────────────────────┘"].join("\n")},
 {id:"sword",label:"QUEST / RPG",text:[
"⚔️ [ LEVEL 99 CODE-MAGE // QUEST DIARY ] ⚔️",
"   /| ___________________________________________________________",
"O|===|* >___________________________________________________________>",
"   \\|  HP: [████████████████] 100%  |  MP: [████████████████] 100%  ",
"       EXP: 9,999,999 / MAX        |  CLASS: LEGENDARY ARCHITECT "].join("\n")},
 {id:"arcade",label:"ARCADE",text:[
"╔══════════════════════════════════════════════════════════════╗",
"║  🕹️ INSERT COIN TO PLAY  ·  HIGH SCORE: 999,999,999  ·  1UP   ║",
"║  ►► READY PLAYER ONE  ·  COMBO: 128×  ·  DIFFICULTY: EXPERT  ║",
"║  [ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ] 100% BOSS RUSH CLEARED · NO DEATHS  ║",
"╚══════════════════════════════════════════════════════════════╝"].join("\n")},
 {id:"wave",label:"WAVE",text:[
"          .---.            ✦ SYNTHWAVE HORIZON 1984 ✦",
"         /     \\          -----------------------------",
"     ___/  ___  \\___      SPEED: 180 MPH · NEON SUNSET",
"    /   \\_/   \\_/   \\     GRID: OUTRUN 3D · STEREO ACTIVE",
"~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
"   ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲"].join("\n")},
 {id:"grid",label:"GRID",text:[
"+======+======+======+======+======+======+======+======+======+",
"| NODE | GATE | FLOW | PING | PACK | SYNC | ICE  | REPO | 2026 |",
"+------+------+------+------+------+------+------+------+------+",
"| 0x01 | ETH0 | 10G  | 01ms | PASS | 100% | SAFE | OPEN | LIVE |",
"+======+======+======+======+======+======+======+======+======+",
"    >>> CYBERSPACE HIGH-FREQUENCY COMPUTATION ACTIVE <<<"].join("\n")},
 {id:"terminal",label:"TERMINAL",text:[
"  _   _ _____ ___  _   _ _____ _____ ____ _   _ ",
" | \\ | | ____/ _ \\| \\ | |  ___| ____|_   _| | | |",
" |  \\| |  _|| | | |  \\| | |_  |  _|   | | | |_| |",
" | |\\  | |__| |_| | |\\  |  _| | |___  | | |  _  |",
" |_| \\_|_____\\___/|_| \\_|_|   |_____| |_| |_| |_|",
"--------------------------------------------------",
"OS       : Arch Linux x86_64 / ProfileOS v2.4",
"HOST     : Developer Workstation [16 Cores / 64GB]",
"UPTIME   : 999 days, 23 hours, 59 mins",
"SHELL    : zsh 5.9 (x86_64-apple-darwin)"].join("\n")}
];

export function asciiText(id){
  for(var i=0;ASCII.length>i;i++)if(ASCII[i].id===id)return ASCII[i].text;
  return ASCII[0].text;
}
