<script setup>
import store from '@/stores/userStore';
import { computed, onMounted, ref } from 'vue';

// const userName = ref(null);

// onMounted(() => {
//   userName.value = store.state.user;
// });

// const name = computed(() => {
//   return userName.value ? userName.value : 'new User.';
// });
</script>
<template>
  <div>
    <h2 class="dark:text-slate-200">Hi there, User!</h2>
  </div>
</template>
