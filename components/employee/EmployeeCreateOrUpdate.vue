<template>
    <div>
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-dark font-semibold text-slate-700">
                <template v-if="props.isNew">
                    Добавление сотрудника
                </template>
                <template v-else>
                    Редактирование сотрудника
                </template>
            </h1>
            <nuxt-link
                to="/employee"
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
                <Field
                    class="mt-3"
                    :error="props.emailField.error"
                    :name="props.emailField.name"
                    :label="props.emailField.label"
                    :placeholder="props.emailField.placeholder"
                    v-model="props.emailField.value"
                />
                <div class="card-actions mt-8">
                    <UiButton
                        :loading="props.isLoading"
                    >
                        Сохранить
                    </UiButton>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Field from "~/components/ui/forms/Field.vue";
import {UnwrapNestedRefs} from "@vue/reactivity";
import {FieldType} from "~/src/types";

interface PropsInterface {
    nameField: UnwrapNestedRefs<FieldType>;
    emailField: UnwrapNestedRefs<FieldType>;
    isLoading: boolean,
    isNew: boolean,
}

const props = withDefaults(defineProps<PropsInterface>(), {
    isNew: true,
});

const emit = defineEmits([
    'submit',
]);

const submitHandler = () => {
    emit('submit');
}
</script>
