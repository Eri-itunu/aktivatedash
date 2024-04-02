// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: [
        'nuxt-headlessui',
        '@nuxt/ui',
        
    ],
    headlessui: {
        prefix: 'Headless'
    },
    tailwindcss: {
        configPath: '~/tailwind.config.ts'
    },
    colorMode: {
        preference: 'light'
      }
})
