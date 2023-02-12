import AuthPlugin from "~/src/libs/auth-plugin";
import {navigateTo, NuxtApp} from "#app";

export default defineNuxtPlugin(async (nuxtApp) => {
    const ctx = nuxtApp as unknown as NuxtApp;

    const authPlugin = new AuthPlugin(ctx);

    try {
        await authPlugin.init();
    } catch (e) {}

    return {
        provide: {
            auth: authPlugin,
        }
    };
});
