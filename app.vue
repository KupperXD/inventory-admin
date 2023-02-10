<template>
    <NuxtLayout>
        <NuxtPage></NuxtPage>
    </NuxtLayout>
</template>
<script lang="ts" setup>
import {useRequestEvent} from "#imports";

const {
    $auth,
} = useNuxtApp();
</script>
