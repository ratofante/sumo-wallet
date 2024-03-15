<script setup>
import ExpenseForm from '@/components/Expense/ExpenseForm.vue';
import FormInputNumber from '@/components/Form/FormInputNumber.vue';
import FormInputText from '@/components/Form/FormInputText.vue';
import FormTextArea from '@/components/Form/FormTextArea.vue';
import FormErrorMsg from '@/components/Form/FormErrorMsg.vue';
import ButtonSecondary from '@/components/Button/ButtonSecondary.vue';

import {
    PlusCircleIcon,
    CurrencyDollarIcon,
    ArrowPathIcon,
    BanknotesIcon,
    PencilSquareIcon
} from '@heroicons/vue/16/solid';

import { supabase } from '@/supabase';
import { reactive, ref, watch } from 'vue';

const props = defineProps({
    expense: {
        type: Object,
        required: true
    }
});

console.log(props.expense.id);

const emit = defineEmits(['expense-edited', 'edit-error', 'close-dialog']);

const processingForm = ref(false);

const form = reactive({
    name: props.name ?? '',
    amount: props.amount ?? '',
    note: props.note ?? '',
    errorMsg: ''
});

watch(
    () => props.expense,
    (newValue) => {
        if (newValue) {
            form.name = newValue.name || '';
            form.amount = newValue.amount.toString() || '';
            form.note = newValue.note || '';
        }
    },
    { immediate: true }
);

const editExpense = async () => {
    processingForm.value = true;
    try {
        console.log(props.expense.id);
        const { data, error } = await supabase
            .from('expenses')
            .update({
                name: form.name,
                amount: form.amount,
                note: form.note,
                updated_at: new Date().toISOString()
            })
            .eq('id', props.expense.id)
            .select();

        if (error) throw new Error(error.message);

        form.name = '';
        form.amount = '';
        form.note = '';

        emit('expense-edited', data);
    } catch (error) {
        console.log(`-- from catch -- Error: ${error.message}`);
        emit('edit-error', error.message);
    } finally {
        processingForm.value = false;
    }
};
</script>
<template>
    <ExpenseForm
        title="Edit expense"
        @close-dialog="$emit('close-dialog')"
    >
        <form @submit.prevent="editExpense">
            <FormInputText
                name="name"
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
                name="amount"
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
                name="note"
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
                        <span v-if="!processingForm">Edit Expense</span>
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
    </ExpenseForm>
</template>
