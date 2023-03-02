import {InventoryType, InventoryTypeValue} from "~/src/enum/InventoryType";
import {reactive, ref, useAsyncData} from "#imports";
import DoRequest from "~/src/services/DoRequest";
import {Employee, FieldFile, FieldSelectType, FieldType, FileType, List, Nullable} from "~/src/types";
import {UnwrapNestedRefs} from "@vue/reactivity";
import {Ref} from "vue";

export type InventoryRequest = {
    name: string,
    type: InventoryType,
    employeeId: number,
    specification: Nullable<{label: string, value: string}>[],
    photoId: number,
}
export async function useInventory() {
    const isLoading: Ref<boolean> = ref(false);

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

    const {data: employee} = await useAsyncData(
        async () => {
            return await new DoRequest().fetchData<List<Employee>>('get', 'api/employee/all');
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
        options: employee.value?.response.items.map(item => {
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


    const
        specification = ref<{
        label: UnwrapNestedRefs<FieldType>,
        value: UnwrapNestedRefs<FieldType>,
    }[]>([
        {
            label: {...specificationLabelDefaultField},
            value: {...specificationValueDefaultField},
        }
    ]);


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

    const getRequestParams = (): Nullable<InventoryRequest> => {
        return {
            name: nameField.value,
            type: typeField.value as InventoryType,
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

    const updateFile = (file: FileType | null) => {
        photoField.value = file;
    }

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

    return {
        nameField,
        typeField,
        employeeField,
        specificationLabelDefaultField,
        specificationValueDefaultField,
        photoField,
        specification,
        updateFile,
        getRequestParams,
        deleteSpecification,
        addSpecification,
        isLoading,
        getTypeValue,
    }
}
