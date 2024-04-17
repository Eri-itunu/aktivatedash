// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        'nuxt-headlessui',
        '@nuxt/ui',
        '@pinia/nuxt',
        'nuxt-gtag',
    ],
    headlessui: {
        prefix: 'Headless'
    },
    tailwindcss: {
        configPath: '~/tailwind.config.ts'
    },
    colorMode: {
        preference: 'light'
    },
    gtag: {
        id: 'G-2BJ48VT6M7' // add env variable
    },
    alias: {
        "~": "/<rootDir>/",
    }
})
