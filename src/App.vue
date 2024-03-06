<script setup>
import { ref } from 'vue';
import { supabase } from '@/supabase';
import { RouterView, useRouter } from 'vue-router';
import NavigationBar from './components/NavigationBar.vue';
import store from './stores/userStore';

const appReady = ref(null);
const router = useRouter();

const getProfile = async () => {
  try {
    const { data, error, status } = await supabase
      .from('profiles')
      .select(`username, avatar_url`)
      .eq('id', store.state.user.id)
      .single();

    if (error && status !== 406) throw error;

    if (data) {
      store.methods.setProfile(data);
    }
  } catch (error) {
    alert(`Error: ${error.message}`);
  } finally {
    console.log(`Username: ${store.state.profile.username}`);
  }
};

const checkForProfile = async () => {
  console.log('checkForProfile trigger');
  if (store.state.user) {
    console.log("there's a user, start getProfile()");
    try {
      await getProfile();
      if (store.state.profile) {
        console.log('before firing new-profile', store.state.profile);
        window.dispatchEvent(new CustomEvent('new-profile'));
      }
    } catch (error) {
      console.error('Error while fetching profile:', error);
    }
  } else {
    console.log("didn't pass");
  }
};

supabase.auth.onAuthStateChange((event, _session) => {
  if (event === 'SIGNED_IN') {
    console.log('SIGNED IN');
    store.methods.setUser(_session);
    checkForProfile();
  }
  if (event === 'SIGNED_OUT') console.log('LOGGED OUT');
  if (event === 'PASSWORD_RECOVERY') {
    router.push({ name: 'update-password' });
  }
  appReady.value = true;
  window.dispatchEvent(new CustomEvent('app-ready'));
});
</script>

<template>
  <div
    v-if="appReady"
    class="relative max-w-md md:max-w-3xl mx-auto min-h-screen bg-white dark:bg-slate-950 transition-colors"
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
