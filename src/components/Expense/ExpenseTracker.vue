<script setup>
import ExpenseCreate from '@/components/Expense/ExpenseCreate.vue';
import ExpenseRow from '@/components/Expense/ExpenseRow.vue';
import ButtonSecondary from '@/components/Button/ButtonSecondary.vue';
import ModalDialog from '@/components/ModalDialog.vue';

import { PlusIcon, ArrowPathIcon } from '@heroicons/vue/16/solid';

import { ref, onMounted } from 'vue';
import { supabase } from '@/supabase.js';
import store from '@/stores/userStore';
import ExpenseContainer from './ExpenseContainer.vue';

const loadingData = ref(true);
const errorMsg = ref(null);
const expensesArr = ref([]);
const dialog = ref();

const getExpenses = async () => {
  expensesArr.value = [];

  // Get the current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-based in JavaScript
  const currentYear = currentDate.getFullYear();

  // Query expenses for the current user and current month
  let { data: expenses, error } = await supabase
    .from('expenses')
    .select('*')
    .eq('user_id', store.state.user.id) // Filter by user_id
    .gte('created_at', `${currentYear}-${currentMonth}-01T00:00:00Z`) // Filter by start of current month
    .lte('created_at', `${currentYear}-${currentMonth}-31T23:59:59Z`) // Filter by end of current month
    .order('created_at', { ascending: false }); // Order by created_at column in descending order (newest to oldest)

  if (error) {
    console.log(`Error: ${error.message}`);
    errorMsg.value = error.message;
  } else {
    expenses.forEach((expense) => expensesArr.value.push(expense));
    console.log(expensesArr.value);
  }
  loadingData.value = false;
};

const expenseCreated = async () => {
  dialog.value.close();
  getExpenses();
};

onMounted(() => {
  getExpenses();
});
</script>
<template>
  <section>
    <div class="flex justify-between items-end">
      <div>
        <h3 class="text-3xl tracking-tighter dark:text-rose-700">Expenses</h3>
      </div>
      <ButtonSecondary @click="dialog.show()">
        <template #icon><PlusIcon class="w-4 h-4" /></template>
        <template #label>Add</template>
      </ButtonSecondary>
      <ModalDialog ref="dialog">
        <ExpenseCreate @expense-created="expenseCreated" />
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
      <ExpenseRow
        v-for="expense in expensesArr"
        :key="expense.id"
        :expense="expense"
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
