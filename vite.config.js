import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // In dev (`vite serve`) use root base so assets load at `/`.
  // In build (for GitHub Pages) use the repo subpath.
  base: command === 'serve' ? '/' : '/ai-exam-question-generator/',
  plugins: [react()],
}))
