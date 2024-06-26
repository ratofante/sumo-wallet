<script setup>
import ExpenseCreate from '@/components/Expense/ExpenseCreate.vue';
import ExpenseResume from '@/components/Expense/ExpenseResume.vue';
import ButtonSecondary from '@/components/Button/ButtonSecondary.vue';
import ModalDialog from '@/components/ModalDialog.vue';

import { PlusIcon, ArrowPathIcon } from '@heroicons/vue/16/solid';

import { ref, onMounted } from 'vue';
import { supabase } from '@/supabase.js';
import ExpenseContainer from './ExpenseContainer.vue';

const props = defineProps({
    wallet: {
        type: Object,
        required: true
    }
});

console.log(props.wallet.id);
const loadingData = ref(true);
const errorMsg = ref(null);
const expensesArr = ref([]);
const dialog = ref();

const getExpenses = async () => {
    expensesArr.value = [];

    // Get the current month and year
    // const currentDate = new Date();
    // const currentMonth = currentDate.getMonth() + 1; // Months are zero-based in JavaScript
    // const currentYear = currentDate.getFullYear();

    try {
        // Query expenses for the current user and current month
        let { data: expenses, error } = await supabase
            .from('expenses')
            .select('*')
            .eq('wallet_id', props.wallet.id)
            // .gte('created_at', `${currentYear}-${currentMonth}-01T00:00:00Z`) // Filter by start of current month
            // .lte('created_at', `${currentYear}-${currentMonth}-31T23:59:59Z`) // Filter by end of current month
            .order('created_at', { ascending: false });

        if (error) throw new Error(error.message);

        expenses.forEach((expense) => expensesArr.value.push(expense));
    } catch (error) {
        errorMsg.value = error.message;
    } finally {
        loadingData.value = false;
    }
};

const onExpenseCreated = async () => {
    dialog.value.close();
    getExpenses();
};

onMounted(() => {
    getExpenses();
});
</script>
<template>
    <section>
        <div class="flex justify-between items-center">
            <h3 class="title-lg mb-0 dark:text-rose-700">
                {{ wallet?.name ?? '' }}
            </h3>
            <ButtonSecondary @click="dialog.show()">
                <template #icon><PlusIcon class="w-4 h-4" /></template>
                <template #label>Add</template>
            </ButtonSecondary>
            <ModalDialog ref="dialog">
                <ExpenseCreate
                    :wallet-id="wallet.id"
                    @expense-created="onExpenseCreated"
                    @close-dialog="dialog.close()"
                />
            </ModalDialog>
        </div>

        <ExpenseContainer>
            <div
                v-if="loadingData"
                class="flex gap-2 items-center justify-center"
            >
                <ArrowPathIcon class="w-4 h-4 animate-spin" />
                loading...
            </div>
            <div v-if="errorMsg">
                {{ errorMsg }}
            </div>
            <ExpenseResume
                v-for="expense in expensesArr"
                :key="expense.id"
                :expense="expense"
                :wallet-id="wallet.id"
            />
            <div
                v-if="!loadingData && expensesArr.length === 0"
                class="text-center text-sm"
            >
                You don't have registered expenses this month.
                <br />
                Push the add button at the upper right corner and start adding expenses.
            </div>
        </ExpenseContainer>
    </section>
</template>
