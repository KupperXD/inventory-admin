<template>
    <EmployeeDetail/>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import EmployeeDetail from '~/components/TheEmployeeDetail.vue';

@Component({
    middleware: 'auth',
    components: {
        EmployeeDetail,
    },
})
export default class Create extends Vue {}
</script>
