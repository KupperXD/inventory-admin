import {
    Nullable,
    TEmployeeCreateRequest,
    TEmployeeCreateResponse,
    TEmployeeItem,
    TEmployeeListResponse,
    TSuccessResponse,
} from '~/modules/common/types';
import BaseApi from '~/modules/common/api/BaseApi';

export default class EmployeeApi extends BaseApi {
    /**
     * Создать сотрудника
     * @param params
     */
    public create(
        params: Nullable<TEmployeeCreateRequest>
    ): Promise<TEmployeeCreateResponse> {
        return this.apiService.getRequest('post', '/api-admin-add-employee', {
            params,
            needTransformPostData: true,
        });
    }

    /**
     * Обновить сотрудника
     * @param id
     * @param params
     */
    public update(
        id: string,
        params: Nullable<TEmployeeCreateRequest>
    ): Promise<TEmployeeCreateResponse> {
        return this.apiService.getRequest(
            'post',
            `/api-admin-update-employee/${id}`,
            {
                params,
                needTransformPostData: true,
            }
        );
    }

    /**
     * Удалить сотрудника
     * @param id
     */
    public delete(id: string): Promise<TSuccessResponse> {
        return this.apiService.getRequest(
            'post',
            `/api-admin-delete-employee/${id}`
        );
    }

    /**
     * Получить список
     */
    public getList(): Promise<TEmployeeListResponse> {
        return this.apiService.getRequest('get', '/api-admin-employee-list');
    }

    /**
     * Получить детальные данные
     * @param id
     */
    public getDetail(id: string): Promise<TEmployeeItem> {
        return this.apiService.getRequest('get', `/api-admin-employee/${id}`);
    }
}
