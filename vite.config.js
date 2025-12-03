import { defineConfig } from 'vite'

// Use a case-insensitive regex to include common image extensions (JPG/JPEG/PNG/GIF/SVG)
export default defineConfig({
  assetsInclude: [/\.(png|jpe?g|gif|svg)$/i]
})
