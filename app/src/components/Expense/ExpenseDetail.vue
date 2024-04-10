<script setup>
import useFormatCurrency from '@/composables/useFormatCurrency';
import { inject } from 'vue';
const props = defineProps({
    amount: {
        type: String,
        required: true
    },
    note: {
        type: String,
        default: ''
    },
    createdAt: {
        type: String,
        required: true
    },
    updatedAt: {
        type: String,
        required: true
    }
});

const dayJS = inject('dayJS');
const createdAt = dayJS(props.createdAt);
const updatedAt = dayJS(props.updatedAt);
</script>
<template>
    <div>
        <div class="text-rose-900 font-bold text-2xl pt-4 pb-2 dark:text-rose-300">
            {{ useFormatCurrency(parseFloat(amount)) }}
        </div>
        <div class="flex flex-col text-xs dark:text-slate-300">
            <span>Added at {{ createdAt.format('HH:mm D MMM YYYY') }}</span>
            <span>Updated at {{ updatedAt.format('HH:mm D MMM YYYY') }}</span>
        </div>
    </div>
    <div>
        <h6 class="mt-4 mb-2 font-medium text-sm text-slate-900 dark:text-slate-200">Comments:</h6>
        <p
            class="p-2 border-2 rounded-sm text-xs dark:text-slate-300 dark:border-slate-500"
            :class="{ 'text-slate-400 text-center': !note }"
        >
            {{ note || 'There are no comments' }}
        </p>
    </div>
</template>
