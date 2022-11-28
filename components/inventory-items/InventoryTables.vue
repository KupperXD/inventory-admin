<template>
    <v-data-table
        :loading="isLoading"
        :headers="tableHeader"
        :items="items"
        :items-per-page="items.length"
        light
        hide-default-footer
    >
    </v-data-table>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component({
    props: {
        isLoading: {
            type: Boolean,
            default: () => false,
        },
        items: {
            type: Array,
            default: () => [],
        },
    },
})
export default class InventoryTables extends Vue {
    private tableHeader = [
        {
            text: 'ID',
            value: 'id',
        },
        {
            text: 'Номер',
            value: 'number',
        },
        {
            text: 'Имя сотрудника',
            value: 'employeeName',
        },
        {
            text: 'Тип',
            value: 'type',
        },
        {
            text: '',
            value: 'actions',
            align: 'end',
            sortable: false,
        },
    ];
}
</script>
