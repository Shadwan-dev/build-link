module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/lib/utils/logger.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "log",
    ()=>log
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-ssr] (ecmascript)");
;
// ✅ Configuración
const IS_PRODUCTION = ("TURBOPACK compile-time value", "development") === 'production';
// ✅ Función para formatear errores
const formatError = (error)=>{
    if (error instanceof Error) {
        return error.message;
    }
    if (typeof error === 'string') {
        return error;
    }
    if (error && typeof error === 'object' && 'message' in error) {
        return String(error.message);
    }
    return 'Error desconocido';
};
// ✅ Función principal de logging
const logger = {
    info: (message, data)=>{
        if ("TURBOPACK compile-time truthy", 1) {
            console.log(`ℹ️ ${message}`, data || '');
        }
    },
    success: (message, data)=>{
        if ("TURBOPACK compile-time truthy", 1) {
            console.log(`✅ ${message}`, data || '');
        }
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    },
    warning: (message, data)=>{
        if ("TURBOPACK compile-time truthy", 1) {
            console.warn(`⚠️ ${message}`, data || '');
        }
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    },
    error: (message, error)=>{
        const errorMessage = error ? formatError(error) : '';
        const fullMessage = errorMessage ? `${message}: ${errorMessage}` : message;
        if ("TURBOPACK compile-time truthy", 1) {
            console.error(`❌ ${fullMessage}`, error || '');
        }
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    },
    // ✅ Para desarrollo con más detalle
    debug: (message, data)=>{
        if ("TURBOPACK compile-time truthy", 1) {
            console.debug(`🔍 ${message}`, data || '');
        }
    }
};
const __TURBOPACK__default__export__ = logger;
const log = logger;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/process [external] (process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("process", () => require("process"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/dns [external] (dns, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("dns", () => require("dns"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[project]/src/lib/firebase/config.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "app",
    ()=>app,
    "auth",
    ()=>auth,
    "db",
    ()=>db,
    "functions",
    ()=>functions,
    "storage",
    ()=>storage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/app/dist/esm/index.esm.js [app-ssr] (ecmascript)");
;
;
;
;
;
const firebaseConfig = {
    apiKey: ("TURBOPACK compile-time value", "AIzaSyBAhN1goGZr7XgQ3hSp-D5vxw9dn6CeiC8"),
    authDomain: ("TURBOPACK compile-time value", "build-link-enterprise.firebaseapp.com"),
    projectId: ("TURBOPACK compile-time value", "build-link-enterprise"),
    storageBucket: ("TURBOPACK compile-time value", "build-link-enterprise.firebasestorage.app"),
    messagingSenderId: ("TURBOPACK compile-time value", "110796812377"),
    appId: ("TURBOPACK compile-time value", "1:110796812377:web:4227aa8a4c7e67c1498148"),
    measurementId: ("TURBOPACK compile-time value", "G-VPF2KKT2JC")
};
// ✅ Inicializar app
const app = !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApps"])().length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initializeApp"])(firebaseConfig) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApp"])();
// ✅ Servicios
let auth = null;
let db = null;
let functions = null;
let storage = null; // ✅ NUEVO
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
;
 // ✅ EXPORTAR STORAGE
}),
"[project]/src/lib/firebase/auth.service.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getUserData",
    ()=>getUserData,
    "handleGoogleRedirect",
    ()=>handleGoogleRedirect,
    "loginUser",
    ()=>loginUser,
    "loginWithGoogle",
    ()=>loginWithGoogle,
    "loginWithGoogleRedirect",
    ()=>loginWithGoogleRedirect,
    "logoutUser",
    ()=>logoutUser,
    "registerUser",
    ()=>registerUser,
    "resetPassword",
    ()=>resetPassword,
    "updateUserData",
    ()=>updateUserData,
    "updateUserRole",
    ()=>updateUserRole,
    "updateUserRoleWithRetry",
    ()=>updateUserRoleWithRetry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/logger.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$totp$2d$05d844a5$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__ab__as__createUserWithEmailAndPassword$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/node_modules/@firebase/auth/dist/node-esm/totp-05d844a5.js [app-ssr] (ecmascript) <export ab as createUserWithEmailAndPassword>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$totp$2d$05d844a5$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__k__as__getRedirectResult$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/node_modules/@firebase/auth/dist/node-esm/totp-05d844a5.js [app-ssr] (ecmascript) <export k as getRedirectResult>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$totp$2d$05d844a5$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__Y__as__GoogleAuthProvider$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/node_modules/@firebase/auth/dist/node-esm/totp-05d844a5.js [app-ssr] (ecmascript) <export Y as GoogleAuthProvider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$totp$2d$05d844a5$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__ah__as__sendEmailVerification$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/node_modules/@firebase/auth/dist/node-esm/totp-05d844a5.js [app-ssr] (ecmascript) <export ah as sendEmailVerification>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$totp$2d$05d844a5$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__a6__as__sendPasswordResetEmail$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/node_modules/@firebase/auth/dist/node-esm/totp-05d844a5.js [app-ssr] (ecmascript) <export a6 as sendPasswordResetEmail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$totp$2d$05d844a5$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__ac__as__signInWithEmailAndPassword$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/node_modules/@firebase/auth/dist/node-esm/totp-05d844a5.js [app-ssr] (ecmascript) <export ac as signInWithEmailAndPassword>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$totp$2d$05d844a5$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__d__as__signInWithPopup$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/node_modules/@firebase/auth/dist/node-esm/totp-05d844a5.js [app-ssr] (ecmascript) <export d as signInWithPopup>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$totp$2d$05d844a5$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__g__as__signInWithRedirect$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/node_modules/@firebase/auth/dist/node-esm/totp-05d844a5.js [app-ssr] (ecmascript) <export g as signInWithRedirect>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$totp$2d$05d844a5$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__signOut$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/node_modules/@firebase/auth/dist/node-esm/totp-05d844a5.js [app-ssr] (ecmascript) <export D as signOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$totp$2d$05d844a5$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__al__as__updateProfile$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/node_modules/@firebase/auth/dist/node-esm/totp-05d844a5.js [app-ssr] (ecmascript) <export al as updateProfile>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.node.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase/config.ts [app-ssr] (ecmascript)");
;
;
;
;
// ============================================
// FUNCIONES DE UTILIDAD
// ============================================
const getAuth = ()=>{
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["auth"]) {
        throw new Error('Firebase Auth no está disponible.');
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["auth"];
};
const getDb = ()=>{
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"]) {
        throw new Error('Firebase Firestore no está disponible.');
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"];
};
// ============================================
// FUNCIONES DE AUTENTICACIÓN
// ============================================
/**
 * Registrar un nuevo usuario con email y contraseña
 */ const registerUser = async (email, password, userData)=>{
    try {
        const authInstance = getAuth();
        const dbInstance = getDb();
        const userCredential = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$totp$2d$05d844a5$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__ab__as__createUserWithEmailAndPassword$3e$__["createUserWithEmailAndPassword"])(authInstance, email, password);
        const user = userCredential.user;
        // Actualizar perfil
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$totp$2d$05d844a5$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__al__as__updateProfile$3e$__["updateProfile"])(user, {
            displayName: userData.displayName || ''
        });
        // Crear documento en Firestore
        const newUserData = {
            uid: user.uid,
            email: user.email || '',
            displayName: userData.displayName || 'Usuario',
            photoURL: userData.photoURL || '',
            role: userData.role || 'client',
            phone: userData.phone || '',
            createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
            updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
            emailVerified: user.emailVerified,
            isActive: true
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'users', user.uid), newUserData);
        // Enviar email de verificación
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$totp$2d$05d844a5$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__ah__as__sendEmailVerification$3e$__["sendEmailVerification"])(user);
        return userCredential;
    } catch (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].error('❌ Error en registro:', error);
        throw new Error(getErrorMessage(error.code));
    }
};
/**
 * Iniciar sesión con email y contraseña
 */ const loginUser = async (email, password)=>{
    try {
        const authInstance = getAuth();
        const dbInstance = getDb();
        const userCredential = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$totp$2d$05d844a5$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__ac__as__signInWithEmailAndPassword$3e$__["signInWithEmailAndPassword"])(authInstance, email, password);
        const user = userCredential.user;
        try {
            const userDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'users', user.uid));
            if (!userDoc.exists()) {
                // Si no existe, crearlo
                const userData = {
                    uid: user.uid,
                    email: user.email || '',
                    displayName: user.displayName || 'Usuario',
                    photoURL: user.photoURL || '',
                    role: 'client',
                    phone: user.phoneNumber || '',
                    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
                    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
                    emailVerified: user.emailVerified,
                    isActive: true
                };
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'users', user.uid), userData);
            } else {
                // Actualizar último login
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'users', user.uid), {
                    lastLoginAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])()
                });
            }
        } catch (firestoreError) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].warning('⚠️ Error en Firestore, pero usuario autenticado:', firestoreError);
        }
        return user;
    } catch (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].error('❌ Error en login:', error);
        throw new Error(getErrorMessage(error.code));
    }
};
/**
 * Cerrar sesión
 */ const logoutUser = async ()=>{
    try {
        const authInstance = getAuth();
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$totp$2d$05d844a5$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__signOut$3e$__["signOut"])(authInstance);
    } catch (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].error('❌ Error en logout:', error);
        throw new Error('Error al cerrar sesión');
    }
};
/**
 * Recuperar contraseña
 */ const resetPassword = async (email)=>{
    try {
        const authInstance = getAuth();
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$totp$2d$05d844a5$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__a6__as__sendPasswordResetEmail$3e$__["sendPasswordResetEmail"])(authInstance, email);
    } catch (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].error('❌ Error en reset password:', error);
        throw new Error(getErrorMessage(error.code));
    }
};
// ============================================
// FUNCIONES DE USUARIO
// ============================================
const getUserData = async (uid)=>{
    try {
        const dbInstance = getDb();
        const userDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'users', uid));
        if (userDoc.exists()) {
            return {
                uid,
                ...userDoc.data()
            };
        }
        return null;
    } catch (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].warning('⚠️ Error obteniendo usuario de Firestore:', error.message);
        return null;
    }
};
const updateUserRoleWithRetry = async (uid, role, maxRetries = 2)=>{
    let lastError;
    for(let attempt = 1; attempt <= maxRetries; attempt++){
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].info(`🔄 Intento ${attempt}/${maxRetries} para actualizar rol...`);
            const dbInstance = getDb();
            // ✅ Actualizar directamente SIN enableNetwork
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'users', uid), {
                role: role,
                updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])()
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].info(`✅ Rol actualizado a: ${role} (intento ${attempt})`);
            // Si es proveedor, crear entrada en providers
            if (role === 'provider') {
                try {
                    const userDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'users', uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        const providerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'providers', uid);
                        const providerDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDoc"])(providerRef);
                        if (!providerDoc.exists()) {
                            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])(providerRef, {
                                displayName: userData.displayName || 'Proveedor',
                                email: userData.email,
                                photoURL: userData.photoURL || '',
                                specialties: [],
                                rating: 0,
                                totalRatings: 0,
                                isActive: true,
                                createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
                                updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])()
                            });
                        }
                    }
                } catch (providerError) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].warning('⚠️ Error creando perfil de proveedor:', providerError);
                }
            }
            return; // ✅ Éxito
        } catch (error) {
            lastError = error;
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].warning(`⚠️ Intento ${attempt} fallido:`, error);
            if (attempt < maxRetries) {
                const delay = 1000 * attempt;
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].info(`⏳ Esperando ${delay}ms antes de reintentar...`);
                await new Promise((resolve)=>setTimeout(resolve, delay));
            }
        }
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].error('❌ Todos los intentos de actualización fallaron:', lastError);
    throw new Error('No se pudo actualizar el rol. Verifica tu conexión.');
};
/**
 * Actualizar datos del usuario
 */ const updateUserData = async (uid, data)=>{
    try {
        const dbInstance = getDb();
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'users', uid), {
            ...data,
            updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])()
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].info('✅ Datos de usuario actualizados');
    } catch (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].error('❌ Error actualizando usuario:', error);
        throw new Error('Error al actualizar perfil');
    }
};
/**
 * Actualizar rol del usuario (versión simple)
 */ const updateUserRole = async (uid, role)=>{
    try {
        const dbInstance = getDb();
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'users', uid), {
            role: role,
            updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])()
        });
        // Si es proveedor, crear entrada en providers
        if (role === 'provider') {
            try {
                const userDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'users', uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    const providerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'providers', uid);
                    const providerDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDoc"])(providerRef);
                    if (!providerDoc.exists()) {
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])(providerRef, {
                            displayName: userData.displayName || 'Proveedor',
                            email: userData.email,
                            photoURL: userData.photoURL || '',
                            specialties: [],
                            rating: 0,
                            totalRatings: 0,
                            isActive: true,
                            createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
                            updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])()
                        });
                    }
                }
            } catch (providerError) {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].warning('⚠️ Error creando perfil de proveedor:', providerError);
            }
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].info(`✅ Rol actualizado a: ${role}`);
    } catch (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].error('❌ Error actualizando rol:', error);
        throw new Error('Error al actualizar el rol');
    }
};
// ============================================
// FUNCIONES DE GOOGLE
// ============================================
/**
 * Iniciar sesión con Google (popup)
 */ const loginWithGoogle = async ()=>{
    try {
        const authInstance = getAuth();
        const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$totp$2d$05d844a5$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__Y__as__GoogleAuthProvider$3e$__["GoogleAuthProvider"]();
        provider.setCustomParameters({
            prompt: 'select_account'
        });
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$totp$2d$05d844a5$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__d__as__signInWithPopup$3e$__["signInWithPopup"])(authInstance, provider);
        const user = result.user;
        // Guardar en Firestore
        try {
            const dbInstance = getDb();
            const userDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'users', user.uid));
            if (!userDoc.exists()) {
                const userData = {
                    uid: user.uid,
                    email: user.email || '',
                    displayName: user.displayName || user.email?.split('@')[0] || 'Usuario',
                    photoURL: user.photoURL || '',
                    role: 'client',
                    phone: user.phoneNumber || '',
                    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
                    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
                    emailVerified: user.emailVerified,
                    isActive: true
                };
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'users', user.uid), userData);
                // También crear en providers
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'providers', user.uid), {
                    displayName: user.displayName || user.email?.split('@')[0] || 'Usuario',
                    email: user.email,
                    photoURL: user.photoURL || '',
                    specialties: [],
                    rating: 0,
                    totalRatings: 0,
                    isActive: true,
                    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
                    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])()
                });
            } else {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'users', user.uid), {
                    lastLoginAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])()
                });
            }
        } catch (firestoreError) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].warning('⚠️ Error guardando usuario en Firestore:', firestoreError);
        }
        return user;
    } catch (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].error('❌ Error en login con Google:', error);
        if (error.code === 'auth/popup-closed-by-user') {
            throw new Error('Inicio de sesión cancelado');
        }
        if (error.code === 'auth/popup-blocked') {
            throw new Error('El popup fue bloqueado. Permite popups para este sitio.');
        }
        if (error.code === 'auth/cancelled-popup-request') {
            throw new Error('Se canceló la solicitud de inicio de sesión');
        }
        throw new Error(getErrorMessage(error.code));
    }
};
/**
 * Redirigir a Google (alternativa para móviles)
 */ const loginWithGoogleRedirect = async ()=>{
    try {
        const authInstance = getAuth();
        const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$totp$2d$05d844a5$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__Y__as__GoogleAuthProvider$3e$__["GoogleAuthProvider"]();
        provider.setCustomParameters({
            prompt: 'select_account'
        });
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$totp$2d$05d844a5$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__g__as__signInWithRedirect$3e$__["signInWithRedirect"])(authInstance, provider);
    } catch (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].error('❌ Error en redirect a Google:', error);
        throw new Error(getErrorMessage(error.code));
    }
};
/**
 * Manejar el resultado del redirect de Google
 */ const handleGoogleRedirect = async ()=>{
    try {
        const authInstance = getAuth();
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$totp$2d$05d844a5$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__k__as__getRedirectResult$3e$__["getRedirectResult"])(authInstance);
        if (result) {
            const user = result.user;
            try {
                const dbInstance = getDb();
                const userDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'users', user.uid));
                if (!userDoc.exists()) {
                    const userData = {
                        uid: user.uid,
                        email: user.email || '',
                        displayName: user.displayName || user.email?.split('@')[0] || 'Usuario',
                        photoURL: user.photoURL || '',
                        role: 'client',
                        phone: user.phoneNumber || '',
                        createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
                        updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
                        emailVerified: user.emailVerified,
                        isActive: true
                    };
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'users', user.uid), userData);
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'providers', user.uid), {
                        displayName: user.displayName || user.email?.split('@')[0] || 'Usuario',
                        email: user.email,
                        photoURL: user.photoURL || '',
                        specialties: [],
                        rating: 0,
                        totalRatings: 0,
                        isActive: true,
                        createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
                        updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])()
                    });
                }
            } catch (firestoreError) {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].warning('⚠️ Error guardando usuario en Firestore:', firestoreError);
            }
            return user;
        }
        return null;
    } catch (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].error('❌ Error en handleGoogleRedirect:', error);
        throw new Error(getErrorMessage(error.code));
    }
};
// ============================================
// MANEJO DE ERRORES
// ============================================
/**
 * Obtener mensaje de error legible
 */ const getErrorMessage = (errorCode)=>{
    const errors = {
        'auth/email-already-in-use': 'Este email ya está registrado.',
        'auth/invalid-email': 'El email ingresado no es válido.',
        'auth/operation-not-allowed': 'El inicio de sesión con email no está habilitado.',
        'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
        'auth/user-disabled': 'Esta cuenta ha sido deshabilitada.',
        'auth/user-not-found': 'No existe una cuenta con este email.',
        'auth/wrong-password': 'Contraseña incorrecta.',
        'auth/too-many-requests': 'Demasiados intentos fallidos. Intenta más tarde.',
        'auth/network-request-failed': 'Error de conexión. Verifica tu internet.',
        'auth/popup-closed-by-user': 'Inicio de sesión cancelado',
        'auth/popup-blocked': 'El popup fue bloqueado. Permite popups para este sitio.',
        'auth/cancelled-popup-request': 'Se canceló la solicitud de inicio de sesión'
    };
    return errors[errorCode] || 'Ocurrió un error. Intenta nuevamente.';
};
;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/contexts/AuthContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/logger.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$auth$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase/auth.service.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [firebaseUser, setFirebaseUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [initialized, setInitialized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    // Función para cargar datos del usuario
    const loadUserData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (firebaseUser)=>{
        try {
            // ✅ Intentar obtener de Firestore
            const userData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$auth$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUserData"])(firebaseUser.uid);
            if (userData) {
                setUser(userData);
                // ✅ Guardar en localStorage como respaldo
                localStorage.setItem('user-data', JSON.stringify(userData));
                if (userData.role) {
                    localStorage.setItem('user-role', userData.role);
                }
            } else {
                // ✅ Si no hay datos en Firestore, intentar usar localStorage
                const savedUser = localStorage.getItem('user-data');
                if (savedUser) {
                    try {
                        const parsedUser = JSON.parse(savedUser);
                        if (parsedUser.uid === firebaseUser.uid) {
                            setUser(parsedUser);
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].info('📝 Usuario cargado de localStorage (fallback)');
                            return;
                        }
                    } catch (e) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].warning('⚠️ Error parseando usuario de localStorage');
                    }
                }
                // ✅ Crear usuario básico
                const basicUser = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email || '',
                    displayName: firebaseUser.displayName || 'Usuario',
                    photoURL: firebaseUser.photoURL || '',
                    role: localStorage.getItem('user-role') || undefined,
                    createdAt: new Date(),
                    emailVerified: firebaseUser.emailVerified || false,
                    isActive: true
                };
                setUser(basicUser);
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].error('Error cargando datos de usuario:', error);
            // ✅ Último recurso: usar localStorage
            const savedRole = localStorage.getItem('user-role');
            const basicUser = {
                uid: firebaseUser.uid,
                email: firebaseUser.email || '',
                displayName: firebaseUser.displayName || 'Usuario',
                photoURL: firebaseUser.photoURL || '',
                role: savedRole || undefined,
                createdAt: new Date(),
                emailVerified: firebaseUser.emailVerified || false,
                isActive: true
            };
            setUser(basicUser);
        }
    }, []);
    // ✅ Función para redirigir después de autenticación
    const redirectAfterAuth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (firebaseUser)=>{
        try {
            await loadUserData(firebaseUser);
            await new Promise((resolve)=>setTimeout(resolve, 100));
            router.replace('/dashboard');
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].error('Error en redirección:', error);
            router.replace('/dashboard');
        }
    }, [
        loadUserData,
        router
    ]);
    // ✅ Monitorear estado de autenticación con tipado correcto
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) {
            setLoading(false);
            return;
        }
        //TURBOPACK unreachable
        ;
        let isMounted;
        const checkRedirect = undefined;
        const unsubscribe = undefined;
    }, [
        loadUserData,
        redirectAfterAuth,
        router
    ]);
    // ✅ Efecto separado para redirección
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!loading && initialized && firebaseUser) {
            const isAuthPath = window.location.pathname === '/login' || window.location.pathname === '/register' || window.location.pathname === '/';
            if (isAuthPath) {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].info('🔄 Redirigiendo a dashboard');
                router.replace('/dashboard');
            }
        }
    }, [
        loading,
        initialized,
        firebaseUser,
        router
    ]);
    // ✅ Login con email
    const login = async (email, password)=>{
        try {
            setLoading(true);
            const firebaseUser = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$auth$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loginUser"])(email, password);
            await redirectAfterAuth(firebaseUser);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success('¡Bienvenido a MiMaestro!');
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].error('Error en login:', error);
            let errorMessage = error.message || 'Error al iniciar sesión';
            if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                errorMessage = 'Email o contraseña incorrectos. Por favor, verifica tus credenciales.';
            } else if (error.code === 'auth/too-many-requests') {
                errorMessage = 'Demasiados intentos fallidos. Por favor, intenta más tarde.';
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error(errorMessage);
            throw new Error(errorMessage);
        } finally{
            setLoading(false);
        }
    };
    // ✅ LOGIN CON GOOGLE
    const loginWithGoogleHandler = async ()=>{
        try {
            setLoading(true);
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].info('🔄 Iniciando login con Google...');
            const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$auth$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loginWithGoogle"])();
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].info('✅ Usuario autenticado con Google:', user.uid);
            await redirectAfterAuth(user);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success('¡Bienvenido a MiMaestro con Google!');
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].error('Error en login con Google:', error);
            if (error.message?.includes('bloqueado') || error.message?.includes('popup-blocked')) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error('El popup fue bloqueado. Permite popups para este sitio o usa el método alternativo.');
                try {
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$auth$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loginWithGoogleRedirect"])();
                } catch (redirectError) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error('Error al iniciar sesión con Google');
                    throw redirectError;
                }
            } else if (error.message?.includes('cancelado')) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error('Inicio de sesión cancelado');
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error(error.message || 'Error al iniciar sesión con Google');
            }
            throw error;
        } finally{
            setLoading(false);
        }
    };
    // ✅ LOGIN CON GOOGLE (REDIRECT)
    const loginWithGoogleRedirectHandler = async ()=>{
        try {
            setLoading(true);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$auth$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loginWithGoogleRedirect"])();
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error(error.message || 'Error al iniciar sesión con Google');
            throw error;
        } finally{
            setLoading(false);
        }
    };
    // ✅ HANDLE GOOGLE REDIRECT RESULT - CORREGIDO (devuelve void)
    const handleGoogleRedirectHandler = async ()=>{
        try {
            setLoading(true);
            const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$auth$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["handleGoogleRedirect"])();
            if (user) {
                await redirectAfterAuth(user);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success('¡Bienvenido a MiMaestro con Google!');
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error(error.message || 'Error al procesar autenticación');
            throw error;
        } finally{
            setLoading(false);
        }
    };
    // ✅ Register
    const register = async (email, password, userData)=>{
        try {
            setLoading(true);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$auth$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["registerUser"])(email, password, userData);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success('¡Registro exitoso! Revisa tu email para verificar tu cuenta.');
            router.push('/login');
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error(error.message);
            throw error;
        } finally{
            setLoading(false);
        }
    };
    // ✅ Logout
    const logout = async ()=>{
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$auth$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["logoutUser"])();
            setUser(null);
            setFirebaseUser(null);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success('Sesión cerrada correctamente');
            router.push('/login');
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error(error.message);
            throw error;
        }
    };
    const refreshUser = async ()=>{
        if (firebaseUser) {
            await loadUserData(firebaseUser);
        }
    };
    const updateUser = async (data)=>{
        if (!firebaseUser) throw new Error('Usuario no autenticado');
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].info('🔄 Actualizando usuario:', data);
            if (data.role) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$auth$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateUserRoleWithRetry"])(firebaseUser.uid, data.role);
            } else {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$auth$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateUserData"])(firebaseUser.uid, data);
            }
            await refreshUser();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success('Perfil actualizado correctamente');
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].error('❌ Error actualizando usuario:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error(error.message || 'Error al actualizar el perfil');
            throw error;
        }
    };
    const resetPasswordHandler = async (email)=>{
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$auth$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resetPassword"])(email);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success('Se envió un email de recuperación');
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error(error.message);
            throw error;
        }
    };
    const isProvider = user?.role === 'provider';
    const isClient = user?.role === 'client';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            firebaseUser,
            loading,
            login,
            loginWithGoogle: loginWithGoogleHandler,
            loginWithGoogleRedirect: loginWithGoogleRedirectHandler,
            handleGoogleRedirect: handleGoogleRedirectHandler,
            register,
            logout,
            resetPassword: resetPasswordHandler,
            updateUser,
            refreshUser,
            isProvider,
            isClient
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/AuthContext.tsx",
        lineNumber: 370,
        columnNumber: 5
    }, this);
}
function useAuth() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
}),
"[project]/src/lib/firebase/messaging.config.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "onMessageListener",
    ()=>onMessageListener,
    "requestNotificationPermission",
    ()=>requestNotificationPermission,
    "saveNotificationToken",
    ()=>saveNotificationToken
]);
// lib/firebase/messaging.config.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/logger.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$messaging$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/messaging/dist/esm/index.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase/config.ts [app-ssr] (ecmascript)");
;
;
;
// ✅ Verificar si el navegador soporta mensajería
let messaging = null;
if (("TURBOPACK compile-time value", "undefined") !== 'undefined' && 'Notification' in window) //TURBOPACK unreachable
;
const requestNotificationPermission = async ()=>{
    try {
        // ✅ Verificar si el navegador soporta notificaciones
        if (!('Notification' in window)) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].warning('⚠️ Este navegador no soporta notificaciones');
            return null;
        }
        // ✅ Verificar si estamos en un entorno seguro
        if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].warning('⚠️ Las notificaciones requieren HTTPS');
            return null;
        }
        // ✅ Solicitar permiso
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].warning('⚠️ Permiso de notificaciones denegado');
            return null;
        }
        // ✅ Verificar que messaging está disponible
        if (!messaging) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].warning('⚠️ Firebase Messaging no disponible');
            return null;
        }
        // ✅ Obtener y limpiar VAPID Key
        let vapidKey = ("TURBOPACK compile-time value", "BL a199LC1poulT6Uf6vsdv57czWw0kTAt2ophWpfKG2LlpNV5RaU1-fogCjxjKasVu1cvw6zporvD-oB-yVGCQ");
        // ✅ Si no hay VAPID Key, desactivar notificaciones
        if (!vapidKey || vapidKey.trim() === '') {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].warning('⚠️ VAPID Key no configurada, notificaciones desactivadas');
            return null;
        }
        // ✅ Limpiar caracteres extraños
        vapidKey = vapidKey.trim().replace(/\s/g, '').replace(/["']/g, '');
        // ✅ Validar que la clave tenga el formato correcto (debe empezar con B o b)
        if (!vapidKey.match(/^[A-Za-z0-9_-]+$/)) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].error('❌ VAPID Key contiene caracteres inválidos');
            console.warn('⚠️ VAPID Key inválida, notificaciones desactivadas');
            return null;
        }
        // ✅ Intentar obtener token
        try {
            const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$messaging$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getToken"])(messaging, {
                vapidKey: vapidKey
            });
            if (token) {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].info('✅ Token FCM obtenido:', token);
                return token;
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].warning('⚠️ No se pudo obtener token FCM');
            return null;
        } catch (tokenError) {
            // ✅ Manejar errores específicos de VAPID
            if (tokenError.message?.includes('InvalidAccessError') || tokenError.message?.includes('public key') || tokenError.code === 'messaging/invalid-vapid-key') {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].error('❌ VAPID Key inválida. Verifica que sea correcta y no tenga caracteres extraños.');
                console.warn('⚠️ Las notificaciones push están desactivadas debido a VAPID Key inválida.');
                return null;
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].error('❌ Error obteniendo token FCM:', tokenError);
            return null;
        }
    } catch (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].error('❌ Error solicitando permiso de notificaciones:', error);
        return null;
    }
};
const onMessageListener = ()=>{
    return new Promise((resolve)=>{
        if (messaging) {
            try {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$messaging$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onMessage"])(messaging, (payload)=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].info('📩 Mensaje recibido en primer plano:', payload);
                    resolve(payload);
                });
            } catch (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].warning('⚠️ Error configurando listener de mensajes:', error);
                resolve(null);
            }
        } else {
            resolve(null);
        }
    });
};
const saveNotificationToken = async (userId, token)=>{
    try {
        const { doc, setDoc, serverTimestamp } = await __turbopack_context__.A("[project]/node_modules/firebase/firestore/dist/index.mjs [app-ssr] (ecmascript, async loader)");
        const { db } = await __turbopack_context__.A("[project]/src/lib/firebase/config.ts [app-ssr] (ecmascript, async loader)");
        if (!db) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].warning('⚠️ Firestore no disponible');
            return;
        }
        const tokenRef = doc(db, 'users', userId);
        await setDoc(tokenRef, {
            fcmToken: token,
            updatedAt: serverTimestamp()
        }, {
            merge: true
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].info('✅ Token FCM guardado en Firestore');
    } catch (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["log"].error('❌ Error guardando token FCM:', error);
    }
};
}),
"[project]/src/components/common/PushNotificationManager.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PushNotificationManager",
    ()=>PushNotificationManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AuthContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$messaging$2e$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase/messaging.config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const PushNotificationManager = ()=>{
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const [permissionGranted, setPermissionGranted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSubscribed, setIsSubscribed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // ✅ Verificar si el navegador soporta Service Workers
    const supportsServiceWorker = ()=>{
        return 'serviceWorker' in navigator && 'PushManager' in window;
    };
    // ✅ Registrar Service Worker
    const registerServiceWorker = async ()=>{
        if (!supportsServiceWorker()) {
            console.warn('⚠️ Service Workers no soportados');
            return false;
        }
        try {
            const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
            console.log('✅ Service Worker registrado:', registration);
            return true;
        } catch (error) {
            console.error('❌ Error registrando Service Worker:', error);
            return false;
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!user) return;
        // ✅ Configurar notificaciones push
        const setupPushNotifications = async ()=>{
            try {
                // ✅ 1. Registrar Service Worker
                const swRegistered = await registerServiceWorker();
                if (!swRegistered) {
                    console.warn('⚠️ Service Worker no registrado');
                    return;
                }
                // ✅ 2. Solicitar permiso y obtener token
                const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$messaging$2e$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["requestNotificationPermission"])();
                if (token) {
                    // ✅ 3. Guardar token en Firestore
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$messaging$2e$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveNotificationToken"])(user.uid, token);
                    setPermissionGranted(true);
                    setIsSubscribed(true);
                    console.log('✅ Push notifications activadas');
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success('🔔 Notificaciones activadas');
                } else {
                    console.warn('⚠️ No se pudo obtener token de notificaciones');
                }
            } catch (error) {
                console.error('❌ Error activando push notifications:', error);
            }
        };
        // ✅ Solo si el navegador soporta notificaciones
        if (supportsServiceWorker()) {
            // ✅ Si ya tiene permiso, configurar directamente
            if (Notification.permission === 'granted') {
                setupPushNotifications();
            } else if (Notification.permission === 'default') {
                const handleUserInteraction = ()=>{
                    setupPushNotifications();
                    document.removeEventListener('click', handleUserInteraction);
                    document.removeEventListener('keydown', handleUserInteraction);
                };
                document.addEventListener('click', handleUserInteraction);
                document.addEventListener('keydown', handleUserInteraction);
                return ()=>{
                    document.removeEventListener('click', handleUserInteraction);
                    document.removeEventListener('keydown', handleUserInteraction);
                };
            }
        } else {
            console.warn('⚠️ Push notifications no soportadas en este navegador');
        }
    }, [
        user
    ]);
    // ✅ Escuchar mensajes en primer plano
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!permissionGranted) return;
        // ✅ Escuchar mensajes mientras la app está abierta
        const handleMessage = async ()=>{
            const payload = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$messaging$2e$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onMessageListener"])();
            if (payload) {
                console.log('📩 Mensaje en primer plano:', payload);
                // ✅ Mostrar toast con la notificación
                const notification = payload.notification;
                if (notification) {
                    const link = payload.data?.link || '/dashboard';
                    // ✅ Crear toast con acción personalizada
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-1 cursor-pointer",
                            onClick: ()=>{
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].dismiss(t.id);
                                window.location.href = link;
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-medium text-gray-900 dark:text-white",
                                    children: notification.title || 'Nueva notificación'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/common/PushNotificationManager.tsx",
                                    lineNumber: 121,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-600 dark:text-gray-300",
                                    children: notification.body || 'Tienes una nueva notificación'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/common/PushNotificationManager.tsx",
                                    lineNumber: 124,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/common/PushNotificationManager.tsx",
                            lineNumber: 114,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)), {
                        icon: '🔔',
                        duration: 5000
                    });
                }
            }
        };
        handleMessage();
    }, [
        permissionGranted
    ]);
    return null;
};
}),
"[project]/src/contexts/ThemeContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider,
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function ThemeProvider({ children }) {
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('light');
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Cargar tema guardado
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (savedTheme) {
            setTheme(savedTheme);
        } else if (prefersDark) {
            setTheme('dark');
        }
        setMounted(true);
    }, []);
    // Aplicar tema al DOM
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (mounted) {
            const root = document.documentElement;
            root.classList.remove('light', 'dark');
            root.classList.add(theme);
            localStorage.setItem('theme', theme);
        }
    }, [
        theme,
        mounted
    ]);
    const toggleTheme = ()=>{
        setTheme((prev)=>prev === 'light' ? 'dark' : 'light');
    };
    if (!mounted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: children
        }, void 0, false);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: {
            theme,
            toggleTheme,
            setTheme
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/ThemeContext.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
function useTheme() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__07de09dc._.js.map