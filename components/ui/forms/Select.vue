<template>
    <div class="form-control w-full max-w-xs">
        <label
            v-if="props.label"
            :for="`id_${props.name}`"
            class="label">
            <span class="label-text">{{props.label}}</span>
        </label>
        <div class="relative pb-4 -mb-4">
            <select
                ref="field"
                :id="`id_${props.name}`"
                :name="`id_${props.name}`"
                :value="modelValue"
                :multiple="props.multiple"
                :class="inputClassesComputed"
                @change="inputHandler"
                class="input-primary input input-bordered w-full max-w-xs">
                <option selected></option>
                <option v-for="(option, index) in props.options"
                    :value="option.value"
                    :key="index"
                >
                    {{ option.label }}
                </option>
            </select>
            <span
                class="block mt-1 text-red-500 text-xs"
                v-if="hasErrorComputed">
            {{props.error}}
        </span>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {computed, nextTick, ref} from "#imports";

interface PropsInterface {
    modelValue: string | null;
    name: string;
    label?: string | null;
    error?: string | null;
    multiple?: boolean;
    placeholder?: string | null;
    options: {
        label: string,
        value: unknown
    }[];
}

const ClassesMap = {
    ERROR_CLASS: 'input-error',
};

const props = withDefaults(defineProps<PropsInterface>(), {
    multiple: false,
    placeholder: '',
});

const emit = defineEmits(['update:modelValue']);

const inputClassesComputed = computed(() => {
    const result: string[] = [];

    if (hasErrorComputed.value) {
        result.push(ClassesMap.ERROR_CLASS);
    }

    return result;
});

const hasErrorComputed = computed(() => {
    return !!props.error;
});

const field = ref<HTMLSelectElement | null>(null);
const inputHandler = async () => {
    await nextTick();

    if (!field.value) {
        return;
    }

    const value = field.value.selectedOptions[0].value;

    emit('update:modelValue', value);
};

</script>

