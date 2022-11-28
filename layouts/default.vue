<template>
    <v-app
        dark
        class="full-height"
        :style="{ background: $vuetify.theme.themes['light'].background }"
    >
        <v-navigation-drawer
            permanent
            app
            :value="true"
            dark
            :mini-variant="miniDrawer"
        >
            <template #img>
                <v-img
                    width="100%"
                    height="100%"
                    gradient="rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)"
                >
                </v-img>
            </template>
            <div class="px-2 py-4">
                <v-list-item
                    :class="{
                        'pa-0': miniDrawer,
                    }"
                >
                    <v-img
                        :transition="false"
                        :src="miniDrawer ? '/mini-logo.svg' : '/logo.svg'"
                    >
                    </v-img>
                </v-list-item>
                <div class="px-2">
                    <v-divider class="my-4" light></v-divider>
                </div>
                <v-list
                    :style="{
                        background: 'inherit',
                    }"
                >
                    <v-list-item
                        v-for="(item, index) in menuItems"
                        :key="index"
                        :to="{ path: item.link }"
                        color="white"
                        dark
                        class="px-2 py-1 mb-4 rounded-lg"
                        active-class="primary"
                    >
                        <v-list-item-icon
                            class="my-0 align-self-center"
                            :class="{
                                'mr-8': !miniDrawer,
                            }"
                        >
                            <v-icon>
                                {{ item.icon ?? '' }}
                            </v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>
                            {{ item.label }}
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </div>
        </v-navigation-drawer>
        <v-app-bar
            class="bg-transparent"
            absolute
            light
            app
            flat
            :height="74"
            style="z-index: 10"
        >
            <v-btn
                class="ml-3 mr-4"
                fab
                elevation="2"
                rounded
                size="small"
                @click="miniDrawer = !miniDrawer"
            >
                <v-icon> mdi-dots-vertical </v-icon>
            </v-btn>
            <v-toolbar-title>Привет {{ userNameComputed }}.</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-app-bar>
        <v-main>
            <v-container>
                <Nuxt />
            </v-container>
        </v-main>
        <v-footer
            app
            absolute
            inset
            light
            class="bg-transparent"
            style="z-index: 100"
        >
            <v-container>
                <v-row>
                    <v-spacer></v-spacer>
                    <v-col cols="auto">© SVK</v-col>
                </v-row>
            </v-container>
        </v-footer>
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({})
export default class Default extends Vue {
    private miniDrawer = false;

    private menuItems = [
        {
            link: '/',
            label: 'Главная',
            icon: 'mdi-account-group',
        },
        {
            link: '/employee',
            label: 'Сотрудники',
            icon: 'mdi-account-group',
        },
        {
            link: '/inventory-items',
            label: 'Инвентарь',
            icon: 'mdi-desktop-classic',
        },
    ];

    private get userNameComputed(): string {
        return '-';
    }
}
</script>
<style lang="scss">
.theme--dark.v-navigation-drawer {
    background-color: #363636;
}
.theme--dark.v-list-item--active::before {
    content: none;
}
</style>
