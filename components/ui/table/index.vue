<template>
    <div class="flex-none w-full max-w-full px-3">
        <div class="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
            <div class="table w-full text-xs">
                <div class="table-header-group">
                    <div class="table-row">
                        <div v-for="td in props.tableHeader"
                             class="table-cell text-left font-semibold text-slate-700 p-3 align-middle border-b dark:border-white/40"
                        >
                            {{ td.title }}
                        </div>
                        <div class="table-cell text-left font-semibold text-slate-700 p-3 align-middle border-b dark:border-white/40"></div>
                    </div>
                </div>
                <div class="table-row-group">
                    <div class="table-row" v-for="row in props.tableRow">
                        <div class="table-cell text-left p-3 align-middle border-b dark:border-white/40" v-for="value in row">
                            {{ value }}
                        </div>
                        <div class="table-cell text-right p-3 align-middle border-b dark:border-white/40">
                            <button @click="() => clickEditHandler(row.id)" type="button" class="px-3">
                                <PencilIcon class="h-4 w-4 text-black"/>
                            </button>
                            <button @click="() => clickDeleteHandler(row.id)" type="button" class="px-3">
                                <TrashIcon class="h-5 w-5 text-black"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { PencilIcon } from "@heroicons/vue/24/solid";
import { TrashIcon } from "@heroicons/vue/24/solid";
import {TableHeader, TableRow} from "~/src/types";

interface PropsInterface {
    tableHeader: TableHeader[];
    tableRow: TableRow[];
}

const props = defineProps<PropsInterface>();

const emit = defineEmits([
    'clickEdit:value',
    'clickDelete:value',
]);

/**
 * Клик на кнопку редактирования
 */
const clickEditHandler = (id: string) => {
    emit('clickEdit:value', id);
};

/**
 * Клик на кнопку удаления
 */
const clickDeleteHandler = (id: string) => {
    emit('clickDelete:value', id);
};
</script>
