<template>
    <div>
        <div class="flex flex-col">
            <h3 class="text-dark font-semibold text-slate-700 mt-6">
                {{ props.label }}
            </h3>
            <h6 class="text-dark:400">
                {{ props.desc }}
            </h6>
            <template v-if="props.modelValue">
                <div class="mt-6">
                    <div class="flex gap-5 items-center">
                        <a
                            target="_blank"
                            :href="props.modelValue.path"
                        >
                            <img :src="props.modelValue.path" alt="" class="w-72"/>
                        </a>
                        <button
                            class="h-5 w-5 text-black"
                            type="button"
                            @click="clickDeleteFileHandler"
                        >
                            <XMarkIcon/>
                        </button>
                    </div>
                </div>
            </template>
            <label class="btn btn-primary w-fit mt-3"
                   :class="{loading: isLoading}">
                <input
                    class="invisible w-0 h-0"
                    type="file"
                    @change="changeFileHandler"
                />
                <span>
                    <template v-if="isLoading">
                        Загрузка
                    </template>
                    <template v-else>
                        Загрузить файл
                    </template>
                </span>
            </label>
            <span
                class="block mt-1 text-red-500 text-xs"
                v-if="errors">
                {{ errors }}
            </span>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import { XMarkIcon } from "@heroicons/vue/24/outline";
import {ref, watchEffect} from "#imports";
import DoRequest from "~/src/services/DoRequest";
import type {ApiErrorResponse} from "~/src/types/errors";
import {useFormHelpers} from "~/src/helpers/useFormHelpers";
import type {FileType} from "~/src/types";

interface PropsInterface {
    modelValue: FileType | null;
    label: string | null;
    name: string;
    error: string | null;
    desc?: string;
}

const props = withDefaults(defineProps<PropsInterface>(), {
    desc: '',
});

const isLoading = ref(false);
const errors = ref<string | null>(props.error);

const emit = defineEmits(['update:file']);

const {
    isError
} = useFormHelpers();

/**
 * Следим за изменением поля ошибки
 */
watchEffect(() => {
    errors.value = props.error;
});

const transformFileData = (
    paramsObject: Record<string, Blob>,
    formData: FormData = new FormData(),
): FormData => {
    Object.keys(paramsObject).forEach((propName: string) => {
        const field = paramsObject[propName as keyof typeof paramsObject];
        const formDataKey = propName;
        const value = field ?? '';
        formData.append(formDataKey, value);
    });

    return formData;
}

/**
 * Обработать изменения файла
 * @param event
 */
const changeFileHandler = async (event: Event) => {
    errors.value = null;
    const files = (event.target as HTMLInputElement).files;

    if (!files || !files[0] || isLoading.value) {
        return;
    }

    try {
        const response = await new DoRequest().fetchData<File | ApiErrorResponse>(
            'post', 'api/storage/upload-file', transformFileData({file: files[0]}));

        if (isError(response)) {
            errors.value = response.error.data as string;
        } else {
            emit('update:file', response.response);
        }
    } catch (e) {
        console.log(e);
    } finally {
        isLoading.value = false;
    }
};

/**
 * Клик на крестик удаления файла
 */
const clickDeleteFileHandler = () => {
    emit('update:file', null);
};

</script>
