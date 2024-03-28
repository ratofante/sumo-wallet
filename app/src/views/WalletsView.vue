<script setup>
import WalletCreate from '@/components/Wallet/WalletCreate.vue';
import WalletResume from '@/components/Wallet/WalletResume.vue';
import ButtonSecondary from '@/components/Button/ButtonSecondary.vue';
import ModalDialog from '@/components/ModalDialog.vue';

import { PlusIcon, ArrowPathIcon } from '@heroicons/vue/16/solid';

import { onMounted, ref } from 'vue';
import { supabase } from '@/supabase';
import store from '@/stores/userStore';

const loadingData = ref(false);
const errors = ref(null);
const createWalletDialog = ref(null);
const userWallets = ref([]);

const getWallets = async () => {
    userWallets.value = [];
    loadingData.value = true;

    try {
        let { data: wallets, error } = await supabase
            .from('wallets')
            .select(
                `
                  id,
                  name,
                  created_at,
                  expenses (id, name, amount, note, created_at, updated_at)
                `
            )
            .eq('user_id', store.state.user.id)
            .order('created_at', { ascending: false });

        if (error) throw new Error(error.message);

        if (wallets) {
            wallets.forEach((wallet) => {
                wallet.expenses.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            });
            return wallets;
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
        errors.value = error.message;
    } finally {
        console.log('finally');
        loadingData.value = false;
    }
};

const onWalletCreated = async () => {
    userWallets.value = await getWallets();
    createWalletDialog.value.close();
};

onMounted(async () => {
    userWallets.value = await getWallets();
});
</script>
<template>
    <div class="flex justify-between mb-4">
        <h2 class="title-lg mb-0">Wallets</h2>
        <ButtonSecondary @click="createWalletDialog.show()">
            <template #icon>
                <PlusIcon class="w-4 h-4" />
            </template>
            <template #label>New</template>
        </ButtonSecondary>
        <ModalDialog ref="createWalletDialog">
            <WalletCreate
                @wallet-created="onWalletCreated"
                @close-dialog="createWalletDialog.close()"
            />
        </ModalDialog>
    </div>
    <!-- Wallets list -->
    <div class="mt-8">
        <div
            v-if="loadingData"
            class="flex gap-2 items-center justify-center"
        >
            <ArrowPathIcon class="w-4 h-4 animate-spin" />
            loading...
        </div>
        <div v-if="errors">
            {{ errors }}
        </div>
        <WalletResume
            v-else-if="userWallets.length > 0"
            v-for="wallet in userWallets"
            :key="wallet.id"
            :wallet="wallet"
        />
        <div
            v-else-if="!loadingData"
            class="text-center text-sm"
        >
            You don't have registered wallets.
            <br />
            Push the button at the upper right corner and create your first wallet.
        </div>
    </div>
</template>
