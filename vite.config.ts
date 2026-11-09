import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Forward /api/* requests to the RecipeAPI (run it with the "http" profile)
    proxy: {
      '/api': 'http://localhost:5110',
    },
  },
})
