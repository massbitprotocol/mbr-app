import path from 'path';
import fs from 'fs';

const color = `#2C3ACF`;

const config = {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'MassBit Route',
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

  ssr: false,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/fonts.css',
    '~/assets/css/hero.css',
    '~/assets/css/tooltip.css',
    '~/assets/css/transition.css',
    '~/assets/css/animations.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/validate' },
    { src: '~/plugins/axios', ssr: true },
    { src: '~/plugins/notifications/ssr', ssr: true },
    { src: '~/plugins/notifications/client', ssr: false },
    '~/plugins/tooltip',
  ],

  publicRuntimeConfig: {
    curlGatewayURL: process.env.GATEWAY_INSTALL_URL,
    curlNodeURL: process.env.NODE_INSTALL_URL,
  },

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
    // https://github.com/nuxt-community/svg-module
    '@nuxtjs/svg',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://axios.nuxtjs.org/
    '@nuxtjs/axios',
    // https://auth.nuxtjs.org/
    '@nuxtjs/auth-next',
    // https://github.com/nuxt-community/dayjs-module
    '@nuxtjs/dayjs',
    // https://github.com/LinusBorg/portal-vue
    'portal-vue/nuxt',
    // https://github.com/microcipcip/cookie-universal
    'cookie-universal-nuxt',
  ],

  auth: {
    plugins: [{ src: '~/plugins/axios', ssr: true }, { src: '~/plugins/auth' }, { src: '~/plugins/helpers/filters' }],
    redirect: {
      login: '/login',
      logout: '/',
      home: '/',
      callback: '/login',
    },
    cookie: {
      prefix: '',
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
        endpoints: {
          login: { url: '/api/v1?action=user.login', method: 'post', withCredentials: true },
          logout: false,
          user: false,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // Add exception
    transpile: ['vee-validate/dist/rules'],
  },

  axios: {
    baseURL: process.env.API_BASE_URL,
    credentials: true,
  },

  tailwindcss: {
    viewer: false,
  },

  dayjs: {
    plugins: ['utc', 'relativeTime', 'duration'],
  },
};

if (process.env.NODE_ENV === 'development') {
  config.server = {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'server.crt')),
    },
  };
}

export default config;
