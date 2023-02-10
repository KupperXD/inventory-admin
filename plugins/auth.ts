import AuthPlugin from "~/src/libs/auth-plugin";
import {NuxtApp} from "#app";

export default defineNuxtPlugin(async (nuxtApp) => {
    const ctx = nuxtApp as unknown as NuxtApp;

    const authPlugin = new AuthPlugin(ctx);
    await authPlugin.init();

    return {
        provide: {
            auth: authPlugin,
        }
    };
});
