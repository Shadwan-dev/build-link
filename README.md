¡Excelente! Aquí tienes un README completo y actualizado con todo lo que hemos construido y lo que falta por hacer.
⚔️ Iglesia Quest - MMO RPG Bíblico
📖 Descripción del Proyecto

Iglesia Quest es un MMO RPG educativo diseñado para dinámicas de iglesia, donde los jugadores aprenden sobre la Biblia mientras completan misiones, derrotan jefes bíblicos y compiten en un leaderboard global. El juego combina mecánicas de RPG clásico con contenido bíblico, fomentando el aprendizaje colaborativo.
✅ LO QUE YA ESTÁ IMPLEMENTADO
🎮 Sistema Core del Juego
Característica Estado Descripción
Sistema de Clases ✅ Completado 4 clases: Guerrero, Sacerdote, Profeta, Discípulo con bonificaciones únicas
Sistema de Niveles ✅ Completado Experiencia, subida de nivel (cada 500 puntos)
Puntuación Global ✅ Completado Puntos acumulables para leaderboard
Misiones Bíblicas ✅ Completado Preguntas y respuestas con versículos bíblicos
Bonificaciones por Clase ✅ Completado +15% en categorías específicas según clase
🏪 Sistema Económico
Característica Estado Descripción
Sistema de Oro ✅ Completado Moneda del juego para transacciones
Tienda Básica ✅ Completado Compra/venta de items (en desarrollo)
Inventario ✅ Completado Almacenamiento de items y equipo
🌍 Mundo y Progresión
Característica Estado Descripción
Pueblos ✅ Completado 3 pueblos: Aldea Emaús (Nv1), Jericó (Nv5), Jerusalén (Nv10)
Desbloqueo Progresivo ✅ Completado Pueblos se desbloquean al subir de nivel
Mazmorras 🚧 En desarrollo Sistema de colas y matchmaking implementado
Jefes Bíblicos ✅ Completado 5 jefes con historias bíblicas y versículos
👥 Sistema Multiplayer
Característica Estado Descripción
Sistema de Colas ✅ Completado Matchmaking automático para mazmorras
Roles (Tank/Healer/DPS) ✅ Completado Sistema de roles con bonificaciones
Partidas en Solitario ✅ Completado Permitido cuando no hay suficientes jugadores
Grupos Cooperativos 🚧 En desarrollo 2-3 jugadores por mazmorra
🎨 Sistema Visual
Característica Estado Descripción
UI/UX Moderna ✅ Completado Glassmorphism, gradientes, animaciones
Efectos Visuales ✅ Completado Partículas, daño flotante, confeti
Animaciones ✅ Completado Transiciones, hover effects, loading states
Diseño Responsive ✅ Completado Mobile/Desktop adaptable
🔥 Backend y Persistencia
Característica Estado Descripción
Firebase Auth ✅ Completado Autenticación anónima
Firestore Database ✅ Completado Estructura de datos implementada
Sincronización Tiempo Real ✅ Completado Leaderboard y datos de jugador en vivo
Reglas de Seguridad ✅ Completado Reglas Firestore configuradas
🏗️ ARQUITECTURA TÉCNICA
Frontend
typescript

- Next.js 16 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (animaciones)

Backend
typescript

- Firebase Authentication
- Cloud Firestore
- Firebase Storage (para futuros assets)

Estructura de Carpetas
text

src/
├── app/ # Páginas Next.js
│ ├── game/page.tsx # Dashboard del juego
│ ├── layout.tsx # Layout principal
│ └── page.tsx # Landing + selección de clase
├── components/
│ ├── game/ # Componentes del juego
│ │ ├── CharacterPanel.tsx
│ │ ├── DailyQuests.tsx
│ │ ├── DungeonBattle.tsx
│ │ ├── DungeonList.tsx
│ │ ├── DungeonQueue.tsx
│ │ ├── LeaderboardPanel.tsx
│ │ ├── QuickQuests.tsx
│ │ ├── Shop.tsx
│ │ └── TownSelector.tsx
│ └── ui/ # Componentes UI reusables
│ ├── AnimatedCard.tsx
│ ├── ConfettiVictory.tsx
│ ├── FloatingDamage.tsx
│ ├── GlowingText.tsx
│ ├── HealthBar.tsx
│ ├── Modal.tsx
│ ├── ParticleEffect.tsx
│ └── TypewriterText.tsx
├── hooks/
│ ├── useAuth.ts
│ └── useFirebaseSync.ts # Sincronización con Firebase
├── lib/
│ ├── data/ # Datos estáticos
│ │ ├── dungeons.ts
│ │ ├── equipment.ts
│ │ ├── quests.ts
│ │ └── towns.ts
│ ├── firebase/ # Configuración Firebase
│ │ ├── config.ts
│ │ └── firestore.ts
│ ├── matchmaking/ # Sistema de colas
│ │ └── QueueManager.ts
│ └── types/ # Tipos TypeScript
│ ├── game.ts
│ └── multiplayer.ts

🗺️ LO QUE ESTÁ POR HACER (ROADMAP)
🚧 FASE 1 - Completar Sistema Core (Prioridad Alta)
Tarea Prioridad Estimación
Sistema de Combate Completo 🔴 Alta 3 días

- Implementar habilidades especiales por clase 🔴 Alta -
- Sistema de magia/oraciones 🟡 Media -
- Animaciones de ataque mejoradas 🟡 Media -
  Sistema de Equipo Completo 🔴 Alta 2 días
- Stats afectan combate real 🔴 Alta -
- Sistema de forja/mejora 🟡 Media -
- Items con efectos especiales 🟢 Baja -
  Mazmorras Multijugador 🔴 Alta 3 días
- Invitaciones a amigos 🔴 Alta -
- Chat en mazmorra 🟡 Media -
- Sistema de recompensas por tiempo 🟡 Media -
  🚧 FASE 2 - Contenido y Progresión (Prioridad Media)
  Tarea Prioridad Estimación
  Más Pueblos y Mazmorras 🟡 Media 5 días
- 3 pueblos adicionales 🟡 Media -
- 6 nuevas mazmorras 🟡 Media -
- 15 nuevos jefes 🟡 Media -
  Sistema de Logros 🟡 Media 2 días
- 50+ logros bíblicos 🟡 Media -
- Recompensas por logros 🟡 Media -
  Eventos Especiales 🟡 Media 2 días
- Eventos semanales de iglesia 🟡 Media -
- Misiones temporales 🟡 Media -
  🚧 FASE 3 - Social y Competitivo (Prioridad Media-Baja)
  Tarea Prioridad Estimación
  Clanes/Gremios 🟡 Media 3 días
- Crear/clanes 🟡 Media -
- Mazmorras de clan 🟡 Media -
- Ranking de clanes 🟡 Media -
  Torneos y Competencias 🟢 Baja 3 días
- Torneos semanales 🟢 Baja -
- Recompensas exclusivas 🟢 Baja -
- Sistema de temporadas 🟢 Baja -
  🚧 FASE 4 - Mejoras Visuales y de Experiencia (Prioridad Baja)
  Tarea Prioridad Estimación
  Sprites y Arte 🟢 Baja 7 días
- Pixel art para personajes 🟢 Baja -
- Animaciones de sprites 🟢 Baja -
- Fondos temáticos 🟢 Baja -
  Sonido y Música 🟢 Baja 3 días
- Efectos de sonido 🟢 Baja -
- Música ambiental por zona 🟢 Baja -
- Voces para jefes 🟢 Baja -
  📊 ESTADÍSTICAS ACTUALES
  Contenido Implementado

      ✅ 4 clases jugables

      ✅ 3 pueblos (con sistema de desbloqueo)

      ✅ 5 jefes bíblicos (con versículos)

      ✅ 10+ misiones bíblicas

      ✅ 15+ items de equipo

      ✅ Sistema de matchmaking con roles

      ✅ Leaderboard en tiempo real

Código Base

    📁 25+ componentes TypeScript

    🎨 8 componentes UI reusables

    🔥 Firestore integrado con reglas personalizadas

    🎮 Sistema de combate por turnos implementado

🚀 CÓMO EJECUTAR EL PROYECTO
Requisitos Previos
bash

- Node.js 18+
- npm o yarn
- Cuenta de Firebase (para producción)

Instalación
bash

# Clonar repositorio

git clone [url-del-repo]

# Instalar dependencias

npm install

# Configurar variables de entorno (Firebase)

cp .env.example .env.local

# Editar .env.local con tus credenciales de Firebase

# Ejecutar en desarrollo

npm run dev

# Build para producción

npm run build
npm start

Variables de Entorno Necesarias
env

NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxx
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxx

📝 NOTAS PARA EL EQUIPO
Decisiones Técnicas Importantes

    Next.js App Router - Para SSR y mejores prácticas de routing

    Firebase sobre backend custom - Rapidez de desarrollo y escalabilidad

    Tailwind CSS - Estilos consistentes y rápida iteración

    Componentes UI reusables - Mantenibilidad y consistencia visual

Patrones de Diseño Utilizados

    Componentización - Separación clara de responsabilidades

    Custom Hooks - Lógica reutilizable (useFirebaseSync)

    Singleton Pattern - QueueManager para matchmaking global

    Observer Pattern - Sincronización en tiempo real con Firestore

Pruebas Pendientes

    Tests unitarios para componentes críticos

    Tests de integración para sistema de combate

    Tests E2E para flujo completo de juego

🐛 PROBLEMAS CONOCIDOS
Problema Estado Solución Propuesta
Sistema de grupos aún no 100% funcional 🟡 En investigación Completar matchmaking real con Firestore
Items equipados no afectan stats en combate 🟡 En desarrollo Implementar cálculo de stats en tiempo real
Mazmorras solo modo solitario 🟢 Por hacer Implementar coordinación multijugador
🤝 CONTRIBUCIONES

Para contribuir al proyecto:

    Crear rama feature/nombre-feature

    Seguir convenciones de código (ESLint + Prettier)

    Actualizar documentación si es necesario

    Crear Pull Request con descripción clara

📄 LICENCIA

Este proyecto es para uso interno de la iglesia. Todos los derechos reservados.
🎯 PRÓXIMO HITO

Completar Sistema de Combate Multijugador (estimado: 1 semana)

Objetivos:

    Conectar matchmaking real con Firestore

    Implementar combate sincronizado entre jugadores

    Sistema de recompensas por tiempo

    Chat básico en mazmorras

📞 CONTACTO

Para dudas o sugerencias sobre el proyecto, contactar al equipo de desarrollo.

Última actualización: 25 de Abril, 2026
Versión actual: 0.5.0 (Pre-alpha)
Estado: En desarrollo activo 🚀
# build-link
