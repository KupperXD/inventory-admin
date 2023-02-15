import {FetchError} from "ofetch";
import {BaseResponse, Employee, List} from "~/src/types";

export default class DoRequest {
    public async refreshToken() {
        try {
            await $fetch<BaseResponse<List<Employee>>>('/api/auth/refresh', {
                method: 'get',
                retry: 0,
            });
        } catch(e) {
            return Promise.reject();
        }
    }

    public async fetchData<T>(
        method: 'post' | 'get' | 'PATCH' | 'delete',
        endpoint: string,
        params: Record<string, unknown> = {}
    ) {
        const options = (method === 'post' || method === 'PATCH') ? {body: params} : {};
        try {
            return await $fetch<BaseResponse<T>>(endpoint, {
                method: method,
                retry: 0,
                ...options,
            });
        } catch (e) {
            const err = e as FetchError;

            if (!(err.response?.status === 401)) {
                throw err;
            }

            try {
                await this.refreshToken();
                return await $fetch<BaseResponse<T>>(endpoint, {
                    method: method,
                    retry: 0,
                    ...options,
                });
            } catch (e) {
                console.log({'error': err});
                return Promise.reject(e)
            }
        }
    }
}
