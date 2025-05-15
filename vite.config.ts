import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'a8a9-2409-40c4-1010-ef9-b17d-d42c-9c1f-8a22.ngrok-free.app'
    ]
  }
})




