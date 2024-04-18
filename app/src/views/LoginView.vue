<script setup>
import FormInputText from '@/components/Form/FormInputText.vue';
import FormErrorMsg from '@/components/Form/FormErrorMsg.vue';
import ButtonPrimary from '@/components/Button/ButtonPrimary.vue';
import LoginSpinner from '@/components/LoaderSpinner.vue';

import { EnvelopeIcon, KeyIcon } from '@heroicons/vue/16/solid';

import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/useUserStore';

const router = useRouter();
const { userLogin } = useUserStore();
const processingForm = ref(false);

const form = reactive({
    email: '',
    password: '',
    errorMsg: null
});

const login = async () => {
    processingForm.value = true;
    const success = await userLogin(form);
    if (success) router.push({ name: 'dashboard' });
    processingForm.value = false;
};
</script>
<template>
    <div class="px-4 py-8 bg-slate-50 dark:bg-slate-800 transition-colors">
        <LoginSpinner :show-spinner="processingForm" />

        <div class="mb-12">
            <h2 class="title-lg">Login</h2>
            <p class="text-normal">
                Login to your account with your mail and password. And remember,
                <span
                    class="italic text-red-900 font-medium dark:text-rose-400 dark:opacity-80 dark:font-normal"
                >
                    in Sumo we trust.
                </span>
            </p>
        </div>

        <form
            @submit.prevent="login"
            class="w-full rounded dark:bg-slate-800 transition-colors"
        >
            <FormInputText
                label="Email"
                name="email"
                v-model="form.email"
                type="email"
                :autofocus="true"
                placeholder="Write your email address"
            >
                Email
                <template v-slot:icon>
                    <EnvelopeIcon class="w-4 h-4 dark:text-slate-200" />
                </template>
            </FormInputText>
            <FormInputText
                label="Password"
                name="password"
                v-model="form.password"
                type="password"
            >
                Password
                <template v-slot:icon>
                    <KeyIcon class="w-4 h-4 dark:text-slate-200" />
                </template>
                <template v-slot:hint>
                    <div class="text-slate-900 text-xs dark:text-slate-400">
                        <RouterLink to="/reset-password">Forgot your password?</RouterLink>
                    </div>
                </template>
            </FormInputText>

            <FormErrorMsg :message="form.errorMsg" />

            <div class="flex flex-col items-center gap-1 mt-8">
                <ButtonPrimary
                    type="submit"
                    size="small"
                    :disabled="processingForm"
                >
                    Submit
                </ButtonPrimary>
                <div class="mt-4 text-slate-900 font text-xs text-center dark:text-slate-400">
                    <RouterLink to="/register">
                        Don't have an account?
                        <br />
                        <span class="text-rose-500 font-semibold dark:text-rose-700">Sign up</span>
                    </RouterLink>
                </div>
            </div>
        </form>
    </div>
</template>
