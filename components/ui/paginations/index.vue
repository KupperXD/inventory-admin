<template>
    <div>
        <div class="btn-group">
            <template
                v-for="(item, index) in paginationButtonsComputed"
                :key="index"
            >
                <button
                    class="btn btn-sm"
                    :class="{
                        'btn-active': item.active
                    }"
                    @click="setCurrentPage(item.page)"
                >
                    {{ item.text }}
                </button>
            </template>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {ComputedRef} from "vue";

interface PropsInterface {
    max: number;
    min?: number;
    modelValue: number;
    maxPage?: number;
    boundaryNumbers?: boolean,
}

type PaginationButton = {
    text: string;
    disable: boolean;
    active: boolean;
    page: number;
}

const props = withDefaults(defineProps<PropsInterface>(), {
    min: 1,
    maxPage: 0,
    boundaryNumbers: true,
});

function between (v: number, min: number, max: number) {
    return max <= min
        ? min
        : Math.min(max, Math.max(min, v))
}

const model = computed({
    get: () => props.modelValue,
    set: val => {
        if (isNaN(val)) {
            return
        }
        const value = between(val, props.min, props.max)
        if (props.modelValue !== value) {
            emit('update:modelValue', value)
        }
    }
})

watch(() => `${ props.min }|${ props.min }`, () => {
    model.value = props.modelValue
})

const emit = defineEmits(['update:modelValue']);

const setCurrentPage = (page: number) => {
    model.value = page;
};

const btnConfigComputed = computed(() => {
    let maxPages = Math.max(
        props.maxPage,
        3,
    );

    const acc = {
        pgFrom: props.min,
        pgTo: props.max,
        ellipsesStart: false,
        ellipsesEnd: false,
        boundaryStart: false,
        boundaryEnd: false,
    };

    if (props.maxPage && maxPages < (props.max - props.min + 1)) {
        maxPages = 1 + Math.floor(maxPages / 2) * 2;
        acc.pgFrom = Math.max(props.min, Math.min(props.max - maxPages + 1, props.modelValue - Math.floor(maxPages / 2)));
        acc.pgTo = Math.min(props.max, acc.pgFrom + maxPages - 1);

        if (props.boundaryNumbers) {
            acc.boundaryStart = true;
            acc.pgFrom++;
        }

        if (acc.pgFrom > (props.min + (props.boundaryNumbers ? 1 : 0))) {
            acc.ellipsesStart = true;
            acc.pgFrom++;
        }

        if (props.boundaryNumbers) {
            acc.pgTo--;
            acc.boundaryEnd = true;
        }

        if (acc.pgTo < (props.max - (props.boundaryNumbers ? 1 : 0))) {
            acc.ellipsesEnd = true;
            acc.pgTo--;
        }
    }

    return acc;
});

const paginationButtonsComputed: ComputedRef<PaginationButton[]> = computed(() => {
    let result: PaginationButton[] = [];

    if (btnConfigComputed.value.boundaryStart) {
        const active = props.min === props.modelValue;

        result.push({
            text: props.min.toString(),
            active,
            disable: false,
            page: props.min,
        });
    }

    if (btnConfigComputed.value.ellipsesStart) {
        result.push({
            text: '...',
            active: false,
            disable: false,
            page: btnConfigComputed.value.pgFrom - 1,
        });
    }

    for (let i = btnConfigComputed.value.pgFrom; i <= btnConfigComputed.value.pgTo; i++) {
        result.push({
            page: i,
            text: i.toString(),
            active: i === props.modelValue,
            disable: false,
        });
    }

    if (btnConfigComputed.value.ellipsesEnd) {
        result.push({
            text: '...',
            active: false,
            disable: false,
            page: btnConfigComputed.value.pgTo + 1,
        });
    }

    if (btnConfigComputed.value.boundaryEnd) {
        const active = props.max === props.modelValue;

        result.push({
            text: props.max.toString(),
            active,
            disable: false,
            page: props.max,
        });
    }

    return result;
});
</script>
