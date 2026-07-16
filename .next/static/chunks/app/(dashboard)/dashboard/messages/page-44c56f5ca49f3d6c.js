(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7374],{1591:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>f});var a=r(5155),o=r(5494),s=r(2957),i=r(3744),n=r(8500),l=r.n(n);let d=({chats:e,userId:t,loading:r=!1})=>r?(0,a.jsx)("div",{className:"flex items-center justify-center py-12",children:(0,a.jsx)("div",{className:"animate-pulse space-y-4 w-full",children:[1,2,3].map(e=>(0,a.jsx)("div",{className:"bg-gray-200 dark:bg-gray-700 h-20 rounded-xl"},e))})}):0===e.length?(0,a.jsxs)("div",{className:"text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700",children:[(0,a.jsx)(o.A,{className:"w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4"}),(0,a.jsx)("h3",{className:"text-lg font-medium text-gray-900 dark:text-white",children:"No tienes conversaciones"}),(0,a.jsx)("p",{className:"text-gray-500 dark:text-gray-400 mt-1",children:"Los chats se abren autom\xe1ticamente cuando una solicitud es aceptada"})]}):(0,a.jsx)("div",{className:"space-y-3",children:e.map(e=>{let r=t===e.clientId?{name:e.providerName,role:"Proveedor"}:{name:e.clientName,role:"Cliente"};return(0,a.jsx)(l(),{href:`/dashboard/messages/${e.id}`,className:"block bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-all duration-200 hover:border-primary-300 dark:hover:border-primary-700",children:(0,a.jsxs)("div",{className:"flex items-center gap-4",children:[(0,a.jsx)("div",{className:"w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0",children:t===e.clientId?(0,a.jsx)(s.A,{className:"w-6 h-6 text-primary-600 dark:text-primary-400"}):(0,a.jsx)(i.A,{className:"w-6 h-6 text-primary-600 dark:text-primary-400"})}),(0,a.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsx)("h3",{className:"font-semibold text-gray-900 dark:text-white truncate",children:r.name}),e.lastMessageAt&&(0,a.jsx)("span",{className:"text-xs text-gray-400 dark:text-gray-500",children:new Date(e.lastMessageAt).toLocaleDateString()})]}),(0,a.jsxs)("div",{className:"flex items-center gap-2",children:[(0,a.jsx)("span",{className:"text-xs text-gray-500 dark:text-gray-400",children:r.role}),(0,a.jsx)("span",{className:"text-xs text-gray-300 dark:text-gray-600",children:"•"}),(0,a.jsx)("span",{className:"text-xs text-gray-500 dark:text-gray-400",children:e.lastMessage||"Sin mensajes"})]})]}),e.unreadCount>0&&(0,a.jsx)("span",{className:"w-5 h-5 bg-primary-600 text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0",children:e.unreadCount>9?"9+":e.unreadCount})]})},e.id)})});var c=r(6111),u=r(2351),m=r(4204),p=r(2115);function f(){let{user:e}=(0,c.A)(),{currentRole:t}=(0,u.I)(),[r,o]=(0,p.useState)([]),[s,i]=(0,p.useState)(!0),n=async()=>{if(e){i(!0);try{let t=await (0,m.VN)(e.uid);o(t)}catch(e){console.error("Error cargando chats:",e)}finally{i(!1)}}};return(0,p.useEffect)(()=>{n()},[e]),(0,a.jsxs)("div",{className:"space-y-6 animate-fade-in",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("h1",{className:"text-2xl md:text-3xl font-bold text-gray-900 dark:text-white",children:"\uD83D\uDCAC Mensajes"}),(0,a.jsx)("p",{className:"text-gray-600 dark:text-gray-400 mt-1",children:"provider"===t?"Comun\xedcate con tus clientes":"Comun\xedcate con tus proveedores"})]}),(0,a.jsx)(d,{chats:r,userId:e?.uid||"",loading:s})]})}},2351:(e,t,r)=>{"use strict";r.d(t,{I:()=>l,u:()=>n});var a=r(5155),o=r(2115),s=r(6111);let i=(0,o.createContext)(void 0);function n({children:e}){let{user:t,refreshUser:r,updateUser:n,loading:l}=(0,s.A)(),[d,c]=(0,o.useState)("client"),[u,m]=(0,o.useState)(!0),p=(0,o.useCallback)(()=>{{let e=localStorage.getItem("user-role");if("client"===e||"provider"===e)return console.log("\uD83D\uDCDD Rol cargado de localStorage:",e),e}return"client"},[]),f=(0,o.useCallback)(async()=>{if(t&&(console.log("\uD83D\uDCDD Usuario cargado desde Auth:",t.role),"client"===t.role||"provider"===t.role)){c(t.role),localStorage.setItem("user-role",t.role),m(!1);return}let e=p();c(e),e&&localStorage.setItem("user-role",e),m(!1)},[t,p]);(0,o.useEffect)(()=>{f()},[f]);let h=(0,o.useCallback)(async()=>{m(!0),await r(),await f(),m(!1)},[r,f]),y=(0,o.useCallback)(async e=>{if(!t)throw Error("No hay usuario autenticado");m(!0);try{console.log(`🔄 Actualizando rol a: ${e}`),c(e),localStorage.setItem("user-role",e);try{await n({role:e}),console.log(`✅ Rol guardado en Firestore: ${e}`)}catch(e){console.warn("⚠️ No se pudo guardar en Firestore, pero el rol local est\xe1 guardado:",e)}await r(),console.log(`✅ Rol actualizado a: ${e}`)}catch(e){throw console.error("❌ Error al actualizar rol:",e),c(p()),e}finally{m(!1)}},[t,n,r,p]),g=(0,o.useCallback)(async()=>{if(!t)throw Error("No hay usuario autenticado");if(!d)throw Error("No hay rol actual");let e="client"===d?"provider":"client";m(!0);try{console.log(`🔄 Cambiando rol de ${d} a ${e}...`),c(e),localStorage.setItem("user-role",e);try{await n({role:e}),console.log(`✅ Rol actualizado en Firestore: ${e}`)}catch(e){console.warn("⚠️ No se pudo actualizar en Firestore:",e)}await r(),window.dispatchEvent(new Event("role-changed")),console.log(`✅ Cambio de rol completado a: ${e}`)}catch(e){throw console.error("❌ Error cambiando rol:",e),c(d),localStorage.setItem("user-role",d),e}finally{m(!1)}},[t,d,n,r]),x="client"===d,b="provider"===d;return(0,a.jsx)(i.Provider,{value:{currentRole:d,setRole:y,switchRole:g,refreshRole:h,isLoading:u||l,isClient:x,isProvider:b,hasRole:!0},children:e})}function l(){let e=(0,o.useContext)(i);if(void 0===e)throw Error("useRole must be used within a RoleProvider");return e}},2957:(e,t,r)=>{"use strict";r.d(t,{A:()=>a});let a=(0,r(9537).A)("briefcase",[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"jecpp"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]])},3321:(e,t,r)=>{"use strict";var a=r(4645);r.o(a,"useParams")&&r.d(t,{useParams:function(){return a.useParams}}),r.o(a,"usePathname")&&r.d(t,{usePathname:function(){return a.usePathname}}),r.o(a,"useRouter")&&r.d(t,{useRouter:function(){return a.useRouter}})},3744:(e,t,r)=>{"use strict";r.d(t,{A:()=>a});let a=(0,r(9537).A)("user",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]])},4204:(e,t,r)=>{"use strict";r.d(t,{RL:()=>n,VN:()=>c,Zm:()=>d,_z:()=>l,iS:()=>u,tm:()=>m});var a=r(1531),o=r(9389),s=r(7801);let i=()=>{if(!o.db)throw Error("Firestore no est\xe1 disponible");return o.db},n=async(e,t,r,o,s)=>{try{let n=i(),l=(0,a.rJ)(n,"chats"),d=(0,a.P)(l,(0,a._M)("requestId","==",e)),c=await (0,a.GG)(d);if(!c.empty)return c.docs[0].id;let u={requestId:e,clientId:t,clientName:r,providerId:o,providerName:s,unreadCount:0,status:"active",createdAt:(0,a.O5)(),updatedAt:(0,a.O5)()};return(await (0,a.gS)(l,u)).id}catch(e){throw console.error("Error creando chat:",e),Error("Error al crear el chat")}},l=async(e,t,r,o,n)=>{try{let l=i(),d=(0,a.rJ)(l,"messages"),c={chatId:e,senderId:t,senderName:r,senderRole:o,content:n,read:!1,createdAt:(0,a.O5)(),updatedAt:(0,a.O5)()},u=await (0,a.gS)(d,c),m=(0,a.H9)(l,"chats",e);await (0,a.mZ)(m,{lastMessage:n,lastMessageAt:(0,a.O5)(),updatedAt:(0,a.O5)()});let p=await (0,a.x7)(m);if(p.exists()){let o=p.data(),i=t===o.clientId?o.providerId:o.clientId;t===o.clientId?o.providerName:o.clientName,await (0,s.UI)(i,`💬 Nuevo mensaje de ${r}`,n.length>60?n.substring(0,60)+"...":n,"message",`/dashboard/messages/${e}`),await (0,a.mZ)(m,{unreadCount:(o.unreadCount||0)+1})}return u.id}catch(e){throw console.error("Error enviando mensaje:",e),Error("Error al enviar el mensaje")}},d=async e=>{try{let t=i(),r=(0,a.rJ)(t,"messages"),o=(0,a.P)(r,(0,a._M)("chatId","==",e),(0,a.My)("createdAt","asc")),s=await (0,a.GG)(o),n=[];return s.forEach(e=>{let t=e.data();n.push({id:e.id,...t})}),n}catch(e){return console.error("Error obteniendo mensajes:",e),[]}},c=async e=>{try{let t=i(),r=(0,a.rJ)(t,"chats"),o=(0,a.P)(r,(0,a._M)("status","==","active"),(0,a.My)("updatedAt","desc")),s=await (0,a.GG)(o),n=[];return s.forEach(t=>{let r=t.data();if(r.clientId===e||r.providerId===e){let{id:e,...a}=r;n.push({id:t.id,...a})}}),n}catch(e){return console.error("Error obteniendo chats:",e),[]}},u=async(e,t)=>{try{let t=i(),r=(0,a.rJ)(t,"messages"),o=(0,a.P)(r,(0,a._M)("chatId","==",e),(0,a._M)("read","==",!1)),s=(await (0,a.GG)(o)).docs.map(e=>(0,a.mZ)(e.ref,{read:!0,updatedAt:(0,a.O5)()}));await Promise.all(s);let n=(0,a.H9)(t,"chats",e);await (0,a.mZ)(n,{unreadCount:0})}catch(e){console.error("Error marcando mensajes como le\xeddos:",e)}},m=async e=>{try{let t=i(),r=(0,a.rJ)(t,"chats"),o=(0,a.P)(r,(0,a._M)("requestId","==",e)),s=await (0,a.GG)(o);if(!s.empty){let e=s.docs[0],{id:t,...r}=e.data();return{id:e.id,...r}}return null}catch(e){return console.error("Error obteniendo chat:",e),null}}},5494:(e,t,r)=>{"use strict";r.d(t,{A:()=>a});let a=(0,r(9537).A)("message-square",[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",key:"18887p"}]])},6104:(e,t,r)=>{Promise.resolve().then(r.bind(r,1591))},7801:(e,t,r)=>{"use strict";r.d(t,{Ss:()=>n,UI:()=>i,bA:()=>l,he:()=>d});var a=r(1531),o=r(9389);let s=()=>{if(!o.db)throw Error("Firestore no est\xe1 disponible");return o.db},i=async(e,t,r,o,i)=>{try{let n=s(),l=(0,a.rJ)(n,"notifications"),d=(0,a.H9)(l),c={userId:e,title:t,message:r,type:o,read:!1,link:i||"",createdAt:(0,a.O5)(),updatedAt:(0,a.O5)()};return await (0,a.BN)(d,c),console.log("✅ Notificaci\xf3n creada:",t),d.id}catch(e){throw console.error("Error creando notificaci\xf3n:",e),Error("Error al crear notificaci\xf3n")}},n=async e=>{try{let t=s(),r=(0,a.rJ)(t,"notifications"),o=(0,a.P)(r,(0,a._M)("userId","==",e),(0,a.My)("createdAt","desc")),i=await (0,a.GG)(o),n=[];return i.forEach(e=>{let t=e.data();n.push({id:e.id,userId:t.userId,title:t.title,message:t.message,type:t.type,read:t.read||!1,link:t.link||"",createdAt:t.createdAt?.toDate?t.createdAt.toDate():new Date,updatedAt:t.updatedAt?.toDate?t.updatedAt.toDate():new Date})}),n}catch(e){return console.error("Error obteniendo notificaciones:",e),[]}},l=async e=>{try{let t=s(),r=(0,a.H9)(t,"notifications",e);await (0,a.mZ)(r,{read:!0,updatedAt:(0,a.O5)()}),console.log("✅ Notificaci\xf3n marcada como le\xedda")}catch(e){console.error("Error marcando notificaci\xf3n:",e)}},d=async e=>{try{let t=s(),r=(0,a.rJ)(t,"notifications"),o=(0,a.P)(r,(0,a._M)("userId","==",e),(0,a._M)("read","==",!1)),i=(await (0,a.GG)(o)).docs.map(e=>(0,a.mZ)(e.ref,{read:!0,updatedAt:(0,a.O5)()}));await Promise.all(i),console.log("✅ Todas las notificaciones marcadas como le\xeddas")}catch(e){console.error("Error marcando notificaciones:",e)}}},8434:(e,t,r)=>{"use strict";let a,o;r.d(t,{Toaster:()=>ee,Ay:()=>et});var s,i=r(2115);let n={data:""},l=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,c=/\n+/g,u=(e,t)=>{let r="",a="",o="";for(let s in e){let i=e[s];"@"==s[0]?"i"==s[1]?r=s+" "+i+";":a+="f"==s[1]?u(i,s):s+"{"+u(i,"k"==s[1]?"":t)+"}":"object"==typeof i?a+=u(i,t?t.replace(/([^,])+/g,e=>s.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):s):null!=i&&(s="-"==s[1]?s:s.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=u.p?u.p(s,i):s+":"+i+";")}return r+(t&&o?t+"{"+o+"}":o)+a},m={},p=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+p(e[r]);return t}return e};function f(e){let t,r,a=this||{},o=e.call?e(a.p):e;return((e,t,r,a,o)=>{var s;let i=p(e),n=m[i]||(m[i]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(i));if(!m[n]){let t=i!==e?e:(e=>{let t,r,a=[{}];for(;t=l.exec(e.replace(d,""));)t[4]?a.shift():t[3]?(r=t[3].replace(c," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(c," ").trim();return a[0]})(e);m[n]=u(o?{["@keyframes "+n]:t}:t,r?"":"."+n)}let f=r&&m.g;return r&&(m.g=m[n]),s=m[n],f?t.data=t.data.replace(f,s):-1===t.data.indexOf(s)&&(t.data=a?s+t.data:t.data+s),n})(o.unshift?o.raw?(t=[].slice.call(arguments,1),r=a.p,o.reduce((e,a,o)=>{let s=t[o];if(s&&s.call){let e=s(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;s=t?"."+t:e&&"object"==typeof e?e.props?"":u(e,""):!1===e?"":e}return e+a+(null==s?"":s)},"")):o.reduce((e,t)=>Object.assign(e,t&&t.call?t(a.p):t),{}):o,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||n})(a.target),a.g,a.o,a.k)}f.bind({g:1});let h,y,g,x=f.bind({k:1});function b(e,t){let r=this||{};return function(){let a=arguments;function o(s,i){let n=Object.assign({},s),l=n.className||o.className;r.p=Object.assign({theme:y&&y()},n),r.o=/go\d/.test(l),n.className=f.apply(r,a)+(l?" "+l:""),t&&(n.ref=i);let d=e;return e[0]&&(d=n.as||e,delete n.as),g&&d[0]&&g(n),h(d,n)}return t?t(o):o}}var v=(e,t)=>"function"==typeof e?e(t):e,w=(a=0,()=>(++a).toString()),k=()=>{if(void 0===o&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");o=!e||e.matches}return o},E="default",N=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return N(e,{type:+!!e.toasts.find(e=>e.id===a.id),toast:a});case 3:let{toastId:o}=t;return{...e,toasts:e.toasts.map(e=>e.id===o||void 0===o?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let s=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+s}))}}},j=[],A={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},I={},C=(e,t=E)=>{I[t]=N(I[t]||A,e),j.forEach(([e,r])=>{e===t&&r(I[t])})},$=e=>Object.keys(I).forEach(t=>C(e,t)),M=(e=E)=>t=>{C(t,e)},O={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},P=e=>(t,r)=>{let a,o=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||w()}))(t,e,r);return M(o.toasterId||(a=o.id,Object.keys(I).find(e=>I[e].toasts.some(e=>e.id===a))))({type:2,toast:o}),o.id},_=(e,t)=>P("blank")(e,t);_.error=P("error"),_.success=P("success"),_.loading=P("loading"),_.custom=P("custom"),_.dismiss=(e,t)=>{let r={type:3,toastId:e};t?M(t)(r):$(r)},_.dismissAll=e=>_.dismiss(void 0,e),_.remove=(e,t)=>{let r={type:4,toastId:e};t?M(t)(r):$(r)},_.removeAll=e=>_.remove(void 0,e),_.promise=(e,t,r)=>{let a=_.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let o=t.success?v(t.success,e):void 0;return o?_.success(o,{id:a,...r,...null==r?void 0:r.success}):_.dismiss(a),e}).catch(e=>{let o=t.error?v(t.error,e):void 0;o?_.error(o,{id:a,...r,...null==r?void 0:r.error}):_.dismiss(a)}),e};var D=1e3,S=x`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,z=x`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,G=x`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,R=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${S} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${z} 0.15s ease-out forwards;
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
    animation: ${G} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,F=x`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,H=b("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${F} 1s linear infinite;
`,L=x`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,J=x`
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
}`,T=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${L} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${J} 0.2s ease-out forwards;
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
`,Z=b("div")`
  position: absolute;
`,U=b("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,q=x`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,V=b("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${q} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,B=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?i.createElement(V,null,t):t:"blank"===r?null:i.createElement(U,null,i.createElement(H,{...a}),"loading"!==r&&i.createElement(Z,null,"error"===r?i.createElement(R,{...a}):i.createElement(T,{...a})))},Y=b("div")`
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
`,K=b("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Q=i.memo(({toast:e,position:t,style:r,children:a})=>{let o=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[a,o]=k()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${x(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${x(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},s=i.createElement(B,{toast:e}),n=i.createElement(K,{...e.ariaProps},v(e.message,e));return i.createElement(Y,{className:e.className,style:{...o,...r,...e.style}},"function"==typeof a?a({icon:s,message:n}):i.createElement(i.Fragment,null,s,n))});s=i.createElement,u.p=void 0,h=s,y=void 0,g=void 0;var W=({id:e,className:t,style:r,onHeightUpdate:a,children:o})=>{let s=i.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return i.createElement("div",{ref:s,className:t,style:r},o)},X=f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ee=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:o,toasterId:s,containerStyle:n,containerClassName:l})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:r,pausedAt:a}=((e={},t=E)=>{let[r,a]=(0,i.useState)(I[t]||A),o=(0,i.useRef)(I[t]);(0,i.useEffect)(()=>(o.current!==I[t]&&a(I[t]),j.push([t,a]),()=>{let e=j.findIndex(([e])=>e===t);e>-1&&j.splice(e,1)}),[t]);let s=r.toasts.map(t=>{var r,a,o;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||O[t.type],style:{...e.style,...null==(o=e[t.type])?void 0:o.style,...t.style}}});return{...r,toasts:s}})(e,t),o=(0,i.useRef)(new Map).current,s=(0,i.useCallback)((e,t=D)=>{if(o.has(e))return;let r=setTimeout(()=>{o.delete(e),n({type:4,toastId:e})},t);o.set(e,r)},[]);(0,i.useEffect)(()=>{if(a)return;let e=Date.now(),o=r.map(r=>{if(r.duration===1/0)return;let a=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(a<0){r.visible&&_.dismiss(r.id);return}return setTimeout(()=>_.dismiss(r.id,t),a)});return()=>{o.forEach(e=>e&&clearTimeout(e))}},[r,a,t]);let n=(0,i.useCallback)(M(t),[t]),l=(0,i.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),d=(0,i.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),c=(0,i.useCallback)(()=>{a&&n({type:6,time:Date.now()})},[a,n]),u=(0,i.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:o=8,defaultPosition:s}=t||{},i=r.filter(t=>(t.position||s)===(e.position||s)&&t.height),n=i.findIndex(t=>t.id===e.id),l=i.filter((e,t)=>t<n&&e.visible).length;return i.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+o,0)},[r]);return(0,i.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)s(e.id,e.removeDelay);else{let t=o.get(e.id);t&&(clearTimeout(t),o.delete(e.id))}})},[r,s]),{toasts:r,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:u}}})(r,s);return i.createElement("div",{"data-rht-toaster":s||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let s,n,l=r.position||t,d=c.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}),u=(s=l.includes("top"),n=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:k()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(s?1:-1)}px)`,...s?{top:0}:{bottom:0},...n});return i.createElement(W,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?X:"",style:u},"custom"===r.type?v(r.message,r):o?o(r):i.createElement(Q,{toast:r,position:l}))}))},et=_}},e=>{e.O(0,[2399,1497,7289,4183,5530,6111,8441,3794,7358],()=>e(e.s=6104)),_N_E=e.O()}]);