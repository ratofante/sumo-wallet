<script setup>
import FormModalContainer from '../Form/FormModalContainer.vue';
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

import { reactive, ref } from 'vue';
import { useWalletStore } from '@/stores/useWalletStore';

const props = defineProps({
    expense: {
        type: Object,
        required: true
    }
});
const { editExpense } = useWalletStore();
const processingForm = ref(false);

const emit = defineEmits(['expense-edited', 'close-dialog']);

const form = reactive({
    name: props.expense.name ?? '',
    amount: props.expense.amount ?? '',
    note: props.expense.note ?? '',
    expenseId: props.expense.id,
    errorMsg: ''
});

const handleSubmit = async () => {
    processingForm.value = true;
    await editExpense(form);
    processingForm.value = false;
    emit('expense-edited');
};
</script>
<template>
    <FormModalContainer
        title="Edit expense"
        @close-dialog="$emit('close-dialog')"
    >
        <form @submit.prevent="handleSubmit">
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
    </FormModalContainer>
</template>
