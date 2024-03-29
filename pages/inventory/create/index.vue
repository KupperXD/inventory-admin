<template>
    <div>
        <InventoryCreateOrUpdate
            :nameField="nameField"
            :typeField="typeField"
            :employeeField="employeeField"
            :specification="specification"
            :photoField="photoField"
            :isNew="true"
            :isLoading="isLoading"
            @addSpecification="addSpecification"
            @deleteSpecification:value="deleteSpecification"
            @update:file="updateFile"
            @submit="submitFormHandler"
        />
    </div>
</template>
<script lang="ts" setup>
import {definePageMeta, onMounted} from "#imports";
import useBreadcrumbState from "~/src/store/useBreadcrumbState";
import {InventoryItem} from "~/src/types";
import {navigateTo} from "#app";
import {ApiErrorResponse} from "~/src/types/errors";
import DoRequest from "~/src/services/DoRequest";
import {useFormHelpers} from "~/src/helpers/useFormHelpers";
import InventoryCreateOrUpdate from "~/components/inventory/InventoryCreateOrUpdate.vue";
import {useInventory} from "~/src/use/useInventory";

definePageMeta({
    layout: 'default',
});

const store = useBreadcrumbState();

const {
    nameField,
    typeField,
    employeeField,
    photoField,
    specification,
    isLoading,
    updateFile,
    getRequestParams,
    deleteSpecification,
    addSpecification,
} = await useInventory();

const {
    resetErrors,
    setFormErrors,
    isError
} = useFormHelpers();


const submitFormHandler = async () => {
    isLoading.value = true;
    resetErrors([nameField, typeField, employeeField]);

    const requestParams = getRequestParams();

    isLoading.value = false;

    try {
        const response = await new DoRequest().fetchData<InventoryItem | ApiErrorResponse>(
            'post', 'api/inventory-item', requestParams );

        if (isError(response)) {
            if (Array.isArray(response.error.data)) {
                setFormErrors([nameField, typeField, employeeField], response.error.data);
                return;
            }
        }

        if (response) {
            navigateTo('/inventory');
        }
    } catch (e) {
        console.log(e);
    } finally {
        isLoading.value = false;
    }
}

onMounted(async () => {
    store.setBreadcrumbs([
        {
            title: 'Главная',
            path: '/',
        },
        {
            title: 'Инвентарь',
            path: '/inventory'
        },
        {
            title: 'Добавление инвентаря',
        }
    ]);
});
</script>
