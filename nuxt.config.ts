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

          { src: 'https://cdn.getphyllo.com/connect/v2/phyllo-connect.js' },
          { src:"https://challenges.cloudflare.com/turnstile/v0/api.js" ,
            defer: 'true'
          
          }
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
          PHYLLO: process.env.PUBLIC_PHYLLO,
          SITE_KEY: process.env.SITE_KEY,
          metapixel: {
            default: { id: process.env.NUXT_PUBLIC_METAPIXEL_DEFAULT_ID},
          }
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

  colorMode: {
    preference: 'light'
  },

  ssr: false,

  modules: ['@nuxt/ui', '@pinia/nuxt', 'shadcn-nuxt', "nuxt-meta-pixel", "@nuxtjs/device", '@samk-dev/nuxt-vcalendar', 'pinia-plugin-persistedstate/nuxt', 'nuxt-tiptap-editor'],

  tailwindcss: {
      configPath: 'tailwind.config.ts'
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
  plugins: [
    '~/plugins/injectInspectlet.js'
  ],

  compatibilityDate: '2024-07-11',
  tiptap: {
    prefix: 'Tiptap', //prefix for Tiptap imports, composables not included
  },
})