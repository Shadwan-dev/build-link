(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,33525,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"warnOnce",{enumerable:!0,get:function(){return r}});let r=e=>{}},5766,e=>{"use strict";let t,a;var r,i=e.i(71645);let o={data:""},s=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,n=/\n+/g,c=(e,t)=>{let a="",r="",i="";for(let o in e){let s=e[o];"@"==o[0]?"i"==o[1]?a=o+" "+s+";":r+="f"==o[1]?c(s,o):o+"{"+c(s,"k"==o[1]?"":t)+"}":"object"==typeof s?r+=c(s,t?t.replace(/([^,])+/g,e=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):o):null!=s&&(o="-"==o[1]?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=c.p?c.p(o,s):o+":"+s+";")}return a+(t&&i?t+"{"+i+"}":i)+r},d={},u=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+u(e[a]);return t}return e};function p(e){let t,a,r=this||{},i=e.call?e(r.p):e;return((e,t,a,r,i)=>{var o;let p=u(e),m=d[p]||(d[p]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(p));if(!d[m]){let t=p!==e?e:(e=>{let t,a,r=[{}];for(;t=s.exec(e.replace(l,""));)t[4]?r.shift():t[3]?(a=t[3].replace(n," ").trim(),r.unshift(r[0][a]=r[0][a]||{})):r[0][t[1]]=t[2].replace(n," ").trim();return r[0]})(e);d[m]=c(i?{["@keyframes "+m]:t}:t,a?"":"."+m)}let f=a&&d.g;return a&&(d.g=d[m]),o=d[m],f?t.data=t.data.replace(f,o):-1===t.data.indexOf(o)&&(t.data=r?o+t.data:t.data+o),m})(i.unshift?i.raw?(t=[].slice.call(arguments,1),a=r.p,i.reduce((e,r,i)=>{let o=t[i];if(o&&o.call){let e=o(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;o=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+r+(null==o?"":o)},"")):i.reduce((e,t)=>Object.assign(e,t&&t.call?t(r.p):t),{}):i,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||o})(r.target),r.g,r.o,r.k)}p.bind({g:1});let m,f,h,y=p.bind({k:1});function g(e,t){let a=this||{};return function(){let r=arguments;function i(o,s){let l=Object.assign({},o),n=l.className||i.className;a.p=Object.assign({theme:f&&f()},l),a.o=/go\d/.test(n),l.className=p.apply(a,r)+(n?" "+n:""),t&&(l.ref=s);let c=e;return e[0]&&(c=l.as||e,delete l.as),h&&c[0]&&h(l),m(c,l)}return t?t(i):i}}var v=(e,t)=>"function"==typeof e?e(t):e,w=(t=0,()=>(++t).toString()),b=()=>{if(void 0===a&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");a=!e||e.matches}return a},x="default",E=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return E(e,{type:+!!e.toasts.find(e=>e.id===r.id),toast:r});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(e=>e.id===i||void 0===i?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+o}))}}},A=[],k={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},T={},N=(e,t=x)=>{T[t]=E(T[t]||k,e),A.forEach(([e,a])=>{e===t&&a(T[t])})},D=e=>Object.keys(T).forEach(t=>N(e,t)),L=(e=x)=>t=>{N(t,e)},P={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},R=(e={},t=x)=>{let[a,r]=(0,i.useState)(T[t]||k),o=(0,i.useRef)(T[t]);(0,i.useEffect)(()=>(o.current!==T[t]&&r(T[t]),A.push([t,r]),()=>{let e=A.findIndex(([e])=>e===t);e>-1&&A.splice(e,1)}),[t]);let s=a.toasts.map(t=>{var a,r,i;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||P[t.type],style:{...e.style,...null==(i=e[t.type])?void 0:i.style,...t.style}}});return{...a,toasts:s}},U=e=>(t,a)=>{let r,i=((e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||w()}))(t,e,a);return L(i.toasterId||(r=i.id,Object.keys(T).find(e=>T[e].toasts.some(e=>e.id===r))))({type:2,toast:i}),i.id},C=(e,t)=>U("blank")(e,t);C.error=U("error"),C.success=U("success"),C.loading=U("loading"),C.custom=U("custom"),C.dismiss=(e,t)=>{let a={type:3,toastId:e};t?L(t)(a):D(a)},C.dismissAll=e=>C.dismiss(void 0,e),C.remove=(e,t)=>{let a={type:4,toastId:e};t?L(t)(a):D(a)},C.removeAll=e=>C.remove(void 0,e),C.promise=(e,t,a)=>{let r=C.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let i=t.success?v(t.success,e):void 0;return i?C.success(i,{id:r,...a,...null==a?void 0:a.success}):C.dismiss(r),e}).catch(e=>{let i=t.error?v(t.error,e):void 0;i?C.error(i,{id:r,...a,...null==a?void 0:a.error}):C.dismiss(r)}),e};var I=1e3,S=(e,t="default")=>{let{toasts:a,pausedAt:r}=R(e,t),o=(0,i.useRef)(new Map).current,s=(0,i.useCallback)((e,t=I)=>{if(o.has(e))return;let a=setTimeout(()=>{o.delete(e),l({type:4,toastId:e})},t);o.set(e,a)},[]);(0,i.useEffect)(()=>{if(r)return;let e=Date.now(),i=a.map(a=>{if(a.duration===1/0)return;let r=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(r<0){a.visible&&C.dismiss(a.id);return}return setTimeout(()=>C.dismiss(a.id,t),r)});return()=>{i.forEach(e=>e&&clearTimeout(e))}},[a,r,t]);let l=(0,i.useCallback)(L(t),[t]),n=(0,i.useCallback)(()=>{l({type:5,time:Date.now()})},[l]),c=(0,i.useCallback)((e,t)=>{l({type:1,toast:{id:e,height:t}})},[l]),d=(0,i.useCallback)(()=>{r&&l({type:6,time:Date.now()})},[r,l]),u=(0,i.useCallback)((e,t)=>{let{reverseOrder:r=!1,gutter:i=8,defaultPosition:o}=t||{},s=a.filter(t=>(t.position||o)===(e.position||o)&&t.height),l=s.findIndex(t=>t.id===e.id),n=s.filter((e,t)=>t<l&&e.visible).length;return s.filter(e=>e.visible).slice(...r?[n+1]:[0,n]).reduce((e,t)=>e+(t.height||0)+i,0)},[a]);return(0,i.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)s(e.id,e.removeDelay);else{let t=o.get(e.id);t&&(clearTimeout(t),o.delete(e.id))}})},[a,s]),{toasts:a,handlers:{updateHeight:c,startPause:n,endPause:d,calculateOffset:u}}},O=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,j=y`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,$=y`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,z=g("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${O} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
    animation: ${$} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,V=y`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,B=g("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${V} 1s linear infinite;
`,_=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,q=y`
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
}`,G=g("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${_} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${q} 0.2s ease-out forwards;
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
`,F=g("div")`
  position: absolute;
`,M=g("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,H=y`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Y=g("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${H} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,J=({toast:e})=>{let{icon:t,type:a,iconTheme:r}=e;return void 0!==t?"string"==typeof t?i.createElement(Y,null,t):t:"blank"===a?null:i.createElement(M,null,i.createElement(B,{...r}),"loading"!==a&&i.createElement(F,null,"error"===a?i.createElement(z,{...r}):i.createElement(G,{...r})))},K=g("div")`
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
`,W=g("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Z=i.memo(({toast:e,position:t,style:a,children:r})=>{let o=e.height?((e,t)=>{let a=e.includes("top")?1:-1,[r,i]=b()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*a}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*a}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${y(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${y(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},s=i.createElement(J,{toast:e}),l=i.createElement(W,{...e.ariaProps},v(e.message,e));return i.createElement(K,{className:e.className,style:{...o,...a,...e.style}},"function"==typeof r?r({icon:s,message:l}):i.createElement(i.Fragment,null,s,l))});r=i.createElement,c.p=void 0,m=r,f=void 0,h=void 0;var Q=({id:e,className:t,style:a,onHeightUpdate:r,children:o})=>{let s=i.useCallback(t=>{if(t){let a=()=>{r(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return i.createElement("div",{ref:s,className:t,style:a},o)},X=p`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ee=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:r,children:o,toasterId:s,containerStyle:l,containerClassName:n})=>{let{toasts:c,handlers:d}=S(a,s);return i.createElement("div",{"data-rht-toaster":s||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...l},className:n,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(a=>{let s,l,n=a.position||t,c=d.calculateOffset(a,{reverseOrder:e,gutter:r,defaultPosition:t}),u=(s=n.includes("top"),l=n.includes("center")?{justifyContent:"center"}:n.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:b()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${c*(s?1:-1)}px)`,...s?{top:0}:{bottom:0},...l});return i.createElement(Q,{id:a.id,key:a.id,onHeightUpdate:d.updateHeight,className:a.visible?X:"",style:u},"custom"===a.type?v(a.message,a):o?o(a):i.createElement(Z,{toast:a,position:n}))}))};e.s(["CheckmarkIcon",()=>G,"ErrorIcon",()=>z,"LoaderIcon",()=>B,"ToastBar",()=>Z,"ToastIcon",()=>J,"Toaster",()=>ee,"default",()=>C,"resolveValue",()=>v,"toast",()=>C,"useToaster",()=>S,"useToasterStore",()=>R],5766)},18566,(e,t,a)=>{t.exports=e.r(76562)},57951,99535,e=>{"use strict";var t=e.i(43476),a=e.i(9610),a=a,r=a,i=a,o=a,s=a,l=a,n=a,c=a,d=a,u=a;e.s(["updateProfile",()=>u.al],99535);var u=a,p=e.i(98925),m=e.i(14985);let f=()=>{if(!m.auth)throw Error("Firebase Auth no está disponible.");return m.auth},h=()=>{if(!m.db)throw Error("Firebase Firestore no está disponible.");return m.db},y=async(e,t,r)=>{try{let i=f(),s=h(),l=await (0,a.ab)(i,e,t),n=l.user;await (0,u.al)(n,{displayName:r.displayName||""});let c={uid:n.uid,email:n.email||"",displayName:r.displayName||"Usuario",photoURL:r.photoURL||"",role:r.role||"client",phone:r.phone||"",createdAt:(0,p.serverTimestamp)(),updatedAt:(0,p.serverTimestamp)(),emailVerified:n.emailVerified,isActive:!0};return await (0,p.setDoc)((0,p.doc)(s,"users",n.uid),c),await (0,o.ah)(n),l}catch(e){throw Error(N(e.code))}},g=async(e,t)=>{try{let a=f(),r=h(),i=(await (0,l.ac)(a,e,t)).user;try{if((await (0,p.getDoc)((0,p.doc)(r,"users",i.uid))).exists())await (0,p.updateDoc)((0,p.doc)(r,"users",i.uid),{lastLoginAt:(0,p.serverTimestamp)()});else{let e={uid:i.uid,email:i.email||"",displayName:i.displayName||"Usuario",photoURL:i.photoURL||"",role:"client",phone:i.phoneNumber||"",createdAt:(0,p.serverTimestamp)(),updatedAt:(0,p.serverTimestamp)(),emailVerified:i.emailVerified,isActive:!0};await (0,p.setDoc)((0,p.doc)(r,"users",i.uid),e)}}catch(e){}return i}catch(e){throw Error(N(e.code))}},v=async()=>{try{let e=f();await (0,d.D)(e)}catch(e){throw Error("Error al cerrar sesión")}},w=async e=>{try{let t=f();await (0,s.a6)(t,e)}catch(e){throw Error(N(e.code))}},b=async e=>{try{let t=h(),a=await (0,p.getDoc)((0,p.doc)(t,"users",e));if(a.exists())return{uid:e,...a.data()};return null}catch(e){return null}},x=async(e,t,a=2)=>{for(let r=1;r<=a;r++)try{let a=h();if(await (0,p.updateDoc)((0,p.doc)(a,"users",e),{role:t,updatedAt:(0,p.serverTimestamp)()}),"provider"===t)try{let t=await (0,p.getDoc)((0,p.doc)(a,"users",e));if(t.exists()){let r=t.data(),i=(0,p.doc)(a,"providers",e);(await (0,p.getDoc)(i)).exists()||await (0,p.setDoc)(i,{displayName:r.displayName||"Proveedor",email:r.email,photoURL:r.photoURL||"",specialties:[],rating:0,totalRatings:0,isActive:!0,createdAt:(0,p.serverTimestamp)(),updatedAt:(0,p.serverTimestamp)()})}}catch(e){}return}catch(e){if(r<a){let e=1e3*r;await new Promise(t=>setTimeout(t,e))}}throw Error("No se pudo actualizar el rol. Verifica tu conexión.")},E=async(e,t)=>{try{let a=h();await (0,p.updateDoc)((0,p.doc)(a,"users",e),{...t,updatedAt:(0,p.serverTimestamp)()})}catch(e){throw Error("Error al actualizar perfil")}},A=async()=>{try{let e=f(),t=new i.Y;t.setCustomParameters({prompt:"select_account"});let a=(await (0,n.d)(e,t)).user;try{let e=h();if((await (0,p.getDoc)((0,p.doc)(e,"users",a.uid))).exists())await (0,p.updateDoc)((0,p.doc)(e,"users",a.uid),{lastLoginAt:(0,p.serverTimestamp)()});else{let t={uid:a.uid,email:a.email||"",displayName:a.displayName||a.email?.split("@")[0]||"Usuario",photoURL:a.photoURL||"",role:"client",phone:a.phoneNumber||"",createdAt:(0,p.serverTimestamp)(),updatedAt:(0,p.serverTimestamp)(),emailVerified:a.emailVerified,isActive:!0};await (0,p.setDoc)((0,p.doc)(e,"users",a.uid),t),await (0,p.setDoc)((0,p.doc)(e,"providers",a.uid),{displayName:a.displayName||a.email?.split("@")[0]||"Usuario",email:a.email,photoURL:a.photoURL||"",specialties:[],rating:0,totalRatings:0,isActive:!0,createdAt:(0,p.serverTimestamp)(),updatedAt:(0,p.serverTimestamp)()})}}catch(e){}return a}catch(e){if("auth/popup-closed-by-user"===e.code)throw Error("Inicio de sesión cancelado");if("auth/popup-blocked"===e.code)throw Error("El popup fue bloqueado. Permite popups para este sitio.");if("auth/cancelled-popup-request"===e.code)throw Error("Se canceló la solicitud de inicio de sesión");throw Error(N(e.code))}},k=async()=>{try{let e=f(),t=new i.Y;t.setCustomParameters({prompt:"select_account"}),await (0,c.g)(e,t)}catch(e){throw Error(N(e.code))}},T=async()=>{try{let e=f(),t=await (0,r.k)(e);if(t){let e=t.user;try{let t=h();if(!(await (0,p.getDoc)((0,p.doc)(t,"users",e.uid))).exists()){let a={uid:e.uid,email:e.email||"",displayName:e.displayName||e.email?.split("@")[0]||"Usuario",photoURL:e.photoURL||"",role:"client",phone:e.phoneNumber||"",createdAt:(0,p.serverTimestamp)(),updatedAt:(0,p.serverTimestamp)(),emailVerified:e.emailVerified,isActive:!0};await (0,p.setDoc)((0,p.doc)(t,"users",e.uid),a),await (0,p.setDoc)((0,p.doc)(t,"providers",e.uid),{displayName:e.displayName||e.email?.split("@")[0]||"Usuario",email:e.email,photoURL:e.photoURL||"",specialties:[],rating:0,totalRatings:0,isActive:!0,createdAt:(0,p.serverTimestamp)(),updatedAt:(0,p.serverTimestamp)()})}}catch(e){}return e}return null}catch(e){throw Error(N(e.code))}},N=e=>({"auth/email-already-in-use":"Este email ya está registrado.","auth/invalid-email":"El email ingresado no es válido.","auth/operation-not-allowed":"El inicio de sesión con email no está habilitado.","auth/weak-password":"La contraseña debe tener al menos 6 caracteres.","auth/user-disabled":"Esta cuenta ha sido deshabilitada.","auth/user-not-found":"No existe una cuenta con este email.","auth/wrong-password":"Contraseña incorrecta.","auth/too-many-requests":"Demasiados intentos fallidos. Intenta más tarde.","auth/network-request-failed":"Error de conexión. Verifica tu internet.","auth/popup-closed-by-user":"Inicio de sesión cancelado","auth/popup-blocked":"El popup fue bloqueado. Permite popups para este sitio.","auth/cancelled-popup-request":"Se canceló la solicitud de inicio de sesión"})[e]||"Ocurrió un error. Intenta nuevamente.";var D=a,L=e.i(18566),P=e.i(71645),R=e.i(5766);let U=(0,P.createContext)(void 0);function C({children:e}){let[a,r]=(0,P.useState)(null),[i,o]=(0,P.useState)(null),[s,l]=(0,P.useState)(!0),[n,c]=(0,P.useState)(!1),d=(0,L.useRouter)(),u=(0,P.useCallback)(async e=>{try{let t=await b(e.uid);if(t)r(t),localStorage.setItem("user-data",JSON.stringify(t)),t.role&&localStorage.setItem("user-role",t.role);else{let t=localStorage.getItem("user-data");if(t)try{let a=JSON.parse(t);if(a.uid===e.uid)return void r(a)}catch(e){}let a={uid:e.uid,email:e.email||"",displayName:e.displayName||"Usuario",photoURL:e.photoURL||"",role:localStorage.getItem("user-role")||void 0,createdAt:new Date,emailVerified:e.emailVerified||!1,isActive:!0};r(a)}}catch(a){let t=localStorage.getItem("user-role");r({uid:e.uid,email:e.email||"",displayName:e.displayName||"Usuario",photoURL:e.photoURL||"",role:t||void 0,createdAt:new Date,emailVerified:e.emailVerified||!1,isActive:!0})}},[]),p=(0,P.useCallback)(async e=>{try{await u(e),await new Promise(e=>setTimeout(e,100)),d.replace("/dashboard")}catch(e){d.replace("/dashboard")}},[u,d]);(0,P.useEffect)(()=>{if(!m.auth)return void l(!1);let e=!0;(async()=>{if("/auth/callback"===window.location.pathname)try{let e=await T();e&&(await p(e),R.default.success("¡Bienvenido a BuildLink con Google!"))}catch(e){R.default.error("Error al iniciar sesión con Google"),d.replace("/login")}})();let t=(0,D.z)(m.auth,async t=>{e&&(o(t),t?await u(t):r(null),c(!0),l(!1))});return()=>{e=!1,t()}},[u,p,d]),(0,P.useEffect)(()=>{!s&&n&&i&&("/login"===window.location.pathname||"/register"===window.location.pathname||"/"===window.location.pathname)&&d.replace("/dashboard")},[s,n,i,d]);let f=async(e,t)=>{try{l(!0);let a=await g(e,t);await p(a),R.default.success("¡Bienvenido a BuildLink!")}catch(t){let e=t.message||"Error al iniciar sesión";throw"auth/invalid-credential"===t.code||"auth/user-not-found"===t.code||"auth/wrong-password"===t.code?e="Email o contraseña incorrectos. Por favor, verifica tus credenciales.":"auth/too-many-requests"===t.code&&(e="Demasiados intentos fallidos. Por favor, intenta más tarde."),R.default.error(e),Error(e)}finally{l(!1)}},h=async()=>{try{l(!0);let e=await A();await p(e),R.default.success("¡Bienvenido a BuildLink con Google!")}catch(e){if(e.message?.includes("bloqueado")||e.message?.includes("popup-blocked")){R.default.error("El popup fue bloqueado. Permite popups para este sitio o usa el método alternativo.");try{await k()}catch(e){throw R.default.error("Error al iniciar sesión con Google"),e}}else e.message?.includes("cancelado")?R.default.error("Inicio de sesión cancelado"):R.default.error(e.message||"Error al iniciar sesión con Google");throw e}finally{l(!1)}},N=async()=>{try{l(!0),await k()}catch(e){throw R.default.error(e.message||"Error al iniciar sesión con Google"),e}finally{l(!1)}},C=async()=>{try{l(!0);let e=await T();e&&(await p(e),R.default.success("¡Bienvenido a BuildLink con Google!"))}catch(e){throw R.default.error(e.message||"Error al procesar autenticación"),e}finally{l(!1)}},I=async(e,t,a)=>{try{l(!0),await y(e,t,a),R.default.success("¡Registro exitoso! Revisa tu email para verificar tu cuenta."),d.push("/login")}catch(e){throw R.default.error(e.message),e}finally{l(!1)}},S=async()=>{try{await v(),r(null),o(null),R.default.success("Sesión cerrada correctamente"),d.push("/login")}catch(e){throw R.default.error(e.message),e}},O=async()=>{i&&await u(i)},j=async e=>{if(!i)throw Error("Usuario no autenticado");try{e.role?await x(i.uid,e.role):await E(i.uid,e),await O(),R.default.success("Perfil actualizado correctamente")}catch(e){throw R.default.error(e.message||"Error al actualizar el perfil"),e}},$=async e=>{try{await w(e),R.default.success("Se envió un email de recuperación")}catch(e){throw R.default.error(e.message),e}},z=a?.role==="provider",V=a?.role==="client";return(0,t.jsx)(U.Provider,{value:{user:a,firebaseUser:i,loading:s,login:f,loginWithGoogle:h,loginWithGoogleRedirect:N,handleGoogleRedirect:C,register:I,logout:S,resetPassword:$,updateUser:j,refreshUser:O,isProvider:z,isClient:V},children:e})}function I(){let e=(0,P.useContext)(U);if(void 0===e)throw Error("useAuth must be used within an AuthProvider");return e}e.s(["AuthProvider",()=>C,"useAuth",()=>I],57951)},75144,e=>{"use strict";var t=e.i(43476),a=e.i(71645);let r=(0,a.createContext)(void 0);function i({children:e}){let[i,o]=(0,a.useState)("light"),[s,l]=(0,a.useState)(!1);return((0,a.useEffect)(()=>{let e=localStorage.getItem("theme"),t=window.matchMedia("(prefers-color-scheme: dark)").matches;e?o(e):t&&o("dark"),l(!0)},[]),(0,a.useEffect)(()=>{if(s){let e=document.documentElement;e.classList.remove("light","dark"),e.classList.add(i),localStorage.setItem("theme",i)}},[i,s]),s)?(0,t.jsx)(r.Provider,{value:{theme:i,toggleTheme:()=>{o(e=>"light"===e?"dark":"light")},setTheme:o},children:e}):(0,t.jsx)(t.Fragment,{children:e})}function o(){let e=(0,a.useContext)(r);if(void 0===e)throw Error("useTheme must be used within a ThemeProvider");return e}e.s(["ThemeProvider",()=>i,"useTheme",()=>o])}]);