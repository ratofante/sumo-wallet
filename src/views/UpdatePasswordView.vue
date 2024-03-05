<script setup>
import FormTextInput from '@/components/FormTextInput.vue';
import FormErrorMsg from '@/components/FormErrorMsg.vue';
import ButtonPrimary from '@/components/ButtonPrimary.vue';
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
  <div>
    <h2 class="text-3xl text-left mb-12 tracking-tight font-bold text-rose-950">Update Password</h2>

    <form
      @submit.prevent="updatePassword"
      class="bg-zinc-800 p-4 rounded"
    >
      <FormTextInput
        label="Password"
        name="password"
        v-model="form.newPassword"
        type="password"
      />
      <FormTextInput
        label="Confirm Password"
        name="confirmpassword"
        v-model="form.confirmPassword"
        type="password"
      />
      <FormErrorMsg :message="form.errorMsg" />
      <div class="flex items-center gap-4">
        <ButtonPrimary
          type="submit"
          :disabled="processingForm"
        >
          Submit
        </ButtonPrimary>
      </div>
    </form>
  </div>
</template>
