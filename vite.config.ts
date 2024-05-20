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
          // my https://mock.apifox.com/m1/4456698-0-default
          // https://mock.apifox.com/m1/4458460-0-default
          target: 'https://mock.apifox.com/m1/4456698-0-default',
          changeOrigin: true,
          // rewrite: (path) => path.replace(/`^${env.VITE_APP_BASE_API}`/, '')
          rewrite: (path) => path.replace(new RegExp('^' + `${env.VITE_APP_BASE_API}`),'')
        },
      }
    }
  }
})
