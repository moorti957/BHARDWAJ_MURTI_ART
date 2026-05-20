import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [

    react(),

    tailwindcss(),

    VitePWA({
      registerType: 'autoUpdate',

      manifest: {
        name: 'Bhardwaj Murti Art',

        short_name: 'BhardwajMurtiArt',

        description:
          'Premium Marble Murti Collection',

        theme_color: '#0c0a09',

        background_color: '#0c0a09',

        display: 'standalone',

        orientation: 'portrait',

        start_url: '/',

        icons: [

          {
            src: '/logo192.png',
            sizes: '192x192',
            type: 'image/png',
          },

          {
            src: '/logo512.png',
            sizes: '512x512',
            type: 'image/png',
          },

          {
            src: '/logo512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },

        ],
      },

    }),

  ],
})