<script setup>
import ExpenseContainer from './ExpenseContainer.vue';
import ExpenseCreate from '@/components/Expense/ExpenseCreate.vue';
import ExpenseResume from '@/components/Expense/ExpenseResume.vue';
import ButtonSecondary from '@/components/Button/ButtonSecondary.vue';
import ModalDialog from '@/components/ModalDialog.vue';

import { PlusIcon } from '@heroicons/vue/16/solid';

import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useWalletStore } from '@/stores/useWalletStore';

const { activeWallet } = storeToRefs(useWalletStore());
const dialog = ref();

const onExpenseCreated = async () => {
    dialog.value.close();
};

function sortExpensesByMostRecent(expenses) {
    expenses.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return expenses;
}

onMounted(() => {});
</script>
<template>
    <section>
        <div class="flex justify-between items-center">
            <h3 class="title-lg mb-0 dark:text-rose-700">
                {{ activeWallet?.name ?? '' }}
            </h3>
            <ButtonSecondary @click="dialog.show()">
                <template #icon><PlusIcon class="w-4 h-4" /></template>
                <template #label>Add</template>
            </ButtonSecondary>
            <ModalDialog ref="dialog">
                <ExpenseCreate
                    :wallet-id="activeWallet.id"
                    @expense-created="onExpenseCreated"
                    @close-dialog="dialog.close()"
                />
            </ModalDialog>
        </div>

        <ExpenseContainer>
            <div
                v-if="activeWallet.expenses.length > 0"
                class="w-full"
            >
                <ExpenseResume
                    v-for="expense in sortExpensesByMostRecent(activeWallet.expenses)"
                    :key="expense.id"
                    :expense="expense"
                    :wallet-id="activeWallet.id"
                />
            </div>

            <div
                v-else
                class="text-center text-sm"
            >
                You don't have registered expenses this month.
                <br />
                Push the add button at the upper right corner and start adding expenses.
            </div>
        </ExpenseContainer>
    </section>
</template>
