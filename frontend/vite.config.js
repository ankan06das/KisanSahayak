import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import commonjs from 'vite-plugin-commonjs'
import { viteRequire } from "vite-require"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), commonjs(), viteRequire()],
  resolve: {
    build: {
      commonjsOptions: { transformMixedEsModules: true }
    }
  }
})
