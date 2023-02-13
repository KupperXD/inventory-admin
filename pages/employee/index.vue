<template>
    <div>
        <h1 class="text-dark mb-6 font-semibold text-slate-700">
            Сотрудники
        </h1>
        <div class="flex flex-wrap -mx-3">
            <div class="flex-none w-full max-w-full px-3">
                <div class="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                    <div class="table w-full text-xs">
                        <div class="table-header-group">
                            <div class="table-row">
                                <div v-for="item in employeeTableHeader"
                                    class="table-cell text-left font-semibold text-slate-700 p-3 align-middle border-b dark:border-white/40">
                                    {{ item.title }}
                                </div>
                            </div>
                        </div>
                        <div class="table-row-group">
                            <div class="table-row">
                                <div class="table-cell text-left p-3 align-middle border-b dark:border-white/40">123</div>
                                <div class="table-cell text-left p-3 align-middle border-b dark:border-white/40">123</div>
                                <div class="table-cell text-left p-3 align-middle border-b dark:border-white/40">123</div>
                                <div class="table-cell text-left p-3 align-middle border-b dark:border-white/40 text-right">
                                    <button type="button" class="px-3">edit</button>
                                    <button type="button" class="px-3">delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {definePageMeta} from "#imports";

definePageMeta({
    layout: 'default',
});


const employeeTableHeader: { title: string }[] = [
    {title: 'ID'},
    {title: 'Имя'},
    {title: 'Почта'},
    {title: ''}
];
</script>
