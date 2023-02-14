import {FetchError} from "ofetch";
import {BaseResponse, Employee, List} from "~/src/types";

export default class DoRequest {
    public async refreshToken() {
        try {
            await $fetch<BaseResponse<List<Employee>>>('/api/auth/refresh', {
                method: 'get',
            });
        } catch(e) {
            const err = e as FetchError;
            console.log({'error refresh token': err});
        }
    }

    public async fetchData<T>(method: 'post' | 'get', endpoint: string, params: Record<string, string> = {}) {
        const options = method === 'post' ? {body: params} : {};
        try {
            return await $fetch<BaseResponse<T>>(endpoint, {
                method: method,
                ...options,
            });
        } catch (e) {
            const err = e as FetchError;

            try {
                await this.refreshToken();
                await this.fetchData(method, endpoint, params);
            } catch (e) {
                console.log({'error fetch data': err});
            }
        }
    }
}
