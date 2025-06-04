import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/react-pages-hub/',
  // Remove assetsInclude for HTML files to prevent them from being bundled
  // HTML files should be copied to public/pages/ instead
})
