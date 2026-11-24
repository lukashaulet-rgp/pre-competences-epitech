import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Le site est servi sur lukashaulet-rgp.github.io/pre-competences-epitech/
  base: '/pre-competences-epitech/',
})
