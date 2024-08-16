import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  chunkSizeWarningLimit: 600, // Corrected: no 'KB' needed
})
