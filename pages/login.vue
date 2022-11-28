<template>
    <Login />
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import Login from '~/components/Login.vue';

@Component({
    layout: 'LoginLayout',
    components: {
        Login,
    },
})
export default class LoginView extends Vue {}
</script>
