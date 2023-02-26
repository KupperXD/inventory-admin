<template>
    <div>
        <InventoryCreateOrUpdate
            :nameField="nameField"
            :typeField="typeField"
            :employeeField="employeeField"
            :specification="specification"
            :photoField="photoField"
            :isNew="false"
            :isLoading="isLoading"
            @addSpecification="addSpecification"
            @deleteSpecification:value="deleteSpecification"
            @update:file="updateFile"
            @submit="submitFormHandler"
        />
    </div>
</template>
<script lang="ts" setup>
import {definePageMeta, onMounted, useAsyncData, useRoute} from "#imports";
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
const route = useRoute();

const { data: inventoryDetail } = await useAsyncData(
    () => new DoRequest().fetchData<InventoryItem>('get', `api/inventory-item/${route.params.id}`)
);

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
    getTypeValue,
    specificationLabelDefaultField,
    specificationValueDefaultField,
} = await useInventory();


const {
    resetErrors,
    setFormErrors,
    isError
} = useFormHelpers();

const submitFormHandler = async () => {
    resetErrors([nameField, typeField, employeeField]);

    const requestParams = getRequestParams();
    const id = inventoryDetail.value?.response.id ?? null;

    if (isLoading.value || !id) {
        return;
    }

    isLoading.value = true;

    try {
        const response = await new DoRequest().fetchData<InventoryItem | ApiErrorResponse>(
            'PATCH', `api/inventory-item/${id}`, requestParams );

        if (isError(response)) {
            if (Array.isArray(response.error.data)) {
                setFormErrors([nameField, typeField, employeeField, photoField],response.error.data);
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

const fillFields = (inventory: InventoryItem | null) => {
    if (!inventory) {
        return;
    }

    nameField.value = inventory.name;
    typeField.value = inventory.type;
    employeeField.value = inventory.employee?.id.toString() ?? '';
    photoField.value = inventory.photo;
    specification.value = inventory.specifications.map(item => {
        return {
            label: {
                ...specificationLabelDefaultField,
                value: item.label
            },
            value: {
                ...specificationValueDefaultField,
                value: item.label
            },
        }
    })
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
            title: 'Редактирование инвентаря',
        }
    ]);

    fillFields(inventoryDetail.value?.response ?? null);
});
</script>
