import ApiService from '~/modules/common/services/ApiService';

export default class BaseApi {
    protected _apiService: ApiService;

    constructor(apiService: ApiService) {
        this._apiService = apiService;
    }

    protected get apiService(): ApiService {
        return this._apiService;
    }

    protected set apiService(value: ApiService) {
        this._apiService = value;
    }
}
