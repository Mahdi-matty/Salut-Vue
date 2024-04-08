import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  server: {
    port: 3000,
    open: true,
    // proxy: {
    //   '/graphql': {
    //     target: 'http://localhost:3001',
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },

  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
