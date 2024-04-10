<script setup>
import ContainerBase from '@/components/Container/ContainerBase.vue';
import ButtonGoBack from '@/components/Button/ButtonGoBack.vue';
import ExpenseTracker from '@/components/Expense/ExpenseTracker.vue';

import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useWalletStore } from '@/stores/useWalletStore.js';
import { storeToRefs } from 'pinia';

const route = useRoute();
const router = useRouter();

const { setActiveWallet } = useWalletStore();
const { activeWallet } = storeToRefs(useWalletStore());

onMounted(() => {
    setActiveWallet(route.params.id);
});
</script>
<template>
    <ContainerBase>
        <div class="flex justify-between items-center mb-8">
            <h2 class="uppercase text-sm font-semibold text-rose-800 mb-0">Wallet details</h2>
            <ButtonGoBack @click="router.push({ name: 'wallets' })" />
        </div>

        <div>
            <ExpenseTracker
                v-if="activeWallet"
                :wallet="activeWallet"
            />
            <div v-else>Something wen't wrong</div>
        </div>
    </ContainerBase>
</template>
