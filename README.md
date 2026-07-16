# 🏗️ BuildLink

[![Next.js](https://img.shields.io/badge/Next.js-16.1.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.8.0-orange?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.19-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

**BuildLink** es una plataforma moderna que conecta clientes con profesionales verificados en construcción, albañilería, carpintería y más. Encuentra al experto que necesitas para tu proyecto.

🔗 **Demo:** [buildlink.vercel.app](https://buildlink.vercel.app)
📦 **Repositorio:** [github.com/Shadwan-dev/build-link](https://github.com/Shadwan-dev/build-link)

---

## ✨ Características

### 🔐 Autenticación

- Login con Email y Contraseña
- Login con Google (OAuth)
- Registro de usuarios con roles
- Verificación de email
- Recuperación de contraseña

### 👤 Roles de Usuario

| Rol           | Funcionalidades                                               |
| ------------- | ------------------------------------------------------------- |
| **Cliente**   | Buscar proveedores, publicar solicitudes, calificar servicios |
| **Proveedor** | Gestionar ofertas, recibir solicitudes, ver estadísticas      |
| **Admin**     | Verificar proveedores, gestionar usuarios, moderar contenido  |

### 📋 Módulos Principales

#### Dashboard

- Vista personalizada según rol
- Estadísticas en tiempo real
- Actividad reciente
- Acciones rápidas

#### Proveedores

- Listado con filtros y búsqueda
- Perfil detallado con portafolio
- Sistema de calificaciones y testimonios
- Verificación de proveedores

#### Solicitudes

- Creación de solicitudes por categoría
- Gestión de estados (pendiente, aceptado, rechazado)
- Sistema de ofertas y presupuestos
- Notificaciones automáticas

#### Ofertas de Trabajo

- Publicación de ofertas por proveedores
- Gestión de ofertas (crear, editar, eliminar)
- Estadísticas de visualizaciones
- Solicitudes de clientes

#### Mensajería

- Chat en tiempo real
- Conversaciones organizadas por solicitud
- Notificaciones de nuevos mensajes
- Sistema de no leídos

#### Notificaciones

- Campana en el navbar
- Notificaciones en tiempo real
- Marcado como leído
- Historial completo

### 🎨 Diseño

- Modo oscuro/claro
- Diseño mobile-first
- Animaciones suaves
- UI moderna y profesional

---

## 🚀 Tecnologías

### Frontend

- **Next.js 16** - Framework React con SSR
- **TypeScript** - Tipado estático
- **TailwindCSS** - Estilos y diseño
- **Framer Motion** - Animaciones
- **Lucide React** - Iconos

### Backend & Database

- **Firebase Auth** - Autenticación
- **Firestore** - Base de datos NoSQL
- **Firebase Functions** - Serverless
- **Firebase Storage** - Almacenamiento

### Herramientas

- **ESLint** - Linting
- **Prettier** - Formateo
- **Vercel** - Despliegue

---

## 📦 Instalación

### Prerrequisitos

- Node.js 20+
- npm 10+
- Firebase account

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/Shadwan-dev/build-link.git
cd build-link

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales de Firebase

# 4. Ejecutar en desarrollo
npm run dev

# 5. Construir para producción
npm run build
npm start

-----------------------------------------------------
src/
├── app/
│   ├── (auth)/          # Autenticación (login, register)
│   ├── (dashboard)/     # Dashboard con sidebar
│   │   ├── dashboard/   # Página principal
│   │   ├── providers/   # Proveedores
│   │   ├── requests/    # Solicitudes
│   │   ├── jobs/        # Ofertas
│   │   ├── messages/    # Mensajería
│   │   ├── profile/     # Perfil de usuario
│   │   ├── settings/    # Configuración
│   │   └── stats/       # Estadísticas
│   └── admin/           # Panel de administración
├── components/
│   ├── common/          # Componentes compartidos
│   └── dashboard/       # Componentes del dashboard
│       ├── client/      # Vista de cliente
│       ├── provider/    # Vista de proveedor
│       ├── providers/   # Componentes de proveedores
│       ├── requests/    # Componentes de solicitudes
│       ├── jobs/        # Componentes de ofertas
│       ├── messages/    # Componentes de mensajería
│       └── stats/       # Componentes de estadísticas
├── contexts/            # Contextos de React
├── lib/                 # Utilidades y servicios
│   └── firebase/        # Servicios de Firebase
├── types/               # Tipos de TypeScript
└── styles/              # Estilos globales
----------------------------------------------------------
🗺️ Roadmap

    PWA (Progressive Web App)

    Internacionalización (i18n)

    Sistema de pagos integrado

    Videollamadas

    Aplicación móvil (React Native)

    Integración con WhatsApp Business

    Panel de análisis avanzado

🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

    Fork el repositorio

    Crea una rama (git checkout -b feature/nueva-funcionalidad)

    Commit tus cambios (git commit -m 'Añadir nueva funcionalidad')

    Push a la rama (git push origin feature/nueva-funcionalidad)

    Abre un Pull Request

📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.
🙏 Agradecimientos

    Next.js

    Firebase

    TailwindCSS

    Lucide Icons

    Unsplash - Imágenes de fondo

📞 Contacto

    Autor: Shadwan-dev

    Email: tu-email@ejemplo.com

    GitHub: github.com/Shadwan-dev

⭐ Si este proyecto te ha sido útil, no olvides darle una estrella en GitHub!
```
