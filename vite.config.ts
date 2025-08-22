import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 下記を追加
  server: {
    host: true, // これにより外部からのアクセスが許可
  },
})
