<script setup>
import { reactive, ref } from 'vue';
import { supabase } from '@/supabase';
import FormTextInput from '@/components/FormTextInput.vue';
import ButtonPrimary from '@/components/ButtonPrimary.vue';
import FormErrorMsg from '@/components/FormErrorMsg.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = reactive({
  email: '',
  password: '',
  errorMsg: null
});

const processingForm = ref(false);

const login = async () => {
  processingForm.value = true;

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password
    });

    console.log(error);

    if (error) {
      throw new Error(error.message);
    }

    router.push({ name: 'dashboard' });
  } catch (error) {
    form.errorMsg = 'Error: ' + error.message;
  } finally {
    processingForm.value = false;
  }
};
</script>
<template>
  <div class="mb-12|">
    <h2 class="font-serif text-3xl text-left tracking-tight font-bold text-slate-900 mb-4">
      Login
    </h2>
    <p class="text-sm">
      Login to your account with your mail and password. And remember,
      <span class="italic text-red-900 font-medium">in Sumo we trust.</span>
    </p>
  </div>

  <form
    @submit.prevent="login"
    class="w-full bg-rose-100 p-4 rounded"
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
    >
      <div class="text-slate-900 text-xs">
        <RouterLink to="/reset-password">Forgot your password?</RouterLink>
      </div>
    </FormTextInput>

    <FormErrorMsg :message="form.errorMsg" />

    <div class="flex flex-col items-center gap-1 mt-4">
      <ButtonPrimary
        type="submit"
        :disabled="processingForm"
      >
        Submit
      </ButtonPrimary>
      <div class="text-slate-900 font-medium text-xs text-center">
        <RouterLink to="/register">
          Don't have an account?
          <br />
          <span class="text-rose-500 font-semibold">Sign up</span>
        </RouterLink>
      </div>
    </div>
  </form>
</template>
