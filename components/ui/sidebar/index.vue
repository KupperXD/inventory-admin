<template>
    <ul class="flex flex-col pl-0 mb-0">
        <li class="mt-0.5 w-full" v-for="navLink in navLinks">
            <nuxt-link
                :to="navLink.path"
                :class="{'font-semibold text-slate-700 bg-blue-100': activeLink(navLink.path)}"
                class="py-4 px-2 rounded-lg text-sm flex items-center whitespace-nowrap dark:text-white gap-x-4"
            >
                <component :is="navLink.icon" class="h-5 w-5 text-black"></component>
                {{ navLink.title }}
            </nuxt-link>
        </li>
    </ul>
</template>
<script lang="ts" setup>
import {useRoute} from "#imports";

interface PropsInterface {
    navLinks: {
        title: string,
        path: string,
        icon: unknown,
    }[];
}

const props = defineProps<PropsInterface>();
const route = useRoute();

const activeLink = (path: string): boolean => {
    return (path === '/') ?  path === route.path : route.path.includes(path);
};
</script>
