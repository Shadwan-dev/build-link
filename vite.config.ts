import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  server: {
    host: true,
  },
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@sections': '/src/components/sections',
      '@layout': '/src/components/layout',
      '@tenant': '/src/components/tenant',
      '@lib': '/src/lib',
      '@assets': '/src/assets',
    },
  },
});
