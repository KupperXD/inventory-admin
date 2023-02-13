<template>
    <div class="relative w-full">
        <div class="absolute w-full bg-blue-500 dark:hidden min-h-75"></div>
        <aside class="w-80 h-full fixed top-0 left-0">
            <Sidebar/>
        </aside>
        <main class="ml-80 bg-gray-100 h-full min-h-screen">
            <nav class="flex flex-wrap items-center justify-between px-0 py-2 mx-6">
            </nav>
            <div class="w-full px-6 py-6 mx-auto">
                <slot></slot>
            </div>
        </main>
    </div>
</template>
<script lang="ts" setup>
import Sidebar from "~/components/Sidebar";
</script>
