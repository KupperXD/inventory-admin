<template>
    <TheInventoryItemDetail/>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import TheInventoryItemDetail from '~/components/TheInventoryItemDetail.vue';

@Component({
    middleware: 'auth',
    components: {
        TheInventoryItemDetail,
    },
})
export default class InventoryItemsCreate extends Vue {}
</script>
