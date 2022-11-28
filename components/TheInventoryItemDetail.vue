<template>
    <section>
        <v-container v-if="!$fetchState.pending" fluid>
            <div class="mb-12">
                <v-btn
                    color="primary"
                    :to="{
                        path: '/inventory-items/',
                    }"
                >
                    <v-icon>mdi-keyboard-backspace</v-icon>
                    Назад к списку
                </v-btn>
            </div>
            <v-row v-if="!$fetchState.pending" class="mt-16">
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
                                    <v-icon large color="white"
                                        >mdi-receipt-text-check</v-icon
                                    >
                                </div>
                            </v-sheet>
                            <div class="pl-4 font-weight-regular">
                                {{ titlePersonalCard }}
                            </div>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-form @submit.prevent="submitHandler">
                                    <v-row>
                                        <v-col cols="6">
                                            <v-text-field
                                                v-model="numberField.value"
                                                color="purple"
                                                :label="numberField.label"
                                                :error="!!numberField.error"
                                                :error-messages="
                                                    numberField.error
                                                "
                                            />
                                        </v-col>
                                        <v-col cols="6">
                                            <v-select
                                                v-model="
                                                    inventoryItemTypeField.value
                                                "
                                                :label="
                                                    inventoryItemTypeField.label
                                                "
                                                :items="
                                                    inventoryItemTypeField.options
                                                "
                                                item-value="value"
                                                item-text="label"
                                                :error="
                                                    !!inventoryItemTypeField.error
                                                "
                                                :error-messages="
                                                    inventoryItemTypeField.error
                                                "
                                                clearable
                                            />
                                        </v-col>
                                        <v-col cols="12">
                                            <v-file-input
                                                v-model="fileField.value"
                                                :label="fileField.label"
                                                color="purple"
                                                :error="!!fileField.error"
                                                :error-messages="
                                                    fileField.error
                                                "
                                            />
                                        </v-col>
                                        <v-col cols="12">
                                            <v-autocomplete
                                                v-model="
                                                    employeeItemField.value
                                                "
                                                :items="
                                                    employeeItemField.options
                                                "
                                                item-text="label"
                                                item-value="value"
                                                :label="employeeItemField.label"
                                                :error-messages="
                                                    employeeItemField.error
                                                "
                                                :error="
                                                    !!employeeItemField.error
                                                "
                                            />
                                        </v-col>
                                    </v-row>
                                    <transition name="fade">
                                        <div
                                            v-if="isShowSpecifications"
                                            class="my-3"
                                        >
                                            <h4>Спецификация компьютера:</h4>
                                            <v-row>
                                                <v-col cols="6">
                                                    <v-text-field
                                                        v-model="
                                                            specificationMotherboardField.value
                                                        "
                                                        color="purple"
                                                        :label="
                                                            specificationMotherboardField.label
                                                        "
                                                        :error="
                                                            !!specificationMotherboardField.error
                                                        "
                                                        :error-messages="
                                                            specificationMotherboardField.error
                                                        "
                                                    />
                                                </v-col>
                                                <v-col cols="6">
                                                    <v-text-field
                                                        v-model="
                                                            specificationRamField.value
                                                        "
                                                        color="purple"
                                                        :label="
                                                            specificationRamField.label
                                                        "
                                                        :error="
                                                            !!specificationRamField.error
                                                        "
                                                        :error-messages="
                                                            specificationRamField.error
                                                        "
                                                    />
                                                </v-col>
                                                <v-col cols="6">
                                                    <v-text-field
                                                        v-model="
                                                            specificationPowerUnitField.value
                                                        "
                                                        color="purple"
                                                        :label="
                                                            specificationPowerUnitField.label
                                                        "
                                                        :error="
                                                            !!specificationPowerUnitField.error
                                                        "
                                                        :error-messages="
                                                            specificationPowerUnitField.error
                                                        "
                                                    />
                                                </v-col>
                                                <v-col cols="6">
                                                    <v-text-field
                                                        v-model="
                                                            specificationProcessorField.value
                                                        "
                                                        color="purple"
                                                        :label="
                                                            specificationProcessorField.label
                                                        "
                                                        :error="
                                                            !!specificationProcessorField.error
                                                        "
                                                        :error-messages="
                                                            specificationProcessorField.error
                                                        "
                                                    />
                                                </v-col>
                                                <v-col cols="12">
                                                    <v-text-field
                                                        v-model="
                                                            specificationSolidStateDriverField.value
                                                        "
                                                        color="purple"
                                                        :label="
                                                            specificationSolidStateDriverField.label
                                                        "
                                                        :error="
                                                            !!specificationSolidStateDriverField.error
                                                        "
                                                        :error-messages="
                                                            specificationSolidStateDriverField.error
                                                        "
                                                    />
                                                </v-col>
                                            </v-row>
                                        </div>
                                    </transition>
                                    <v-btn
                                        class="mt-4"
                                        type="submit"
                                        color="primary"
                                        :loading="loading"
                                    >
                                        {{ submitButtonText }}
                                    </v-btn>
                                </v-form>
                            </v-container>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <div
                v-else
                class="d-flex align-center justify-center"
                style="min-height: 400px; position: relative"
            >
                <v-progress-circular
                    size="80"
                    color="primary"
                    indeterminate
                ></v-progress-circular>
            </div>
        </v-container>
        <v-progress-circular v-else />
    </section>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator';
import { Form } from '~/modules/form/types';
import { InventoryItemTypes } from '~/modules/common/enums/InventoryItemTypes';
import EmployeeService from '~/modules/common/services/EmployeeService';
import errorService from '~/modules/common/services/ErrorService';
import { Nullable, TErrorResponse } from '~/modules/common/types';
import { InventoryItem } from '~/modules/common/types/inventoryItem';

@Component({})
export default class TheInventoryItemDetail extends Vue {
    private loading = false;
    private detailResponse: InventoryItem.TDetailResponse | null = null;
    private numberField: Form.TBaseField = {
        name: 'number',
        error: '',
        value: null,
        label: 'Номер',
        type: 'text',
    };

    private inventoryItemTypeField: Form.TSelectSingleField<InventoryItemTypes> =
        {
            name: 'type',
            label: 'Тип',
            error: '',
            value: null,
            options: [
                {
                    value: InventoryItemTypes.COMPUTER,
                    label: 'Компьютер',
                },
                {
                    value: InventoryItemTypes.FURNITURE,
                    label: 'Мебель',
                },
                {
                    value: InventoryItemTypes.PERIPHERY,
                    label: 'Переферия',
                },
            ],
        };

    private fileField: Form.TBaseField<File> = {
        value: null,
        error: '',
        label: 'Фотография',
        name: 'photo',
    };

    private employeeItemField: Form.TSelectSingleField = {
        name: 'employeeId',
        label: 'Сотрудник',
        error: '',
        value: null,
        options: [],
    };

    private specificationMotherboardField: Form.TBaseField = {
        name: 'specification[motherboard]',
        label: 'Материнская плата',
        error: '',
        value: null,
    };

    private specificationPowerUnitField: Form.TBaseField = {
        name: 'specification[powerUnit]',
        label: 'Блок питания',
        error: '',
        value: null,
    };

    private specificationProcessorField: Form.TBaseField = {
        name: 'specification[processor]',
        label: 'Процессор',
        error: '',
        value: null,
    };

    private specificationRamField: Form.TBaseField = {
        name: 'specification[ram]',
        label: 'Оперативная память',
        error: '',
        value: null,
    };

    private specificationSolidStateDriverField: Form.TBaseField = {
        name: 'specification[solidStateDrive]',
        label: 'HDD, SSD',
        error: '',
        value: null,
    };

    private specificationsComputerFields = [
        this.specificationMotherboardField,
        this.specificationRamField,
        this.specificationProcessorField,
        this.specificationPowerUnitField,
        this.specificationSolidStateDriverField,
    ];

    private allFields = [
        this.fileField,
        this.employeeItemField,
        this.numberField,
        this.inventoryItemTypeField,
        ...this.specificationsComputerFields,
    ];

    @Watch('inventoryItemTypeField.value')
    onInventoryItemTypeValueChange(newValue: InventoryItemTypes | null) {
        if (newValue && newValue === InventoryItemTypes.COMPUTER) {
            return;
        }

        this.clearSpecificationsFields();
    }

    private get inventoryItemId(): string {
        return this.$route.params.id;
    }

    /**
     * Заголовок для персональной карточки
     * @private
     */
    private get titlePersonalCard(): string {
        return this.inventoryItemId
            ? 'Карточка инвентаря'
            : 'Создание инвентаря';
    }

    /**
     * Текст для кнопки отправки
     * @private
     */
    private get submitButtonText(): string {
        return this.inventoryItemId ? 'Изменить' : 'Создать';
    }

    /**
     * Показывать ли поля спецификации
     * @private
     */
    private get isShowSpecifications(): boolean {
        if (
            !this.inventoryItemTypeField.value ||
            !(this.inventoryItemTypeField.value === InventoryItemTypes.COMPUTER)
        ) {
            return false;
        }

        return true;
    }

    async fetch() {
        await this.fetchStartData();
        await this.fetchDetailData();
    }

    private async fetchDetailData(): Promise<void> {
        if (!this.inventoryItemId) {
            return;
        }

        this.detailResponse = await this.$api.$inventoryItemApi.getDetailData(
            this.inventoryItemId
        );

        this.fillFieldsByModel(this.detailResponse);
    }

    /**
     * Загрузить стартовые данные
     * @private
     */
    private async fetchStartData(): Promise<void> {
        const responses = await Promise.all([this.$api.$employeeApi.getList()]);

        // Превращаем сотрудников в опции селекта
        this.employeeItemField.options = responses[0].map((employeeItem) =>
            EmployeeService.transformModelToOption(employeeItem)
        );
    }

    private fillFieldsByModel(model: InventoryItem.TItemModel): void {
        this.numberField.value = model.number;
        this.inventoryItemTypeField.value = model.type;
        this.employeeItemField.value = model.employee.id;

        if (model.specification) {
            this.specificationSolidStateDriverField.value =
                model.specification.solidStateDrive;
            this.specificationRamField.value = model.specification.ram;
            this.specificationPowerUnitField.value =
                model.specification.powerUnit;
            this.specificationProcessorField.value =
                model.specification.processor;
            this.specificationMotherboardField.value =
                model.specification.motherboard;
        }
    }

    /**
     * Очистить поля спецификации компьютера
     * @private
     */
    private clearSpecificationsFields(): void {
        this.specificationsComputerFields.forEach(
            (field) => (field.value = null)
        );
    }

    private getRequestParams(): Nullable<InventoryItem.TCreateRequest> {
        const specificationsFields: Nullable<InventoryItem.TSpecificationsRequestFields> =
            {
                'specification[motherboard]':
                    this.specificationMotherboardField.value,
                'specification[processor]':
                    this.specificationProcessorField.value,
                'specification[ram]': this.specificationRamField.value,
                'specification[powerUnit]':
                    this.specificationPowerUnitField.value,
                'specification[solidStateDrive]':
                    this.specificationSolidStateDriverField.value,
            };

        let baseRequest: Nullable<InventoryItem.TCreateRequest> = {
            employeeId: this.employeeItemField.value,
            number: this.numberField.value,
            photo: this.fileField.value,
            type: this.inventoryItemTypeField.value,
        };

        if (this.isShowSpecifications) {
            baseRequest = {
                ...baseRequest,
                ...specificationsFields,
            };
        }

        return baseRequest;
    }

    /**
     * Очистить все поля
     * @private
     */
    private clearAllFields(): void {
        this.allFields.forEach((field) => (field.value = null));
    }

    private async submitHandler(): Promise<void> {
        this.loading = true;
        errorService.clearErrors(this.allFields);

        try {
            const requestParams = this.getRequestParams();

            this.inventoryItemId
                ? await this.$api.$inventoryItemApi.update(
                      this.inventoryItemId,
                    requestParams
                  )
                : await this.$api.$inventoryItemApi.create(requestParams);

            if (!this.inventoryItemId) {
                this.clearAllFields();
                alert('Вы успешно создали инвентарь');
                return;
            }
        } catch (e) {
            const error = e as TErrorResponse;

            if (typeof error.errors !== 'undefined') {
                errorService.setErrors(this.allFields, error.errors);
            }
        } finally {
            this.loading = false;
        }
    }
}
</script>
