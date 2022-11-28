import { AxiosResponse } from 'axios';
import type { NuxtAxiosInstance } from '@nuxtjs/axios';
import type {
    TFormDataItemObject,
    TApiRequestOptions,
} from '~/modules/common/types';

/**
 * Сервис по работе с апи
 */
export default class ApiService {
    private _axios: NuxtAxiosInstance;

    set axios(value: NuxtAxiosInstance) {
        this._axios = value;
    }

    get axios(): NuxtAxiosInstance {
        return this._axios;
    }

    constructor(axios: NuxtAxiosInstance) {
        this._axios = axios;
    }

    public getRequest = async <T>(
        method: 'post' | 'get',
        url: string,
        entryOptions: TApiRequestOptions = {}
    ) => {
        const requestParams: Record<string, unknown> = {
            method,
            url,
        };

        const options: TApiRequestOptions = {
            headers: {},
            isFile: false,
            responseType: 'json',
            needTransformPostData: false,
            isGlobalProcessError: true,
            ...entryOptions,
        };

        let headers: Record<string, unknown> = {
            'Content-Type': options.needTransformPostData
                ? 'multipart/form-data'
                : 'application/json',
        };

        if (options.params) {
            if (method === 'post') {
                requestParams.data = options.needTransformPostData
                    ? this.getFormDataByObject(options.params)
                    : options.params;
            } else {
                requestParams.params = options.params;
            }
        }

        if (options.responseType) {
            requestParams.responseType = options.responseType;
        }

        if (options.headers) {
            headers = {
                ...headers,
                ...options.headers,
            };
        }

        requestParams.headers = headers;

        try {
            const response = (await this.axios.request({
                ...requestParams,
            })) as AxiosResponse;

            if (typeof response.data.errors === 'undefined') {
                return Promise.resolve(response.data as T);
            } else {
                return Promise.reject(response.data);
            }
        } catch (e) {
            return Promise.reject(e);
        }
    };

    /**
     * Делает FormData из произвольного объекта
     *
     * @param { [key: string]: string | FileList | Object} paramsObject
     * @param {FormData} formData
     * @param {string} previousFormDataKey
     * @return FormData
     * @private
     */
    private getFormDataByObject(
        paramsObject: TFormDataItemObject,
        entyFormData?: FormData,
        previousFormDataKey = ''
    ): FormData {
        const formData = entyFormData ?? new FormData();

        Object.keys(paramsObject).forEach((propName: string) => {
            let field = paramsObject[propName];
            let formDataKey = previousFormDataKey
                ? `${previousFormDataKey}[${propName}]`
                : propName;

            if (typeof field === 'boolean') {
                formData.append(formDataKey, field ? '1' : '0');
                return;
            }

            if (typeof field === 'number') {
                formData.append(formDataKey, `${field}`);
                return;
            }

            if (field) {
                if (field instanceof FileList) {
                    field = Array.from(field);
                }

                if (Array.isArray(field)) {
                    formDataKey = `${formDataKey}`;

                    field.forEach(
                        (
                            arrayFieldElement: string | number | File,
                            index: number
                        ) => {
                            if (
                                typeof arrayFieldElement === 'object' &&
                                !(arrayFieldElement instanceof File)
                            ) {
                                this.getFormDataByObject(
                                    arrayFieldElement,
                                    formData,
                                    `${formDataKey}[${index}]`
                                );
                                return;
                            }
                            formData.append(
                                `${formDataKey}[]`,
                                arrayFieldElement?.toString()
                            );
                        }
                    );
                } else if (
                    field &&
                    typeof field === 'object' &&
                    !(field instanceof File)
                ) {
                    this.getFormDataByObject(field, formData, formDataKey);
                } else {
                    formData.append(formDataKey, field as string);
                }
            }
        });

        return formData;
    }
}
