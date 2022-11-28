import { InventoryItemTypes } from '~/modules/common/enums/InventoryItemTypes';
import {
    Nullable,
    TEmployeeItem,
    TSuccessResponse,
} from '~/modules/common/types';

export namespace InventoryItem {
    export type TSpecificationsRequestFields = {
        'specification[motherboard]': string;
        'specification[powerUnit]': string;
        'specification[processor]': string;
        'specification[ram]': string;
        'specification[solidStateDrive]': string;
    };

    export type TSpecificationAttributes = {
        motherboard: string;
        powerUnit: string;
        processor: string;
        ram: string;
        solidStateDrive: string;
    };

    export type TItemModel = {
        id: string;
        employee: TEmployeeItem;
        number: string;
        photo: string | null;
        specification: TSpecificationAttributes | null;
        type: InventoryItemTypes;
    };

    export type TCreateRequest = {
        number: string;
        type: InventoryItemTypes | null;
        employeeId: string;
        photo: File | null;
    } & Nullable<Partial<TSpecificationsRequestFields>>;

    export type TCreateResponse = TSuccessResponse;

    export type TListResponse = TItemModel[];

    export type TDetailResponse = TItemModel;
}
