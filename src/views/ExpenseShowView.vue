<script setup>
import ExpenseContainer from '@/components/Expense/ExpenseContainer.vue';
import ExpenseShow from '@/components/Expense/ExpenseShow.vue';
import ButtonGoBack from '@/components/Button/ButtonGoBack.vue';

import { useRoute, useRouter } from 'vue-router';
import { supabase } from '@/supabase';
import { onMounted, ref } from 'vue';

const router = useRouter();
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

const goBack = () => {
  router.push({ name: 'dashboard' });
};

onMounted(() => {
  getExpense(route.params.id);
});
</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <h2 class="title-lg mb-0">Expense show</h2>
      <ButtonGoBack @click="goBack" />
    </div>

    <ExpenseContainer>
      <div v-if="loadingExpense">Loading</div>
      <ExpenseShow
        v-else-if="expense"
        :expense="expense"
      />
      <div else>
        {{ errorMsg }}
      </div>
    </ExpenseContainer>
  </div>
</template>
