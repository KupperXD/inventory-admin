<template>
    <div>
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-dark font-semibold text-slate-700">
                Инвентарь
            </h1>
            <nuxt-link
                to="/inventory/create"
                class="btn btn-primary">
                Добавить инвентарь
            </nuxt-link>
        </div>
        <div class="flex flex-wrap -mx-3">
            <UiTable
                :tableHeader="inventoryTableHeader"
                :tableRow="inventories"
                @clickEdit:value="editInventoryHandler"
                @clickDelete:value="deleteInventoryHandler"
            />
        </div>
    </div>
</template>
<script lang="ts" setup>
import {computed, definePageMeta, onMounted, useAsyncData} from "#imports";
import useBreadcrumbState from "~/src/store/useBreadcrumbState";
import DoRequest from "~/src/services/DoRequest";
import {InventoryItem, List, SuccessResponse, TableHeader} from "~/src/types";
import {InventoryType, InventoryTypeValue} from "~/src/enum/InventoryType";

definePageMeta({
    layout: 'default',
});

const store = useBreadcrumbState();


const { data, pending, refresh } = await useAsyncData(
    async () => {
        return await new DoRequest().fetchData<List<InventoryItem>>('get', 'api/inventory-item');
    },
);

const inventoryTableHeader: TableHeader = [
    {title: 'ID'},
    {title: 'Название'},
    {title: 'Тип'},
    {title: 'Владелец'},
];

const getTypeValue = (type: InventoryType) => {
    switch (type){
        case InventoryType.COMPUTER:
            return InventoryTypeValue.COMPUTER;
        case InventoryType.FURNITURE:
            return InventoryTypeValue.FURNITURE;
        case InventoryType.PERIPHERY:
            return InventoryTypeValue.PERIPHERY;
    }
}

const inventories = computed(() => {
    return data.value?.response.items.map(item => {
        return {
            id: item.id,
            name: item.name,
            type: getTypeValue(item.type),
            employee: item.employee,
        }
    }) ?? [];
});

const editInventoryHandler = (id: string) => {

}

const deleteInventoryHandler = async (id: string) => {
    await new DoRequest().fetchData<SuccessResponse>('delete', `api/inventory-item/${id}`);
    refresh();
}

onMounted(() => {
    store.setBreadcrumbs([
        {
            title: 'Главная',
            path: '/',
        },
        {
            title: 'Инвентарь',
        }
    ]);
});
</script>
