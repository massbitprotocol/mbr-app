import path from 'path';
import fs from 'fs';

const color = `#2C3ACF`;

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'mbr-app',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/fonts.css',
    '~/assets/css/hero.css',
    '~/assets/css/transition.css',
    '~/assets/css/animations.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/validate' }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  loading: {
    color,
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://github.com/nuxt-community/dayjs-module
    '@nuxtjs/dayjs',
    // https://github.com/nuxt-community/svg-module
    '@nuxtjs/svg',
    // https://axios.nuxtjs.org/
    ['@nuxtjs/axios', { credentials: true }],
    // https://auth.nuxtjs.org/
    '@nuxtjs/auth-next',
    // https://github.com/LinusBorg/portal-vue
    'portal-vue/nuxt',
    'cookie-universal-nuxt',
  ],

  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/dashboard',
    },
    strategies: {
      cookie: {
        token: {
          required: false,
          type: false,
        },
        user: {
          property: false,
        },
        cookie: {
          // (optional) If set, we check this cookie existence for loggedIn check
          prefix: '_slc_web_sid',
        },
        endpoints: {
          login: { url: '/api/v1?action=user.login', method: 'post', withCredentials: true },
          logout: { url: '/api/v1?action=user.logout', method: 'post' },
          // csrf: {
          //   url: '/api/v1?action=user.ping',
          // },
          user: false,
        },
      },
    },
  },

  router: {
    middleware: ['auth'],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate/dist/rules'],
  },

  axios: {
    baseURL: process.env.API_BASE_URL, // Used as fallback if no runtime config is provided
  },

  // For dev
  // server: {
  //   https: {
  //     key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
  //     cert: fs.readFileSync(path.resolve(__dirname, 'server.crt')),
  //   },
  // },
};
