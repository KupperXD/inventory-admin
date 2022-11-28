import exp from 'constants';
import {InventoryItemTypes} from "~/modules/common/enums/InventoryItemTypes";
import {InventoryItem} from "~/modules/common/types/inventoryItem";

export type TFormDataItemObject = {
    [key: string]:
        | string
        | string[]
        | number[]
        | number
        | null
        | boolean
        | FileList
        | File[]
        | File
        | TFormDataItemObject;
};

export type Nullable<T> = {
    [P in keyof T]?: T[P] | null;
};

export type TApiRequestOptions = {
    params?: TFormDataItemObject;
    needTransformPostData?: boolean;
    headers?: Record<string, string>;
    responseType?: string;
    isFile?: boolean;
    isGlobalProcessError?: boolean;
};

export type TErrorMessage = string[] | Record<string, Array<string> | string>;

export type TErrorResponse = {
    code: number;
    errors: TErrorMessage;
};

export type TSuccessResponse = {
    success: boolean;
};

// Сотрудник
export type TEmployeeItem = {
    id: string;
    name: string;
    inventoryItems: InventoryItem.TItemModel[];
};

// Запрос создания сотрудника
export type TEmployeeCreateRequest = {
    name: string;
};

// Успешный ответ на создание сотрудника
export type TEmployeeCreateResponse = {
    success: boolean;
};

// Успешный ответ списка сотрудника
export type TEmployeeListResponse = TEmployeeItem[];
