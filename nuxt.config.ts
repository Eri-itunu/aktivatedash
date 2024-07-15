// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
      head: {
          title: 'Aktivate Influencer Marketing ',
        meta: [
          // <meta name="viewport" content="width=device-width, initial-scale=1">
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },

        ],
        script: [

          { src: 'https://cdn.getphyllo.com/connect/v2/phyllo-connect.js' }
        ],

        link: [
          {
              rel: 'icon',
              type: 'image/x-icon',
              href: '/favicon.ico'
          },
          {
              rel: 'stylesheet',
              href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap'
          }
        ]

      }
    },

  runtimeConfig: {
      public: {
          API_URL: process.env.API_URL,
          PHYLLO: process.env.PHYLLO

        }
    },

  devtools: { enabled: true },

  routeRules: {
      '/api/v2/**': {
          proxy: { to: `${process.env.API_URL}/api/v2/**`, },
      },
      '/brand': {
          proxy: {to: '/brands'}
      }
  },

  ssr: false,

  modules: [
      '@nuxt/ui',
      '@pinia/nuxt',
      'shadcn-nuxt'
  ],

  tailwindcss: {
      configPath: 'tailwind.config.ts'
  },

  colorMode: {
      preference: 'light'
  },

  alias: {
      "~": "/<rootDir>/",
  },

  shadcn: {
      /**
       * Prefix for all the imported component
       */
      prefix: '',
      /**
       * Directory that the component lives in.
       * @default "./components/ui"
       */
      componentDir: './components/ui'
  },

  css: [
      '/assets/css/main.css',
  ],

  compatibilityDate: '2024-07-11',
})