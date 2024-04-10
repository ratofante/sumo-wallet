<script setup>
import AppLoader from './components/AppLoader.vue';
import NavigationBar from './components/Navigation/NavigationBar.vue';
import PageTransition from './components/PageTransition.vue';

import { RouterView, useRouter } from 'vue-router';
import { onMounted, watch } from 'vue';
import axios from '@/composables/useAxios.js';
import { useUserStore } from '@/stores/useUserStore.js';
import { useWalletStore } from '@/stores/useWalletStore.js';
import { storeToRefs } from 'pinia';

const { getUser } = useUserStore();
const { user, isLogged } = storeToRefs(useUserStore());
const { getWallets } = useWalletStore();
const router = useRouter();

localStorage.setItem('settings', JSON.stringify({ theme: ' dark' }));

async function getApiCredentials() {
    try {
        await axios.get('/sanctum/csrf-cookie');
    } catch (error) {
        throw new Error(error.message);
    }
}

function getUserSettings() {
    const settings = localStorage.getItem('settings');
    if (settings) {
        //console.log('There are settings!', JSON.parse(settings));
    }
}

watch(user, async (newValue, oldValue) => {
    if (newValue !== oldValue) {
        if (newValue) {
            await getWallets();
        }
    }
});

onMounted(async () => {
    await getApiCredentials();
    await getUser();
    getUserSettings();
    isLogged.value ? router.push({ name: 'dashboard' }) : router.push({ name: 'home' });
});
</script>

<template>
    <div
        class="relative max-w-md md:max-w-3xl mx-auto min-h-screen bg-rose-50 dark:bg-slate-950 transition-colors"
    >
        <AppLoader />
        <header class="absolute top-0 left-0 w-full z-50">
            <NavigationBar />
        </header>
        <main class="min-h-screen flex flex-col pt-24">
            <RouterView v-slot="{ Component }">
                <PageTransition>
                    <component :is="Component" />
                </PageTransition>
            </RouterView>
        </main>
    </div>
</template>
