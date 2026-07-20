(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/constants/categories.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CATEGORIES",
    ()=>CATEGORIES
]);
const CATEGORIES = [
    {
        id: 'construction',
        label: 'Construcción',
        icon: '🏗️',
        description: 'Servicios de construcción en general'
    },
    {
        id: 'carpentry',
        label: 'Carpintería',
        icon: '🪚',
        description: 'Servicios de carpintería y muebles'
    },
    {
        id: 'roofing',
        label: 'Techos',
        icon: '🏠',
        description: 'Instalación y reparación de techos'
    },
    {
        id: 'plumbing',
        label: 'Plomería',
        icon: '🔧',
        description: 'Servicios de plomería e instalaciones hidráulicas'
    },
    {
        id: 'gardening',
        label: 'Jardinería',
        icon: '🌿',
        description: 'Servicios de jardinería y paisajismo'
    },
    {
        id: 'electrical',
        label: 'Electricidad',
        icon: '⚡',
        description: 'Servicios eléctricos e instalaciones'
    },
    {
        id: 'painting',
        label: 'Pintura',
        icon: '🎨',
        description: 'Servicios de pintura y decoración'
    },
    {
        id: 'masonry',
        label: 'Albañilería',
        icon: '🧱',
        description: 'Servicios de albañilería y mampostería'
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/firebase/catalog.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createCategory",
    ()=>createCategory,
    "getAllCategories",
    ()=>getAllCategories,
    "getAllSpecialties",
    ()=>getAllSpecialties,
    "getCategoryById",
    ()=>getCategoryById,
    "getFullCatalog",
    ()=>getFullCatalog,
    "getProviderSpecialties",
    ()=>getProviderSpecialties,
    "getSpecialtiesByCategory",
    ()=>getSpecialtiesByCategory,
    "getSpecialtyById",
    ()=>getSpecialtyById,
    "getSubSpecialtiesBySpecialty",
    ()=>getSubSpecialtiesBySpecialty,
    "searchProvidersBySpecialty",
    ()=>searchProvidersBySpecialty,
    "updateCategory",
    ()=>updateCategory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase/config.ts [app-client] (ecmascript)");
;
;
// ============================================
// FUNCIONES AUXILIARES
// ============================================
const getDb = ()=>{
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"]) throw new Error('Firestore no está disponible');
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"];
};
const getAllCategories = async ()=>{
    try {
        const dbInstance = getDb();
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(dbInstance, 'categories'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])('isActive', '==', true), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])('order', 'asc'));
        const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
        const categories = [];
        snapshot.forEach((doc)=>{
            categories.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return categories;
    } catch (error) {
        console.error('Error obteniendo categorías:', error);
        return [];
    }
};
const getCategoryById = async (categoryId)=>{
    try {
        const dbInstance = getDb();
        const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'categories', categoryId);
        const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(docRef);
        if (snapshot.exists()) {
            return {
                id: snapshot.id,
                ...snapshot.data()
            };
        }
        return null;
    } catch (error) {
        console.error('Error obteniendo categoría:', error);
        return null;
    }
};
const getAllSpecialties = async ()=>{
    try {
        const dbInstance = getDb();
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(dbInstance, 'specialties'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])('isActive', '==', true), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])('categoryId', 'asc'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])('order', 'asc'));
        const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
        const specialties = [];
        snapshot.forEach((doc)=>{
            specialties.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return specialties;
    } catch (error) {
        console.error('Error obteniendo especialidades:', error);
        return [];
    }
};
const getSpecialtiesByCategory = async (categoryId)=>{
    try {
        const dbInstance = getDb();
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(dbInstance, 'specialties'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])('categoryId', '==', categoryId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])('isActive', '==', true), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])('order', 'asc'));
        const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
        const specialties = [];
        snapshot.forEach((doc)=>{
            specialties.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return specialties;
    } catch (error) {
        console.error('Error obteniendo especialidades por categoría:', error);
        return [];
    }
};
const getSpecialtyById = async (specialtyId)=>{
    try {
        const dbInstance = getDb();
        const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'specialties', specialtyId);
        const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(docRef);
        if (snapshot.exists()) {
            return {
                id: snapshot.id,
                ...snapshot.data()
            };
        }
        return null;
    } catch (error) {
        console.error('Error obteniendo especialidad:', error);
        return null;
    }
};
const getSubSpecialtiesBySpecialty = async (specialtyId)=>{
    try {
        const dbInstance = getDb();
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(dbInstance, 'subSpecialties'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])('specialtyId', '==', specialtyId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])('isActive', '==', true), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])('order', 'asc'));
        const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
        const subSpecialties = [];
        snapshot.forEach((doc)=>{
            subSpecialties.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return subSpecialties;
    } catch (error) {
        console.error('Error obteniendo subespecialidades:', error);
        return [];
    }
};
const getFullCatalog = async ()=>{
    try {
        const dbInstance = getDb();
        // Obtener todo en paralelo
        const [categories, specialties, subSpecialties] = await Promise.all([
            getAllCategories(),
            getAllSpecialties(),
            // Obtener todas las subespecialidades (limitado)
            getSubSpecialtiesBySpecialty('all')
        ]);
        return {
            categories,
            specialties,
            subSpecialties,
            lastUpdated: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Timestamp"].now(),
            version: '1.0.0'
        };
    } catch (error) {
        console.error('Error obteniendo catálogo completo:', error);
        return {
            categories: [],
            specialties: [],
            subSpecialties: [],
            lastUpdated: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Timestamp"].now(),
            version: '1.0.0'
        };
    }
};
const createCategory = async (data)=>{
    try {
        const dbInstance = getDb();
        const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(dbInstance, 'categories'));
        const now = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])();
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(docRef, {
            ...data,
            createdAt: now,
            updatedAt: now
        });
        return docRef.id;
    } catch (error) {
        console.error('Error creando categoría:', error);
        throw new Error('Error al crear la categoría');
    }
};
const updateCategory = async (categoryId, data)=>{
    try {
        const dbInstance = getDb();
        const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'categories', categoryId);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateDoc"])(docRef, {
            ...data,
            updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
        });
    } catch (error) {
        console.error('Error actualizando categoría:', error);
        throw new Error('Error al actualizar la categoría');
    }
};
const getProviderSpecialties = async (providerId)=>{
    try {
        const dbInstance = getDb();
        const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'providers', providerId);
        const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(docRef);
        if (snapshot.exists()) {
            const data = snapshot.data();
            const specialtyIds = data.specialties || [];
            // Obtener detalles de cada especialidad
            const specialties = [];
            for (const id of specialtyIds){
                const specialty = await getSpecialtyById(id);
                if (specialty) {
                    const category = await getCategoryById(specialty.categoryId);
                    specialties.push({
                        specialtyId: specialty.id,
                        name: specialty.name,
                        categoryId: specialty.categoryId,
                        categoryName: category?.name || 'Sin categoría',
                        experience: data.experience || 0,
                        rate: data.rate,
                        isVerified: data.isVerified || false,
                        certifications: data.certifications || [],
                        portfolioIds: data.portfolioIds || []
                    });
                }
            }
            return specialties;
        }
        return [];
    } catch (error) {
        console.error('Error obteniendo especialidades del proveedor:', error);
        return [];
    }
};
const searchProvidersBySpecialty = async (specialtyId, location)=>{
    try {
        const dbInstance = getDb();
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(dbInstance, 'providers'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])('specialties', 'array-contains', specialtyId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])('isActive', '==', true));
        const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
        const providers = [];
        for (const doc of snapshot.docs){
            const data = doc.data();
            const providerSpecialties = await getProviderSpecialties(doc.id);
            // Filtrar por ubicación si se especifica
            if (location && data.location !== location) continue;
            providers.push({
                uid: doc.id,
                displayName: data.displayName,
                email: data.email,
                phone: data.phone,
                photoURL: data.photoURL,
                location: data.location,
                specialties: providerSpecialties,
                categories: data.categories || [],
                rating: data.rating || 0,
                totalRatings: data.totalRatings || 0,
                isActive: data.isActive,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt
            });
        }
        return providers;
    } catch (error) {
        console.error('Error buscando proveedores:', error);
        return [];
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/firebase/requests.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "countRequestsByStatus",
    ()=>countRequestsByStatus,
    "countRequestsByStatusAndCategory",
    ()=>countRequestsByStatusAndCategory,
    "createRequest",
    ()=>createRequest,
    "deleteRequest",
    ()=>deleteRequest,
    "getClientRequests",
    ()=>getClientRequests,
    "getFilteredRequests",
    ()=>getFilteredRequests,
    "getPendingRequests",
    ()=>getPendingRequests,
    "getProviderRequests",
    ()=>getProviderRequests,
    "getRequestById",
    ()=>getRequestById,
    "getRequestStatsByCategory",
    ()=>getRequestStatsByCategory,
    "getRequestsByCategory",
    ()=>getRequestsByCategory,
    "getRequestsBySpecialty",
    ()=>getRequestsBySpecialty,
    "updateRequestStatus",
    ()=>updateRequestStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$catalog$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase/catalog.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$notification$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase/notification.service.ts [app-client] (ecmascript)");
;
;
;
;
const COLLECTION_NAME = 'requests';
const DEFAULT_PAGE_SIZE = 20;
const getDb = ()=>{
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"]) throw new Error('Firestore no está disponible');
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"];
};
// ============================================
// VALIDACIÓN DE DATOS CON CATEGORÍAS
// ============================================
const validateRequestData = async (data)=>{
    if (!data.clientId) throw new Error('El ID del cliente es requerido');
    if (!data.clientName) throw new Error('El nombre del cliente es requerido');
    if (!data.providerId) throw new Error('El ID del proveedor es requerido');
    if (!data.providerName) throw new Error('El nombre del proveedor es requerido');
    if (!data.categoryId) throw new Error('La categoría es requerida');
    if (!data.description || data.description.length < 10) {
        throw new Error('La descripción debe tener al menos 10 caracteres');
    }
    // ✅ Validar que la categoría existe
    const category = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$catalog$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCategoryById"])(data.categoryId);
    if (!category) {
        throw new Error('La categoría seleccionada no existe');
    }
    // ✅ Si hay especialidad, validar que existe y pertenece a la categoría
    if (data.specialtyId) {
        const specialty = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$catalog$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSpecialtyById"])(data.specialtyId);
        if (!specialty) {
            throw new Error('La especialidad seleccionada no existe');
        }
        if (specialty.categoryId !== data.categoryId) {
            throw new Error('La especialidad no pertenece a la categoría seleccionada');
        }
    }
    return {
        category,
        specialty: data.specialtyId ? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$catalog$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSpecialtyById"])(data.specialtyId) : null
    };
};
// ============================================
// MAPEO DE SOLICITUDES
// ============================================
const mapRequestFromDoc = (doc)=>({
        id: doc.id,
        ...doc.data()
    });
const mapRequestsFromSnapshot = (snapshot)=>{
    const requests = [];
    snapshot.forEach((doc)=>{
        requests.push(mapRequestFromDoc(doc));
    });
    return requests;
};
const createRequest = async (data)=>{
    try {
        console.log('📝 Datos recibidos en createRequest:', data);
        // ✅ Validar datos requeridos
        if (!data.clientId) throw new Error('El ID del cliente es requerido');
        if (!data.clientName) throw new Error('El nombre del cliente es requerido');
        if (!data.providerId) throw new Error('El ID del proveedor es requerido');
        if (!data.providerName) throw new Error('El nombre del proveedor es requerido');
        if (!data.categoryId) throw new Error('La categoría es requerida');
        if (!data.description || data.description.length < 10) {
            throw new Error('La descripción debe tener al menos 10 caracteres');
        }
        const dbInstance = getDb();
        // ✅ Validar que el usuario es un cliente
        try {
            const userDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'users', data.clientId));
            if (!userDoc.exists()) {
                console.warn('⚠️ Usuario no encontrado en Firestore, pero continuamos...');
            } else {
                const userData = userDoc.data();
                if (userData.role !== 'client') {
                    throw new Error('Solo los clientes pueden crear solicitudes');
                }
            }
        } catch (userError) {
            console.warn('⚠️ Error verificando usuario:', userError);
        // No bloqueamos la creación si hay error de lectura
        }
        // ✅ Validar que el proveedor existe (opcional, no bloqueante)
        try {
            const providerDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(dbInstance, 'providers', data.providerId));
            if (!providerDoc.exists()) {
                console.warn('⚠️ Proveedor no encontrado en Firestore, pero continuamos...');
            }
        } catch (providerError) {
            console.warn('⚠️ Error verificando proveedor:', providerError);
        // No bloqueamos la creación si hay error de lectura
        }
        const requestsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(dbInstance, COLLECTION_NAME);
        const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(requestsRef);
        const now = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])();
        // ✅ Datos enriquecidos - SOLO con campos que existen en el tipo
        const requestData = {
            // Campos obligatorios
            clientId: data.clientId,
            clientName: data.clientName,
            providerId: data.providerId,
            providerName: data.providerName,
            categoryId: data.categoryId,
            categoryName: data.categoryName,
            description: data.description,
            status: 'pendiente',
            createdAt: now,
            updatedAt: now,
            // Campos opcionales
            clientEmail: data.clientEmail || '',
            clientPhone: data.clientPhone || '',
            budget: data.budget || null,
            location: data.location || '',
            urgency: data.urgency || 'normal',
            timeline: data.timeline || '',
            estimatedTime: data.estimatedTime || '',
            specialtyId: data.specialtyId || '',
            specialtyName: data.specialtyName || '',
            images: data.images || [],
            response: '',
            whatsappContact: '',
            // Campos adicionales para tracking
            providerResponse: null,
            clientFeedback: null
        };
        console.log('📝 Guardando solicitud en Firestore:', requestData);
        // ✅ Guardar en Firestore
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(docRef, requestData);
        console.log(`✅ Solicitud creada: ${docRef.id}`);
        // ✅ Crear notificaciones (solo si la función existe)
        try {
            const { createNotification } = await __turbopack_context__.A("[project]/src/lib/firebase/notification.service.ts [app-client] (ecmascript, async loader)");
            await Promise.all([
                createNotification(data.providerId, `📩 Nueva solicitud de ${data.clientName}`, `${data.clientName} ha enviado una solicitud para: ${data.categoryName}`, 'request', `/dashboard/requests/${docRef.id}`),
                createNotification(data.clientId, '✅ Solicitud enviada', `Tu solicitud para ${data.categoryName} ha sido enviada a ${data.providerName}`, 'response', `/dashboard/requests/${docRef.id}`)
            ]);
        } catch (notifError) {
            console.warn('⚠️ Error creando notificaciones (no bloqueante):', notifError);
        // No bloqueamos la creación si fallan las notificaciones
        }
        return docRef.id;
    } catch (error) {
        console.error('❌ Error creando solicitud:', error);
        throw new Error(error instanceof Error ? error.message : 'Error al enviar la solicitud');
    }
};
const getRequestsByCategory = async (categoryId, status)=>{
    try {
        const dbInstance = getDb();
        const constraints = [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])('categoryId', '==', categoryId),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])('createdAt', 'desc')
        ];
        if (status) {
            constraints.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])('status', '==', status));
        }
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(dbInstance, COLLECTION_NAME), ...constraints);
        const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
        return mapRequestsFromSnapshot(snapshot);
    } catch (error) {
        console.error('❌ Error obteniendo solicitudes por categoría:', error);
        return [];
    }
};
const getRequestsBySpecialty = async (specialtyId, status)=>{
    try {
        const dbInstance = getDb();
        const constraints = [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])('specialtyId', '==', specialtyId),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])('createdAt', 'desc')
        ];
        if (status) {
            constraints.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])('status', '==', status));
        }
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(dbInstance, COLLECTION_NAME), ...constraints);
        const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
        return mapRequestsFromSnapshot(snapshot);
    } catch (error) {
        console.error('❌ Error obteniendo solicitudes por especialidad:', error);
        return [];
    }
};
const getRequestStatsByCategory = async ()=>{
    try {
        const dbInstance = getDb();
        const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(dbInstance, COLLECTION_NAME));
        const requests = mapRequestsFromSnapshot(snapshot);
        // ✅ Agrupar por categoría
        const statsMap = new Map();
        requests.forEach((req)=>{
            const key = req.categoryId;
            if (!statsMap.has(key)) {
                statsMap.set(key, {
                    categoryId: req.categoryId,
                    categoryName: req.categoryName,
                    total: 0,
                    pendiente: 0,
                    completado: 0
                });
            }
            const stat = statsMap.get(key);
            stat.total += 1;
            if (req.status === 'pendiente') stat.pendiente += 1;
            if (req.status === 'completado') stat.completado += 1;
        });
        return Array.from(statsMap.values());
    } catch (error) {
        console.error('❌ Error obteniendo estadísticas por categoría:', error);
        return [];
    }
};
const countRequestsByStatusAndCategory = async (userId, role)=>{
    try {
        const dbInstance = getDb();
        const field = role === 'client' ? 'clientId' : 'providerId';
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(dbInstance, COLLECTION_NAME), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])(field, '==', userId));
        const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
        const requests = mapRequestsFromSnapshot(snapshot);
        // ✅ Contar por estado
        const byStatus = {
            pendiente: 0,
            aceptado: 0,
            rechazado: 0,
            'en-progreso': 0,
            completado: 0
        };
        // ✅ Contar por categoría
        const byCategory = {};
        requests.forEach((req)=>{
            // Por estado
            byStatus[req.status] = (byStatus[req.status] || 0) + 1;
            // Por categoría
            const key = req.categoryId;
            byCategory[key] = (byCategory[key] || 0) + 1;
        });
        return {
            byStatus,
            byCategory
        };
    } catch (error) {
        console.error('❌ Error contando solicitudes:', error);
        return {
            byStatus: {
                pendiente: 0,
                aceptado: 0,
                rechazado: 0,
                'en-progreso': 0,
                completado: 0
            },
            byCategory: {}
        };
    }
};
const getFilteredRequests = async (userId, role, filters = {})=>{
    try {
        const dbInstance = getDb();
        const constraints = [];
        // ✅ Filtro por usuario y rol
        const field = role === 'client' ? 'clientId' : 'providerId';
        constraints.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])(field, '==', userId));
        // ✅ Filtro por estado
        if (filters.status) {
            constraints.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])('status', '==', filters.status));
        }
        // ✅ Filtro por categoría (MEJORADO)
        if (filters.categoryId) {
            constraints.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])('categoryId', '==', filters.categoryId));
        }
        // ✅ Filtro por especialidad
        if (filters.specialtyId) {
            constraints.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])('specialtyId', '==', filters.specialtyId));
        }
        // ✅ Filtro por urgencia
        if (filters.urgency) {
            constraints.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])('urgency', '==', filters.urgency));
        }
        // ✅ Filtro por presupuesto (rangos)
        if (filters.minBudget !== undefined) {
            constraints.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])('budget', '>=', filters.minBudget));
        }
        if (filters.maxBudget !== undefined) {
            constraints.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])('budget', '<=', filters.maxBudget));
        }
        // ✅ Ordenar por fecha
        constraints.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])('createdAt', 'desc'));
        // ✅ Límite
        if (filters.limit) {
            constraints.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["limit"])(filters.limit));
        }
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(dbInstance, COLLECTION_NAME), ...constraints);
        const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
        let requests = mapRequestsFromSnapshot(snapshot);
        // ✅ Filtro por búsqueda (en memoria)
        if (filters.search) {
            const search = filters.search.toLowerCase();
            requests = requests.filter((r)=>r.clientName.toLowerCase().includes(search) || r.providerName.toLowerCase().includes(search) || r.categoryName.toLowerCase().includes(search) || r.description.toLowerCase().includes(search));
        }
        return requests;
    } catch (error) {
        console.error('❌ Error obteniendo solicitudes filtradas:', error);
        return [];
    }
};
const getRequestById = async (requestId)=>{
    try {
        if (!requestId) throw new Error('El ID de la solicitud es requerido');
        const dbInstance = getDb();
        const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(dbInstance, COLLECTION_NAME, requestId);
        const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(docRef);
        if (snapshot.exists()) {
            return mapRequestFromDoc(snapshot);
        }
        console.warn(`⚠️ Solicitud no encontrada: ${requestId}`);
        return null;
    } catch (error) {
        console.error(`❌ Error obteniendo solicitud ${requestId}:`, error);
        return null;
    }
};
const updateRequestStatus = async (requestId, status, response, whatsappContact)=>{
    try {
        if (!requestId) throw new Error('El ID de la solicitud es requerido');
        if (!status) throw new Error('El estado es requerido');
        const dbInstance = getDb();
        const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(dbInstance, COLLECTION_NAME, requestId);
        // ✅ Obtener la solicitud antes de actualizar
        const request = await getRequestById(requestId);
        if (!request) {
            throw new Error('Solicitud no encontrada');
        }
        // ✅ Datos a actualizar
        const updateData = {
            status,
            updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
        };
        if (response) updateData.response = response;
        if (whatsappContact) updateData.whatsappContact = whatsappContact;
        // ✅ Actualizar en Firestore
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateDoc"])(docRef, updateData);
        console.log(`✅ Solicitud ${requestId} actualizada a: ${status}`);
        // ✅ Crear notificaciones según el estado
        await createStatusNotifications(request, status, {
            response,
            whatsappContact
        });
    } catch (error) {
        console.error('❌ Error actualizando solicitud:', error);
        throw new Error(error instanceof Error ? error.message : 'Error al actualizar la solicitud');
    }
};
// ============================================
// 9️⃣ FUNCIÓN AUXILIAR: NOTIFICACIONES POR ESTADO
// ============================================
const createStatusNotifications = async (request, status, options)=>{
    const statusMessages = {
        pendiente: null,
        aceptado: {
            title: `✅ Solicitud aceptada por ${request.providerName}`,
            message: `${request.providerName} ha aceptado tu solicitud. ${options?.whatsappContact ? `Contacto: ${options.whatsappContact}` : ''}`
        },
        rechazado: {
            title: `❌ Solicitud rechazada por ${request.providerName}`,
            message: `${request.providerName} ha rechazado tu solicitud. Motivo: ${options?.response || 'No especificado'}`
        },
        'en-progreso': {
            title: `🔄 Solicitud en progreso`,
            message: `${request.providerName} está trabajando en tu solicitud`
        },
        completado: {
            title: `✅ Solicitud completada`,
            message: `${request.providerName} ha completado tu solicitud. ¡Califica su trabajo!`
        }
    };
    const notification = statusMessages[status];
    if (notification) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$notification$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createNotification"])(request.clientId, notification.title, notification.message, 'response', `/dashboard/requests/${request.id}`);
    }
};
const getClientRequests = async (clientId, status)=>{
    try {
        const dbInstance = getDb();
        const constraints = [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])('clientId', '==', clientId)
        ];
        if (status) {
            constraints.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])('status', '==', status));
        }
        constraints.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])('createdAt', 'desc'));
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(dbInstance, COLLECTION_NAME), ...constraints);
        const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
        return mapRequestsFromSnapshot(snapshot);
    } catch (error) {
        console.error('❌ Error obteniendo solicitudes del cliente:', error);
        return [];
    }
};
const getProviderRequests = async (providerId, status)=>{
    try {
        const dbInstance = getDb();
        const constraints = [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])('providerId', '==', providerId)
        ];
        if (status) {
            constraints.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])('status', '==', status));
        }
        constraints.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])('createdAt', 'desc'));
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(dbInstance, COLLECTION_NAME), ...constraints);
        const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
        return mapRequestsFromSnapshot(snapshot);
    } catch (error) {
        console.error('❌ Error obteniendo solicitudes del proveedor:', error);
        return [];
    }
};
const getPendingRequests = async (limitCount = DEFAULT_PAGE_SIZE)=>{
    try {
        const dbInstance = getDb();
        const constraints = [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])('status', '==', 'pendiente'),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])('createdAt', 'desc'),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["limit"])(limitCount)
        ];
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(dbInstance, COLLECTION_NAME), ...constraints);
        const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
        return mapRequestsFromSnapshot(snapshot);
    } catch (error) {
        console.error('❌ Error obteniendo solicitudes pendientes:', error);
        return [];
    }
};
const countRequestsByStatus = async (userId, role)=>{
    try {
        const dbInstance = getDb();
        const field = role === 'client' ? 'clientId' : 'providerId';
        const statuses = [
            'pendiente',
            'aceptado',
            'rechazado',
            'en-progreso',
            'completado'
        ];
        const counts = {
            pendiente: 0,
            aceptado: 0,
            rechazado: 0,
            'en-progreso': 0,
            completado: 0
        };
        await Promise.all(statuses.map(async (status)=>{
            const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(dbInstance, COLLECTION_NAME), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])(field, '==', userId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])('status', '==', status));
            const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
            counts[status] = snapshot.size;
        }));
        return counts;
    } catch (error) {
        console.error('❌ Error contando solicitudes:', error);
        return {
            pendiente: 0,
            aceptado: 0,
            rechazado: 0,
            'en-progreso': 0,
            completado: 0
        };
    }
};
const deleteRequest = async (requestId)=>{
    try {
        const dbInstance = getDb();
        const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(dbInstance, COLLECTION_NAME, requestId);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateDoc"])(docRef, {
            status: 'eliminado',
            updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
        });
        console.log(`✅ Solicitud ${requestId} marcada como eliminada`);
    } catch (error) {
        console.error('❌ Error eliminando solicitud:', error);
        throw new Error('Error al eliminar la solicitud');
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NewRequestPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$RoleContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/RoleContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$categories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants/categories.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$requests$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase/requests.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.mjs [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.mjs [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/briefcase.mjs [app-client] (ecmascript) <export default as Briefcase>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.mjs [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.mjs [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/dollar-sign.mjs [app-client] (ecmascript) <export default as DollarSign>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.mjs [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.mjs [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield.mjs [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
function NewRequestPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { user, loading: authLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const { currentRole, hasRole, isLoading: roleLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$RoleContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRole"])();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        categoryId: '',
        categoryName: '',
        description: '',
        budget: '',
        location: '',
        urgency: 'normal',
        timeline: '',
        estimatedTime: '',
        specialtyId: '',
        specialtyName: ''
    });
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    // ✅ Verificar que el usuario es cliente
    const isClient = currentRole === 'client';
    const validateForm = ()=>{
        const newErrors = {};
        if (!formData.categoryId) {
            newErrors.categoryId = 'Selecciona una categoría';
        }
        if (!formData.description.trim()) {
            newErrors.description = 'La descripción es requerida';
        }
        if (formData.description.length < 20) {
            newErrors.description = 'La descripción debe tener al menos 20 caracteres';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!validateForm()) return;
        if (!user) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Debes iniciar sesión');
            return;
        }
        // ✅ Verificar rol antes de enviar
        if (!isClient) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Solo los clientes pueden crear solicitudes');
            return;
        }
        setLoading(true);
        try {
            console.log('📝 Enviando solicitud con datos:', {
                clientId: user.uid,
                clientName: user.displayName || 'Usuario',
                clientEmail: user.email || '',
                clientPhone: user.phone || '',
                categoryId: formData.categoryId,
                categoryName: formData.categoryName,
                description: formData.description,
                budget: formData.budget ? parseFloat(formData.budget) : undefined,
                location: formData.location || undefined,
                urgency: formData.urgency,
                timeline: formData.timeline || undefined,
                estimatedTime: formData.estimatedTime || undefined
            });
            // ✅ Necesitamos un providerId y providerName para la solicitud
            // Por ahora usamos valores de prueba, pero deberías obtenerlos de la URL o contexto
            const providerId = 'providerId_de_prueba'; // ← ¡REEMPLAZAR CON VALOR REAL!
            const providerName = 'Proveedor de prueba'; // ← ¡REEMPLAZAR CON VALOR REAL!
            const requestId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$requests$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRequest"])({
                clientId: user.uid,
                clientName: user.displayName || 'Usuario',
                clientEmail: user.email || '',
                clientPhone: user.phone || '',
                providerId: providerId,
                providerName: providerName,
                categoryId: formData.categoryId,
                categoryName: formData.categoryName,
                description: formData.description,
                budget: formData.budget ? parseFloat(formData.budget) : undefined,
                location: formData.location || undefined,
                urgency: formData.urgency,
                timeline: formData.timeline || undefined,
                estimatedTime: formData.estimatedTime || undefined,
                specialtyId: formData.specialtyId || undefined,
                specialtyName: formData.specialtyName || undefined
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('📩 Solicitud enviada correctamente');
            router.push(`/dashboard/requests/${requestId}`);
        } catch (error) {
            console.error('❌ Error al enviar solicitud:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error(error.message || 'Error al enviar la solicitud');
        } finally{
            setLoading(false);
        }
    };
    const handleCategoryChange = (categoryId)=>{
        const category = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$categories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORIES"].find((c)=>c.id === categoryId);
        setFormData({
            ...formData,
            categoryId,
            categoryName: category?.label || ''
        });
    };
    // ✅ Estados de carga
    if (authLoading || roleLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center min-h-[60vh]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                className: "w-8 h-8 animate-spin text-primary-600"
            }, void 0, false, {
                fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                lineNumber: 142,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
            lineNumber: 141,
            columnNumber: 7
        }, this);
    }
    // ✅ Verificar autenticación
    if (!user) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center py-12",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-xl font-semibold text-gray-900 dark:text-white",
                    children: "Debes iniciar sesión"
                }, void 0, false, {
                    fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                    lineNumber: 151,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/login",
                    className: "text-primary-600 hover:underline mt-2 inline-block",
                    children: "Iniciar sesión"
                }, void 0, false, {
                    fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                    lineNumber: 154,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
            lineNumber: 150,
            columnNumber: 7
        }, this);
    }
    // ✅ Verificar rol
    if (!hasRole) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center py-12",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mx-auto mb-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                        className: "w-8 h-8 text-yellow-600 dark:text-yellow-400"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                        lineNumber: 166,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                    lineNumber: 165,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-xl font-semibold text-gray-900 dark:text-white",
                    children: "Configura tu cuenta"
                }, void 0, false, {
                    fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                    lineNumber: 168,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-600 dark:text-gray-400 mt-2",
                    children: "Debes seleccionar un rol para crear solicitudes"
                }, void 0, false, {
                    fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                    lineNumber: 169,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/dashboard",
                    className: "text-primary-600 hover:underline mt-4 inline-block",
                    children: "Ir al dashboard"
                }, void 0, false, {
                    fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                    lineNumber: 172,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
            lineNumber: 164,
            columnNumber: 7
        }, this);
    }
    if (!isClient) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center py-12",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                        className: "w-8 h-8 text-red-600 dark:text-red-400"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                        lineNumber: 183,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                    lineNumber: 182,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-xl font-semibold text-gray-900 dark:text-white",
                    children: "Acceso restringido"
                }, void 0, false, {
                    fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                    lineNumber: 185,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-600 dark:text-gray-400 mt-2",
                    children: [
                        "Solo los clientes pueden crear solicitudes.",
                        currentRole === 'provider' && ' Eres un proveedor.'
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                    lineNumber: 186,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/dashboard",
                    className: "text-primary-600 hover:underline mt-4 inline-block",
                    children: "Volver al dashboard"
                }, void 0, false, {
                    fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                    lineNumber: 190,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
            lineNumber: 181,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-3xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4 mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/dashboard/requests",
                        className: "p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                            className: "w-5 h-5 text-gray-600 dark:text-gray-400"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                            lineNumber: 205,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                        lineNumber: 201,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-bold text-gray-900 dark:text-white",
                                children: "Nueva Solicitud"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                lineNumber: 208,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500 dark:text-gray-400",
                                children: "Describe tu proyecto y encuentra al profesional ideal"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                lineNumber: 209,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-400 dark:text-gray-500 mt-1",
                                children: [
                                    "Rol actual: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-medium text-primary-600",
                                        children: "Cliente"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                        lineNumber: 213,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                lineNumber: 212,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                        lineNumber: 207,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                lineNumber: 200,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: "bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5",
                                children: "Categoría del trabajo *"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                lineNumber: 225,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: formData.categoryId,
                                        onChange: (e)=>handleCategoryChange(e.target.value),
                                        className: `w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white appearance-none ${errors.categoryId ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "Selecciona una categoría..."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                                lineNumber: 236,
                                                columnNumber: 15
                                            }, this),
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$categories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORIES"].map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: cat.id,
                                                    children: [
                                                        cat.icon,
                                                        " ",
                                                        cat.label
                                                    ]
                                                }, cat.id, true, {
                                                    fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                                    lineNumber: 238,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                        lineNumber: 229,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__["Briefcase"], {
                                        className: "absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                        lineNumber: 243,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                lineNumber: 228,
                                columnNumber: 11
                            }, this),
                            errors.categoryId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-sm text-red-500 flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                        lineNumber: 247,
                                        columnNumber: 15
                                    }, this),
                                    errors.categoryId
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                lineNumber: 246,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                        lineNumber: 224,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5",
                                children: "Descripción del proyecto *"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                lineNumber: 255,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: formData.description,
                                onChange: (e)=>setFormData({
                                        ...formData,
                                        description: e.target.value
                                    }),
                                placeholder: "Describe detalladamente el trabajo que necesitas realizar...",
                                rows: 5,
                                className: `w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none ${errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`
                            }, void 0, false, {
                                fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                lineNumber: 258,
                                columnNumber: 11
                            }, this),
                            errors.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-sm text-red-500 flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                        lineNumber: 269,
                                        columnNumber: 15
                                    }, this),
                                    errors.description
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                lineNumber: 268,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-xs text-gray-500 dark:text-gray-400",
                                children: [
                                    formData.description.length,
                                    "/20 caracteres mínimo"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                lineNumber: 273,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                        lineNumber: 254,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"], {
                                                className: "w-4 h-4 inline"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                                lineNumber: 282,
                                                columnNumber: 15
                                            }, this),
                                            " Presupuesto estimado"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                        lineNumber: 281,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        value: formData.budget,
                                        onChange: (e)=>setFormData({
                                                ...formData,
                                                budget: e.target.value
                                            }),
                                        placeholder: "0",
                                        min: "0",
                                        step: "100",
                                        className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                        lineNumber: 284,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                lineNumber: 280,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                className: "w-4 h-4 inline"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                                lineNumber: 296,
                                                columnNumber: 15
                                            }, this),
                                            " Urgencia *"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                        lineNumber: 295,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: formData.urgency,
                                        onChange: (e)=>setFormData({
                                                ...formData,
                                                urgency: e.target.value
                                            }),
                                        className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "normal",
                                                children: "🟢 Normal"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                                lineNumber: 305,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "urgente",
                                                children: "🟡 Urgente"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                                lineNumber: 306,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "muy-urgente",
                                                children: "🔴 Muy urgente"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                                lineNumber: 307,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                        lineNumber: 298,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                lineNumber: 294,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                        lineNumber: 279,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                className: "w-4 h-4 inline"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                                lineNumber: 316,
                                                columnNumber: 15
                                            }, this),
                                            " Tiempo estimado"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                        lineNumber: 315,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: formData.estimatedTime,
                                        onChange: (e)=>setFormData({
                                                ...formData,
                                                estimatedTime: e.target.value
                                            }),
                                        placeholder: "Ej: 2 semanas, 1 mes...",
                                        className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                        lineNumber: 318,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                lineNumber: 314,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5",
                                        children: "📍 Ubicación"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                        lineNumber: 327,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: formData.location,
                                        onChange: (e)=>setFormData({
                                                ...formData,
                                                location: e.target.value
                                            }),
                                        placeholder: "Ej: Centro, Zona Norte...",
                                        className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                        lineNumber: 330,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                lineNumber: 326,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                        lineNumber: 313,
                        columnNumber: 9
                    }, this),
                    formData.categoryName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-600 dark:text-gray-300",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-medium",
                                    children: "📋 Resumen:"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                    lineNumber: 344,
                                    columnNumber: 15
                                }, this),
                                " Solicitud de",
                                ' ',
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-medium",
                                    children: formData.categoryName
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                    lineNumber: 345,
                                    columnNumber: 15
                                }, this),
                                formData.budget && ` · Presupuesto: $${parseFloat(formData.budget).toLocaleString()}`,
                                formData.urgency !== 'normal' && ` · ${formData.urgency === 'urgente' ? '🟡 Urgente' : '🔴 Muy urgente'}`,
                                formData.location && ` · 📍 ${formData.location}`
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                            lineNumber: 343,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                        lineNumber: 342,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3 pt-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>router.back(),
                                className: "flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition",
                                children: "Cancelar"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                lineNumber: 357,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: loading,
                                className: "flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50 flex items-center justify-center gap-2",
                                children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                            className: "w-5 h-5 animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                            lineNumber: 371,
                                            columnNumber: 17
                                        }, this),
                                        "Enviando..."
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                            className: "w-5 h-5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                            lineNumber: 376,
                                            columnNumber: 17
                                        }, this),
                                        "Enviar solicitud"
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                                lineNumber: 364,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                        lineNumber: 356,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
                lineNumber: 219,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(dashboard)/dashboard/requests/new/page.tsx",
        lineNumber: 198,
        columnNumber: 5
    }, this);
}
_s(NewRequestPage, "vp4jJcF670a7a9/4mocWUJ8uKGA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$RoleContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRole"]
    ];
});
_c = NewRequestPage;
var _c;
__turbopack_context__.k.register(_c, "NewRequestPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_97742a19._.js.map