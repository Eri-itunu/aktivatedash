// nuxt.config.ts
export default defineNuxtConfig({
  vite: {
    server: {
      allowedHosts: true,
      fs: {
        allow: ['.', 'node_modules'],
      },
      hmr: {
        host: 'localhost', // 👈 or use your local IP if accessing via mobile
        port: 24678,        // optional, default is usually fine
      },
    },
  },
  app: {
    head: {
      // Set the title of the app
      title: 'Aktivate Influencer Marketing',

      meta: [
        // Meta tags for SEO and responsive design
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      ],

      link: [
        // Favicon and external fonts
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap',
        },
      ],
    },
  },

  // Public runtime config for accessing sensitive info like API URLs and platform keys
  runtimeConfig: {
    public: {
      gtm: {
        id: process.env.GTM_ID || 'GTM-TB74329L', // Use environment variable for GTM ID, fallback to default if not set
      },
      API_URL: process.env.API_URL, // API base URL
      PLATFORM_FEE: process.env.PLATFORM_FEE, // Platform fee (if applicable)
      metapixel: {
        default: { id: process.env.NUXT_PUBLIC_METAPIXEL_DEFAULT_ID }, // Meta Pixel ID for tracking
      },
    },
  },

  // Enable Nuxt DevTools for debugging and performance monitoring
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },

  // Define route rules for API proxying
  routeRules: {
    '/api/v2/**': {
      proxy: { to: `${process.env.API_URL}/api/v2/**` }, // Proxy for API routes
    },
    '/brand': {
      proxy: { to: '/brands' }, // Proxy for brand-related routes
    },
    '/creators': {
      proxy: { to: '/creator' }, // Proxy for creator-related routes
    },
  },

  // Set the default color mode to light
  colorMode: {
    preference: 'light', // Default color mode preference (light/dark)
  },

  // Disable server-side rendering (SSR) for a fully client-side rendered app
  ssr: false,

  // Nuxt modules to be used
  modules: [
    '@nuxt/ui', // Nuxt UI components
    '@pinia/nuxt', // State management with Pinia
    'shadcn-nuxt', // UI components from ShadCN
    'nuxt-meta-pixel', // Meta Pixel integration
    '@nuxtjs/device', // Device detection
    '@samk-dev/nuxt-vcalendar', // Calendar component
    'pinia-plugin-persistedstate/nuxt', // Persist Pinia state
    'nuxt-tiptap-editor', // Tiptap editor for rich text
    '@nuxtjs/google-fonts', // Google Fonts integration
    '@hebilicious/vue-query-nuxt', // Vue Query for data fetching
  
  ],

  // Google Fonts configuration
  googleFonts: {
    download: true, // Download fonts for local usage
    outputDir: 'assets', // Output directory for downloaded fonts
    fontsDir: 'assets/fonts', // Fonts directory
    inject: true, // Inject fonts into the app
    'Work Sans': {
      wght: '100..900', // Weight range for 'Work Sans' font
      ital: '100..900', // Italic weight range for 'Work Sans'
    },
  },

  // Tailwind CSS configuration
  tailwindcss: {
    configPath: 'tailwind.config.ts', // Custom Tailwind config path
  },

  // Alias for the root directory (useful for simplifying import paths)
  alias: {
    '~': '/<rootDir>/', // Root directory alias for imports
  },

  // ShadCN UI components configuration
  shadcn: {
    prefix: '', // Optional prefix for all components
    componentDir: './components/ui', // Directory for ShadCN components
  },

  // Global CSS files
  css: [
    '/assets/css/main.css', // Main CSS file for the app
  ],

  // Set compatibility date for app (useful for deployment versioning)
  compatibilityDate: '2024-07-11', // Date when this config is considered valid

  // Tiptap editor configuration (prefix for Tiptap composables)
  tiptap: {
    prefix: 'Tiptap', // Prefix for Tiptap composables and imports
  },
});
