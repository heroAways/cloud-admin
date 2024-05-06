import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
    ],
    base: './',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: 8889,
      open: true,
      host: 'localhost',
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: 'http://localhost:8989',
          changeOrigin: true,
          rewrite: (path) => path.replace(/`^${env.VITE_APP_BASE_API}`/, '')
        },
      }
    }
  }
})
