<script setup>
import FormInputText from '@/components/Form/FormInputText.vue';
import FormErrorMsg from '@/components/Form/FormErrorMsg.vue';
import ButtonPrimary from '@/components/Button/ButtonPrimary.vue';

import { EnvelopeIcon, KeyIcon, LockClosedIcon, UserIcon } from '@heroicons/vue/16/solid';

import { reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/useUserStore';

const router = useRouter();
const { userRegister } = useUserStore();

const form = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    errorMsg: null
});

const canProcessForm = ref(false);
const processingForm = ref(false);
const matchingPasswords = reactive({
    state: false,
    msg: ''
});

watch(form, (newValues) => {
    if (newValues.password.length !== 0 && newValues.password_confirmation.length !== 0) {
        if (newValues.password !== newValues.password_confirmation) {
            matchingPasswords.state = false;
            matchingPasswords.msg = 'There is no match bewteen your passwords';
        } else {
            matchingPasswords.state = true;
            matchingPasswords.msg = 'Matching passwords';
            canProcessForm.value = true;
        }
    }
});

const register = async () => {
    if (!canProcessForm.value) {
        form.errorMsg = 'Complete all form fields, please';
        return;
    }
    processingForm.value = true;
    const success = await userRegister(form);
    if (success) router.push({ name: 'dashboard' });
    processingForm.value = false;
};
</script>
<template>
    <div class="px-4 py-8 bg-slate-50 dark:bg-slate-800 transition-colors">
        <div class="mb-12">
            <h2 class="title-lg">Register</h2>

            <ul class="text-normal">
                <li
                    v-for="(item, i) in [
                        'Create an account with your email and password.',
                        'We\'ll send an email to your address.',
                        'Confirm your email address clicking on the link.',
                        'That\'s all, you can start creating your wallet.'
                    ]"
                    :key="i"
                    class="flex items-start mb-4"
                >
                    <span
                        class="block mr-2 font-medium text-rose-900 dark:text-rose-400 dark:opacity-80 dark:font-normal"
                    >
                        ({{ i + 1 }})
                    </span>
                    <span class="block dark:text-slate-100">{{ item }}</span>
                </li>
            </ul>
        </div>

        <form
            @submit.prevent="register"
            class="w-full rounded"
        >
            <FormInputText
                label="Name"
                name="name"
                v-model="form.name"
                type="text"
                :autofocus="true"
                placeholder="Your Username"
            >
                Username
                <template v-slot:icon>
                    <UserIcon class="w-4 h-4 dark:text-slate-200" />
                </template>
            </FormInputText>
            <FormInputText
                label="Email"
                name="email"
                v-model="form.email"
                type="email"
                :autofocus="false"
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
                placeholder="Your password"
            >
                <template v-slot:icon>
                    <KeyIcon class="w-4 h-4 dark:text-slate-200" />
                </template>
                Password
            </FormInputText>
            <FormInputText
                label="Confirm Password"
                name="password_confirmation"
                v-model="form.password_confirmation"
                type="password"
            >
                Confirm password
                <template #icon>
                    <LockClosedIcon class="w-4 h-4 dark:text-slate-200" />
                </template>
                <template #hint>
                    <span
                        class="text-xs font-medium text-rose-800"
                        :class="{
                            'text-rose-800': !matchingPasswords.state,
                            'text-slate-950': matchingPasswords.state
                        }"
                    >
                        {{ matchingPasswords.msg }}
                    </span>
                </template>
            </FormInputText>

            <FormErrorMsg :message="form.errorMsg" />
            <div class="mt-8 flex flex-col items-center gap-1">
                <ButtonPrimary
                    type="submit"
                    :disabled="processingForm"
                >
                    Submit
                </ButtonPrimary>
                <div
                    class="mt-4 text-slate-900 font-medium text-xs text-center dark:text-slate-400"
                >
                    <RouterLink to="/login">
                        Already have an account?
                        <br />
                        <span class="text-rose-400 font-semibold dark:text-rose-700">Login</span>
                    </RouterLink>
                </div>
            </div>
        </form>
    </div>
</template>
