<template>
    <div>
        <h1 class="text-dark mb-6 font-semibold text-slate-700">
            Сотрудники
        </h1>
        <div class="flex flex-wrap -mx-3">
            <UiTable :tableHeader="employeeTableHeader" :tableRow="[]"/>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {definePageMeta, onMounted, ref} from "#imports";
import {Employee, TableHeader, List} from "~/src/types";
import useBreadcrumbState from "~/src/store/useBreadcrumbState";
import DoRequest from "~/src/services/DoRequest";

definePageMeta({
    layout: 'default',
});
const store = useBreadcrumbState();

const employeeTableHeader: TableHeader = [
    {title: 'ID'},
    {title: 'Имя'},
    {title: 'Почта'},
];

const employees = ref<Employee[]>([]);

onMounted(async () => {
    store.setBreadcrumbs([{
        title: 'Главная',
        path: '/',
    },{
        title: 'Сотрудники',
    }]);

    const response = await new DoRequest().fetchData<List<Employee>>('get', 'api/employee');
    employees.value = response?.response.items ?? [];
});
</script>
