// scripts/init-firebase.js
// Ejecutar antes de iniciar la app en desarrollo
if (process.env.NODE_ENV === 'development') {
  // Deshabilitar warnings de eval
  const originalWarn = console.warn;
  console.warn = function (...args) {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('eval') || args[0].includes('CSP'))
    ) {
      return;
    }
    originalWarn.apply(console, args);
  };
}
