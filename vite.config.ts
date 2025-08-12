import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Default config used for development
export default defineConfig({
  plugins: [
    react()
  ]
});
