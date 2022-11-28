<template>
    <section>
        <v-container v-if="!$fetchState.pending" fluid>
            <div class="mb-12">
                <v-btn
                    color="primary"
                    :to="{
                        path: '/employee/',
                    }"
                >
                    <v-icon>mdi-keyboard-backspace</v-icon>
                    Назад к списку
                </v-btn>
            </div>
            <v-row class="mt-16">
                <v-col class="col-12 col-md-8">
                    <v-card class="col-12 white" light>
                        <v-card-title class="align-start">
                            <v-sheet
                                class="mt-n12"
                                color="primary"
                                elevation="6"
                                rounded
                            >
                                <div class="pa-8">
                                    <v-icon color="white"
                                        >mdi-account-multiple-plus</v-icon
                                    >
                                </div>
                            </v-sheet>
                            <div class="pl-4 font-weight-regular">
                                {{ titlePersonalCard }}
                            </div>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-form @submit.prevent="submitForm">
                                    <v-text-field
                                        v-model="nameField.value"
                                        class="col-10"
                                        color="purple"
                                        :label="nameField.label"
                                        :error="!!nameField.error"
                                        :error-messages="nameField.error"
                                    />
                                    <div class="d-flex justify-end mt-4">
                                        <v-btn
                                            type="submit"
                                            color="primary"
                                            :loading="loading"
                                        >
                                            {{ submitButtonText }}
                                        </v-btn>
                                    </div>
                                </v-form>
                            </v-container>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col
                    v-if="employeeDetail && employeeDetail.inventoryItems"
                    class="col-12 mt-8"
                >
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
                            <InventoryTables :items="inventoryItemsRows" />
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <v-progress-circular v-else />
    </section>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import {
    TEmployeeItem,
    TErrorMessage,
    TErrorResponse,
} from '~/modules/common/types';
import { Form } from '~/modules/form/types';
import errorService from '~/modules/common/services/ErrorService';
import inventoryItemService from '~/modules/inventory-item/service/InventoryItemService';
import InventoryTables from '~/components/inventory-items/InventoryTables.vue';

@Component({
    middleware: 'auth',
    components: {
        InventoryTables,
    },
})
export default class EmployeeDetail extends Vue {
    private employeeDetail: TEmployeeItem | null = null;
    private loading = false;
    private nameField: Form.TBaseField = {
        name: 'name',
        error: '',
        value: null,
        label: 'Имя сотрудника',
        type: 'text',
    };

    private get employeeId(): string {
        return this.$route.params.id;
    }

    private get inventoryItemsRows(): Record<string, string>[] {
        if (!this.employeeDetail || !this.employeeDetail.inventoryItems) {
            return [];
        }

        return this.employeeDetail.inventoryItems.map((item) => ({
            id: item.id,
            employeeName: this.employeeDetail?.name ?? '-',
            number: item.number,
            type: inventoryItemService.getTypeTextByTypeValue(item.type) || '-',
        }));
    }

    /**
     * Заголовок для персональной карточки
     * @private
     */
    private get titlePersonalCard(): string {
        return this.employeeId ? 'Персональные данные' : 'Создание сотрудника';
    }

    /**
     * Текст для кнопки отправки
     * @private
     */
    private get submitButtonText(): string {
        return this.employeeId ? 'Изменить' : 'Создать';
    }

    async fetch() {
        if (!this.employeeId) {
            return;
        }

        const response = await this.$api.$employeeApi.getDetail(
            this.employeeId
        );

        this.employeeDetail = response;
        this.nameField.value = this.employeeDetail.name;
    }

    private allFields = [this.nameField];

    private async submitForm(): Promise<void> {
        this.loading = true;
        this.clearErrors();
        try {
            const request = {
                name: this.nameField.value,
            };

            this.employeeId
                ? await this.$api.$employeeApi.update(this.employeeId, request)
                : await this.$api.$employeeApi.create(request);

            if (!this.employeeId) {
                this.nameField.value = '';
            }
        } catch (e) {
            const error = e as TErrorResponse;

            if (typeof error.errors !== 'undefined') {
                this.setErrors(error.errors);
            }
        } finally {
            this.loading = false;
        }
    }

    /**
     * Очистить ошибки
     * @private
     */
    private clearErrors(): void {
        errorService.clearErrors(this.allFields);
    }

    /**
     * Установить ошибки валидации
     * @param errors
     * @private
     */
    private setErrors(errors: TErrorMessage): void {
        errorService.setErrors(this.allFields, errors);
    }
}
</script>
