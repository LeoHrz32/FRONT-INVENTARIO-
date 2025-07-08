import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    sourcemap: false, 
    outDir: 'dist',  
    minify: 'esbuild'
  },
  optimizeDeps: {
    include: ['xlsx'], // Asegura que xlsx se optimiza para Vite
  },
  // Configuración adicional para compatibilidad CommonJS
  commonjsOptions: {
    include: [/node_modules/], // Incluye node_modules para la compatibilidad CommonJS
  },
});
