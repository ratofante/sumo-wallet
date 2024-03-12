<script setup>
import FormInputNumber from '@/components/Form/FormInputNumber.vue';
import FormInputText from '@/components/Form/FormInputText.vue';
import FormErrorMsg from '@/components/Form/FormErrorMsg.vue';
import ButtonSecondary from '@/components/Button/ButtonSecondary.vue';

import {
  PlusCircleIcon,
  CurrencyDollarIcon,
  ArrowPathIcon,
  BanknotesIcon,
  PencilSquareIcon
} from '@heroicons/vue/16/solid';

import { reactive, ref } from 'vue';
import { supabase } from '@/supabase';
import store from '@/stores/userStore';
import FormTextArea from '../Form/FormTextArea.vue';

const expense = ref(null);
const processingForm = ref(false);
const form = reactive({
  name: '',
  amount: '',
  note: '',
  errorMsg: null
});
const emit = defineEmits(['expense-created', 'create-error']);

const createExpense = async () => {
  processingForm.value = true;

  try {
    const { data, error } = await supabase
      .from('expenses')
      .insert([
        {
          expense_name: form.name,
          expense_amount: Number(form.amount),
          expense_note: form.note,
          user_id: store.state.user.id
        }
      ])
      .select();
    console.log(data, error);
    if (error) throw new Error(error.message);
  } catch (error) {
    form.errorMsg.value = error.message;
  } finally {
    emit('expense-created', expense.value);
    form.amount = 0;
    form.name = '';
    processingForm.value = false;
  }
};
</script>
<template>
  <div>
    <form
      @submit.prevent="createExpense"
      class="w-full bg-slate-50 border-2 border-rose-950 border-opacity-50 px-4 pt-4 pb-8 rounded dark:bg-slate-800 transition-colors"
    >
      <FormInputText
        name="expense_name"
        label="Name"
        type="text"
        v-model="form.name"
        placeholder="Describe your expense"
        :autofocus="true"
      >
        Description
        <template v-slot:icon>
          <BanknotesIcon class="w-4 h-4 dark:text-slate-400" />
        </template>
      </FormInputText>
      <FormInputNumber
        name="expense_amount"
        label="Amount"
        type="number"
        :autofocus="true"
        placeholder="$ Numbers only"
        v-model="form.amount"
      >
        Amount
        <template v-slot:icon>
          <CurrencyDollarIcon
            v-if="!processingForm"
            class="w-4 h-4 dark:text-slate-400"
          />
        </template>
      </FormInputNumber>
      <FormTextArea
        name="expense_note"
        placeholder="Your expense notes.."
        v-model="form.note"
      >
        <template v-slot:icon>
          <PencilSquareIcon class="w-4 h-4 dark:text-slate-400" />
        </template>
        Notes
      </FormTextArea>

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
            <PlusCircleIcon
              v-if="!processingForm"
              class="w-4 h-4 dark:text-slate-50"
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
