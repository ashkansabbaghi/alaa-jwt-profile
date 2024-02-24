// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Global
  security: {
    corsHandler: {
      crossOriginOpenerPolicy: "same-origin",
      origin : '*',
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      allowHeaders : '*',
      exposeHeaders : '*'
    }
  },
  app: {
    head: {
      title: "ALAATV",
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  alias: {
    assets: "<rootDir>/assets"
  },
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
  ],
  runtimeConfig: {
    iamTest: process.env.TEST,
    iamURL: process.env.URL,
  },

})
