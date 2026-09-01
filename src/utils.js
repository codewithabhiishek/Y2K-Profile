/* ProfileExE — Core Utilities
   Pure functions: no side-effects, no DOM, no globals.
   Re-exported via src/boot.js → window.__PX__                */

"use strict";

export function esc(s){
  return String(s)
    .replace(/&/g,"&amp;")
    .replace(/\x3c/g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;");
}

export function fnv1a(str){
  var h=0x811c9dc5;
  for(var i=0;str.length>i;i++){h^=str.charCodeAt(i);h=Math.imul(h,0x01000193);}
  return h>>>0;
}

export function rng(seed){
  var a=seed>>>0;
  return function(){
    a|=0;a=(a+0x6d2b79f5)|0;
    var t=Math.imul(a^(a>>>15),1|a);
    t=(t+Math.imul(t^(t>>>7),61|t))^t;
    return((t^(t>>>14))>>>0)/4294967296;
  };
}

export function mix(h1,h2,t){
  function p(h){h=h.replace("#","");return[parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)];}
  var a=p(h1),b=p(h2),o=a.map(function(v,i){return Math.round(v+(b[i]-v)*t).toString(16).padStart(2,"0");});
  return "#"+o.join("");
}

export function fmt(n){
  if(n>=1e6)return(n/1e6).toFixed(1)+"M";
  if(n>=1000)return(n/1000).toFixed(1)+"k";
  return String(n);
}

// ─── localStorage wrapper ────────────────────────────────────────────────────
var _mem={};
var _realOk=(function(){
  try{var k="__px__";window.localStorage.setItem(k,"1");window.localStorage.removeItem(k);return true;}
  catch(e){return false;}
})();

export var store={
  get:function(k){try{if(_realOk){var v=window.localStorage.getItem(k);if(v!==null)return v;}}catch(e){}return _mem[k]||null;},
  set:function(k,v){_mem[k]=v;try{if(_realOk)window.localStorage.setItem(k,v);}catch(e){}},
  del:function(k){delete _mem[k];try{if(_realOk)window.localStorage.removeItem(k);}catch(e){}},
};

// ─── Clipboard / Download ────────────────────────────────────────────────────
function _legacyCopy(t){
  try{var ta=document.createElement("textarea");ta.value=t;ta.style.position="fixed";ta.style.opacity="0";document.body.appendChild(ta);ta.select();var ok=document.execCommand("copy");document.body.removeChild(ta);return ok;}
  catch(e){return false;}
}

export function copyText(t){
  if(navigator.clipboard&&navigator.clipboard.writeText){
    return navigator.clipboard.writeText(t).then(function(){return true;},function(){return _legacyCopy(t);});
  }
  return Promise.resolve(_legacyCopy(t));
}

export function download(name,content,mime){
  var b=new Blob([content],{type:mime||"image/svg+xml"});
  var u=URL.createObjectURL(b);
  var a=document.createElement("a");a.href=u;a.download=name;
  document.body.appendChild(a);a.click();document.body.removeChild(a);
  setTimeout(function(){URL.revokeObjectURL(u);},2000);
}

// ─── Toast notifications ─────────────────────────────────────────────────────
export function toast(msg,kind){
  var el=document.createElement("div");
  el.className="toast sf-bevel"+(kind==="err"?" err":"");
  el.innerHTML='\x3ci class="led" style="background:'+(kind==="err"?"var(--t-acc)":"var(--t-pri)")+';color:'+(kind==="err"?"var(--t-acc)":"var(--t-pri)")+'">\x3c/i>\x3cspan>'+esc(msg)+"\x3c/span>";
  document.getElementById("toasts").appendChild(el);
  setTimeout(function(){el.style.opacity="0";el.style.transition="opacity .3s";setTimeout(function(){el.remove();},320);},3400);
}
