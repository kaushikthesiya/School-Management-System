import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This proxy is ONLY for local development (npm run dev).
    // In production, Nginx or a similar reverse proxy handles the routing from /api to the backend.
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        // Add a timeout for the proxy request if needed, though Vite's default might be sufficient.
        // For example, if the backend is slow to respond during development.
        // timeout: 30000, // 30 seconds timeout for proxy requests
      },
    },
  },
})
