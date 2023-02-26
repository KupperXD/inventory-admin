<template>
    <div>
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-dark font-semibold text-slate-700">
                Сотрудники
            </h1>
            <nuxt-link
                to="/employee/create"
                class="btn btn-primary">
                Добавить сотрудника
            </nuxt-link>
        </div>
        <div class="flex flex-wrap -mx-3">
            <UiTable
                :loading="pending"
                :tableHeader="employeeTableHeader"
                :tableRow="employees"
                @clickEdit:value="editEmployeeHandler"
                @clickDelete:value="deleteEmployeeHandler"
            />
        </div>
        <div>
            <UiPaginations
                v-if="lastPageComputed && lastPageComputed > 1"
                :max="lastPageComputed"
                :max-page="8"
                v-model="paginationModel"
                @update:modelValue="clickPaginationHandler"
            />
        </div>
    </div>
</template>
<script lang="ts" setup>
import {computed, definePageMeta, navigateTo, onMounted, useAsyncData} from "#imports";
import {Employee, InventoryItem, List, SuccessResponse, TableHeader} from "~/src/types";
import useBreadcrumbState from "~/src/store/useBreadcrumbState";
import DoRequest from "~/src/services/DoRequest";

definePageMeta({
    layout: 'default',
});


const paginationModel = ref(1);
const doRequest = new DoRequest();
const fetchEmployees = async () => {
    return await doRequest.fetchData<List<Employee>>('get', 'api/employee', {
        page: paginationModel.value,
    });
};
const { data, pending, refresh } = await useAsyncData(
    async () => {
        return await fetchEmployees();
    },
);

const lastPageComputed = computed(() => {
    return data.value?.response?.lastPage ?? 0;
});

const store = useBreadcrumbState();

const employeeTableHeader: TableHeader = [
    {title: 'ID'},
    {title: 'Имя'},
    {title: 'Почта'},
];

const employees = computed(() => {
    return data.value?.response.items.map(item => {
        return {
            id: item.id,
            name: item.name,
            email: item.email,
        }
    }) ?? [];
});

const editEmployeeHandler = (id: string) => {
    navigateTo(`/employee/${id}`);
};

const deleteEmployeeHandler = async (id: string) => {
    await new DoRequest().fetchData<SuccessResponse>('delete', `api/employee/${id}`);
    void refresh();
};

const clickPaginationHandler = () => {
    refresh();
};

store.setBreadcrumbs([
    {
        title: 'Главная',
        path: '/',
    },
    {
        title: 'Сотрудники',
    }
]);
</script>
