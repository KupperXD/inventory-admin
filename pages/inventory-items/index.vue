<template>
    <section class="h-100">
        <v-container class="h-100" fluid>
            <div class="d-flex justify-end mb-4">
                <v-btn
                    color="primary"
                    :to="{ path: '/inventory-items/create' }"
                >
                    Создать инвентарь
                </v-btn>
            </div>
            <v-card class="white">
                <v-card-title class="align-start">
                    <v-sheet
                        class="mt-n9"
                        color="primary"
                        elevation="6"
                        rounded
                    >
                        <div class="pa-8">
                            <v-icon> mdi-desktop-classic </v-icon>
                        </div>
                    </v-sheet>
                    <div class="pl-4">Список инвентаря</div>
                </v-card-title>
                <v-card-text>
                    <v-data-table
                        :loading="$fetchState.pending || loading"
                        :headers="tableHeader"
                        :items="tableItems"
                        :items-per-page="tableItems.length"
                        light
                        hide-default-footer
                        @click:row="clickRowHandler"
                    >
                        <template #item.actions="{ item }">
                            <div class="d-flex justify-end">
                                <v-btn
                                    title="Удалить"
                                    icon
                                    color="blue-grey lighten-1"
                                    @click.stop="
                                        clickDeleteItemHandler(item.id)
                                    "
                                >
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </div>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </v-container>
    </section>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import type { InventoryItem } from '~/modules/common/types/inventoryItem';
import inventoryItemService from '~/modules/inventory-item/service/InventoryItemService';

@Component({})
export default class InventoryItemsList extends Vue {
    private loading = false;
    private inventoryItemList: InventoryItem.TListResponse | null = null;

    private tableHeader = [
        {
            text: 'ID',
            value: 'id',
        },
        {
            text: 'Номер',
            value: 'number',
        },
        {
            text: 'Имя сотрудника',
            value: 'employeeName',
        },
        {
            text: 'Тип',
            value: 'type',
        },
        {
            text: '',
            value: 'actions',
            align: 'end',
            sortable: false,
        },
    ];

    private get tableItems(): Record<string, string>[] {
        if (!this.inventoryItemList) {
            return [];
        }

        return this.inventoryItemList.map((item) => ({
            id: item.id,
            employeeName: item.employee.name,
            number: item.number,
            type: inventoryItemService.getTypeTextByTypeValue(item.type) || '-',
        }));
    }

    async fetch() {
        this.inventoryItemList = await this.$api.$inventoryItemApi.getList();
    }

    /**
     * Клик на строку таблицы
     * @private
     */
    private clickRowHandler(row: InventoryItem.TItemModel): void {
        this.$router.push({
            name: 'inventory-items-id',
            params: {
                id: row.id,
            },
        });
    }

    /**
     * Удалить элемент в списке
     * @param id
     * @private
     */
    private async clickDeleteItemHandler(id: string): Promise<void> {
        this.loading = true;

        try {
            const response = await this.$api.$inventoryItemApi.deleteItem(id);

            if (response.success) {
                this.inventoryItemList =
                    await this.$api.$inventoryItemApi.getList();
            }
        } catch (e) {
            console.log(e);
        } finally {
            this.loading = false;
        }
    }
}
</script>
