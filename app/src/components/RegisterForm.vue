<script setup>
import FormInputText from '@/components/Form/FormInputText.vue';
import FormErrorMsg from '@/components/Form/FormErrorMsg.vue';
import ButtonPrimary from '@/components/Button/ButtonPrimary.vue';

import { UserIcon, EnvelopeIcon, KeyIcon, LockClosedIcon } from '@heroicons/vue/24/outline';

import { reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/useUserStore';

const { user } = storeToRefs(useUserStore());
const editEnable = ref(true);
const router = useRouter();

const form = reactive({
    name: user.value ? user.value.name : '',
    email: user.value ? user.value.email : '',
    errorMsg: null
});

const focusable = ref();
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

const toggleEditing = () => {
    editEnable.value = !editEnable.value;
    focusable.value.getFocus();
};

defineExpose({ toggleEditing });

const register = async () => {
    if (!canProcessForm.value) {
        form.errorMsg = 'Complete all form fields, please';
        return;
    }
    processingForm.value = true;
    try {
        let { error } = await axios.post('/register', {
            name: form.name,
            email: form.email,
            password: form.password,
            password_confirmation: form.password_confirmation
        });
        if (!error) {
            const { data } = await axios.get('/api/user');
            console.log(data);
            router.push({ name: 'dashboard' });
        } else throw error;
    } catch (error) {
        form.errorMsg = 'Error: ' + error.message;
    } finally {
        processingForm.value = false;
    }
};
</script>
<template>
    <form
        @submit.prevent="register"
        class="w-full rounded"
    >
        <FormInputText
            label="Name"
            name="name"
            v-model="form.name"
            type="text"
            :autofocus="false"
            placeholder="Your Username"
            :disabled="!editEnable"
            ref="focusable"
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
            :disabled="!editEnable"
            placeholder="Write your email address"
        >
            Email
            <template v-slot:icon>
                <EnvelopeIcon class="w-4 h-4 dark:text-slate-200" />
            </template>
        </FormInputText>
        <!-- <FormInputText
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
        </FormInputText> -->
        <!-- <FormSelectInput
        label="País"
        name="pais"
        @input="
          (e) => {
            form.country = e;
          }
        "
        :options="['chile', 'argentina', 'perú', 'brasil']"
        default="Chile"
      /> -->
        <FormErrorMsg :message="form.errorMsg" />
        <div
            class="mt-8 flex flex-col items-center gap-1"
            :class="{ hidden: !editEnable }"
        >
            <ButtonPrimary
                type="submit"
                :disabled="processingForm"
            >
                Store changes
            </ButtonPrimary>
            <!-- <div class="mt-4 text-slate-900 font-medium text-xs text-center dark:text-slate-400">
                <RouterLink to="/login">
                    Already have an account?
                    <br />
                    <span class="text-rose-400 font-semibold dark:text-rose-700">Login</span>
                </RouterLink>
            </div> -->
        </div>
    </form>
</template>
