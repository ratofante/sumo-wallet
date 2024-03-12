<script setup>
import ExpenseContainer from '@/components/Expense/ExpenseContainer.vue';
import ExpenseShow from '@/components/Expense/ExpenseShow.vue';

import { useRoute } from 'vue-router';
import { supabase } from '@/supabase';
import { onMounted, ref } from 'vue';

const route = useRoute();

const loadingExpense = ref(false);
const expense = ref(null);
const errorMsg = ref('');

const getExpense = async (id) => {
  loadingExpense.value = true;
  try {
    let { data, error } = await supabase.from('expenses').select('*').eq('id', id);

    if (error) throw new Error(error.message);
    expense.value = data[0];
  } catch (error) {
    console.log(error.message);
    errorMsg.value = error.message;
  } finally {
    loadingExpense.value = false;
  }
};

onMounted(() => {
  getExpense(route.params.id);
});
</script>

<template>
  <div>
    <h2 class="title-lg">Expense show</h2>

    <ExpenseContainer>
      <div v-if="loadingExpense">Loading</div>
      <div v-else-if="expense">
        <ExpenseShow :expense="expense" />
      </div>
      <div else>
        {{ errorMsg }}
      </div>
    </ExpenseContainer>
  </div>
</template>
