import {defineStore} from "pinia";
import {User} from "~/src/types";


interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
}

const useAuthState = defineStore({
    id: 'authStore',
    state: (): AuthState => {
        return {
            user: null,
            accessToken: null,
            refreshToken: null,
        };
    },
    actions: {
        setUser(payload: User | null) {
            this.user = payload;
        },
        setAccessToken(payload: string | null) {
            this.accessToken = payload;
        },
        setRefreshToken(payload: string | null) {
            this.refreshToken = payload;
        },
    },
    getters: {
        getUser(): User | null {
            return this.user;
        },
        hasLogin(): boolean {
            return Boolean(this.user);
        },
        hasAccessToken(): boolean {
            return Boolean(this.accessToken);
        },
        hasRefreshToken(): boolean {
            return Boolean(this.refreshToken);
        },
        getAccessToken(): string | null {
            return this.accessToken;
        },
        getRefreshToken(): string | null {
            return this.refreshToken;
        },
    },
});

export default useAuthState;
