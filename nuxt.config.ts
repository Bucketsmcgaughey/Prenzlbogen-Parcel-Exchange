// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-04-25',
  // Nuxt 4 directory structure and features
  // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
  future: { compatibilityVersion: 4 },
  // Nuxt Modules
  // https://nuxt.com/modules
  modules: [
    '@nuxthub/core',
    '@nuxt/eslint',
    'vuetify-nuxt-module',
    'nuxt-users',
    '@nuxtjs/i18n',
  ],
  hub: {
    database: true,
    kv: true,
    blob: true,
    cache: true,
  },
  nitro: {
    experimental: {
      // Enable Server API documentation within NuxtHub
      openAPI: true
    }
  },
  nuxtUsers: {
    connector: {
      name: 'sqlite', // | 'mysql' | 'postgresql'
      options: {
        path: './data/users.sqlite3'
      }
    },
    auth: {
      whitelist: [
        '/signup',
        '/api/_hub/*',
        '/api/nuxt-users/register',
      ],
      permissions: {
        // user: ["*"],
        user: [
          '/',
          '/account',
          '/dashboard',
          '/en',
          '/en/dashboard',
          '/en/account',
          { path: '/api/nuxt-users*', methods: ['GET', 'POST', 'PATCH'] },
          { path: '/api/residents', methods: ['GET', 'POST', 'PATCH'] },
          { path: '/api/parcels', methods: ['GET', 'POST', 'PATCH'] }
        ],
        admin: [
          '*'
        ]
      },
      tokenExpiration: 40320, // 1 month (in minutes)

    },
    mailer: {
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'brandy70@ethereal.email',
        pass: '8yKeGXSGSVKAXtkeNx'
      },
      defaults: {
        from: '"Prenzlbogen Parcel Exchange" <pakete@prenzlbogies.de>',
      },
    },
    passwordResetUrl: '/resetpassword', // URL path for password reset page

  },
  i18n: {
    defaultLocale: 'de',
    locales: [
      { code: 'de', name: 'Deutsch', file: 'de.json' },
      { code: 'en', name: 'English', file: 'en.json' }

    ]
  },
  // apiShield: {
  //   maxRequests: 5,        // 5 login attempts per duration
  //   duration: 60000,       // 1 minute window
  //   banDuration: 300000,   // 5 minute ban for violators
  //   delay: 1000,           // 1 second delay on banned IPs
  //   routes: [
  //     '/api/nuxt-users/session',           // Protect login endpoint
  //     '/api/nuxt-users/password/forgot',   // Protect password reset requests  
  //     '/api/nuxt-users/password/reset'     // Protect password reset completion
  //   ],
  //   log: true // Enable logging for monitoring
  // },
  // Development
  devtools: { enabled: true },
})