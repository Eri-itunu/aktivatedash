// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            API_URL: process.env.API_URL,
        }
    },
    devtools: { enabled: true },
    routeRules: {
        '/api/v2/**': {
            proxy: { to: `${process.env.API_URL}/api/v2/**`, },
        }
    },
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
    alias: {
        "~": "/<rootDir>/",
    },
    
})