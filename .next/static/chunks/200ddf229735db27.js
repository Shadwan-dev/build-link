(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,33525,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"warnOnce",{enumerable:!0,get:function(){return a}});let a=e=>{}},18566,(e,t,r)=>{t.exports=e.r(76562)},5766,e=>{"use strict";let t,r;var a,o=e.i(71645);let i={data:""},s=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,n=/\n+/g,c=(e,t)=>{let r="",a="",o="";for(let i in e){let s=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+s+";":a+="f"==i[1]?c(s,i):i+"{"+c(s,"k"==i[1]?"":t)+"}":"object"==typeof s?a+=c(s,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=s&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=c.p?c.p(i,s):i+":"+s+";")}return r+(t&&o?t+"{"+o+"}":o)+a},d={},u=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+u(e[r]);return t}return e};function p(e){let t,r,a=this||{},o=e.call?e(a.p):e;return((e,t,r,a,o)=>{var i;let p=u(e),m=d[p]||(d[p]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(p));if(!d[m]){let t=p!==e?e:(e=>{let t,r,a=[{}];for(;t=s.exec(e.replace(l,""));)t[4]?a.shift():t[3]?(r=t[3].replace(n," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(n," ").trim();return a[0]})(e);d[m]=c(o?{["@keyframes "+m]:t}:t,r?"":"."+m)}let h=r&&d.g;return r&&(d.g=d[m]),i=d[m],h?t.data=t.data.replace(h,i):-1===t.data.indexOf(i)&&(t.data=a?i+t.data:t.data+i),m})(o.unshift?o.raw?(t=[].slice.call(arguments,1),r=a.p,o.reduce((e,a,o)=>{let i=t[o];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"")):o.reduce((e,t)=>Object.assign(e,t&&t.call?t(a.p):t),{}):o,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(a.target),a.g,a.o,a.k)}p.bind({g:1});let m,h,f,g=p.bind({k:1});function y(e,t){let r=this||{};return function(){let a=arguments;function o(i,s){let l=Object.assign({},i),n=l.className||o.className;r.p=Object.assign({theme:h&&h()},l),r.o=/go\d/.test(n),l.className=p.apply(r,a)+(n?" "+n:""),t&&(l.ref=s);let c=e;return e[0]&&(c=l.as||e,delete l.as),f&&c[0]&&f(l),m(c,l)}return t?t(o):o}}var w=(e,t)=>"function"==typeof e?e(t):e,v=(t=0,()=>(++t).toString()),b=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},E="default",x=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return x(e,{type:+!!e.toasts.find(e=>e.id===a.id),toast:a});case 3:let{toastId:o}=t;return{...e,toasts:e.toasts.map(e=>e.id===o||void 0===o?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},A=[],k={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},T={},N=(e,t=E)=>{T[t]=x(T[t]||k,e),A.forEach(([e,r])=>{e===t&&r(T[t])})},R=e=>Object.keys(T).forEach(t=>N(e,t)),P=(e=E)=>t=>{N(t,e)},D={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},L=(e={},t=E)=>{let[r,a]=(0,o.useState)(T[t]||k),i=(0,o.useRef)(T[t]);(0,o.useEffect)(()=>(i.current!==T[t]&&a(T[t]),A.push([t,a]),()=>{let e=A.findIndex(([e])=>e===t);e>-1&&A.splice(e,1)}),[t]);let s=r.toasts.map(t=>{var r,a,o;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||D[t.type],style:{...e.style,...null==(o=e[t.type])?void 0:o.style,...t.style}}});return{...r,toasts:s}},U=e=>(t,r)=>{let a,o=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||v()}))(t,e,r);return P(o.toasterId||(a=o.id,Object.keys(T).find(e=>T[e].toasts.some(e=>e.id===a))))({type:2,toast:o}),o.id},I=(e,t)=>U("blank")(e,t);I.error=U("error"),I.success=U("success"),I.loading=U("loading"),I.custom=U("custom"),I.dismiss=(e,t)=>{let r={type:3,toastId:e};t?P(t)(r):R(r)},I.dismissAll=e=>I.dismiss(void 0,e),I.remove=(e,t)=>{let r={type:4,toastId:e};t?P(t)(r):R(r)},I.removeAll=e=>I.remove(void 0,e),I.promise=(e,t,r)=>{let a=I.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let o=t.success?w(t.success,e):void 0;return o?I.success(o,{id:a,...r,...null==r?void 0:r.success}):I.dismiss(a),e}).catch(e=>{let o=t.error?w(t.error,e):void 0;o?I.error(o,{id:a,...r,...null==r?void 0:r.error}):I.dismiss(a)}),e};var S=1e3,C=(e,t="default")=>{let{toasts:r,pausedAt:a}=L(e,t),i=(0,o.useRef)(new Map).current,s=(0,o.useCallback)((e,t=S)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),l({type:4,toastId:e})},t);i.set(e,r)},[]);(0,o.useEffect)(()=>{if(a)return;let e=Date.now(),o=r.map(r=>{if(r.duration===1/0)return;let a=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(a<0){r.visible&&I.dismiss(r.id);return}return setTimeout(()=>I.dismiss(r.id,t),a)});return()=>{o.forEach(e=>e&&clearTimeout(e))}},[r,a,t]);let l=(0,o.useCallback)(P(t),[t]),n=(0,o.useCallback)(()=>{l({type:5,time:Date.now()})},[l]),c=(0,o.useCallback)((e,t)=>{l({type:1,toast:{id:e,height:t}})},[l]),d=(0,o.useCallback)(()=>{a&&l({type:6,time:Date.now()})},[a,l]),u=(0,o.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:o=8,defaultPosition:i}=t||{},s=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),l=s.findIndex(t=>t.id===e.id),n=s.filter((e,t)=>t<l&&e.visible).length;return s.filter(e=>e.visible).slice(...a?[n+1]:[0,n]).reduce((e,t)=>e+(t.height||0)+o,0)},[r]);return(0,o.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)s(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,s]),{toasts:r,handlers:{updateHeight:c,startPause:n,endPause:d,calculateOffset:u}}},$=g`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,O=g`
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
}`,j=y("div")`
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
    animation: ${O} 0.15s ease-out forwards;
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
`,V=y("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${G} 1s linear infinite;
`,F=g`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,B=g`
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
}`,_=y("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${F} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${B} 0.2s ease-out forwards;
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
`,q=y("div")`
  position: absolute;
`,M=y("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,W=g`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,H=y("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${W} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,J=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?o.createElement(H,null,t):t:"blank"===r?null:o.createElement(M,null,o.createElement(V,{...a}),"loading"!==r&&o.createElement(q,null,"error"===r?o.createElement(j,{...a}):o.createElement(_,{...a})))},K=y("div")`
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
`,Y=y("div")`
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
`];return{animation:t?`${g(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${g(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},s=o.createElement(J,{toast:e}),l=o.createElement(Y,{...e.ariaProps},w(e.message,e));return o.createElement(K,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof a?a({icon:s,message:l}):o.createElement(o.Fragment,null,s,l))});a=o.createElement,c.p=void 0,m=a,h=void 0,f=void 0;var Q=({id:e,className:t,style:r,onHeightUpdate:a,children:i})=>{let s=o.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return o.createElement("div",{ref:s,className:t,style:r},i)},X=p`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ee=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:i,toasterId:s,containerStyle:l,containerClassName:n})=>{let{toasts:c,handlers:d}=C(r,s);return o.createElement("div",{"data-rht-toaster":s||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...l},className:n,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(r=>{let s,l,n=r.position||t,c=d.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}),u=(s=n.includes("top"),l=n.includes("center")?{justifyContent:"center"}:n.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:b()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${c*(s?1:-1)}px)`,...s?{top:0}:{bottom:0},...l});return o.createElement(Q,{id:r.id,key:r.id,onHeightUpdate:d.updateHeight,className:r.visible?X:"",style:u},"custom"===r.type?w(r.message,r):i?i(r):o.createElement(Z,{toast:r,position:n}))}))};e.s(["CheckmarkIcon",()=>_,"ErrorIcon",()=>j,"LoaderIcon",()=>V,"ToastBar",()=>Z,"ToastIcon",()=>J,"Toaster",()=>ee,"default",()=>I,"resolveValue",()=>w,"toast",()=>I,"useToaster",()=>C,"useToasterStore",()=>L],5766)},57951,e=>{"use strict";var t=e.i(43476);e.i(51718);var r=e.i(6973);e.i(36180);var a=e.i(98925),o=e.i(14985);let i=()=>{if(!o.auth)throw Error("Firebase Auth no está disponible.");return o.auth},s=()=>{if(!o.db)throw Error("Firebase Firestore no está disponible.");return o.db},l=async(e,t,o)=>{try{let l=i(),n=s(),c=await (0,r.createUserWithEmailAndPassword)(l,e,t),d=c.user;await (0,r.updateProfile)(d,{displayName:o.displayName||""});let u={uid:d.uid,email:d.email||"",displayName:o.displayName||"Usuario",photoURL:o.photoURL||"",role:o.role||"client",phone:o.phone||"",createdAt:(0,a.serverTimestamp)(),updatedAt:(0,a.serverTimestamp)(),emailVerified:d.emailVerified,isActive:!0};return await (0,a.setDoc)((0,a.doc)(n,"users",d.uid),u),await (0,r.sendEmailVerification)(d),c}catch(e){throw console.error("❌ Error en registro:",e),Error(y(e.code))}},n=async(e,t)=>{try{let o=i(),l=s(),n=(await (0,r.signInWithEmailAndPassword)(o,e,t)).user;try{if((await (0,a.getDoc)((0,a.doc)(l,"users",n.uid))).exists())await (0,a.updateDoc)((0,a.doc)(l,"users",n.uid),{lastLoginAt:(0,a.serverTimestamp)()});else{let e={uid:n.uid,email:n.email||"",displayName:n.displayName||"Usuario",photoURL:n.photoURL||"",role:"client",phone:n.phoneNumber||"",createdAt:(0,a.serverTimestamp)(),updatedAt:(0,a.serverTimestamp)(),emailVerified:n.emailVerified,isActive:!0};await (0,a.setDoc)((0,a.doc)(l,"users",n.uid),e)}}catch(e){console.warn("⚠️ Error en Firestore, pero usuario autenticado:",e)}return n}catch(e){throw console.error("❌ Error en login:",e),Error(y(e.code))}},c=async()=>{try{let e=i();await (0,r.signOut)(e)}catch(e){throw console.error("❌ Error en logout:",e),Error("Error al cerrar sesión")}},d=async e=>{try{let t=i();await (0,r.sendPasswordResetEmail)(t,e)}catch(e){throw console.error("❌ Error en reset password:",e),Error(y(e.code))}},u=async e=>{try{let t=s(),r=await (0,a.getDoc)((0,a.doc)(t,"users",e));if(r.exists())return{uid:e,...r.data()};return null}catch(e){return console.warn("⚠️ Error obteniendo usuario de Firestore:",e.message),null}},p=async(e,t,r=2)=>{let o;for(let i=1;i<=r;i++)try{console.log(`🔄 Intento ${i}/${r} para actualizar rol...`);let o=s();if(await (0,a.updateDoc)((0,a.doc)(o,"users",e),{role:t,updatedAt:(0,a.serverTimestamp)()}),console.log(`✅ Rol actualizado a: ${t} (intento ${i})`),"provider"===t)try{let t=await (0,a.getDoc)((0,a.doc)(o,"users",e));if(t.exists()){let r=t.data(),i=(0,a.doc)(o,"providers",e);(await (0,a.getDoc)(i)).exists()||await (0,a.setDoc)(i,{displayName:r.displayName||"Proveedor",email:r.email,photoURL:r.photoURL||"",specialties:[],rating:0,totalRatings:0,isActive:!0,createdAt:(0,a.serverTimestamp)(),updatedAt:(0,a.serverTimestamp)()})}}catch(e){console.warn("⚠️ Error creando perfil de proveedor:",e)}return}catch(e){if(o=e,console.warn(`⚠️ Intento ${i} fallido:`,e),i<r){let e=1e3*i;console.log(`⏳ Esperando ${e}ms antes de reintentar...`),await new Promise(t=>setTimeout(t,e))}}throw console.error("❌ Todos los intentos de actualización fallaron:",o),Error("No se pudo actualizar el rol. Verifica tu conexión.")},m=async(e,t)=>{try{let r=s();await (0,a.updateDoc)((0,a.doc)(r,"users",e),{...t,updatedAt:(0,a.serverTimestamp)()}),console.log("✅ Datos de usuario actualizados")}catch(e){throw console.error("❌ Error actualizando usuario:",e),Error("Error al actualizar perfil")}},h=async()=>{try{let e=i(),t=new r.GoogleAuthProvider;t.setCustomParameters({prompt:"select_account"});let o=(await (0,r.signInWithPopup)(e,t)).user;try{let e=s();if((await (0,a.getDoc)((0,a.doc)(e,"users",o.uid))).exists())await (0,a.updateDoc)((0,a.doc)(e,"users",o.uid),{lastLoginAt:(0,a.serverTimestamp)()});else{let t={uid:o.uid,email:o.email||"",displayName:o.displayName||o.email?.split("@")[0]||"Usuario",photoURL:o.photoURL||"",role:"client",phone:o.phoneNumber||"",createdAt:(0,a.serverTimestamp)(),updatedAt:(0,a.serverTimestamp)(),emailVerified:o.emailVerified,isActive:!0};await (0,a.setDoc)((0,a.doc)(e,"users",o.uid),t),await (0,a.setDoc)((0,a.doc)(e,"providers",o.uid),{displayName:o.displayName||o.email?.split("@")[0]||"Usuario",email:o.email,photoURL:o.photoURL||"",specialties:[],rating:0,totalRatings:0,isActive:!0,createdAt:(0,a.serverTimestamp)(),updatedAt:(0,a.serverTimestamp)()})}}catch(e){console.warn("⚠️ Error guardando usuario en Firestore:",e)}return o}catch(e){if(console.error("❌ Error en login con Google:",e),"auth/popup-closed-by-user"===e.code)throw Error("Inicio de sesión cancelado");if("auth/popup-blocked"===e.code)throw Error("El popup fue bloqueado. Permite popups para este sitio.");if("auth/cancelled-popup-request"===e.code)throw Error("Se canceló la solicitud de inicio de sesión");throw Error(y(e.code))}},f=async()=>{try{let e=i(),t=new r.GoogleAuthProvider;t.setCustomParameters({prompt:"select_account"}),await (0,r.signInWithRedirect)(e,t)}catch(e){throw console.error("❌ Error en redirect a Google:",e),Error(y(e.code))}},g=async()=>{try{let e=i(),t=await (0,r.getRedirectResult)(e);if(t){let e=t.user;try{let t=s();if(!(await (0,a.getDoc)((0,a.doc)(t,"users",e.uid))).exists()){let r={uid:e.uid,email:e.email||"",displayName:e.displayName||e.email?.split("@")[0]||"Usuario",photoURL:e.photoURL||"",role:"client",phone:e.phoneNumber||"",createdAt:(0,a.serverTimestamp)(),updatedAt:(0,a.serverTimestamp)(),emailVerified:e.emailVerified,isActive:!0};await (0,a.setDoc)((0,a.doc)(t,"users",e.uid),r),await (0,a.setDoc)((0,a.doc)(t,"providers",e.uid),{displayName:e.displayName||e.email?.split("@")[0]||"Usuario",email:e.email,photoURL:e.photoURL||"",specialties:[],rating:0,totalRatings:0,isActive:!0,createdAt:(0,a.serverTimestamp)(),updatedAt:(0,a.serverTimestamp)()})}}catch(e){console.warn("⚠️ Error guardando usuario en Firestore:",e)}return e}return null}catch(e){throw console.error("❌ Error en handleGoogleRedirect:",e),Error(y(e.code))}},y=e=>({"auth/email-already-in-use":"Este email ya está registrado.","auth/invalid-email":"El email ingresado no es válido.","auth/operation-not-allowed":"El inicio de sesión con email no está habilitado.","auth/weak-password":"La contraseña debe tener al menos 6 caracteres.","auth/user-disabled":"Esta cuenta ha sido deshabilitada.","auth/user-not-found":"No existe una cuenta con este email.","auth/wrong-password":"Contraseña incorrecta.","auth/too-many-requests":"Demasiados intentos fallidos. Intenta más tarde.","auth/network-request-failed":"Error de conexión. Verifica tu internet.","auth/popup-closed-by-user":"Inicio de sesión cancelado","auth/popup-blocked":"El popup fue bloqueado. Permite popups para este sitio.","auth/cancelled-popup-request":"Se canceló la solicitud de inicio de sesión"})[e]||"Ocurrió un error. Intenta nuevamente.";var w=e.i(18566),v=e.i(71645),b=e.i(5766);let E=(0,v.createContext)(void 0);function x({children:e}){let[a,i]=(0,v.useState)(null),[s,y]=(0,v.useState)(null),[x,A]=(0,v.useState)(!0),[k,T]=(0,v.useState)(!1),N=(0,w.useRouter)(),R=(0,v.useCallback)(async e=>{try{let t=await u(e.uid);if(t)i(t),localStorage.setItem("user-data",JSON.stringify(t)),t.role&&localStorage.setItem("user-role",t.role);else{let t=localStorage.getItem("user-data");if(t)try{let r=JSON.parse(t);if(r.uid===e.uid){i(r),console.log("📝 Usuario cargado de localStorage (fallback)");return}}catch(e){console.warn("⚠️ Error parseando usuario de localStorage")}let r={uid:e.uid,email:e.email||"",displayName:e.displayName||"Usuario",photoURL:e.photoURL||"",role:localStorage.getItem("user-role")||void 0,createdAt:new Date,emailVerified:e.emailVerified||!1,isActive:!0};i(r)}}catch(r){console.error("Error cargando datos de usuario:",r);let t=localStorage.getItem("user-role");i({uid:e.uid,email:e.email||"",displayName:e.displayName||"Usuario",photoURL:e.photoURL||"",role:t||void 0,createdAt:new Date,emailVerified:e.emailVerified||!1,isActive:!0})}},[]),P=(0,v.useCallback)(async e=>{try{await R(e),await new Promise(e=>setTimeout(e,100)),N.replace("/dashboard")}catch(e){console.error("Error en redirección:",e),N.replace("/dashboard")}},[R,N]);(0,v.useEffect)(()=>{if(!o.auth){console.warn("⚠️ Firebase Auth no está disponible"),A(!1);return}let e=!0;(async()=>{if("/auth/callback"===window.location.pathname)try{let e=await g();e&&(await P(e),b.default.success("¡Bienvenido a BuildLink con Google!"))}catch(e){console.error("Error en redirect de Google:",e),b.default.error("Error al iniciar sesión con Google"),N.replace("/login")}})();let t=(0,r.onAuthStateChanged)(o.auth,async t=>{e&&(console.log("🔐 Auth state changed:",t?.uid||"No user"),y(t),t?await R(t):i(null),T(!0),A(!1))});return()=>{e=!1,t()}},[R,P,N]),(0,v.useEffect)(()=>{!x&&k&&s&&("/login"===window.location.pathname||"/register"===window.location.pathname||"/"===window.location.pathname)&&(console.log("🔄 Redirigiendo a dashboard"),N.replace("/dashboard"))},[x,k,s,N]);let D=async(e,t)=>{try{A(!0);let r=await n(e,t);await P(r),b.default.success("¡Bienvenido a BuildLink!")}catch(t){console.error("Error en login:",t);let e=t.message||"Error al iniciar sesión";throw"auth/invalid-credential"===t.code||"auth/user-not-found"===t.code||"auth/wrong-password"===t.code?e="Email o contraseña incorrectos. Por favor, verifica tus credenciales.":"auth/too-many-requests"===t.code&&(e="Demasiados intentos fallidos. Por favor, intenta más tarde."),b.default.error(e),Error(e)}finally{A(!1)}},L=async()=>{try{A(!0),console.log("🔄 Iniciando login con Google...");let e=await h();console.log("✅ Usuario autenticado con Google:",e.uid),await P(e),b.default.success("¡Bienvenido a BuildLink con Google!")}catch(e){if(console.error("Error en login con Google:",e),e.message?.includes("bloqueado")||e.message?.includes("popup-blocked")){b.default.error("El popup fue bloqueado. Permite popups para este sitio o usa el método alternativo.");try{await f()}catch(e){throw b.default.error("Error al iniciar sesión con Google"),e}}else e.message?.includes("cancelado")?b.default.error("Inicio de sesión cancelado"):b.default.error(e.message||"Error al iniciar sesión con Google");throw e}finally{A(!1)}},U=async()=>{try{A(!0),await f()}catch(e){throw b.default.error(e.message||"Error al iniciar sesión con Google"),e}finally{A(!1)}},I=async()=>{try{A(!0);let e=await g();e&&(await P(e),b.default.success("¡Bienvenido a BuildLink con Google!"))}catch(e){throw b.default.error(e.message||"Error al procesar autenticación"),e}finally{A(!1)}},S=async(e,t,r)=>{try{A(!0),await l(e,t,r),b.default.success("¡Registro exitoso! Revisa tu email para verificar tu cuenta."),N.push("/login")}catch(e){throw b.default.error(e.message),e}finally{A(!1)}},C=async()=>{try{await c(),i(null),y(null),b.default.success("Sesión cerrada correctamente"),N.push("/login")}catch(e){throw b.default.error(e.message),e}},$=async()=>{s&&await R(s)},O=async e=>{if(!s)throw Error("Usuario no autenticado");try{console.log("🔄 Actualizando usuario:",e),e.role?await p(s.uid,e.role):await m(s.uid,e),await $(),b.default.success("Perfil actualizado correctamente")}catch(e){throw console.error("❌ Error actualizando usuario:",e),b.default.error(e.message||"Error al actualizar el perfil"),e}},z=async e=>{try{await d(e),b.default.success("Se envió un email de recuperación")}catch(e){throw b.default.error(e.message),e}},j=a?.role==="provider",G=a?.role==="client";return(0,t.jsx)(E.Provider,{value:{user:a,firebaseUser:s,loading:x,login:D,loginWithGoogle:L,loginWithGoogleRedirect:U,handleGoogleRedirect:I,register:S,logout:C,resetPassword:z,updateUser:O,refreshUser:$,isProvider:j,isClient:G},children:e})}function A(){let e=(0,v.useContext)(E);if(void 0===e)throw Error("useAuth must be used within an AuthProvider");return e}e.s(["AuthProvider",()=>x,"useAuth",()=>A],57951)},75144,e=>{"use strict";var t=e.i(43476),r=e.i(71645);let a=(0,r.createContext)(void 0);function o({children:e}){let[o,i]=(0,r.useState)("light"),[s,l]=(0,r.useState)(!1);return((0,r.useEffect)(()=>{let e=localStorage.getItem("theme"),t=window.matchMedia("(prefers-color-scheme: dark)").matches;e?i(e):t&&i("dark"),l(!0)},[]),(0,r.useEffect)(()=>{if(s){let e=document.documentElement;e.classList.remove("light","dark"),e.classList.add(o),localStorage.setItem("theme",o)}},[o,s]),s)?(0,t.jsx)(a.Provider,{value:{theme:o,toggleTheme:()=>{i(e=>"light"===e?"dark":"light")},setTheme:i},children:e}):(0,t.jsx)(t.Fragment,{children:e})}function i(){let e=(0,r.useContext)(a);if(void 0===e)throw Error("useTheme must be used within a ThemeProvider");return e}e.s(["ThemeProvider",()=>o,"useTheme",()=>i])}]);