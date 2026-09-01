/* ProfileExE — Theme Definitions
   10 curated colorways. Each theme controls every surface:
   site chrome, template previews, SVG studio, AI compiler.

   To add a theme:
   1. Add an object here following the same shape
   2. Give it a unique id and name
   3. The app picks it up automatically                        */

"use strict";

export var THEMES = [
 {id:"phosphor",name:"PHOSPHOR-01",era:"1999 · CRT",sf:"sf-scan",scan:.13,rad:"2px",fd:"var(--f-crt)",fb:"var(--f-mono)",
  c:{bg:"#030a05",deep:"#010502",panel:"#07130a",panel2:"#0b1e10",ink:"#d8ffe4",muted:"#5f8f6f",line:"#1c4a2e",hi:"#2f7a4c",lo:"#04110a",pri:"#00ff66",sec:"#7dffa8",acc:"#d4ff3f"},sw:["#00ff66","#07130a","#d4ff3f"]},
 {id:"amber",name:"AMBER-88",era:"1984 · UNIX",sf:"sf-glow",scan:.11,rad:"2px",fd:"var(--f-crt)",fb:"var(--f-mono)",
  c:{bg:"#120a02",deep:"#0a0501",panel:"#1d1206",panel2:"#291b09",ink:"#ffe9c4",muted:"#9c7b4a",line:"#4d3517",hi:"#7a5a26",lo:"#0d0702",pri:"#ffb000",sec:"#ffd27f",acc:"#ff6b1a"},sw:["#ffb000","#1d1206","#ff6b1a"]},
 {id:"cybergrid",name:"CYBERGRID",era:"2001 · NET",sf:"sf-grid",scan:.09,rad:"0",fd:"var(--f-crt)",fb:"var(--f-ui)",
  c:{bg:"#021014",deep:"#010a0d",panel:"#06222a",panel2:"#0a3039",ink:"#d9fbff",muted:"#5e93a0",line:"#155063",hi:"#1f7a94",lo:"#031318",pri:"#00e5ff",sec:"#64f0d8",acc:"#f5d300"},sw:["#00e5ff","#06222a","#f5d300"]},
 {id:"ice",name:"ICE.CHROME",era:"1999 · IM",sf:"sf-bevel",scan:.05,rad:"3px",fd:"var(--f-crt)",fb:"var(--f-ui)",
  c:{bg:"#dfe9f2",deep:"#c3d3e0",panel:"#eef4f9",panel2:"#f7fbfe",ink:"#17324a",muted:"#5c7690",line:"#a9bfd2",hi:"#ffffff",lo:"#8ba3b8",pri:"#0a84d0",sec:"#12b0c9",acc:"#f5a300"},sw:["#0a84d0","#eef4f9","#f5a300"]},
 {id:"chrome",name:"LIQUID CHROME",era:"2000 · SKIN",sf:"sf-bevel",scan:.07,rad:"2px",fd:"var(--f-crt)",fb:"var(--f-ui)",
  c:{bg:"#10151c",deep:"#0a0e13",panel:"#1a222c",panel2:"#242f3c",ink:"#e8eef5",muted:"#7f93a8",line:"#3a4b5e",hi:"#9fb4c8",lo:"#05080c",pri:"#c9d6e4",sec:"#7fd4ff",acc:"#00b3ff"},sw:["#c9d6e4","#1a222c","#00b3ff"]},
 {id:"acid",name:"ACID RAVE",era:"1998 · FLYER",sf:"sf-pixel",scan:.1,rad:"0",fd:"var(--f-crt)",fb:"var(--f-ui)",
  c:{bg:"#0c0f0a",deep:"#060804",panel:"#141a10",panel2:"#1d2617",ink:"#eaffdc",muted:"#7f9a6b",line:"#3a4d2c",hi:"#6a8f4a",lo:"#0a0d07",pri:"#b4ff00",sec:"#e0ff7a",acc:"#00ffd0"},sw:["#b4ff00","#141a10","#00ffd0"]},
 {id:"redalert",name:"RED ALERT",era:"1997 · OPS",sf:"sf-glow",scan:.1,rad:"2px",fd:"var(--f-crt)",fb:"var(--f-mono)",
  c:{bg:"#140404",deep:"#0b0202",panel:"#1e0808",panel2:"#2b0d0d",ink:"#ffe3dd",muted:"#a06a5f",line:"#5c231c",hi:"#8f3a2e",lo:"#0c0303",pri:"#ff3b2f",sec:"#ff8a70",acc:"#ffd23f"},sw:["#ff3b2f","#1e0808","#ffd23f"]},
 {id:"holo",name:"HOLO-FOIL",era:"2001 · CARD",sf:"sf-glow",scan:.08,rad:"3px",fd:"var(--f-crt)",fb:"var(--f-ui)",
  c:{bg:"#04140f",deep:"#020c09",panel:"#0a241c",panel2:"#123327",ink:"#e2fff2",muted:"#6ba38c",line:"#1f5c45",hi:"#3f8f6e",lo:"#03100b",pri:"#3dffb0",sec:"#b0ffe0",acc:"#ffd75e"},sw:["#3dffb0","#0a241c","#ffd75e"]},
 {id:"gameboy",name:"DMG-8BIT",era:"1989 · POCKET",sf:"sf-pixel",scan:.09,rad:"0",fd:"var(--f-crt)",fb:"var(--f-mono)",
  c:{bg:"#161c10",deep:"#0f130a",panel:"#1f2716",panel2:"#2a351d",ink:"#dce8b8",muted:"#8a9768",line:"#46522f",hi:"#6b7a48",lo:"#10150a",pri:"#9bbc0f",sec:"#c4d64f",acc:"#e8f0a0"},sw:["#9bbc0f","#1f2716","#e8f0a0"]},
 {id:"flame",name:"AFTERBURNER",era:"2000 · RIG",sf:"sf-glow",scan:.1,rad:"2px",fd:"var(--f-crt)",fb:"var(--f-ui)",
  c:{bg:"#140802",deep:"#0c0401",panel:"#221007",panel2:"#301809",ink:"#ffe8d2",muted:"#b07b4f",line:"#5e3216",hi:"#96551f",lo:"#0e0601",pri:"#ff7a1a",sec:"#ffb347",acc:"#ffe14d"},sw:["#ff7a1a","#221007","#ffe14d"]}
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
export function theme(id){
  for(var i=0;THEMES.length>i;i++)if(THEMES[i].id===id)return THEMES[i];
  return THEMES[0];
}

export function applyTheme(t){
  var r=document.documentElement.style;
  var m={
    "--t-bg":t.c.bg,"--t-deep":t.c.deep,"--t-panel":t.c.panel,"--t-panel2":t.c.panel2,
    "--t-ink":t.c.ink,"--t-muted":t.c.muted,"--t-line":t.c.line,"--t-hi":t.c.hi,
    "--t-lo":t.c.lo,"--t-pri":t.c.pri,"--t-sec":t.c.sec,"--t-acc":t.c.acc,
    "--t-scan":String(t.scan),"--t-rad":t.rad
  };
  for(var k in m)r.setProperty(k,m[k]);
  try{window.localStorage.setItem("px_theme",t.id);}catch(e){}
}
