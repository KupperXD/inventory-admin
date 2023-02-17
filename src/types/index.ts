import AuthPlugin from "~/src/libs/auth-plugin";
import {InventoryType} from "~/src/enum/InventoryType";

export type FieldType = {
    value: string | null;
    label: string;
    error: string | null;
    name: string;
    placeholder: string | null;
}

export type FieldSelectType<T> = FieldType & {
    options: {
        label: string,
        value: T
    }[]
}

export type BaseResponse<T> = {
    response: T;
};

export type FormDataItemObject = {
    [key: string]:
        | string
        | string[]
        | number[]
        | number
        | null
        | boolean
        | Record<string, any>
}  | FormData;

export type SuccessResponse = {
    response: {
        success: boolean;
    }
}

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

export type TableRow = Record<string, unknown>;

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

export type InventoryItem = {
    id: number;
    name: string;
    type: InventoryType;
    employee: User;
    photo: File;
    specifications: {
        label: string;
        value: string;
    }[];
}

export type File = {
    id: number;
    fileName: string;
    path: string;
    size: number;
};

export type FieldFile = {
    value: File | null;
    label: string | null;
    name: string;
    error: string | null;
    desc: string | null;
}

export type Nullable<T> = {
    [P in keyof T]?: T[P] | null;
};
