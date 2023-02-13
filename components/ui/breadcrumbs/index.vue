<template>
    <ol class="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
        <li class="leading-normal text-sm">
            <nuxt-link to="/" class="text-white opacity-50">
                Главная
            </nuxt-link>
        </li>
        <li class="text-sm pl-2 capitalize leading-normal before:float-left before:pr-2 before:content-['/']"
            v-for="page in props.pages"
        >
            {{ page }}
        </li>
    </ol>
</template>
<script lang="ts" setup>
interface PropsInterface {
    pages: string[];
}

const props = defineProps<PropsInterface>();
</script>
