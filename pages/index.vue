<template>
    <div>
        <h1 class="text-dark mb-6 font-semibold text-slate-700">
            Главная
        </h1>
    </div>
</template>
<script lang="ts" setup>
import {definePageMeta, onMounted} from "#imports";
import useBreadcrumbState from "~/src/store/useBreadcrumbState";

definePageMeta({
    layout: 'default',
});

const store = useBreadcrumbState();
onMounted(() => {
    store.setBreadcrumbs([{
        title: 'Главная'
    }])
});
</script>
