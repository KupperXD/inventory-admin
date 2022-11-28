import colors from 'vuetify/es5/util/colors';

export default () => {
    return {
        // Global page headers: https://go.nuxtjs.dev/config-head
        head: {
            titleTemplate: '%s - admin-nuxt',
            title: 'admin-nuxt',
            htmlAttrs: {
                lang: 'ru',
            },
            meta: [
                { charset: 'utf-8' },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1',
                },
                { hid: 'description', name: 'description', content: '' },
                { name: 'format-detection', content: 'telephone=no' },
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
                {
                    rel: 'preconnect',
                    href: `https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap`,
                },
            ],
        },

        // Global CSS: https://go.nuxtjs.dev/config-css
        css: ['@/assets/styles/main.scss'],

        // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
        plugins: [
            {
                src: '~/plugins/roastApi.ts',
            },
            {
                src: '~/plugins/axios.ts',
            },
        ],

        // Auto import components: https://go.nuxtjs.dev/config-components
        components: true,

        // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
        buildModules: [
            // https://go.nuxtjs.dev/typescript
            '@nuxt/typescript-build',
            // https://go.nuxtjs.dev/vuetify
            '@nuxtjs/vuetify',
        ],

        // Modules: https://go.nuxtjs.dev/config-modules
        modules: [
            'cookie-universal-nuxt',
            '@nuxtjs/axios',
        ],

        axios: {
            baseURL: process.env.BASE_URL_BROWSER,
        },

        privateRuntimeConfig: {
            axios: {
                baseURL: process.env.BASE_URL_SERVER,
            },
        },

        // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
        vuetify: {
            customVariables: ['~/assets/styles/variables.scss'],
            theme: {
                dark: true,
                options: { customProperties: true },
                color: {
                    background: '#eee',
                },
                themes: {
                    light: {
                        primary: '#e91e63',
                        background: '#eee',
                    },
                    dark: {
                        primary: '#e91e63',
                        accent: colors.grey.darken3,
                        secondary: colors.amber.darken3,
                        info: colors.teal.lighten1,
                        warning: colors.amber.base,
                        error: colors.deepOrange.accent4,
                        success: colors.green.accent3,
                        background: '#eee',
                    },
                },
            },
        },

        // Build Configuration: https://go.nuxtjs.dev/config-build
        build: {
            transpile: ['~/plugins/roastApi.ts'],
        },

        server: {
            host: '0.0.0.0',
            port: 8080,
        },
    };
};
