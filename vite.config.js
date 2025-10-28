import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    // This proxy forwards all /api requests to your backend
    proxy: {
      '/api': {
        target: 'https://musicstreamingbyayush-sharma.netlify.app', // Your backend server
        changeOrigin: true,
        secure: false,
      }
    }
  }
})