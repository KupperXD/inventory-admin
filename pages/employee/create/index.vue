<template>
    <div>
        <EmployeeForm
            :emailField="emailField"
            :nameField="nameField"
            :isLoading="isLoading"
            :isNew="true"
            @submit="submitFormHandler"
        />
    </div>
</template>
<script lang="ts" setup>
import {definePageMeta, onMounted, reactive, ref} from "#imports";
import useBreadcrumbState from "~/src/store/useBreadcrumbState";
import {Ref} from "vue";
import {UnwrapNestedRefs} from "@vue/reactivity";
import {Employee, FieldType, List, User} from "~/src/types";
import {navigateTo} from "#app";
import {ApiErrorResponse} from "~/src/types/errors";
import DoRequest from "~/src/services/DoRequest";
import {useFormHelpers} from "~/src/helpers/useFormHelpers";
import EmployeeForm from "~/components/employee/EmployeeCreateOrUpdate.vue";

definePageMeta({
    layout: 'default',
});

const store = useBreadcrumbState();
const isLoading: Ref<boolean> = ref(false);

const nameField: UnwrapNestedRefs<FieldType> = reactive({
    name: 'name',
    error: '',
    label: 'Имя',
    value: null,
    placeholder: 'Введите Имя',
});

const emailField: UnwrapNestedRefs<FieldType> = reactive({
    name: 'email',
    error: '',
    label: 'Почта',
    value: null,
    placeholder: 'Введите Почту',
});

const {
    resetErrors,
    setFormErrors,
    isError
} = useFormHelpers();

const submitFormHandler = async () => {
    isLoading.value = true;
    resetErrors([nameField, emailField]);

    try {
        const response = await new DoRequest().fetchData<User | ApiErrorResponse>(
            'post', 'api/employee', {
            name: nameField.value,
            email: emailField.value,
        });

        if (isError(response)) {
            if (Array.isArray(response.error.data)) {
                setFormErrors([nameField, emailField],response.error.data);
                return;
            }
        }

        if (response) {
            navigateTo('/employee');
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
            title: 'Сотрудники',
            path: '/employee'
        },
        {
            title: 'Добавление сотрудника',
        }
    ]);
});
</script>
