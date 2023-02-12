<template>
    <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">Форма входа!</h2>
            <div>
                <form
                    @submit.prevent="submitFormHandler"
                >
                    <Field
                        :error="nameField.error"
                        :name="nameField.name"
                        :label="nameField.label"
                        :placeholder="nameField.placeholder"
                        v-model="nameField.value"
                    />
                    <Field
                        class="mt-3"
                        :error="passwordField.error"
                        :name="passwordField.name"
                        :label="passwordField.label"
                        :placeholder="passwordField.placeholder"
                        type="password"
                        v-model="passwordField.value"
                    />
                    <div class="card-actions justify-end mt-8">
                        <UiButton
                            :loading="isLoading"
                        >
                            Вход
                        </UiButton>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {definePageMeta, reactive} from "#imports";
import {UnwrapNestedRefs} from "@vue/reactivity";
import Field from "~/components/ui/forms/Field.vue";
import {FieldType} from "~/src/types";
import {Ref} from "vue";
import {ApiError, ApiErrorResponse, ApiValidationError} from "~/src/types/errors";
import {transformApiError} from "~/src/utils/errors";
import {navigateTo} from "#app";

definePageMeta({
    layout: 'without-auth',
});

const {
    $auth
} = useNuxtApp();

const nameField: UnwrapNestedRefs<FieldType> = reactive({
    name: 'email',
    error: '',
    label: 'Логин',
    value: null,
    placeholder: 'Введите e-mail',
});

const passwordField: UnwrapNestedRefs<FieldType> = reactive({
    name: 'password',
    error: '',
    label: 'Пароль',
    value: null,
    placeholder: 'Введите пароль',
});

const isLoading: Ref<boolean> = ref(false);

const setFormErrors = (formFields: {error: string | null, name: string}[], entryErrors: ApiValidationError[]) => {
    const transformedErrors = transformApiError(entryErrors);

    formFields.forEach((field) => {
        if (transformedErrors[field.name] === 'undefined') {
            return;
        }

        field.error = transformedErrors[field.name];
    });
};

const resetErrors = (fields: {error: string | null}[]) => {
    fields.forEach(field => field.error = '');
};

const submitFormHandler = async () => {
    isLoading.value = true;
    resetErrors([nameField, passwordField]);

    try {
        const response = await $auth.login({
            name: nameField.value,
            password: passwordField.value,
        });

        if (response) {
            navigateTo('/')
        }
    } catch (e) {
        const err = e as ApiError;
        if (Array.isArray(err.data)) {
            setFormErrors([nameField, passwordField],err.data);
            return;
        }

        passwordField.error = err.data;
    } finally {
        isLoading.value = false;
    }
};
</script>
