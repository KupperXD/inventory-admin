<template>
    <div></div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import Login from '~/components/Login.vue';

@Component({
    components: {
        Login,
    },
})
export default class Index extends Vue {}
</script>
