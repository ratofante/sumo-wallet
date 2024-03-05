<script setup>
import { reactive, ref } from 'vue';
import FormTextInput from '@/components/FormTextInput.vue';
import ButtonPrimary from '@/components/ButtonPrimary.vue';
import FormErrorMsg from '@/components/FormErrorMsg.vue';
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
  <div>
    <h2 class="text-3xl text-left mb-12 tracking-tight font-bold text-rose-950">Forgot Password</h2>

    <form
      @submit.prevent="resetPassword"
      class="bg-zinc-800 p-4 rounded"
    >
      <FormTextInput
        label="Email"
        name="email"
        v-model="form.email"
        type="email"
        :autofocus="true"
      />
      <FormErrorMsg :message="form.errorMsg" />
      <div class="flex justify-center items-center gap-4">
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
