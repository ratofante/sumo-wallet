<script setup>
import { RouterLink } from 'vue-router';
defineProps({
    path: {
        type: String,
        required: true
    },
    size: {
        type: String,
        default: 'small'
    },
    fill: {
        type: Boolean,
        default: true
    },
    dark: {
        type: Boolean,
        default: false
    }
});
</script>

<template>
    <RouterLink
        :to="path"
        class="flex items-center justify-center gap-2 py-2 px-4 min-w-24 font-semibold tracking-wider rounded-md bg-red-800"
        :class="{
            'text-sm py-2 px-4 min-w-24': size === 'small',
            'text-lg py-2 px-4 min-w-28': size === 'large',
            'bg-transparent border-2 border-rose-800 text-rose-800': !fill,
            'text-slate-50 bg-rose-800': fill,
            'text-slate-50 border-slate-800 bg-slate-800': dark,
            'text-slate-800': dark && !fill
        }"
    >
        <slot name="icon" />
        <span class="opacity-90 group-hover:opacity-100"><slot /></span>
    </RouterLink>
</template>
