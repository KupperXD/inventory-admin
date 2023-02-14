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

export type TableHeader = { title: string }[];

export type TableRow = Record<string, unknown>[];

export type Breadcrumbs = {
    title: string,
    path?: string,
}[];

export type Employee = User;

export type List<T> = {
    currentPage: number;
    lastPage: number;
    perPage: number;
    from: number;
    to: number;
    total: number;
    items: T[];
};
