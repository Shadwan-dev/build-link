(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,33525,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"warnOnce",{enumerable:!0,get:function(){return a}});let a=e=>{}},5766,e=>{"use strict";let t,r;var a,o=e.i(71645);let i={data:""},s=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,n=/\n+/g,c=(e,t)=>{let r="",a="",o="";for(let i in e){let s=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+s+";":a+="f"==i[1]?c(s,i):i+"{"+c(s,"k"==i[1]?"":t)+"}":"object"==typeof s?a+=c(s,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=s&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=c.p?c.p(i,s):i+":"+s+";")}return r+(t&&o?t+"{"+o+"}":o)+a},d={},u=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+u(e[r]);return t}return e};function p(e){let t,r,a=this||{},o=e.call?e(a.p):e;return((e,t,r,a,o)=>{var i;let p=u(e),m=d[p]||(d[p]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(p));if(!d[m]){let t=p!==e?e:(e=>{let t,r,a=[{}];for(;t=s.exec(e.replace(l,""));)t[4]?a.shift():t[3]?(r=t[3].replace(n," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(n," ").trim();return a[0]})(e);d[m]=c(o?{["@keyframes "+m]:t}:t,r?"":"."+m)}let f=r&&d.g;return r&&(d.g=d[m]),i=d[m],f?t.data=t.data.replace(f,i):-1===t.data.indexOf(i)&&(t.data=a?i+t.data:t.data+i),m})(o.unshift?o.raw?(t=[].slice.call(arguments,1),r=a.p,o.reduce((e,a,o)=>{let i=t[o];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"")):o.reduce((e,t)=>Object.assign(e,t&&t.call?t(a.p):t),{}):o,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(a.target),a.g,a.o,a.k)}p.bind({g:1});let m,f,h,g=p.bind({k:1});function y(e,t){let r=this||{};return function(){let a=arguments;function o(i,s){let l=Object.assign({},i),n=l.className||o.className;r.p=Object.assign({theme:f&&f()},l),r.o=/go\d/.test(n),l.className=p.apply(r,a)+(n?" "+n:""),t&&(l.ref=s);let c=e;return e[0]&&(c=l.as||e,delete l.as),h&&c[0]&&h(l),m(c,l)}return t?t(o):o}}var w=(e,t)=>"function"==typeof e?e(t):e,v=(t=0,()=>(++t).toString()),b=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},E="default",x=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return x(e,{type:+!!e.toasts.find(e=>e.id===a.id),toast:a});case 3:let{toastId:o}=t;return{...e,toasts:e.toasts.map(e=>e.id===o||void 0===o?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},A=[],T={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},N={},k=(e,t=E)=>{N[t]=x(N[t]||T,e),A.forEach(([e,r])=>{e===t&&r(N[t])})},D=e=>Object.keys(N).forEach(t=>k(e,t)),P=(e=E)=>t=>{k(t,e)},R={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},U=(e={},t=E)=>{let[r,a]=(0,o.useState)(N[t]||T),i=(0,o.useRef)(N[t]);(0,o.useEffect)(()=>(i.current!==N[t]&&a(N[t]),A.push([t,a]),()=>{let e=A.findIndex(([e])=>e===t);e>-1&&A.splice(e,1)}),[t]);let s=r.toasts.map(t=>{var r,a,o;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||R[t.type],style:{...e.style,...null==(o=e[t.type])?void 0:o.style,...t.style}}});return{...r,toasts:s}},I=e=>(t,r)=>{let a,o=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||v()}))(t,e,r);return P(o.toasterId||(a=o.id,Object.keys(N).find(e=>N[e].toasts.some(e=>e.id===a))))({type:2,toast:o}),o.id},L=(e,t)=>I("blank")(e,t);L.error=I("error"),L.success=I("success"),L.loading=I("loading"),L.custom=I("custom"),L.dismiss=(e,t)=>{let r={type:3,toastId:e};t?P(t)(r):D(r)},L.dismissAll=e=>L.dismiss(void 0,e),L.remove=(e,t)=>{let r={type:4,toastId:e};t?P(t)(r):D(r)},L.removeAll=e=>L.remove(void 0,e),L.promise=(e,t,r)=>{let a=L.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let o=t.success?w(t.success,e):void 0;return o?L.success(o,{id:a,...r,...null==r?void 0:r.success}):L.dismiss(a),e}).catch(e=>{let o=t.error?w(t.error,e):void 0;o?L.error(o,{id:a,...r,...null==r?void 0:r.error}):L.dismiss(a)}),e};var S=1e3,C=(e,t="default")=>{let{toasts:r,pausedAt:a}=U(e,t),i=(0,o.useRef)(new Map).current,s=(0,o.useCallback)((e,t=S)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),l({type:4,toastId:e})},t);i.set(e,r)},[]);(0,o.useEffect)(()=>{if(a)return;let e=Date.now(),o=r.map(r=>{if(r.duration===1/0)return;let a=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(a<0){r.visible&&L.dismiss(r.id);return}return setTimeout(()=>L.dismiss(r.id,t),a)});return()=>{o.forEach(e=>e&&clearTimeout(e))}},[r,a,t]);let l=(0,o.useCallback)(P(t),[t]),n=(0,o.useCallback)(()=>{l({type:5,time:Date.now()})},[l]),c=(0,o.useCallback)((e,t)=>{l({type:1,toast:{id:e,height:t}})},[l]),d=(0,o.useCallback)(()=>{a&&l({type:6,time:Date.now()})},[a,l]),u=(0,o.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:o=8,defaultPosition:i}=t||{},s=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),l=s.findIndex(t=>t.id===e.id),n=s.filter((e,t)=>t<l&&e.visible).length;return s.filter(e=>e.visible).slice(...a?[n+1]:[0,n]).reduce((e,t)=>e+(t.height||0)+o,0)},[r]);return(0,o.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)s(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,s]),{toasts:r,handlers:{updateHeight:c,startPause:n,endPause:d,calculateOffset:u}}},$=g`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,j=g`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,z=g`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,O=y("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${$} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${j} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${z} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,G=g`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,M=y("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${G} 1s linear infinite;
`,V=g`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,F=g`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,q=y("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${V} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${F} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,_=y("div")`
  position: absolute;
`,B=y("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,H=g`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Y=y("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${H} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,J=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?o.createElement(Y,null,t):t:"blank"===r?null:o.createElement(B,null,o.createElement(M,{...a}),"loading"!==r&&o.createElement(_,null,"error"===r?o.createElement(O,{...a}):o.createElement(q,{...a})))},K=y("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,W=y("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Z=o.memo(({toast:e,position:t,style:r,children:a})=>{let i=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[a,o]=b()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${g(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${g(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},s=o.createElement(J,{toast:e}),l=o.createElement(W,{...e.ariaProps},w(e.message,e));return o.createElement(K,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof a?a({icon:s,message:l}):o.createElement(o.Fragment,null,s,l))});a=o.createElement,c.p=void 0,m=a,f=void 0,h=void 0;var Q=({id:e,className:t,style:r,onHeightUpdate:a,children:i})=>{let s=o.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return o.createElement("div",{ref:s,className:t,style:r},i)},X=p`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ee=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:i,toasterId:s,containerStyle:l,containerClassName:n})=>{let{toasts:c,handlers:d}=C(r,s);return o.createElement("div",{"data-rht-toaster":s||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...l},className:n,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(r=>{let s,l,n=r.position||t,c=d.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}),u=(s=n.includes("top"),l=n.includes("center")?{justifyContent:"center"}:n.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:b()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${c*(s?1:-1)}px)`,...s?{top:0}:{bottom:0},...l});return o.createElement(Q,{id:r.id,key:r.id,onHeightUpdate:d.updateHeight,className:r.visible?X:"",style:u},"custom"===r.type?w(r.message,r):i?i(r):o.createElement(Z,{toast:r,position:n}))}))};e.s(["CheckmarkIcon",()=>q,"ErrorIcon",()=>O,"LoaderIcon",()=>M,"ToastBar",()=>Z,"ToastIcon",()=>J,"Toaster",()=>ee,"default",()=>L,"resolveValue",()=>w,"toast",()=>L,"useToaster",()=>C,"useToasterStore",()=>U],5766)},6524,e=>{"use strict";var t=e.i(5766);e.s(["log",0,{info:(e,t)=>{},success:(e,r)=>{t.default.success(e)},warning:(e,r)=>{(0,t.default)(e,{icon:"⚠️"})},error:(e,r)=>{let a=r?r instanceof Error?r.message:"string"==typeof r?r:r&&"object"==typeof r&&"message"in r?String(r.message):"Error desconocido":"",o=a?`${e}: ${a}`:e;t.default.error(o)},debug:(e,t)=>{}}])},18566,(e,t,r)=>{t.exports=e.r(76562)},57951,99535,e=>{"use strict";var t=e.i(43476),r=e.i(6524),a=e.i(9610),a=a,o=a,i=a,s=a,l=a,n=a,c=a,d=a,u=a,p=a;e.s(["updateProfile",()=>p.al],99535);var p=a,m=e.i(98925),f=e.i(14985);let h=()=>{if(!f.auth)throw Error("Firebase Auth no está disponible.");return f.auth},g=()=>{if(!f.db)throw Error("Firebase Firestore no está disponible.");return f.db},y=async(e,t,o)=>{try{let r=h(),i=g(),l=await (0,a.ab)(r,e,t),n=l.user;await (0,p.al)(n,{displayName:o.displayName||""});let c={uid:n.uid,email:n.email||"",displayName:o.displayName||"Usuario",photoURL:o.photoURL||"",role:o.role||"client",phone:o.phone||"",createdAt:(0,m.serverTimestamp)(),updatedAt:(0,m.serverTimestamp)(),emailVerified:n.emailVerified,isActive:!0};return await (0,m.setDoc)((0,m.doc)(i,"users",n.uid),c),await (0,s.ah)(n),l}catch(e){throw r.log.error("❌ Error en registro:",e),Error(D(e.code))}},w=async(e,t)=>{try{let a=h(),o=g(),i=(await (0,n.ac)(a,e,t)).user;try{if((await (0,m.getDoc)((0,m.doc)(o,"users",i.uid))).exists())await (0,m.updateDoc)((0,m.doc)(o,"users",i.uid),{lastLoginAt:(0,m.serverTimestamp)()});else{let e={uid:i.uid,email:i.email||"",displayName:i.displayName||"Usuario",photoURL:i.photoURL||"",role:"client",phone:i.phoneNumber||"",createdAt:(0,m.serverTimestamp)(),updatedAt:(0,m.serverTimestamp)(),emailVerified:i.emailVerified,isActive:!0};await (0,m.setDoc)((0,m.doc)(o,"users",i.uid),e)}}catch(e){r.log.warning("⚠️ Error en Firestore, pero usuario autenticado:",e)}return i}catch(e){throw r.log.error("❌ Error en login:",e),Error(D(e.code))}},v=async()=>{try{let e=h();await (0,u.D)(e)}catch(e){throw r.log.error("❌ Error en logout:",e),Error("Error al cerrar sesión")}},b=async e=>{try{let t=h();await (0,l.a6)(t,e)}catch(e){throw r.log.error("❌ Error en reset password:",e),Error(D(e.code))}},E=async e=>{try{let t=g(),r=await (0,m.getDoc)((0,m.doc)(t,"users",e));if(r.exists())return{uid:e,...r.data()};return null}catch(e){return r.log.warning("⚠️ Error obteniendo usuario de Firestore:",e.message),null}},x=async(e,t,a=2)=>{let o;for(let i=1;i<=a;i++)try{r.log.info(`🔄 Intento ${i}/${a} para actualizar rol...`);let o=g();if(await (0,m.updateDoc)((0,m.doc)(o,"users",e),{role:t,updatedAt:(0,m.serverTimestamp)()}),r.log.info(`✅ Rol actualizado a: ${t} (intento ${i})`),"provider"===t)try{let t=await (0,m.getDoc)((0,m.doc)(o,"users",e));if(t.exists()){let r=t.data(),a=(0,m.doc)(o,"providers",e);(await (0,m.getDoc)(a)).exists()||await (0,m.setDoc)(a,{displayName:r.displayName||"Proveedor",email:r.email,photoURL:r.photoURL||"",specialties:[],rating:0,totalRatings:0,isActive:!0,createdAt:(0,m.serverTimestamp)(),updatedAt:(0,m.serverTimestamp)()})}}catch(e){r.log.warning("⚠️ Error creando perfil de proveedor:",e)}return}catch(e){if(o=e,r.log.warning(`⚠️ Intento ${i} fallido:`,e),i<a){let e=1e3*i;r.log.info(`⏳ Esperando ${e}ms antes de reintentar...`),await new Promise(t=>setTimeout(t,e))}}throw r.log.error("❌ Todos los intentos de actualización fallaron:",o),Error("No se pudo actualizar el rol. Verifica tu conexión.")},A=async(e,t)=>{try{let a=g();await (0,m.updateDoc)((0,m.doc)(a,"users",e),{...t,updatedAt:(0,m.serverTimestamp)()}),r.log.info("✅ Datos de usuario actualizados")}catch(e){throw r.log.error("❌ Error actualizando usuario:",e),Error("Error al actualizar perfil")}},T=async()=>{try{let e=h(),t=new i.Y;t.setCustomParameters({prompt:"select_account"});let a=(await (0,c.d)(e,t)).user;try{let e=g();if((await (0,m.getDoc)((0,m.doc)(e,"users",a.uid))).exists())await (0,m.updateDoc)((0,m.doc)(e,"users",a.uid),{lastLoginAt:(0,m.serverTimestamp)()});else{let t={uid:a.uid,email:a.email||"",displayName:a.displayName||a.email?.split("@")[0]||"Usuario",photoURL:a.photoURL||"",role:"client",phone:a.phoneNumber||"",createdAt:(0,m.serverTimestamp)(),updatedAt:(0,m.serverTimestamp)(),emailVerified:a.emailVerified,isActive:!0};await (0,m.setDoc)((0,m.doc)(e,"users",a.uid),t),await (0,m.setDoc)((0,m.doc)(e,"providers",a.uid),{displayName:a.displayName||a.email?.split("@")[0]||"Usuario",email:a.email,photoURL:a.photoURL||"",specialties:[],rating:0,totalRatings:0,isActive:!0,createdAt:(0,m.serverTimestamp)(),updatedAt:(0,m.serverTimestamp)()})}}catch(e){r.log.warning("⚠️ Error guardando usuario en Firestore:",e)}return a}catch(e){if(r.log.error("❌ Error en login con Google:",e),"auth/popup-closed-by-user"===e.code)throw Error("Inicio de sesión cancelado");if("auth/popup-blocked"===e.code)throw Error("El popup fue bloqueado. Permite popups para este sitio.");if("auth/cancelled-popup-request"===e.code)throw Error("Se canceló la solicitud de inicio de sesión");throw Error(D(e.code))}},N=async()=>{try{let e=h(),t=new i.Y;t.setCustomParameters({prompt:"select_account"}),await (0,d.g)(e,t)}catch(e){throw r.log.error("❌ Error en redirect a Google:",e),Error(D(e.code))}},k=async()=>{try{let e=h(),t=await (0,o.k)(e);if(t){let e=t.user;try{let t=g();if(!(await (0,m.getDoc)((0,m.doc)(t,"users",e.uid))).exists()){let r={uid:e.uid,email:e.email||"",displayName:e.displayName||e.email?.split("@")[0]||"Usuario",photoURL:e.photoURL||"",role:"client",phone:e.phoneNumber||"",createdAt:(0,m.serverTimestamp)(),updatedAt:(0,m.serverTimestamp)(),emailVerified:e.emailVerified,isActive:!0};await (0,m.setDoc)((0,m.doc)(t,"users",e.uid),r),await (0,m.setDoc)((0,m.doc)(t,"providers",e.uid),{displayName:e.displayName||e.email?.split("@")[0]||"Usuario",email:e.email,photoURL:e.photoURL||"",specialties:[],rating:0,totalRatings:0,isActive:!0,createdAt:(0,m.serverTimestamp)(),updatedAt:(0,m.serverTimestamp)()})}}catch(e){r.log.warning("⚠️ Error guardando usuario en Firestore:",e)}return e}return null}catch(e){throw r.log.error("❌ Error en handleGoogleRedirect:",e),Error(D(e.code))}},D=e=>({"auth/email-already-in-use":"Este email ya está registrado.","auth/invalid-email":"El email ingresado no es válido.","auth/operation-not-allowed":"El inicio de sesión con email no está habilitado.","auth/weak-password":"La contraseña debe tener al menos 6 caracteres.","auth/user-disabled":"Esta cuenta ha sido deshabilitada.","auth/user-not-found":"No existe una cuenta con este email.","auth/wrong-password":"Contraseña incorrecta.","auth/too-many-requests":"Demasiados intentos fallidos. Intenta más tarde.","auth/network-request-failed":"Error de conexión. Verifica tu internet.","auth/popup-closed-by-user":"Inicio de sesión cancelado","auth/popup-blocked":"El popup fue bloqueado. Permite popups para este sitio.","auth/cancelled-popup-request":"Se canceló la solicitud de inicio de sesión"})[e]||"Ocurrió un error. Intenta nuevamente.";var P=a,R=e.i(18566),U=e.i(71645),I=e.i(5766);let L=(0,U.createContext)(void 0);function S({children:e}){let[a,o]=(0,U.useState)(null),[i,s]=(0,U.useState)(null),[l,n]=(0,U.useState)(!0),[c,d]=(0,U.useState)(!1),u=(0,R.useRouter)(),p=(0,U.useCallback)(async e=>{try{let t=await E(e.uid);if(t)o(t),localStorage.setItem("user-data",JSON.stringify(t)),t.role&&localStorage.setItem("user-role",t.role);else{let t=localStorage.getItem("user-data");if(t)try{let a=JSON.parse(t);if(a.uid===e.uid){o(a),r.log.info("📝 Usuario cargado de localStorage (fallback)");return}}catch(e){r.log.warning("⚠️ Error parseando usuario de localStorage")}let a={uid:e.uid,email:e.email||"",displayName:e.displayName||"Usuario",photoURL:e.photoURL||"",role:localStorage.getItem("user-role")||void 0,createdAt:new Date,emailVerified:e.emailVerified||!1,isActive:!0};o(a)}}catch(a){r.log.error("Error cargando datos de usuario:",a);let t=localStorage.getItem("user-role");o({uid:e.uid,email:e.email||"",displayName:e.displayName||"Usuario",photoURL:e.photoURL||"",role:t||void 0,createdAt:new Date,emailVerified:e.emailVerified||!1,isActive:!0})}},[]),m=(0,U.useCallback)(async e=>{try{await p(e),await new Promise(e=>setTimeout(e,100)),u.replace("/dashboard/requests")}catch(e){r.log.error("Error en redirección:",e),u.replace("/dashboard/requests")}},[p,u]);(0,U.useEffect)(()=>{if(!f.auth){r.log.warning("⚠️ Firebase Auth no está disponible"),n(!1);return}let e=!0;(async()=>{if("/auth/callback"===window.location.pathname)try{let e=await k();e&&(await m(e),I.default.success("¡Bienvenido a MiMaestro con Google!"))}catch(e){r.log.error("Error en redirect de Google:",e),I.default.error("Error al iniciar sesión con Google"),u.replace("/login")}})();let t=(0,P.z)(f.auth,async t=>{e&&(r.log.info("🔐 Auth state changed:",t?.uid||"No user"),s(t),t?await p(t):o(null),d(!0),n(!1))});return()=>{e=!1,t()}},[p,m,u]),(0,U.useEffect)(()=>{!l&&c&&i&&("/login"===window.location.pathname||"/register"===window.location.pathname||"/"===window.location.pathname)&&u.replace("/dashboard/requests")},[l,c,i,u]);let h=async(e,t)=>{try{n(!0);let r=await w(e,t);await m(r),I.default.success("¡Bienvenido a MiMaestro!")}catch(t){r.log.error("Error en login:",t);let e=t.message||"Error al iniciar sesión";throw"auth/invalid-credential"===t.code||"auth/user-not-found"===t.code||"auth/wrong-password"===t.code?e="Email o contraseña incorrectos. Por favor, verifica tus credenciales.":"auth/too-many-requests"===t.code&&(e="Demasiados intentos fallidos. Por favor, intenta más tarde."),I.default.error(e),Error(e)}finally{n(!1)}},g=async()=>{try{n(!0),r.log.info("🔄 Iniciando login con Google...");let e=await T();r.log.info("✅ Usuario autenticado con Google:",e.uid),await m(e),I.default.success("¡Bienvenido a MiMaestro con Google!")}catch(e){if(r.log.error("Error en login con Google:",e),e.message?.includes("bloqueado")||e.message?.includes("popup-blocked")){I.default.error("El popup fue bloqueado. Permite popups para este sitio o usa el método alternativo.");try{await N()}catch(e){throw I.default.error("Error al iniciar sesión con Google"),e}}else e.message?.includes("cancelado")?I.default.error("Inicio de sesión cancelado"):I.default.error(e.message||"Error al iniciar sesión con Google");throw e}finally{n(!1)}},D=async()=>{try{n(!0),await N()}catch(e){throw I.default.error(e.message||"Error al iniciar sesión con Google"),e}finally{n(!1)}},S=async()=>{try{n(!0);let e=await k();e&&(await m(e),I.default.success("¡Bienvenido a MiMaestro con Google!"))}catch(e){throw I.default.error(e.message||"Error al procesar autenticación"),e}finally{n(!1)}},C=async(e,t,r)=>{try{n(!0),await y(e,t,r),I.default.success("¡Registro exitoso! Revisa tu email para verificar tu cuenta."),u.push("/login")}catch(e){throw I.default.error(e.message),e}finally{n(!1)}},$=async()=>{try{await v(),o(null),s(null),I.default.success("Sesión cerrada correctamente"),u.push("/login")}catch(e){throw I.default.error(e.message),e}},j=async()=>{i&&await p(i)},z=async e=>{if(!i)throw Error("Usuario no autenticado");try{r.log.info("🔄 Actualizando usuario:",e),e.role?await x(i.uid,e.role):await A(i.uid,e),await j(),I.default.success("Perfil actualizado correctamente")}catch(e){throw r.log.error("❌ Error actualizando usuario:",e),I.default.error(e.message||"Error al actualizar el perfil"),e}},O=async e=>{try{await b(e),I.default.success("Se envió un email de recuperación")}catch(e){throw I.default.error(e.message),e}},G=a?.role==="provider",M=a?.role==="client";return(0,t.jsx)(L.Provider,{value:{user:a,firebaseUser:i,loading:l,login:h,loginWithGoogle:g,loginWithGoogleRedirect:D,handleGoogleRedirect:S,register:C,logout:$,resetPassword:O,updateUser:z,refreshUser:j,isProvider:G,isClient:M},children:e})}function C(){let e=(0,U.useContext)(L);if(void 0===e)throw Error("useAuth must be used within an AuthProvider");return e}e.s(["AuthProvider",()=>S,"useAuth",()=>C],57951)},75144,e=>{"use strict";var t=e.i(43476),r=e.i(71645);let a=(0,r.createContext)(void 0);function o({children:e}){let[o,i]=(0,r.useState)("light"),[s,l]=(0,r.useState)(!1);return((0,r.useEffect)(()=>{let e=localStorage.getItem("theme"),t=window.matchMedia("(prefers-color-scheme: dark)").matches;e?i(e):t&&i("dark"),l(!0)},[]),(0,r.useEffect)(()=>{if(s){let e=document.documentElement;e.classList.remove("light","dark"),e.classList.add(o),localStorage.setItem("theme",o)}},[o,s]),s)?(0,t.jsx)(a.Provider,{value:{theme:o,toggleTheme:()=>{i(e=>"light"===e?"dark":"light")},setTheme:i},children:e}):(0,t.jsx)(t.Fragment,{children:e})}function i(){let e=(0,r.useContext)(a);if(void 0===e)throw Error("useTheme must be used within a ThemeProvider");return e}e.s(["ThemeProvider",()=>o,"useTheme",()=>i])},27510,e=>{e.v(t=>Promise.all(["static/chunks/a5c99c710a927edd.js"].map(t=>e.l(t))).then(()=>t(48323)))},16764,e=>{e.v(e=>Promise.resolve().then(()=>e(14985)))}]);