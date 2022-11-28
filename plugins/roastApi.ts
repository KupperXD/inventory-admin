import { Plugin } from '@nuxt/types';
import ApiService from '~/modules/common/services/ApiService';
import EmployeeApi from '~/modules/common/api/EmployeeApi';
import InventoryItemsApi from '~/modules/common/api/InventoryItemsApi';

interface ApiInterface {
    $employeeApi: EmployeeApi;
    $inventoryItemApi: InventoryItemsApi;
}

declare module 'vue/types/vue' {
    interface Vue {
        $api: ApiInterface;
    }
}

declare module '@nuxt/types' {
    // nuxtContext.app.$myInjectedFunction inside asyncData, fetch, plugins, middleware, nuxtServerInit
    interface NuxtAppOptions {
        $api: ApiInterface;
    }
    // nuxtContext.$myInjectedFunction
    interface Context {
        $api: ApiInterface;
    }
}

const apiPlugin: Plugin = ({ $axios }, inject) => {
    const apiService = new ApiService($axios);
    const api: ApiInterface = {
        $employeeApi: new EmployeeApi(apiService),
        $inventoryItemApi: new InventoryItemsApi(apiService),
    };

    inject('api', api);
};

export default apiPlugin;
