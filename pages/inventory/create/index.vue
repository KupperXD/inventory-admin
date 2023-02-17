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
            :isLoadingUploadFile="isLoadingUploadFile"
            @addSpecification="addSpecification"
            @deleteSpecification:value="deleteSpecification"
            @update:file="updateFile"
            @submit="submitFormHandler"
        />
    </div>
</template>
<script lang="ts" setup>
import {definePageMeta, onMounted, reactive, ref, useAsyncData} from "#imports";
import useBreadcrumbState from "~/src/store/useBreadcrumbState";
import {Ref} from "vue";
import {UnwrapNestedRefs} from "@vue/reactivity";
import {Employee, FieldFile, FieldSelectType, FieldType, List, User, File} from "~/src/types";
import {navigateTo} from "#app";
import {ApiErrorResponse} from "~/src/types/errors";
import DoRequest from "~/src/services/DoRequest";
import {useFormHelpers} from "~/src/helpers/useFormHelpers";
import InventoryCreateOrUpdate from "~/components/inventory/InventoryCreateOrUpdate.vue";
import {InventoryType, InventoryTypeValue} from "~/src/enum/InventoryType";

definePageMeta({
    layout: 'default',
});

const store = useBreadcrumbState();
const isLoading: Ref<boolean> = ref(false);
const isLoadingUploadFile: Ref<boolean> = ref(false);

const optionsType = [
    {
        label: InventoryTypeValue.COMPUTER,
        value: InventoryType.COMPUTER,
    },
    {
        label: InventoryTypeValue.FURNITURE,
        value: InventoryType.FURNITURE,
    },
    {
        label: InventoryTypeValue.PERIPHERY,
        value: InventoryType.PERIPHERY,
    }
];

const { data } = await useAsyncData(
    async () => {
        return await new DoRequest().fetchData<List<Employee>>('get', 'api/employee');
    },
);

const nameField: UnwrapNestedRefs<FieldType> = reactive({
    name: 'name',
    error: '',
    label: 'Название',
    value: null,
    placeholder: 'Введите Название',
});

const typeField: UnwrapNestedRefs<FieldSelectType<string>> = reactive({
    name: 'type',
    error: '',
    label: 'Тип инвентаря',
    value: null,
    placeholder: 'Выберите тип инвентаря',
    options: optionsType,
});

const employeeField: UnwrapNestedRefs<FieldSelectType<number>> = reactive({
    name: 'employeeId',
    error: '',
    label: 'Владелец',
    value: null,
    placeholder: 'Выберите владельца',
    options: data.value?.response.items.map(item => {
        return {
            label: item.name,
            value: item.id
        }
    }) ?? [],
});

const specificationLabelDefaultField: UnwrapNestedRefs<FieldType> = reactive({
    name: 'specification_label',
    error: '',
    label: 'Название атрибута',
    value: null,
    placeholder: 'Введите Название атрибута',
});

const specificationValueDefaultField: UnwrapNestedRefs<FieldType> = reactive({
    name: 'specification_value',
    error: '',
    label: 'Описание атрибута',
    value: null,
    placeholder: 'Введите Описание атрибута',
});

const photoField: UnwrapNestedRefs<FieldFile> = reactive({
    name: 'file',
    error: '',
    label: 'Фото инвентаря',
    value: null,
    desc: '1920×1080px, не более 50Мб',
});

const specification = ref<{
    label: UnwrapNestedRefs<FieldType>,
    value: UnwrapNestedRefs<FieldType>,
}[]>([
    {
        label: {...specificationLabelDefaultField},
        value: {...specificationValueDefaultField},
    }
]);

const {
    resetErrors,
    setFormErrors,
    isError
} = useFormHelpers();

/**
 * Добавить характеристику
 */
const addSpecification = () => {
    specification.value = [
        ...specification.value,
        {
            label: {...specificationLabelDefaultField},
            value: {...specificationValueDefaultField},
        }
    ];
}

/**
 * Удалить характеристику
 */
const deleteSpecification = (id: number) => {
    specification.value = specification.value.filter((item, index) => {
        return index !== id;
    });
}

const getRequestParams = () => {
    return {
        name: nameField.value,
        type: typeField.value,
        employeeId: employeeField.value ? +employeeField.value : null,
        specification: specification.value.map(item => {
            return {
                label: item.label.value,
                value: item.value.value,
            }
        }),
        photoId: photoField.value?.id ?? null
    }
}

const updateFile = (file: File | null) => {
    photoField.value = file;
}

const submitFormHandler = async () => {
    isLoading.value = true;
    resetErrors([nameField, typeField, employeeField]);

    const requestParams = getRequestParams();

    isLoading.value = false;

    try {
        const response = await new DoRequest().fetchData<User | ApiErrorResponse>(
            'post', 'api/inventory-item', requestParams );

        if (isError(response)) {
            if (Array.isArray(response.error.data)) {
                setFormErrors([nameField, typeField, employeeField],response.error.data);
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
