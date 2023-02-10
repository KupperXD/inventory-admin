<template>
    <button
        class="btn btn-primary"
        :class="{
            'loading': props.loading,
        }"
    >
        <span
        >
            <template v-if="!props.loading">
                <slot></slot>
            </template>
            <template v-else>
                Загрузка
            </template>
        </span>
    </button>
</template>
<script lang="ts" setup>
interface PropsInterface {
    loading?: boolean;
}

const props = withDefaults(defineProps<PropsInterface>(), {
    loading: false,
});
</script>
