import { defineConfig } from 'vite'

export default defineConfig({
  // Allow importing assets with uppercase extensions (e.g. .JPG/.JPEG)
  assetsInclude: ['**/*.JPG', '**/*.JPEG']
})
