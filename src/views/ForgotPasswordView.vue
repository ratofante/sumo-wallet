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
    <div class="mb-12">
      <h2 class="font-serif text-3xl text-left font-bold text-slate-900 mb-4 dark:text-slate-200">
        Forgot Password
      </h2>
      <p class="text-sm dark:text-slate-200">
        We'll send a reset-password link to your email address.
      </p>
    </div>

    <form
      @submit.prevent="resetPassword"
      class="w-full bg-rose-100 p-4 rounded dark:bg-slate-800 transition-colors"
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
