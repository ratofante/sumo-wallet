<script setup>
import FormInputText from '@/components/Form/FormInputText.vue';
import FormErrorMsg from '@/components/Form/FormErrorMsg.vue';
import ButtonPrimary from '@/components/Button/ButtonPrimary.vue';

import { KeyIcon, LockClosedIcon } from '@heroicons/vue/16/solid';

import { supabase } from '@/supabase';
import { reactive, ref } from 'vue';

const form = reactive({
  newPassword: '',
  confirmPassword: '',
  errorMsg: null
});

const processingForm = ref(false);

const updatePassword = async () => {
  processingForm.value = true;
  if (form.newPassword === form.confirmPassword) {
    try {
      const { error } = await supabase.auth.updateUser({
        password: form.newPassword
      });
      if (error) throw new Error(error.message);
      alert('password reseted ');
    } catch (error) {
      form.errorMsg = `Error: ${error.message}`;
    } finally {
      processingForm.value = false;
    }
  }
};
</script>
<template>
  <div class="px-4 py-8 bg-slate-50 dark:bg-slate-800 transition-colors">
    <div class="mb-12">
      <h2 class="title-lg">Update Password</h2>
    </div>

    <form
      @submit.prevent="updatePassword"
      class="w-full"
    >
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
      <FormErrorMsg :message="form.errorMsg" />
      <div class="flex items-center justify-center gap-4 mt-8">
        <ButtonPrimary
          type="submit"
          :disabled="processingForm"
        >
          Set Password
        </ButtonPrimary>
      </div>
    </form>
  </div>
</template>
