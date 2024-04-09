<script setup>
import ButtonGoBack from '@/components/Button/ButtonGoBack.vue';
import ExpenseTracker from '@/components/Expense/ExpenseTracker.vue';

import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from '@/composables/useAxios';

const route = useRoute();
const router = useRouter();
const loadingWallet = ref(false);
const wallet = ref(null);
const errorMsg = ref(null);

const getWallet = async (id) => {
    loadingWallet.value = true;
    try {
        const { data, error } = await axios.get(`/api/wallet/${id}`);
        console.log(data);
        if (error) throw new Error(error.message);
        if (data) {
            wallet.value = data.data;
        }
    } catch (error) {
        console.log(error.message);
        errorMsg.value = error.message;
    } finally {
        loadingWallet.value = false;
        console.log(loadingWallet.value);
    }
};

onMounted(async () => {
    await getWallet(route.params.id);
});
</script>
<template>
    <div>
        <div class="flex justify-between items-center mb-8">
            <h2 class="uppercase text-sm font-semibold text-rose-800 mb-0">Wallet details</h2>
            <ButtonGoBack @click="router.push({ name: 'wallets' })" />
        </div>

        <div>
            <div v-if="loadingWallet">Loading</div>
            <ExpenseTracker
                v-else-if="wallet"
                :wallet="wallet"
            />
            <div v-else>
                {{ errorMsg }}
            </div>
        </div>
    </div>
</template>
