import {callWithNuxt, NuxtApp} from "#app";
import {FetchError} from "ofetch";
import {BaseResponse} from "~/src/types";
import {ApiErrorResponse} from "~/src/types/errors";
import useAuthState from "~/src/libs/useAuthState";
import {appendHeader} from 'h3';
import SetCookieParser, {Cookie} from 'set-cookie-parser';
import {navigateTo} from "#imports";

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
    private ACCESS_TOKEN_PROPERTY_NAME = 'Authentication';
    private readonly nuxtApp: NuxtApp;
    public store = useAuthState();

    constructor(nuxtApp: NuxtApp) {
        this.nuxtApp = nuxtApp;

        const accessCookie = useCookie(this.ACCESS_TOKEN_PROPERTY_NAME);
        const refreshCookie = useCookie('Refresh');

        this.store.setAccessToken(accessCookie.value ?? null);
        this.store.setRefreshToken(refreshCookie.value ?? null);
    }


    public async init() {
        if (this.store.getUser) {
            return true;
        }

        return await this.fetchCurrentUser();
    }

    public async getBaseUrl(): Promise<string> {
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

    private async doRequestFetchUser(
        accessToken: string | null = null
    ) {
        const headers = await callWithNuxt(this.nuxtApp, () => useRequestHeaders(['cookie']));
        const baseUrl = await this.getBaseUrl();
        let cookies = headers.cookie ?? '';

        if (process.server && accessToken) {
            const constParsedCookie: Cookie[] = SetCookieParser.parse(headers.cookie ?? '');
            let hasAccessCookie = false;
            cookies = constParsedCookie.map(cookie => {
                if (cookie.name === this.ACCESS_TOKEN_PROPERTY_NAME) {
                    cookie.value = accessToken;
                    hasAccessCookie = true;
                }
                return `${cookie.name}=${cookie.value};`
            }).join(' ');

            if (!hasAccessCookie) {
                cookies = `${cookies}${this.ACCESS_TOKEN_PROPERTY_NAME}=${accessToken};`;
            }
        }

        return await $fetch.raw<BaseResponse<User> | ApiErrorResponse>(`${baseUrl}api/auth/current-user`, {
            method: 'get',
            headers: {
                cookie: cookies,
            },
            retry: 0,
        });
    }

    public async fetchCurrentUser() {
        try {
            const response = await this.doRequestFetchUser();

            if (response._data && !isError(response._data)) {
                this.store.setUser(response._data.response);
                return;
            }
        } catch (e) {
            const err = e as FetchError;

            if (!(err.response?.status === 401) || !this.store.hasRefreshToken) {
                throw err;
            }

            try {
                const token = await this.updateAccessToken();

                if (!token) {
                    throw new Error('Token not found');
                }

                const response = await this.doRequestFetchUser(token);

                if (response._data && !isError(response._data)) {
                    this.store.setUser(response._data.response);
                    return true;
                }

            } catch (e) {
                await this.logout();
            }
        }
    }

    public async refresh() {
        return await this.updateAccessToken();
    }

    private async updateAccessToken() {
        try {
            const headers = await callWithNuxt(this.nuxtApp, () => useRequestHeaders(['cookie']));
            const baseUrl = await this.getBaseUrl();
            const response = await $fetch.raw<{response: { access_token: string}}>(`${baseUrl}api/auth/refresh`, {
                retry: 0,
                headers: {
                    cookie: headers.cookie ?? '',
                },
            });

            const cookies = (response.headers.get('set-cookie') || '');
            const parsedCookies: Cookie[] = SetCookieParser.parse(cookies);
            const accessToken = parsedCookies.find((cookie) => {
                if (cookie.name !== this.ACCESS_TOKEN_PROPERTY_NAME) {
                    return;
                }

                return cookie;
            });

            if (process.server && cookies && this.nuxtApp.ssrContext?.event) {
                appendHeader(this.nuxtApp.ssrContext?.event, 'set-cookie', cookies);
            }

            if (accessToken && accessToken.value) {
                this.store.setAccessToken(accessToken.value)
            }

            return accessToken?.value ?? null;
        } catch (e) {
            throw e;
        }
    }

    public async logout() {
        try {
            const headers = await callWithNuxt(this.nuxtApp, () => useRequestHeaders(['cookie']));
            const baseUrl = await this.getBaseUrl();
            const response = await $fetch.raw(`${baseUrl}api/auth/log-out`, {
                method: 'post',
                retry: 0,
                headers: {
                    cookies: headers.cookie ?? '',
                }
            });

            const cookies = (response.headers.get('set-cookie') || '');

            if (process.server && cookies && this.nuxtApp.ssrContext?.event) {
                appendHeader(this.nuxtApp.ssrContext?.event, 'set-cookie', cookies);
            }
        } catch (e) {
            if (process.server && this.nuxtApp.ssrContext?.event) {
                appendHeader(this.nuxtApp.ssrContext?.event, 'set-cookie', '');
            }
        } finally {
            this.store.setAccessToken(null);
            this.store.setRefreshToken(null);
            this.store.setUser(null);
        }
    }

    public async goToLoginRoute() {
        const currentPath = this.nuxtApp?.ssrContext?.event?.path ?? '';

        if (currentPath.includes('login')) {
            return true;
        }

        await callWithNuxt(this.nuxtApp, () => navigateTo('/login'));
    }
}
