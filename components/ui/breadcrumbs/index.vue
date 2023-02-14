<template>
    <ol class="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
        <li class="text-sm pl-2 capitalize leading-normal before:float-left before:pr-2 before:content-['/'] dark:text-white"
            v-for="(page, index) in props.pages"
            :class="{'before:content-none': index === 0}"
        >
            <template v-if="page.path">
                <nuxt-link :to="page.path" class="dark:text-white opacity-50">
                    {{ page.title }}
                </nuxt-link>
            </template>
            <template v-else>
                {{ page.title }}
            </template>
        </li>
    </ol>
</template>
<script lang="ts" setup>
import {Breadcrumbs} from "~/src/types";

interface PropsInterface {
    pages: Breadcrumbs;
}

const props = defineProps<PropsInterface>();
</script>
