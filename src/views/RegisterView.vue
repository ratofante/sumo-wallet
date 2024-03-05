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
  if (form.password === form.confirmPassword) {
    try {
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password
      });
      if (error) throw error;
      router.push({ name: 'Login' });
    } catch (error) {
      form.errorMsg = 'Error: ' + error.message;
    }
    return;
  }
  form.errorMsg = "Error: passwords don't match";
};
</script>
<template>
  <div class="mb-12">
    <h2 class="font-serif text-3xl text-left tracking-tight font-bold text-slate-900 mb-4">
      Register
    </h2>

    <ul class="text-sm">
      <li class="flex items-start mb-1">
        <span class="block text-sm mr-2 font-medium text-rose-900">(1)</span>
        <span class="-block">Create an account with your email and password.</span>
      </li>
      <li class="flex items-start mb-1">
        <span class="block text-sm mr-2 font-medium text-rose-900">(2)</span>
        <span class="-block">We'll send an email to your address.</span>
      </li>
      <li class="flex items-start mb-1">
        <span class="block text-sm mr-2 font-medium text-rose-900">(3)</span>
        <span class="-block">Confirm your email address clicking on the link.</span>
      </li>
      <li class="flex items-start mb-1">
        <span class="block text-sm mr-2 font-medium text-rose-900">(4)</span>
        <span class="-block">That's all, you can start creating your wallet.</span>
      </li>
    </ul>
  </div>

  <form
    @submit.prevent="register"
    class="bg-rose-100 p-4 rounded w-full"
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
    <div class="flex flex-col items-center gap-1">
      <ButtonPrimary
        type="submit"
        :disabled="processingForm"
      >
        Submit
      </ButtonPrimary>
      <div class="text-slate-900 font-medium text-xs text-center">
        <RouterLink to="/login">
          Already have an account?
          <br />
          <span class="text-rose-400 font-semibold">Login</span>
        </RouterLink>
      </div>
    </div>
  </form>
</template>
