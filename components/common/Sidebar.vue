<template>
    <div class="overflow-auto py-5 px-3">
        <div class="items-center block w-auto max-h-screen overflow-auto h-sidenav grow basis-full">
            <UiSidebar :navLinks="navLinks"/>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { HomeIcon } from "~/node_modules/@heroicons/vue/24/solid";
import { UserGroupIcon } from "~/node_modules/@heroicons/vue/24/solid";
import { ViewColumnsIcon } from "~/node_modules/@heroicons/vue/24/solid";

const navLinks: {
    title: string,
    path: string,
    icon: unknown,
}[] = [
    {
        title: 'Главная',
        path: '/',
        icon: HomeIcon,
    },
    {
        title: 'Сотрудники',
        path: '/employee',
        icon: UserGroupIcon,
    },
    {
        title: 'Инвентарь',
        path: '/inventory',
        icon: ViewColumnsIcon,
    }
];
</script>
