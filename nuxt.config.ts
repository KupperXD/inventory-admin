// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    typescript: {
        typeCheck: true,
    },
    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
    css: [],
    build: {},
    runtimeConfig: {
        baseUrl: '',
        baseApiServerUrl: '',
        public: {
            baseUrl: '',
            baseApiServerUrl: '',
        }
    },
    vite: {}
})
