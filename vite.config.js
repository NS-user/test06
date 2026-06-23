import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// GitHub Pages のプロジェクトサイトは https://<user>.github.io/<repo>/ で
// 配信されるため、本番ビルド時のみ base にリポジトリ名を付与する。
// （開発サーバー時はルート '/' で配信）
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/test06/' : '/',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
}))
