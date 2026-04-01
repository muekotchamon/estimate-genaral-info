import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Production: relative asset URLs so the app works at
// https://<user>.github.io/<repo>/ and `vite preview` without a subpath.
// (Absolute `/repo/` breaks if Pages serves the wrong index or the path differs.)
// https://vite.dev/guide/build.html#public-base-path
// https://vitejs.dev/guide/static-deploy.html#github-pages
const productionBase = './'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? productionBase : '/',
  plugins: [react(), tailwindcss()],
}))
