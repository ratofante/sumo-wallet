<script setup>
import { reactive, ref } from 'vue';
import FormInputText from '@/components/FormInputText.vue';
import FormErrorMsg from '@/components/FormErrorMsg.vue';
import ButtonSecondary from '@/components/ButtonSecondary.vue';
import { CurrencyDollarIcon, ArrowPathIcon } from '@heroicons/vue/16/solid';
import { supabase } from '@/supabase';
import store from '@/stores/userStore';
import FormInputNumber from './FormInputNumber.vue';

const expense = ref(null);
const processingForm = ref(false);
const form = reactive({
  name: '',
  amount: 0,
  errorMsg: null
});
const emit = defineEmits(['expense-created', 'create-error']);

const createExpense = async () => {
  processingForm.value = true;
  console.log(form, store.state.user.id);

  try {
    const { data, error } = await supabase
      .from('expenses')
      .insert([
        {
          expense_name: form.name,
          expense_amount: form.amount,
          user_id: store.state.user.id
        }
      ])
      .select();

    console.log(data, error);
    //if (error) throw new Error(error.message);

    //expense.value(data);
  } catch (error) {
    form.errorMsg.value = error.message;
  } finally {
    emit('expense-created', expense.value);
    processingForm.value = false;
  }
};
</script>
<template>
  <div>
    <form
      @submit.prevent="createExpense"
      class="w-full bg-rose-100 border-4 border-rose-950 border-opacity-50 p-4 rounded dark:bg-slate-800 transition-colors"
    >
      <FormInputNumber
        name="expense_amount"
        label="Amount"
        type="number"
        :autofocus="true"
        v-model="form.amount"
      />
      <FormInputText
        name="expense_name"
        label="Name"
        type="text"
        v-model="form.name"
      />
      <FormErrorMsg :message="form.errorMsg" />

      <div class="flex flex-col items-center gap-1 mt-8">
        <ButtonSecondary
          type="submit"
          :disabled="processingForm"
        >
          <template #label>
            <span v-if="!processingForm">Add Expense</span>
            <span v-else>loading</span>
          </template>
          <template #icon>
            <CurrencyDollarIcon
              v-if="!processingForm"
              class="w-4 h-4"
            />
            <ArrowPathIcon
              v-else
              class="w-4 h-4 animate-spin"
            />
          </template>
        </ButtonSecondary>
      </div>
    </form>
  </div>
</template>
