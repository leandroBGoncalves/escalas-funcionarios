import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['FLOWSHIFT_Escalas_Inteligientes.png', 'logo-mister.png', 'icons/*.svg', 'icons/*.png'],
      manifest: {
        name: 'FlowShift - Escalas Inteligentes',
        short_name: 'FlowShift',
        description: 'FlowShift - Escalas Inteligentes. Gere escalas de trabalho e envie por WhatsApp.',
        theme_color: '#1A73B8',
        background_color: '#F4F7F6',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        lang: 'pt-BR',
        icons: [
          {
            src: '/FLOWSHIFT_Escalas_Inteligientes.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/FLOWSHIFT_Escalas_Inteligientes.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
})
