import AuthPlugin from "~/src/libs/auth-plugin";

export type FieldType = {
    value: string | null;
    label: string;
    error: string | null;
    name: string;
    placeholder: string | null;
}

export type BaseResponse<T> = {
    response: T;
};

export type User = {
    email: string;
    id: number;
    name: string;
}

export type AuthUserResponse = User;

declare module '#app' {
    interface NuxtApp {
        $auth: AuthPlugin,
    }
}
declare module 'vue' {
    interface ComponentCustomProperties {
        $auth: AuthPlugin,
    }
}
export { }
