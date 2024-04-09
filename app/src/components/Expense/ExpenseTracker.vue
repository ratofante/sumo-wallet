<script setup>
import ExpenseContainer from './ExpenseContainer.vue';
import ExpenseCreate from '@/components/Expense/ExpenseCreate.vue';
import ExpenseResume from '@/components/Expense/ExpenseResume.vue';
import ButtonSecondary from '@/components/Button/ButtonSecondary.vue';
import ModalDialog from '@/components/ModalDialog.vue';

import { PlusIcon, ArrowPathIcon } from '@heroicons/vue/16/solid';

import { ref, onMounted } from 'vue';

const props = defineProps({
    wallet: {
        type: Object,
        required: true
    }
});
console.log(props.wallet);
const loadingData = ref(true);
const errorMsg = ref(null);
const dialog = ref();

const onExpenseCreated = async () => {
    dialog.value.close();
};

onMounted(() => {});
</script>
<template>
    <section>
        <div class="flex justify-between items-center">
            <h3 class="title-lg mb-0 dark:text-rose-700">
                {{ wallet?.name ?? '' }}
            </h3>
            <ButtonSecondary @click="dialog.show()">
                <template #icon><PlusIcon class="w-4 h-4" /></template>
                <template #label>Add</template>
            </ButtonSecondary>
            <ModalDialog ref="dialog">
                <ExpenseCreate
                    :wallet-id="wallet.id"
                    @expense-created="onExpenseCreated"
                    @close-dialog="dialog.close()"
                />
            </ModalDialog>
        </div>

        <ExpenseContainer>
            <!-- <div
                v-if="loadingData"
                class="flex gap-2 items-center justify-center"
            >
                <ArrowPathIcon class="w-4 h-4 animate-spin" />
                loading...
            </div> -->
            <div v-if="errorMsg">
                {{ errorMsg }}
            </div>
            <ExpenseResume
                v-for="expense in wallet.expenses"
                :key="expense.id"
                :expense="expense"
                :wallet-id="wallet.id"
            />
            <div
                v-if="!loadingData && wallet.expenses.length === 0"
                class="text-center text-sm"
            >
                You don't have registered expenses this month.
                <br />
                Push the add button at the upper right corner and start adding expenses.
            </div>
        </ExpenseContainer>
    </section>
</template>
