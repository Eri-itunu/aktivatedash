// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    
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
    alias: {
        "~": "/<rootDir>/",
    },
    
})
