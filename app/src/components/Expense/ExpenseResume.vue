<script setup>
import ExpenseAmount from '@/components/Expense/ExpenseAmount.vue';

import { RouterLink, useRoute } from 'vue-router';
import { inject } from 'vue';

const props = defineProps({
    expense: {
        type: Object,
        required: true
    }
});
const route = useRoute();
console.log(props);

const dayJS = inject('dayJS');
const date = dayJS(props.expense.created_at);
</script>

<template>
    <RouterLink
        :to="`/wallet/${route.params.id}/expense/${expense.id}`"
        class="w-full flex items-center justify-between my-1"
    >
        <div
            class="flex flex-col items-center justify-center shrink-0 w-10 h-10 text-slate-50 bg-slate-800 rounded-sm overflow-hidden"
        >
            <span class="text-[10px]">{{ date.format('MMM') }}</span>
            <span class="text-sm">{{ date.format('DD') }}</span>
        </div>
        <div class="flex flex-col justify-center ml-4 mr-auto">
            <span class="line-clamp-1">{{ expense.name }}</span>
            <span class="line-clamp-1 text-xs">{{ expense.note }}</span>
        </div>
        <div class="flex text-lg tracking-tighter w-1/3">
            <span class="inline-block ml-auto">
                <ExpenseAmount :amount="expense.amount" />
            </span>
        </div>
    </RouterLink>
</template>
