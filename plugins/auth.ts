import AuthPlugin from "~/src/libs/auth-plugin";
import {NuxtApp} from "#app";

export default defineNuxtPlugin(async (nuxtApp) => {
    const ctx = nuxtApp as unknown as NuxtApp;

    const authPlugin = new AuthPlugin(ctx);

    try {
        await authPlugin.init();
    } catch (e) {}

    addRouteMiddleware('auth', async (to) => {
        const hasLogin = authPlugin.store.hasLogin;
        const routeName = to.name;

        if (!hasLogin && routeName === 'login') {
            return;
        }

        if (!hasLogin) {
            return '/login';
        }

        return;

    }, {
        global: true,
    });

    return {
        provide: {
            auth: authPlugin,
        }
    };
});
