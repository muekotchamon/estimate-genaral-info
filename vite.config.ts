import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages project site: https://<user>.github.io/<repo>/
const repoBase = '/estimate-genaral-info/'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? repoBase : '/',
  plugins: [react(), tailwindcss()],
}))
