import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
const pathResolve = dir => resolve(__dirname, dir)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  plugOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: []
    }
  },
  server: {
    port: 8000,
    open: true, // open browser auto
    cors: true
  },
  resolve: {
    alias: {
      '@': pathResolve('./src') // @ to src
    }
  }
})
