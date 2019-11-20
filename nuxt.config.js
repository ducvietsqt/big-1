import colors from "vuetify/es5/util/colors"
import createLogger from 'vuex/dist/logger'

const VUE_APP_DOMAIN = {
  dev: 'localhost',
  prod: 'satlegal'
};


const APP_DOMAIN = process.env.NODE_ENV === 'development' ? VUE_APP_DOMAIN.dev : VUE_APP_DOMAIN.prod;
// const BASE_URL = "https://satlegal.ebitc.com"
const BASE_URL = "http://192.168.1.16:8000"

export default {
  mode: "universal",
  // mode: "spa",

  /*
   ** Headers of the page
   */
  head: {
    // titleTemplate: "%s - " + process.env.title,
    titleTemplate: "%s - " + process.env.npm_package_name,
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [
    "~/assets/main.css"
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/axios',
    '~/plugins/serverInit',
    '~/plugins/document',
    '~/plugins/register-global-component',
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
    "@nuxtjs/vuetify"
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    // With options
    ["cookie-universal-nuxt", { alias: "cookiz" }]

  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: BASE_URL
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    icons: {
      iconfont: 'mdi',
    },
    theme: {
      // dark: true,
      dark: false,
      themes: {
        light: {
          primary: "#6d42c7",
        },
        dark: {
          primary: "#6d42c7",
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
    }
  },
  /*
  ***/
  env: {
    baseUrl: APP_DOMAIN,
    title: 'SatLegal'
  },

}
