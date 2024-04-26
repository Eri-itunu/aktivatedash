// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            API_URL: process.env.API_URL,
        }
    },
    devtools: { enabled: true },
    ssr: false,
    // routeRules: {
    //     '/dashboard/**': { ssr: false },
    // },
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
    gtag: {
        id: 'G-2BJ48VT6M7' // add env variable
    },
    alias: {
        "~": "/<rootDir>/",
    },
})
