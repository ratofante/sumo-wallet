<script setup>
import WalletCreate from '@/components/Wallet/WalletCreate.vue';
import WalletResume from '@/components/Wallet/WalletResume.vue';
import ButtonSecondary from '@/components/Button/ButtonSecondary.vue';
import ModalDialog from '@/components/ModalDialog.vue';

import { PlusIcon } from '@heroicons/vue/16/solid';

import { onMounted, ref } from 'vue';
import axios from '@/composables/useAxios';
import { useWalletStore } from '@/stores/useWalletStore.js';
import { storeToRefs } from 'pinia';
import LoaderSpinner from '@/components/LoaderSpinner.vue';

const { setWallets } = useWalletStore();
const { wallets, getWalletsByMostRecent } = storeToRefs(useWalletStore());
const loadingData = ref(false);
const errors = ref(null);
const createWalletDialog = ref(null);

const getWallets = async () => {
    loadingData.value = true;
    try {
        const { data, error } = await axios.get('/api/wallet');

        if (error) throw new Error(error.message);

        if (data) {
            setWallets(data);
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
        errors.value = error.message;
    } finally {
        loadingData.value = false;
    }
};

const onWalletCreated = async () => {
    await getWallets();
    createWalletDialog.value.close();
};

onMounted(async () => {
    await getWallets();
});
</script>
<template>
    <div>
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
            <LoaderSpinner v-if="loadingData" />
            <div v-if="errors">
                {{ errors }}
            </div>
            <WalletResume
                v-else-if="wallets?.length > 0"
                v-for="wallet in getWalletsByMostRecent"
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
    </div>
</template>
