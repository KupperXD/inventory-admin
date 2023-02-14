<template>
    <div class="overflow-auto py-5 px-3">
        <div class="items-center block w-auto max-h-screen overflow-auto h-sidenav grow basis-full">
            <ul class="flex flex-col pl-0 mb-0">
                <li class="mt-0.5 w-full" v-for="navLink in navLinks">
                    <nuxt-link
                        :to="navLink.path"
                        class="py-4 px-2 rounded-lg text-sm flex items-center whitespace-nowrap dark:text-white"
                        active-class="font-semibold text-slate-700 bg-blue-100">
                        {{ navLink.title }}
                    </nuxt-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts" setup>
const navLinks: {
    title: string,
    path: string,
}[] = [
    {
        title: 'Главная',
        path: '/',
    },
    {
        title: 'Сотрудники',
        path: '/employee',
    }
];
</script>
