<script setup>
import FormInputText from '@/components/Form/FormInputText.vue';
import FormErrorMsg from '@/components/Form/FormErrorMsg.vue';
import ButtonPrimary from '@/components/Button/ButtonPrimary.vue';

import { EnvelopeIcon } from '@heroicons/vue/16/solid';

import { reactive, ref } from 'vue';
import { supabase } from '@/supabase';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = reactive({
    email: '',
    errorMsg: null
});

const processingForm = ref(false);

const resetPassword = async () => {
    processingForm.value = true;
    try {
        const { error } = await supabase.auth.resetPasswordForEmail(form.email);

        if (error) throw new Error(error.message);

        router.push({ name: 'update-password' });
    } catch (error) {
        form.errorMsg = error.message;
    } finally {
        processingForm.value = false;
    }
};
</script>
<template>
    <div class="px-4 py-8 bg-slate-50 dark:bg-slate-800 transition-colors">
        <div class="mb-12">
            <h2 class="title-lg">Forgot Password</h2>
            <p class="text-normal">We'll send a reset-password link to your email address.</p>
        </div>

        <form
            @submit.prevent="resetPassword"
            class="w-full rounded dark:bg-slate-800 transition-colors"
        >
            <FormInputText
                label="Email"
                name="email"
                v-model="form.email"
                placeholder="Write your email address"
                type="email"
                :autofocus="true"
            >
                Email
                <template v-slot:icon>
                    <EnvelopeIcon class="w-4 h-4 dark:text-slate-200" />
                </template>
            </FormInputText>
            <FormErrorMsg :message="form.errorMsg" />
            <div class="flex justify-center items-center gap-4 mt-8">
                <ButtonPrimary
                    type="submit"
                    :disabled="processingForm"
                >
                    Send Email
                </ButtonPrimary>
            </div>
        </form>
    </div>
</template>
