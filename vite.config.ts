import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Split vendor code into its own chunk to complement the
    // lazy-loaded feature chunks (see App.tsx dynamic imports).
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          state: ['zustand'],
        },
      },
    },
  },
})
