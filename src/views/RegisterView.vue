<script setup>
import { reactive, ref } from 'vue';
import { supabase } from '../supabase.js';
import { useRouter } from 'vue-router';
import FormTextInput from '@/components/FormTextInput.vue';
import ButtonPrimary from '@/components/ButtonPrimary.vue';
import FormErrorMsg from '@/components/FormErrorMsg.vue';
//import FormSelectInput from '@/components/FormSelectInput.vue';

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
  <div class="mb-12">
    <h2 class="font-serif text-3xl text-left font-bold text-slate-900 mb-4 dark:text-slate-200">
      Register
    </h2>

    <ul class="text-sm">
      <li
        v-for="(item, i) in [
          'Create an account with your email and password.',
          'We\'ll send an email to your address.',
          'Confirm your email address clicking on the link.',
          'That\'s all, you can start creating your wallet.'
        ]"
        :key="i"
        class="flex items-start mb-1"
      >
        <span
          class="block text-sm mr-2 font-medium text-rose-900 dark:text-rose-400 dark:opacity-80 dark:font-normal"
        >
          ({{ i + 1 }})
        </span>
        <span class="block dark:text-slate-200">{{ item }}</span>
      </li>
    </ul>
  </div>

  <form
    @submit.prevent="register"
    class="bg-rose-100 p-4 rounded w-full dark:bg-slate-800 transition-colors"
  >
    <FormTextInput
      label="Email"
      name="email"
      v-model="form.email"
      type="email"
      :autofocus="true"
    />
    <FormTextInput
      label="Password"
      name="password"
      v-model="form.password"
      type="password"
    />
    <FormTextInput
      label="Confirm Password"
      name="confirmpassword"
      v-model="form.confirmPassword"
      type="password"
    />
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
</template>
