<script setup>
import FormModalContainer from '@/components/Form/FormModalContainer.vue';
import ButtonSecondary from '@/components/Button/ButtonSecondary.vue';

import { TrashIcon, ArrowPathIcon } from '@heroicons/vue/16/solid';

import { ref } from 'vue';
import { useWalletStore } from '@/stores/useWalletStore';

const props = defineProps(['walletId']);

const { deleteWallet, setActiveWallet } = useWalletStore();
const processingForm = ref(false);

const emit = defineEmits(['wallet-deleted', 'close-dialog']);

const handleSubmit = async () => {
    processingForm.value = true;
    await deleteWallet(props.walletId);
    processingForm.value = false;
    emit('wallet-deleted');
};

const onOpenDeleteDialog = () => {
    setActiveWallet(props.walletId);
};
defineExpose({ onOpenDeleteDialog });
</script>
<template>
    <FormModalContainer
        title="Delete wallet"
        @close-dialog="$emit('close-dialog')"
    >
        <form @submit.prevent="handleSubmit">
            <p class="text-md text-center pt-8 pb-2">
                Are you sure you want to delete this wallet?
            </p>
            <div class="flex flex-col items-center gap-1 mt-8">
                <ButtonSecondary
                    type="submit"
                    theme="dark"
                    :disabled="processingForm"
                >
                    <template #label>
                        <span v-if="!processingForm">Delete</span>
                        <span v-else>loading</span>
                    </template>
                    <template #icon>
                        <TrashIcon
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
