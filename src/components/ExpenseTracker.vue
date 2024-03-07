<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '@/supabase.js';
import store from '@/stores/userStore';
import ButtonSecondary from '@/components/ButtonSecondary.vue';
import ModalDialog from '@/components/ModalDialog.vue';
import { PlusIcon, ArrowPathIcon } from '@heroicons/vue/16/solid';
import ExpenseCreate from '@/components/ExpenseCreate.vue';
import ExpenseRow from '@/components/ExpenseRow.vue';

const loadingData = ref(true);
const errorMsg = ref(null);
const expensesArr = ref([]);
const dialog = ref();

const getExpenses = async () => {
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
    .lte('created_at', `${currentYear}-${currentMonth}-31T23:59:59Z`); // Filter by end of current month

  if (error) {
    console.log(`Error: ${error.message}`);
    errorMsg.value = error.message;
  } else {
    expenses.forEach((expense) => expensesArr.value.push(expense));
  }
  loadingData.value = false;
};

const expenseCreated = () => {
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

    <div
      class="min-h-48 flex flex-col justify-center items-center my-4 p-4 rounded-md border-4 border-rose-950 border-opacity-80 bg-rose-200 bg-opacity-70"
    >
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
        v-for="item in expensesArr"
        :key="item.id"
        :name="item.expense_name"
        :amount="item.expense_amount"
        :date="item.created_at"
      />

      <div
        v-if="!loadingData && expensesArr.length === 0"
        class="text-center text-sm"
      >
        You don't have registered expenses this month.
        <br />
        Push the add button at the upper right corner and start adding expenses.
      </div>
    </div>
  </section>
</template>
