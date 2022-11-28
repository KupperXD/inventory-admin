<template>
    <v-container class="d-flex fill-height align-center justify-center" fluid>
        <v-card light width="430px">
            <v-card-title>Авторизация</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="submitForm">
                    <v-text-field
                        v-model="loginField.value"
                        :label="loginField.label"
                        :name="loginField.name"
                    />
                    <v-text-field
                        v-model="passwordField.value"
                        :label="passwordField.label"
                        :name="passwordField.name"
                        :error="!!passwordField.error"
                        :error-messages="passwordField.error"
                    />
                    <v-btn :loading="loading" color="primary" type="submit">
                        Отправить
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Form } from '~/modules/form/types';

@Component({})
export default class Login extends Vue {
    private loading = false;
    private loginField: Form.TBaseField = {
        label: 'Логин',
        name: 'login',
        value: '',
        error: '',
    };

    private passwordField: Form.TBaseField = {
        label: 'Пароль',
        name: 'password',
        value: '',
        error: '',
    };

    private async submitForm(): Promise<void> {
        this.loading = true;

        const form = new FormData();

        form.append('username', this.loginField.value as string);
        form.append('password', this.passwordField.value as string);

        try {
            await this.$auth.loginWith('local', {
                data: {
                    email: this.loginField.value,
                    password: this.passwordField.value,
                },
            });
        } catch (e) {
            this.passwordField.error = 'Неправильный логин или пароль';
        } finally {
            this.loading = false;
        }
    }
}
</script>
