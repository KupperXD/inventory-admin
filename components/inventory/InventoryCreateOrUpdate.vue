<template>
    <div>
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-dark font-semibold text-slate-700">
                <template v-if="props.isNew">
                    Добавление инвентаря
                </template>
                <template v-else>
                    Редактирование инвентаря
                </template>
            </h1>
            <nuxt-link
                to="/inventory"
                class="btn btn-primary">
                Вернуться назад
            </nuxt-link>
        </div>
        <div class="relative flex flex-col p-6 break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
            <form
                @submit.prevent="submitHandler"
                class="flex flex-col"
            >
                <Field
                    :error="props.nameField.error"
                    :name="props.nameField.name"
                    :label="props.nameField.label"
                    :placeholder="props.nameField.placeholder"
                    v-model="props.nameField.value"
                />
                <Select
                    class="mt-3"
                    :error="props.typeField.error"
                    :name="props.typeField.name"
                    :label="props.typeField.label"
                    :placeholder="props.typeField.placeholder"
                    :options="props.typeField.options"
                    v-model="props.typeField.value"
                />
                <Select
                    class="mt-3"
                    :error="props.employeeField.error"
                    :name="props.employeeField.name"
                    :label="props.employeeField.label"
                    :placeholder="props.employeeField.placeholder"
                    :options="props.employeeField.options"
                    v-model="props.employeeField.value"
                />
                <h3 class="text-dark font-semibold text-slate-700 mt-6 mb-3">
                    Характеристики
                </h3>
                <div v-for="(specification, index) in props.specification">
                    <div :key="index" class="flex gap-x-12 mb-4">
                        <Field
                            :error="specification.label.error"
                            :name="specification.label.name"
                            :label="specification.label.label"
                            :placeholder="specification.label.placeholder"
                            v-model="specification.label.value"
                        />
                        <Field
                            :error="specification.value.error"
                            :name="specification.value.name"
                            :label="specification.value.label"
                            :placeholder="specification.value.placeholder"
                            v-model="specification.value.value"
                        />
                        <button
                            v-if="index !== 0"
                            @click="() => deleteSpecificationHandler(index)"
                            type="button"
                            class="px-3 pt-8"
                        >
                            <TrashIcon class="h-5 w-5 text-black"/>
                        </button>
                    </div>
                </div>
                <button
                    class="btn btn-primary w-fit mt-3"
                    type="button"
                    @click="addSpecificationHandler"
                >
                    + Добавить характеристику
                </button>
                <FileDownload
                    :label="props.photoField.label"
                    :name="props.photoField.name"
                    :desc="props.photoField.desc ?? ''"
                    :error="props.photoField.error"
                    v-model="props.photoField.value"
                    @update:file="updateFile"
                />
                <div class="card-actions mt-8">
                    <UiButton :loading="props.isLoading">
                        Сохранить
                    </UiButton>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Field from "~/components/ui/forms/Field.vue";
import Select from "~/components/ui/forms/Select.vue";
import {UnwrapNestedRefs} from "@vue/reactivity";
import {FieldFile, FieldSelectType, FieldType} from "~/src/types";
import { TrashIcon } from "@heroicons/vue/24/solid";
import FileDownload from "~/components/ui/forms/FileDownload.vue";

interface PropsInterface {
    nameField: UnwrapNestedRefs<FieldType>;
    typeField: UnwrapNestedRefs<FieldSelectType<string>>;
    employeeField: UnwrapNestedRefs<FieldSelectType<number>>;
    isLoading: boolean,
    isNew: boolean,
    specification: {
        label: UnwrapNestedRefs<FieldType>,
        value: UnwrapNestedRefs<FieldType>,
    }[],
    photoField: UnwrapNestedRefs<FieldFile>
}

const props = withDefaults(defineProps<PropsInterface>(), {
    isNew: true,
});

const emit = defineEmits([
    'submit',
    'addSpecification',
    'deleteSpecification:value',
    'update:file',
]);

const submitHandler = () => {
    emit('submit');
}

const addSpecificationHandler = () => {
    emit('addSpecification');
}

const deleteSpecificationHandler = (id: number) => {
    emit('deleteSpecification:value', id);
}

const updateFile = (file: File | null) => {
    emit('update:file', file);
}
</script>
