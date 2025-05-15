import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      '2286-2409-40c4-100d-aea9-e8c7-3c54-90fc-3227.ngrok-free.app'
    ]
  }
})




