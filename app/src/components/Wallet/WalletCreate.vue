<script setup>
import FormModalContainer from '@/components/Form/FormModalContainer.vue';
import FormInputText from '@/components/Form/FormInputText.vue';
import FormErrorMsg from '@/components/Form/FormErrorMsg.vue';
import ButtonSecondary from '@/components/Button/ButtonSecondary.vue';

import { PlusIcon, BanknotesIcon, ArrowPathIcon } from '@heroicons/vue/16/solid';

import { reactive, ref } from 'vue';
import axios from '@/composables/useAxios';
import { useUserStore } from '@/stores/useUserStore';
import { storeToRefs } from 'pinia';

const { user } = storeToRefs(useUserStore());
const wallet = ref(null);
const processingForm = ref(false);
const form = reactive({
    name: '',
    errorMsg: null
});
const emit = defineEmits(['wallet-created', 'create-error', 'close-dialog']);

const createWallet = async () => {
    processingForm.value = true;

    try {
        const { data, error } = await axios.post('/api/wallet', {
            name: form.name,
            user_id: user.value.id
        });

        if (error) throw new Error(error.message);

        if (data) {
            console.log(data);
            wallet.value = data;
            emit('wallet-created', wallet.value);
        }
    } catch (error) {
        form.errorMsg = error.message;
        emit('create-error', error.message);
    } finally {
        form.name = '';
        processingForm.value = false;
    }
};
</script>
<template>
    <FormModalContainer
        title="Create wallet"
        @close-dialog="$emit('close-dialog')"
    >
        <form @submit.prevent="createWallet">
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
                        <span v-if="!processingForm">Create wallet</span>
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
