<script setup>
import ExpenseContainer from '@/components/Expense/ExpenseContainer.vue';
import ExpenseShow from '@/components/Expense/ExpenseShow.vue';
import ContainerBase from '@/components/Container/ContainerBase.vue';
import ButtonGoBack from '@/components/Button/ButtonGoBack.vue';

import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useWalletStore } from '@/stores/useWalletStore';

const router = useRouter();
const route = useRoute();
const loadingExpense = ref(false);
const errorMsg = ref('');

const { getExpenseById } = useWalletStore();
const expense = ref();

onMounted(() => {
    expense.value = getExpenseById(route.params.id);
    console.log(expense.value);
});
</script>
<template>
    <ContainerBase>
        <div class="flex justify-between items-center">
            <h2 class="uppercase text-sm font-semibold text-rose-800 mb-0">Expense detail</h2>
            <ButtonGoBack @click="router.push(`/wallet/${route.params.walletId}`)" />
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
    </ContainerBase>
</template>
