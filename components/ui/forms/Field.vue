<template>
    <div class="form-control w-full max-w-xs">
        <label
            v-if="props.label"
            :for="`id_${props.name}`"
            class="label">
            <span class="label-text">{{props.label}}</span>
        </label>
        <div class="relative pb-4 -mb-4">
            <input
                ref="field"
                :type="props.type ?? 'text'"
                :placeholder="props.placeholder ?? ''"
                class="input-primary input input-bordered w-full max-w-xs"
                :class="inputClassesComputed"
                :value="modelValue"
                @input="inputHandler"
            />
            <span
                class="block mt-1 text-red-500 text-xs"
                v-if="hasErrorComputed">
            {{props.error}}
        </span>
        </div>
    </div>
</template>
<script lang="ts" setup>

interface PropsInterface {
    modelValue: string | null;
    label?: string | null;
    name: string;
    placeholder?: string | null;
    error?: string | null;
    type?: string | null;
}

const ClassesMap = {
    ERROR_CLASS: 'input-error',
};

const props = withDefaults(defineProps<PropsInterface>(), {
    placeholder: '',
    type: 'string',
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

const field = ref(null);
const inputHandler = async () => {
    await nextTick();

    if (!field.value) {
        return;
    }

    const value = (field.value as HTMLInputElement).value;

    emit('update:modelValue', value);
};

</script>

