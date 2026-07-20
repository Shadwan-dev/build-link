(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/firebase/config.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "app",
    ()=>app,
    "auth",
    ()=>auth,
    "db",
    ()=>db,
    "functions",
    ()=>functions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/app/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/app/dist/esm/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/auth/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/firebase/node_modules/@firebase/auth/dist/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$functions$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/functions/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$functions$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/functions/dist/esm/index.esm.js [app-client] (ecmascript)");
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
const app = !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApps"])().length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initializeApp"])(firebaseConfig) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApp"])();
let auth = null;
let db = null;
let functions = null;
if ("TURBOPACK compile-time truthy", 1) {
    try {
        // ✅ Auth - Persistencia básica
        auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuth"])(app);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setPersistence"])(auth, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["browserLocalPersistence"]).then(()=>console.log('✅ Persistencia de Auth configurada')).catch((error)=>console.warn('⚠️ Error setting auth persistence:', error));
        // ✅ Firestore - CONFIGURACIÓN MÁS SIMPLE POSIBLE
        // Sin persistencia offline para evitar errores de caché
        db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirestore"])(app);
        functions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$functions$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFunctions"])(app);
        console.log('✅ Firebase inicializado correctamente');
        console.log('📡 Modo: Online (sin persistencia offline)');
    } catch (error) {
        console.error('❌ Error inicializando Firebase:', error);
    }
}
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/firebase/auth.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/auth/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/firebase/node_modules/@firebase/auth/dist/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase/config.ts [app-client] (ecmascript)");
;
;
;
// ============================================
// FUNCIONES DE UTILIDAD
// ============================================
const getAuth = ()=>{
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"]) {
        throw new Error('Firebase Auth no está disponible.');
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"];
};
const getDb = ()=>{
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"]) {
        throw new Error('Firebase Firestore no está disponible.');
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"];
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
        const userCredential = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createUserWithEmailAndPassword"])(authInstance, email, password);
        const user = userCredential.user;
        // Actualizar perfil
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateProfile"])(user, {
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
            createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
            updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
            emailVerified: user.emailVerified,
            isActive: true
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'users', user.uid), newUserData);
        // Enviar email de verificación
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendEmailVerification"])(user);
        return userCredential;
    } catch (error) {
        console.error('❌ Error en registro:', error);
        throw new Error(getErrorMessage(error.code));
    }
};
/**
 * Iniciar sesión con email y contraseña
 */ const loginUser = async (email, password)=>{
    try {
        const authInstance = getAuth();
        const dbInstance = getDb();
        const userCredential = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signInWithEmailAndPassword"])(authInstance, email, password);
        const user = userCredential.user;
        try {
            const userDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'users', user.uid));
            if (!userDoc.exists()) {
                // Si no existe, crearlo
                const userData = {
                    uid: user.uid,
                    email: user.email || '',
                    displayName: user.displayName || 'Usuario',
                    photoURL: user.photoURL || '',
                    role: 'client',
                    phone: user.phoneNumber || '',
                    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
                    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
                    emailVerified: user.emailVerified,
                    isActive: true
                };
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'users', user.uid), userData);
            } else {
                // Actualizar último login
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'users', user.uid), {
                    lastLoginAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
                });
            }
        } catch (firestoreError) {
            console.warn('⚠️ Error en Firestore, pero usuario autenticado:', firestoreError);
        }
        return user;
    } catch (error) {
        console.error('❌ Error en login:', error);
        throw new Error(getErrorMessage(error.code));
    }
};
/**
 * Cerrar sesión
 */ const logoutUser = async ()=>{
    try {
        const authInstance = getAuth();
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signOut"])(authInstance);
    } catch (error) {
        console.error('❌ Error en logout:', error);
        throw new Error('Error al cerrar sesión');
    }
};
/**
 * Recuperar contraseña
 */ const resetPassword = async (email)=>{
    try {
        const authInstance = getAuth();
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendPasswordResetEmail"])(authInstance, email);
    } catch (error) {
        console.error('❌ Error en reset password:', error);
        throw new Error(getErrorMessage(error.code));
    }
};
// ============================================
// FUNCIONES DE USUARIO
// ============================================
const getUserData = async (uid)=>{
    try {
        const dbInstance = getDb();
        const userDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'users', uid));
        if (userDoc.exists()) {
            return {
                uid,
                ...userDoc.data()
            };
        }
        return null;
    } catch (error) {
        console.warn('⚠️ Error obteniendo usuario de Firestore:', error.message);
        return null;
    }
};
const updateUserRoleWithRetry = async (uid, role, maxRetries = 2)=>{
    let lastError;
    for(let attempt = 1; attempt <= maxRetries; attempt++){
        try {
            console.log(`🔄 Intento ${attempt}/${maxRetries} para actualizar rol...`);
            const dbInstance = getDb();
            // ✅ Actualizar directamente SIN enableNetwork
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'users', uid), {
                role: role,
                updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
            });
            console.log(`✅ Rol actualizado a: ${role} (intento ${attempt})`);
            // Si es proveedor, crear entrada en providers
            if (role === 'provider') {
                try {
                    const userDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'users', uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        const providerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'providers', uid);
                        const providerDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(providerRef);
                        if (!providerDoc.exists()) {
                            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(providerRef, {
                                displayName: userData.displayName || 'Proveedor',
                                email: userData.email,
                                photoURL: userData.photoURL || '',
                                specialties: [],
                                rating: 0,
                                totalRatings: 0,
                                isActive: true,
                                createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
                                updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
                            });
                        }
                    }
                } catch (providerError) {
                    console.warn('⚠️ Error creando perfil de proveedor:', providerError);
                }
            }
            return; // ✅ Éxito
        } catch (error) {
            lastError = error;
            console.warn(`⚠️ Intento ${attempt} fallido:`, error);
            if (attempt < maxRetries) {
                const delay = 1000 * attempt;
                console.log(`⏳ Esperando ${delay}ms antes de reintentar...`);
                await new Promise((resolve)=>setTimeout(resolve, delay));
            }
        }
    }
    console.error('❌ Todos los intentos de actualización fallaron:', lastError);
    throw new Error('No se pudo actualizar el rol. Verifica tu conexión.');
};
/**
 * Actualizar datos del usuario
 */ const updateUserData = async (uid, data)=>{
    try {
        const dbInstance = getDb();
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'users', uid), {
            ...data,
            updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
        });
        console.log('✅ Datos de usuario actualizados');
    } catch (error) {
        console.error('❌ Error actualizando usuario:', error);
        throw new Error('Error al actualizar perfil');
    }
};
/**
 * Actualizar rol del usuario (versión simple)
 */ const updateUserRole = async (uid, role)=>{
    try {
        const dbInstance = getDb();
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'users', uid), {
            role: role,
            updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
        });
        // Si es proveedor, crear entrada en providers
        if (role === 'provider') {
            try {
                const userDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'users', uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    const providerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'providers', uid);
                    const providerDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(providerRef);
                    if (!providerDoc.exists()) {
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(providerRef, {
                            displayName: userData.displayName || 'Proveedor',
                            email: userData.email,
                            photoURL: userData.photoURL || '',
                            specialties: [],
                            rating: 0,
                            totalRatings: 0,
                            isActive: true,
                            createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
                            updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
                        });
                    }
                }
            } catch (providerError) {
                console.warn('⚠️ Error creando perfil de proveedor:', providerError);
            }
        }
        console.log(`✅ Rol actualizado a: ${role}`);
    } catch (error) {
        console.error('❌ Error actualizando rol:', error);
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
        const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GoogleAuthProvider"]();
        provider.setCustomParameters({
            prompt: 'select_account'
        });
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signInWithPopup"])(authInstance, provider);
        const user = result.user;
        // Guardar en Firestore
        try {
            const dbInstance = getDb();
            const userDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'users', user.uid));
            if (!userDoc.exists()) {
                const userData = {
                    uid: user.uid,
                    email: user.email || '',
                    displayName: user.displayName || user.email?.split('@')[0] || 'Usuario',
                    photoURL: user.photoURL || '',
                    role: 'client',
                    phone: user.phoneNumber || '',
                    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
                    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
                    emailVerified: user.emailVerified,
                    isActive: true
                };
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'users', user.uid), userData);
                // También crear en providers
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'providers', user.uid), {
                    displayName: user.displayName || user.email?.split('@')[0] || 'Usuario',
                    email: user.email,
                    photoURL: user.photoURL || '',
                    specialties: [],
                    rating: 0,
                    totalRatings: 0,
                    isActive: true,
                    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
                    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
                });
            } else {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'users', user.uid), {
                    lastLoginAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
                });
            }
        } catch (firestoreError) {
            console.warn('⚠️ Error guardando usuario en Firestore:', firestoreError);
        }
        return user;
    } catch (error) {
        console.error('❌ Error en login con Google:', error);
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
        const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GoogleAuthProvider"]();
        provider.setCustomParameters({
            prompt: 'select_account'
        });
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signInWithRedirect"])(authInstance, provider);
    } catch (error) {
        console.error('❌ Error en redirect a Google:', error);
        throw new Error(getErrorMessage(error.code));
    }
};
/**
 * Manejar el resultado del redirect de Google
 */ const handleGoogleRedirect = async ()=>{
    try {
        const authInstance = getAuth();
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRedirectResult"])(authInstance);
        if (result) {
            const user = result.user;
            try {
                const dbInstance = getDb();
                const userDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'users', user.uid));
                if (!userDoc.exists()) {
                    const userData = {
                        uid: user.uid,
                        email: user.email || '',
                        displayName: user.displayName || user.email?.split('@')[0] || 'Usuario',
                        photoURL: user.photoURL || '',
                        role: 'client',
                        phone: user.phoneNumber || '',
                        createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
                        updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
                        emailVerified: user.emailVerified,
                        isActive: true
                    };
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'users', user.uid), userData);
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'providers', user.uid), {
                        displayName: user.displayName || user.email?.split('@')[0] || 'Usuario',
                        email: user.email,
                        photoURL: user.photoURL || '',
                        specialties: [],
                        rating: 0,
                        totalRatings: 0,
                        isActive: true,
                        createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
                        updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
                    });
                }
            } catch (firestoreError) {
                console.warn('⚠️ Error guardando usuario en Firestore:', firestoreError);
            }
            return user;
        }
        return null;
    } catch (error) {
        console.error('❌ Error en handleGoogleRedirect:', error);
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/contexts/AuthContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase/auth.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/auth/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/firebase/node_modules/@firebase/auth/dist/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [firebaseUser, setFirebaseUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [initialized, setInitialized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // Función para cargar datos del usuario
    const loadUserData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[loadUserData]": async (firebaseUser)=>{
            try {
                // ✅ Intentar obtener de Firestore
                const userData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserData"])(firebaseUser.uid);
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
                                console.log('📝 Usuario cargado de localStorage (fallback)');
                                return;
                            }
                        } catch (e) {
                            console.warn('⚠️ Error parseando usuario de localStorage');
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
                console.error('Error cargando datos de usuario:', error);
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
        }
    }["AuthProvider.useCallback[loadUserData]"], []);
    // ✅ Función para redirigir después de autenticación
    const redirectAfterAuth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[redirectAfterAuth]": async (firebaseUser)=>{
            try {
                await loadUserData(firebaseUser);
                await new Promise({
                    "AuthProvider.useCallback[redirectAfterAuth]": (resolve)=>setTimeout(resolve, 100)
                }["AuthProvider.useCallback[redirectAfterAuth]"]);
                router.replace('/dashboard');
            } catch (error) {
                console.error('Error en redirección:', error);
                router.replace('/dashboard');
            }
        }
    }["AuthProvider.useCallback[redirectAfterAuth]"], [
        loadUserData,
        router
    ]);
    // ✅ Monitorear estado de autenticación con tipado correcto
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"]) {
                console.warn('⚠️ Firebase Auth no está disponible');
                setLoading(false);
                return;
            }
            let isMounted = true;
            const checkRedirect = {
                "AuthProvider.useEffect.checkRedirect": async ()=>{
                    if (window.location.pathname === '/auth/callback') {
                        try {
                            const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleGoogleRedirect"])();
                            if (user) {
                                await redirectAfterAuth(user);
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('¡Bienvenido a BuildLink con Google!');
                            }
                        } catch (error) {
                            console.error('Error en redirect de Google:', error);
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Error al iniciar sesión con Google');
                            router.replace('/login');
                        }
                    }
                }
            }["AuthProvider.useEffect.checkRedirect"];
            checkRedirect();
            const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onAuthStateChanged"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"], {
                "AuthProvider.useEffect.unsubscribe": async (firebaseUser)=>{
                    if (!isMounted) return;
                    console.log('🔐 Auth state changed:', firebaseUser?.uid || 'No user');
                    setFirebaseUser(firebaseUser);
                    if (firebaseUser) {
                        await loadUserData(firebaseUser);
                        setInitialized(true);
                    } else {
                        setUser(null);
                        setInitialized(true);
                    }
                    setLoading(false);
                }
            }["AuthProvider.useEffect.unsubscribe"]);
            return ({
                "AuthProvider.useEffect": ()=>{
                    isMounted = false;
                    unsubscribe();
                }
            })["AuthProvider.useEffect"];
        }
    }["AuthProvider.useEffect"], [
        loadUserData,
        redirectAfterAuth,
        router
    ]);
    // ✅ Efecto separado para redirección
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            if (!loading && initialized && firebaseUser) {
                const isAuthPath = window.location.pathname === '/login' || window.location.pathname === '/register' || window.location.pathname === '/';
                if (isAuthPath) {
                    console.log('🔄 Redirigiendo a dashboard');
                    router.replace('/dashboard');
                }
            }
        }
    }["AuthProvider.useEffect"], [
        loading,
        initialized,
        firebaseUser,
        router
    ]);
    // ✅ Login con email
    const login = async (email, password)=>{
        try {
            setLoading(true);
            const firebaseUser = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loginUser"])(email, password);
            await redirectAfterAuth(firebaseUser);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('¡Bienvenido a BuildLink!');
        } catch (error) {
            console.error('Error en login:', error);
            let errorMessage = error.message || 'Error al iniciar sesión';
            if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                errorMessage = 'Email o contraseña incorrectos. Por favor, verifica tus credenciales.';
            } else if (error.code === 'auth/too-many-requests') {
                errorMessage = 'Demasiados intentos fallidos. Por favor, intenta más tarde.';
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error(errorMessage);
            throw new Error(errorMessage);
        } finally{
            setLoading(false);
        }
    };
    // ✅ LOGIN CON GOOGLE
    const loginWithGoogleHandler = async ()=>{
        try {
            setLoading(true);
            console.log('🔄 Iniciando login con Google...');
            const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loginWithGoogle"])();
            console.log('✅ Usuario autenticado con Google:', user.uid);
            await redirectAfterAuth(user);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('¡Bienvenido a BuildLink con Google!');
        } catch (error) {
            console.error('Error en login con Google:', error);
            if (error.message?.includes('bloqueado') || error.message?.includes('popup-blocked')) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('El popup fue bloqueado. Permite popups para este sitio o usa el método alternativo.');
                try {
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loginWithGoogleRedirect"])();
                } catch (redirectError) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Error al iniciar sesión con Google');
                    throw redirectError;
                }
            } else if (error.message?.includes('cancelado')) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Inicio de sesión cancelado');
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error(error.message || 'Error al iniciar sesión con Google');
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
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loginWithGoogleRedirect"])();
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error(error.message || 'Error al iniciar sesión con Google');
            throw error;
        } finally{
            setLoading(false);
        }
    };
    // ✅ HANDLE GOOGLE REDIRECT RESULT - CORREGIDO (devuelve void)
    const handleGoogleRedirectHandler = async ()=>{
        try {
            setLoading(true);
            const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleGoogleRedirect"])();
            if (user) {
                await redirectAfterAuth(user);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('¡Bienvenido a BuildLink con Google!');
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error(error.message || 'Error al procesar autenticación');
            throw error;
        } finally{
            setLoading(false);
        }
    };
    // ✅ Register
    const register = async (email, password, userData)=>{
        try {
            setLoading(true);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerUser"])(email, password, userData);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('¡Registro exitoso! Revisa tu email para verificar tu cuenta.');
            router.push('/login');
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error(error.message);
            throw error;
        } finally{
            setLoading(false);
        }
    };
    // ✅ Logout
    const logout = async ()=>{
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logoutUser"])();
            setUser(null);
            setFirebaseUser(null);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('Sesión cerrada correctamente');
            router.push('/login');
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error(error.message);
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
            console.log('🔄 Actualizando usuario:', data);
            if (data.role) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateUserRoleWithRetry"])(firebaseUser.uid, data.role);
            } else {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateUserData"])(firebaseUser.uid, data);
            }
            await refreshUser();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('Perfil actualizado correctamente');
        } catch (error) {
            console.error('❌ Error actualizando usuario:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error(error.message || 'Error al actualizar el perfil');
            throw error;
        }
    };
    const resetPasswordHandler = async (email)=>{
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resetPassword"])(email);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('Se envió un email de recuperación');
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error(error.message);
            throw error;
        }
    };
    const isProvider = user?.role === 'provider';
    const isClient = user?.role === 'client';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
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
        lineNumber: 369,
        columnNumber: 5
    }, this);
}
_s(AuthProvider, "Y5kdhrEFwSDXVtdFxdAXIhCrF/g=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AuthProvider;
function useAuth() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/contexts/ThemeContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider,
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function ThemeProvider({ children }) {
    _s();
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('light');
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Cargar tema guardado
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (savedTheme) {
                setTheme(savedTheme);
            } else if (prefersDark) {
                setTheme('dark');
            }
            setMounted(true);
        }
    }["ThemeProvider.useEffect"], []);
    // Aplicar tema al DOM
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            if (mounted) {
                const root = document.documentElement;
                root.classList.remove('light', 'dark');
                root.classList.add(theme);
                localStorage.setItem('theme', theme);
            }
        }
    }["ThemeProvider.useEffect"], [
        theme,
        mounted
    ]);
    const toggleTheme = ()=>{
        setTheme((prev)=>prev === 'light' ? 'dark' : 'light');
    };
    if (!mounted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: children
        }, void 0, false);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: {
            theme,
            toggleTheme,
            setTheme
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/ThemeContext.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
_s(ThemeProvider, "irO646EbSVqPL90dedilwyEs6oc=");
_c = ThemeProvider;
function useTheme() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
_s1(useTheme, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_bfd53991._.js.map