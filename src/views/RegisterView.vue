<script setup>
import FormInputText from '@/components/Form/FormInputText.vue';
import FormErrorMsg from '@/components/Form/FormErrorMsg.vue';
//import FormSelectInput from '@/components/Form/FormSelectInput.vue';
import ButtonPrimary from '@/components/Button/ButtonPrimary.vue';

import { EnvelopeIcon, KeyIcon, LockClosedIcon } from '@heroicons/vue/16/solid';

import { reactive, ref } from 'vue';
import { supabase } from '../supabase.js';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  errorMsg: null
});

const processingForm = ref(false);

const register = async () => {
  processingForm.value = true;
  if (form.password === form.confirmPassword) {
    try {
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password
      });
      if (error) throw error;
      router.push({ name: 'login' });
    } catch (error) {
      form.errorMsg = 'Error: ' + error.message;
    } finally {
      processingForm.value = false;
    }
  }
  form.errorMsg = "Error: passwords don't match";
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
        placeholder="Your password"
      >
        <template v-slot:icon>
          <KeyIcon class="w-4 h-4 dark:text-slate-200" />
        </template>
        Password
      </FormInputText>
      <FormInputText
        label="Confirm Password"
        name="confirmpassword"
        v-model="form.confirmPassword"
        type="password"
      >
        Confirm password
        <template v-slot:icon>
          <LockClosedIcon class="w-4 h-4 dark:text-slate-200" />
        </template>
      </FormInputText>
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
      <div class="mt-8 flex flex-col items-center gap-1">
        <ButtonPrimary
          type="submit"
          :disabled="processingForm"
        >
          Submit
        </ButtonPrimary>
        <div class="mt-4 text-slate-900 font-medium text-xs text-center dark:text-slate-400">
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
