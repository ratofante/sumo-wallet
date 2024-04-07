<script setup>
import ExpenseResume from '@/components//Expense/ExpenseResume.vue';
import { RouterLink } from 'vue-router';

import { inject } from 'vue';
import useAddThousandSeparator from '@/composables/useAddThousandSeparator';

const props = defineProps({
    wallet: {
        type: Object,
        required: true
    }
});

const dayJS = inject('dayJS');
const createdAt = dayJS(props.wallet.created_at);

const sumAllExpenses = () => {
    let sum = 0;
    props.wallet.expenses.forEach((expense) => {
        sum = sum + expense.amount;
    });
    return useAddThousandSeparator(sum);
};
</script>

<template>
    <RouterLink :to="`/wallet/${wallet.id}`">
        <article class="bg-slate-50 p-2 mb-4 border-b-2 rounded-md shadow-md">
            <header class="flex justify-between items-center px-2 mb-2">
                <h6 class="text-2xl font-serif">{{ wallet.name }}</h6>
                <div class="text-xs tracking-tighter">{{ createdAt.format('DD MMM YYYY') }}</div>
            </header>
            <div
                v-if="wallet.expenses.length > 0"
                class="bg-rose-200 py-4 px-2 border-b-2 border-rose-300 rounded-sm overflow-hidden"
            >
                <div class="flex justify-between items-center text-sm mb-4">
                    <span class="tracking-tight">{{ wallet.expenses.length }} expenses</span>
                    <span>
                        Total:
                        <span class="text-rose-900 font-semibold tracking-tighter">
                            $ {{ sumAllExpenses() }}
                        </span>
                    </span>
                </div>
                <div class="pointer-events-none">
                    <span class="text-sm text-rose-900 font-medium">Last added:</span>
                    <ExpenseResume
                        v-if="wallet.expenses[0]"
                        :expense="wallet.expenses[0]"
                    />
                </div>
            </div>
            <div
                v-else
                class="px-2 text-sm text-rose-950 font-medium"
            >
                There's no expenses yet
            </div>
        </article>
    </RouterLink>
</template>
