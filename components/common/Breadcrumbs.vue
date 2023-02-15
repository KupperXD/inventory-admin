<template>
    <div>
        <UiBreadcrumbs :pages="breadcrumbs"/>
    </div>
</template>
<script lang="ts" setup>
import useBreadcrumbState from "~/src/store/useBreadcrumbState";
import {ref, watch} from "#imports";
import {Breadcrumbs} from "~/src/types";

const store = useBreadcrumbState();
const breadcrumbs = ref<Breadcrumbs>([]);

watch(
    () => store.getBreadcrumbs,
    (newValue: Breadcrumbs) => {
        breadcrumbs.value = newValue;
    }
);
</script>
