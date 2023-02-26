import {FetchError} from "ofetch";
import {BaseResponse, FormDataItemObject} from "~/src/types";
import {callWithNuxt, NuxtApp, useNuxtApp} from "#app";
import {useRequestHeaders, useRuntimeConfig} from "#imports";

export default class DoRequest {
    private readonly nuxtApp: NuxtApp;

    constructor() {
        this.nuxtApp = useNuxtApp();
    }

    public async refreshToken() {
        if (process.server) {
            return this.nuxtApp.$auth.store.getAccessToken;
        }

        return await this.nuxtApp.$auth.refresh();
    }

    public async goToLogin() {
        return await this.nuxtApp.$auth.goToLoginRoute();
    };

    private async getBaseUrl(): Promise<string> {
        const config = await callWithNuxt(this.nuxtApp, () => useRuntimeConfig());

        return process.server ? config.public.baseApiServerUrl : config.public.baseUrl;
    }

    public async fetchData<T>(
        method: 'post' | 'get' | 'PATCH' | 'delete',
        endpoint: string,
        params: FormDataItemObject = {}
    ) {
        let options: Record<string, unknown> = {};

        if (method === 'post' || method === 'PATCH') {
            options = {
                ...options,
                body: params,
            }
        }

        if (method === 'get') {
            options = {
                ...options,
                query: params,
            }
        }

        try {
            // Если запрос с сервера на сервер нужно спроксировать cookie
            const headers = useRequestHeaders(['cookie'])
            const baseUrl = await this.getBaseUrl();

            const request = $fetch.create<BaseResponse<T>>({
                retry: 0,
                baseURL: baseUrl,
            });

            return await request(`/${endpoint}`, {
                method: method,
                headers: {
                    Cookie: headers.cookie ?? '',
                },
                ...options,
            });
        } catch (e) {
            const err = e as FetchError;

            if (!(err.response?.status === 401)) {
                throw err;
            }

            try {
                const token = await this.refreshToken();

                if (!token) {
                    return Promise.reject('Токен не получен');
                }

                const baseUrl = await this.getBaseUrl();
                const request = $fetch.create<BaseResponse<T>>({
                    retry: 0,
                    baseURL: baseUrl,
                });

                return await request(`/${endpoint}`, {
                    method: method,
                    headers: {
                        cookie: `Authentication=${token}`,
                    },
                    ...options,
                });
            } catch (e) {
                const err = e as FetchError;

                if (err.response?.status === 401) {
                    await this.goToLogin();
                }

                return Promise.reject(e)
            }
        }
    }
}
