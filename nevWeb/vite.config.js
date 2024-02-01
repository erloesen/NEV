import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

const pathResolve = dir => resolve(__dirname, dir)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), createSvgIconsPlugin({
    iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
    symbolId: 'icon-[dir]-[name]'
  })],
  plugOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: []
    }
  },
  server: {
    port: 8000,
    open: true, // open browser auto
    cors: true,
    host: "0.0.0.0"
  },
  resolve: {
    alias: {
      '@': pathResolve('./src') // @ to src
    }
  }
})
