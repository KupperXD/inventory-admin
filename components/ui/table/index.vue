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
                            <button type="button" class="px-3">edit</button>
                            <button type="button" class="px-3">delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>

import {TableHeader, TableRow} from "~/src/types";

interface PropsInterface {
    tableHeader: TableHeader[];
    tableRow: TableRow[];
}

const props = defineProps<PropsInterface>();
</script>
