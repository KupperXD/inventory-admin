import BaseApi from '~/modules/common/api/BaseApi';
import { Nullable, TSuccessResponse } from '~/modules/common/types';
import type { InventoryItem } from '~/modules/common/types/inventoryItem';

export default class InventoryItemsApi extends BaseApi {
    /**
     * Создать инвентарь
     * @param params
     */
    public create(
        params: Nullable<InventoryItem.TCreateRequest>
    ): Promise<InventoryItem.TCreateResponse> {
        return this.apiService.getRequest(
            'post',
            '/api-admin-add-inventory-item',
            {
                params,
                needTransformPostData: true,
            }
        );
    }

    /**
     * Обновить инвентарь
     * @param id
     * @param params
     */
    public update(
        id: string,
        params: Nullable<InventoryItem.TCreateRequest>
    ): Promise<InventoryItem.TCreateResponse> {
        return this.apiService.getRequest(
            'post',
            `/api-admin-update-inventory-item/${id}`,
            {
                params,
                needTransformPostData: true,
            }
        );
    }

    /**
     * Получить список
     */
    public getList(): Promise<InventoryItem.TListResponse> {
        return this.apiService.getRequest(
            'get',
            '/api-admin-inventory-item-list'
        );
    }

    /**
     * Удалить элемент
     * @param id
     */
    public deleteItem(id: string): Promise<TSuccessResponse> {
        return this.apiService.getRequest(
            'post',
            `api-admin-delete-inventory-item/${id}`
        );
    }

    public getDetailData(id: string): Promise<InventoryItem.TDetailResponse> {
        return this.apiService.getRequest(
            'get',
            `/api-admin-inventory-item/${id}`
        );
    }
}
