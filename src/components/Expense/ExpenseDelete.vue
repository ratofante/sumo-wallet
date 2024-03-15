<script setup>
import ExpenseForm from '@/components/Expense/ExpenseForm.vue';
import ButtonSecondary from '@/components/Button/ButtonSecondary.vue';

import { TrashIcon, ArrowPathIcon } from '@heroicons/vue/16/solid';

import { ref } from 'vue';
import { supabase } from '@/supabase';

const props = defineProps(['id']);

const emit = defineEmits(['expense-deleted', 'delete-error', 'close-dialog']);

const processingForm = ref(false);

const deleteExpense = async () => {
    processingForm.value = true;
    try {
        const { error } = await supabase.from('expenses').delete().eq('id', props.id);

        if (error) throw new Error(error.message);

        emit('expense-deleted');
    } catch (error) {
        console.log(`Error: ${error.message}`);
    } finally {
        processingForm.value = false;
    }
};
</script>
<template>
    <ExpenseForm
        title="Delete expense"
        @close-dialog="$emit('close-dialog')"
    >
        <form @submit.prevent="deleteExpense">
            <p class="text-md text-center pt-8 pb-2">
                Are you sure you want to delete this expense?
            </p>
            <div class="flex flex-col items-center gap-1 mt-8">
                <ButtonSecondary
                    type="submit"
                    theme="dark"
                    :disabled="processingForm"
                >
                    <template #label>
                        <span v-if="!processingForm">Delete</span>
                        <span v-else>loading</span>
                    </template>
                    <template #icon>
                        <TrashIcon
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
    </ExpenseForm>
</template>
