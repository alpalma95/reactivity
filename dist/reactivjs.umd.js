(function(u,y){typeof exports=="object"&&typeof module<"u"?y(exports):typeof define=="function"&&define.amd?define(["exports"],y):(u=typeof globalThis<"u"?globalThis:u||self,y(u.reactivjs={}))})(this,function(u){"use strict";const y=(t,e)=>(Array.isArray(t)&&(e=t,t={}),[t,e]),P=(t,e)=>{const n=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT,function(c){var o,i;return c.getAttribute("ref")==e||c.dataset.ref==e||c.getAttributeNames().some(f=>f.includes(":"))&&e==="createScope"?NodeFilter.FILTER_ACCEPT:(o=c.getAttribute("ref"))!=null&&o.toUpperCase().includes("CONTROLLER")||(i=c.dataset.ref)!=null&&i.toUpperCase().includes("CONTROLLER")?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_SKIP}),r=[];let s;for(;s=n.nextNode();)r.push(s);return r},a=(t,e)=>typeof t=="function"?t(e):t.val??t;let d=null,g=new WeakMap;class W{constructor(e){this.cb=e,this._set=new Set}unhook(){this._set.forEach(e=>e.delete(this))}}let h=t=>{d=new W(t),d.cb();let e=d;return d=null,e},_=(t,e)=>{if(d===null)return;let n=((r,s,c)=>{let o;return r.has(s)&&r.get(s).has(c)?o=r.get(s).get(c):r.has(s)&&!r.get(s).has(c)?r.get(s).set(c,o=new Set):r.set(s,new Map([[c,o=new Set]])),o})(g,t,e);d._set.add(n),n.add(d)},v=t=>{let e=(n=>{if(Array.isArray(n)||typeof n!="function"&&typeof n!="object")return{val:n};if(typeof n=="function"){let r=v(1);return h(()=>r.val=n()),r}return Object.fromEntries(Object.entries(n).map(([r,s])=>[r,typeof s=="object"||typeof s=="function"?v(s):s]))})(t);return new Proxy(e,{get:(n,r,s)=>(_(n,r),Reflect.get(n,r,s)),set:(n,r,s,c)=>(n[r]!==s&&(Reflect.set(n,r,s,c),((o,i)=>{g.get(o)&&g.get(o).get(i).forEach(({cb:f})=>f())})(n,r)),!0)})};const j={selector:"rv-class",construct:function({element:t},e){return Object.entries(e).reduce((r,[s,c])=>{let o=h(()=>{!t.classList.contains(s)&&a(c,t)&&t.classList.add(s),t.classList.contains(s)&&!a(c,t)&&t.classList.remove(s)});return r.push(o),r},[])}},m=new WeakMap,E=(t,e)=>{let{isArray:n}=Array,r=m.get(t);r?m.set(t,n(e)?[...r,...e]:[...r,e]):m.set(t,[e])},C=t=>{var e;typeof(t==null?void 0:t.destroy)=="function"&&t.destroy(t),(e=m.get(t))==null||e.forEach(n=>{n.unhook()}),m.delete(t),t==null||t.remove()},F=(t,e,n)=>{let r=h(()=>t.setAttribute(e,a(n,t)));E(t,r)};class N extends Array{mount(e){return this.forEach(n=>e(n)),this}}const I=(t,e)=>{var n;return(n=t.getAttributeNames())==null?void 0:n.reduce((r,s)=>(s.startsWith(":")&&s!==":"&&(r[s.replaceAll(":","")]=e[t.getAttribute(s)]??t.getAttribute(s))&&t.removeAttribute(s),s===":"&&(r[t.tagName.toLowerCase()]=e[t.getAttribute(s)])&&t.removeAttribute(s),r),{})},w=(t,e=[])=>{t.$=R(t),t.mount=function(n){n(t)},t.setProps=function(n){A({element:t,ctx:n}),e.length&&S(t,e)}},R=(t=document)=>new Proxy({},{get:(e,n)=>function(r,s=[]){let[c,o]=y(r,s);const i=[...P(t,n)];let f=n==="createScope"?c:null;return f&&i.push(t),i.forEach(p=>{f&&(c=I(p,f));const l={element:p,ctx:c};A(l),S(p,o),w(p,c),l.element.init&&typeof l.element.init=="function"&&l.element.init()}),i.length===1?i[0]:new N(...i)}}),q=R(),D=(t,e,n)=>{const r=e.children,{trackBy:s}=e.dataset;t.length<r.length&&[...r].filter(o=>!t.some(i=>o.dataset.key==i[s])).forEach(o=>{C(e.querySelector(`[data-key="${o.dataset.key}"]`))}),t.forEach((c,o)=>{r[o]||e.appendChild(n(c,o));const i=c[s]==r[o].dataset.key,f=t.length===r.length,p=`[data-key="${c[s]}"]`;if(!i&&f){const l=e.querySelector(p)??n(c,o);e.replaceChild(l,r[o])}if(!i&&!f){const l=e.querySelector(p)??n(c,o);e.insertBefore(l,r[o])}})},O=(t,e)=>{var r;const n=((r=t.children[0])==null?void 0:r.cloneNode(!0))??t.querySelector("template").content.children[0];return w(n),s=>(e(s)(n),n)},$={selector:"rv-for",construct:function({element:t},e){var i;let[n,r,s]=e,c;(i=t.dataset)!=null&&i.populate&&(n.val=JSON.parse(t.dataset.populate),t.removeAttribute("data-populate"),c=O(t,r));const o=v(()=>s?n.val.map(s):n.val);return c&&o.val.forEach((f,p)=>{const l=t.children[p];w(l),r(f,p)(l)}),h(()=>{D(o.val,t,c??r)})}},U={selector:"rv-if",construct:function(t,e){let n=new Comment("rv-if");return h(()=>{!a(e,t.element)&&!t.element.parentElement&&(t.replaceWith=n),n.parentElement&&a(e,t.element)&&(n.replaceWith(t.element),typeof t.element.init=="function"&&t.element.init(t.element)),t.element.parentElement&&!a(e,t.element)&&(typeof t.element.destroy=="function"&&t.element.destroy(t.element),t.element.replaceWith(n))})}},x={INPUT:{checkbox:"checked"}},B={selector:"rv-model",construct:function({element:t},e){let n=x[t.tagName]??"value";return t instanceof HTMLInputElement&&(n=x.INPUT[t.type]??"value"),t.addEventListener("input",()=>{e.val=t[n]}),h(()=>{t[n]=e.val})}},J={selector:"rv-show",construct:function({element:t},e){return h(()=>t.style.display=a(e,t)?null:"none")}},L={selector:"rv-text",construct:function(t,e){var r;let n=null;return((r=t.element.tagName)==null?void 0:r.toLowerCase())===this.selector&&(n=new Text,t.element.replaceWith(n)),h(()=>{t.element.textContent===a(e,t.element)||(n==null?void 0:n.textContent)===a(e,t.element)||t.element instanceof Comment||(n?n.textContent=a(e,n):t.element.textContent=a(e,t.element))})}},T=Object.fromEntries([$,L,j,J,U,B].map(t=>[t.selector,t])),K=(...t)=>{t.forEach(e=>T[e.selector]=e)},A=t=>{for(const e in t.ctx){let n=T[e];const r=e.startsWith("on")&&typeof t.ctx[e]=="function";if(e==="init"||e==="destroy"){t.element[e]=t.ctx[e];continue}if(n){let s=n.construct(t,t.ctx[e]);s&&E(t.element,s);continue}if(r){t.element.addEventListener(e.slice(2),t.ctx[e]);continue}if(typeof t.ctx[e]=="function"||typeof t.ctx[e]=="object"){F(t.element,e,t.ctx[e]);continue}t.element.setAttribute(e,t.ctx[e])}},S=(t,e)=>{e.length&&e.forEach(n=>{let r=n instanceof HTMLElement||n instanceof Comment||n instanceof DocumentFragment?n:new Text(n);typeof n=="function"&&E(r,L.construct({element:r},n)),t.appendChild(r)})},z=t=>function(e,n=[]){let[r,s]=y(e,n),c={element:t==="fragment"?new DocumentFragment:document.createElement(t),ctx:r};return A(c),S(c.element,s),c.element.init&&typeof c.element.init=="function"&&c.element.init(),c.replaceWith??c.element};let G=(t,...e)=>t.reduce((n,r,s)=>[...n,r,e[s]??""],[]);const Q=new Proxy({},{get:function(t,e){return e in t||Reflect.set(t,e,e==="txt"?G:z(e)),t[e]}});u.$=q,u.h=Q,u.hook=h,u.registerDirectives=K,u.safeRemove=C,u.stream=v,Object.defineProperty(u,Symbol.toStringTag,{value:"Module"})});
