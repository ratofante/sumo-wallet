<script setup>
import ButtonGoBack from '@/components/Button/ButtonGoBack.vue';
defineEmits(['close-dialog']);
defineProps({
    title: {
        type: String,
        default: 'Expense form'
    }
});
</script>
<template>
    <div
        class="w-full bg-slate-50 border-b-4 border-rose-300 pb-8 rounded overflow-hidden dark:bg-slate-800 transition-colors"
    >
        <div class="flex justify-between pt-4 pb-2 px-4 bg-rose-50 border-b-2">
            <h4 class="font-semibold text-lg text-rose-950">{{ title }}</h4>
            <ButtonGoBack @click="$emit('close-dialog')" />
        </div>
        <div class="px-4 pt-2">
            <slot />
        </div>
    </div>
</template>
