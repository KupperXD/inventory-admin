import {callWithNuxt, NuxtApp} from "#app";
import {FetchError} from "ofetch";
import {BaseResponse} from "~/src/types";
import {ApiErrorResponse} from "~/src/types/errors";
import useAuthState from "~/src/libs/useAuthState";
import {appendHeader, H3Event} from 'h3';


type User = {
    id: number;
    name: string;
    email: string;
};

type LoginResponse = {
    user: User,
};

type LoginRequestParams = {
    name: string | null;
    password: string | null;
};

const isError = (response: BaseResponse<unknown> | ApiErrorResponse): response is ApiErrorResponse => {
    return typeof ((response as ApiErrorResponse).error) !== 'undefined';
}

export default class AuthPlugin {
    private readonly nuxtApp: NuxtApp;
    public store = useAuthState();

    constructor(nuxtApp: NuxtApp) {
        this.nuxtApp = nuxtApp;

        const accessCookie = useCookie('Authentication');
        const refreshCookie = useCookie('Refresh');

        this.store.setAccessToken(accessCookie.value ?? null);
        this.store.setRefreshToken(refreshCookie.value ?? null);
    }


    public async init() {
        await this.fetchCurrentUser();
    }

    private async getBaseUrl(): Promise<string> {
        const config = await callWithNuxt(this.nuxtApp, () => useRuntimeConfig());

        return this.nuxtApp.ssrContext ? config.public.baseApiServerUrl : config.public.baseUrl;
    }

    public async login(
        params: LoginRequestParams,
    ): Promise<boolean> {
        try {
            const response = await $fetch<BaseResponse<User> | ApiErrorResponse>('/api/auth/log-in', {
                method: 'post',
                body: {
                    email: params.name,
                    password: params.password,
                },
            });

            if (isError(response)) {
                this.store.setUser(null);
                return Promise.reject(response.error);
            }

            this.store.setUser(response.response);
            return true;
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public async fetchCurrentUser() {
        try {
            const headers = await callWithNuxt(this.nuxtApp, () => useRequestHeaders(['cookie']));
            const baseUrl = await this.getBaseUrl();
            const response = await $fetch.raw<BaseResponse<User> | ApiErrorResponse>(`${baseUrl}api/auth/current-user`, {
                method: 'get',
                headers: {
                    cookie: headers.cookie ?? '',
                },
                retry: 0,
            });

            if (response._data && !isError(response._data)) {
                this.store.setUser(response._data.response);
            }
            await this.updateAccessToken();
        } catch (e) {
            const err = e as FetchError;

            if (!(err.response?.status === 401) || !this.store.hasRefreshToken) {
                throw err;
            }

            try {
                await this.updateAccessToken();
            } catch (e) {}
        }
    }

    public async updateAccessToken() {
        try {
            const headers = await callWithNuxt(this.nuxtApp, () => useRequestHeaders(['cookie']));
            const response = await $fetch.raw(`http://api:9090/api/auth/refresh`, {
                headers: {
                    cookie: headers.cookie ?? '',
                },
            });
            const cookies = (response.headers.get('set-cookie') || '');

            if (process.server && cookies && this.nuxtApp.ssrContext?.event) {
                appendHeader(this.nuxtApp.ssrContext?.event, 'set-cookie', cookies);
            }

        } catch (e) {
            console.log('e', {
                e
            });
        }
    }
}
