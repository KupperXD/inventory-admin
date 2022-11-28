<template>
    <section class="h-100">
        <v-container class="h-100" fluid>
            <div class="d-flex justify-end mb-4">
                <v-btn color="primary" :to="{ path: '/employee/create' }">
                    Создать сотрудника
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
                            <v-icon> mdi-account-group </v-icon>
                        </div>
                    </v-sheet>
                    <div class="pl-4">Список сотрудников</div>
                </v-card-title>
                <v-card-text>
                    <v-data-table
                        :loading="$fetchState.pending || loading"
                        :headers="tableHeader"
                        :items="employeeList"
                        :items-per-page="employeeList.length"
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
import { Component, Vue } from 'nuxt-property-decorator';
import { TEmployeeItem, TEmployeeListResponse } from '~/modules/common/types';

@Component({
    fetchKey: 'employee-list',
    middleware: 'auth',
})
export default class EmployeeList extends Vue {
    private loading = false;
    private employeeList: TEmployeeListResponse = [];

    private tableHeader = [
        {
            text: 'ID',
            value: 'id',
        },
        {
            text: 'Имя',
            value: 'name',
        },
        {
            text: '',
            value: 'actions',
            align: 'end',
            sortable: false,
        },
    ];

    async fetch() {
        this.employeeList = await this.$api.$employeeApi.getList();
    }

    /**
     * Клик на строку таблицы
     * @private
     */
    private clickRowHandler(row: TEmployeeItem): void {
        this.$router.push({
            name: 'employee-id',
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
            const response = await this.$api.$employeeApi.delete(id);

            if (response.success) {
                this.employeeList = await this.$api.$employeeApi.getList();
            }
        } catch (e) {
            console.log(e);
        } finally {
            this.loading = false;
        }
    }
}
</script>
