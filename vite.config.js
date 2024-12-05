import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    rollupOptions: {
      plugins: [
        {
          name: 'ignore-during-builds',
          buildStart() {
            if (process.env.VITE_IGNORE_DURING_BUILDS === 'true') {
              console.log('Ignoring certain files during the build...');
              // Perform additional logic or skip certain builds
            }
          }
        }
      ]
    }
  
})
