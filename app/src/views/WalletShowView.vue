<script setup>
import ButtonGoBack from '@/components/Button/ButtonGoBack.vue';
import ExpenseTracker from '@/components/Expense/ExpenseTracker.vue';

import { supabase } from '@/supabase';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const loadingWallet = ref(false);
const wallet = ref(null);
const errorMsg = ref(null);

const getWallet = async (id) => {
    loadingWallet.value = true;
    try {
        let { data, error } = await supabase.from('wallets').select('*').eq('id', id);

        if (error) throw new Error(error.message);
        wallet.value = data[0];
    } catch (error) {
        console.log(error.message);
        errorMsg.value = error.message;
    } finally {
        loadingWallet.value = false;
    }
};

onMounted(async () => {
    getWallet(route.params.id);
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
