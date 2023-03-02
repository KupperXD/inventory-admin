<template>
    <div class=" ml-80 fixed h-16 top-0 left-0 right-0 bg-gray-100 border-b-2">
        <div class="p-3 h-full flex items-center shadow-lg justify-between">
            <div>
                Привет, {{ userNameComputed }}
            </div>
            <div class="">
                <button
                    class="flex items-center" type="button"
                    @click="clickLogoutHandler"
                >
                    <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 20H6C4.89543 20 4 19.1046 4 18L4 6C4 4.89543 4.89543 4 6 4H14M10 12H21M21 12L18 15M21 12L18 9" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span class="ml-2">
                        Выйти
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>

import {navigateTo} from "#app";

const {
    $auth
} = useNuxtApp();

const userNameComputed = computed(() => {
    const user = $auth.store.getUser;

    return user?.name ?? 'Аноним';
});

const clickLogoutHandler = async () => {
    try {
        $auth.logout();
    } finally {
        navigateTo({
            name: 'login',
        });
    }
};
</script>
