// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({

    app: {
        head: {
          meta: [
            // <meta name="viewport" content="width=device-width, initial-scale=1">
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }
          ],
          script: [

            { src: 'https://cdn.getphyllo.com/connect/v2/phyllo-connect.js' }
          ],
          
        }
      },


    runtimeConfig: {
        public: {
            API_URL: process.env.API_URL,

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
        'nuxt-headlessui',
        '@nuxt/ui',
        '@pinia/nuxt',
        'nuxt-gtag',
        '@vueuse/nuxt',
    ],
    headlessui: {
        prefix: 'Headless'
    },
    tailwindcss: {
        configPath: 'tailwind.config.ts'
    },
    colorMode: {
        preference: 'light'
    },
    alias: {
        "~": "/<rootDir>/",
    },
})