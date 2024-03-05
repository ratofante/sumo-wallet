<script setup>
import { ref } from 'vue';
import { supabase } from '@/supabase';
import { RouterView, useRouter } from 'vue-router';
import NavigationBar from './components/NavigationBar.vue';
import store from './stores/userStore';

const appReady = ref(null);
const user = null;
const router = useRouter();

if (!user) {
  appReady.value = true;
}

supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') console.log('SIGNED IN');
  if (event === 'SIGNED_OUT') console.log('LOGGED OUT');

  if (event === 'PASSWORD_RECOVERY') {
    router.push({ name: 'update-password' });
  }

  store.methods.setUser(session);
  appReady.value = true;

  console.log(store.state);
});
</script>

<template>
  <div
    v-if="appReady"
    class="relative max-w-md md:max-w-3xl mx-auto min-h-screen bg-white"
  >
    <header class="absolute top-0 left-0 w-full">
      <NavigationBar />
    </header>
    <div class="container md:container">
      <main class="min-h-screen flex flex-col pt-24">
        <RouterView />
      </main>
    </div>
  </div>
</template>
./components/NavigationBar.vue
