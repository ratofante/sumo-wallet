<script setup>
import FormModalContainer from '../Form/FormModalContainer.vue';
import FormInputText from '@/components/Form/FormInputText.vue';
import FormErrorMsg from '@/components/Form/FormErrorMsg.vue';
import ButtonSecondary from '@/components/Button/ButtonSecondary.vue';

import { PlusIcon, BanknotesIcon, ArrowPathIcon } from '@heroicons/vue/16/solid';

import { reactive, ref } from 'vue';
import { useUserStore } from '@/stores/useUserStore';
import { useWalletStore } from '@/stores/useWalletStore';
import { storeToRefs } from 'pinia';

const props = defineProps(['walletId']);

const { user } = storeToRefs(useUserStore());
const { editWallet, setActiveWallet } = useWalletStore();
const { activeWallet } = storeToRefs(useWalletStore());
const processingForm = ref(false);

const form = reactive({
    name: '',
    errorMsg: null
});

const emit = defineEmits(['wallet-edit', 'close-dialog']);

const handleSubmit = async () => {
    processingForm.value = true;
    await editWallet({
        wallet_id: props.walletId,
        name: form.name,
        user_id: user.value?.id
    });
    processingForm.value = false;
    emit('wallet-edit');
};

const onOpenEditDialog = () => {
    setActiveWallet(props.walletId);
    form.name = activeWallet.value.name;
};
defineExpose({ onOpenEditDialog });
</script>
<template>
    <FormModalContainer
        title="Edit Wallet"
        @close-dialog="$emit('close-dialog')"
    >
        <form @submit.prevent="handleSubmit">
            <FormInputText
                name="name"
                label="Name"
                type="text"
                v-model="form.name"
                placeholder="Your wallet's name"
                :autofocus="true"
            >
                Description
                <template v-slot:icon>
                    <BanknotesIcon class="w-4 h-4 dark:text-slate-400" />
                </template>
            </FormInputText>

            <FormErrorMsg :message="form.errorMsg" />

            <div class="flex flex-col items-center gap-1 mt-8">
                <ButtonSecondary
                    type="submit"
                    :disabled="processingForm"
                >
                    <template #label>
                        <span v-if="!processingForm">Edit wallet</span>
                        <span v-else>loading</span>
                    </template>
                    <template #icon>
                        <PlusIcon
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
