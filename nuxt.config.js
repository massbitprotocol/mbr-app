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
    { src: '~/plugins/polkadot-wallet', ssr: false },
    '~/plugins/tooltip',
    '~/plugins/qrcode',
    '~/plugins/helpers/filters.js',
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
    redirect: {
      login: '/login',
      logout: '/',
      home: '/',
      callback: '/login',
    },
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'accessToken',
          maxAge: 60 * 60 * 24 * 1,
          global: true,
          type: 'Bearer',
        },
        refreshToken: {
          property: '',
          maxAge: 60 * 60 * 24 * 7,
        },
        user: {
          property: '',
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          refresh: { url: '/auth/token', method: 'post' },
          user: {
            url: 'user/info',
            method: 'get',
          },
          logout: false,
        },
      },
      localWallet: {
        scheme: 'refresh',
        token: {
          property: 'accessToken',
          maxAge: 60 * 60 * 24 * 1,
          global: true,
          type: 'Bearer',
        },
        refreshToken: {
          property: '',
          maxAge: 60 * 60 * 24 * 7,
        },
        user: {
          property: '',
        },
        endpoints: {
          login: { url: '/auth/login/wallet', method: 'post' },
          refresh: { url: '/auth/token', method: 'post' },
          user: {
            url: 'user/info',
            method: 'get',
          },
          logout: false,
        },
      },
    },
  },

  router: {
    middleware: 'maintenance',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // Add exception
    transpile: [
      'vee-validate/dist/rules',
      '@polkadot/api',
      '@polkadot/rpc-core',
      '@polkadot/rpc-provider',
      '@polkadot/types',
      '@polkadot/extension-dapp',
      '@polkadot/util-crypto',
      '@polkadot/keyring',
      '@polkadot/ui-keyring',
      '@polkadot/ui-settings',
      '@polkadot/hw-ledger',
      '@polkadot/types-codec',
    ],
    extend: function (config) {
      config.module.rules.push({
        test: /\.js$/,
        loader: require.resolve('@open-wc/webpack-import-meta-loader'),
      });
      config.resolve.alias.vue = 'vue/dist/vue.common'; //https://github.com/nuxt/nuxt.js/issues/1142#issuecomment-317272538
      config.node = {
        fs: 'empty',
      };
    },
    presets({ isServer }, [preset, options]) {
      return [
        [
          preset,
          {
            ...options,
          },
        ],
        ['@babel/plugin-proposal-private-methods'],
      ];
    },
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

config.server = {
  port: process.env.PORT || 3000,
};

export default config;
