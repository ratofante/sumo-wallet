<script setup>
import AppLoader from './components/AppLoader.vue';
import NavigationBar from './components/Navigation/NavigationBar.vue';

import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import axios from '@/composables/useAxios.js';
import { useUserStore } from './stores/useUserStore';
import { storeToRefs } from 'pinia';

const { setUser } = useUserStore();
const { user } = storeToRefs(useUserStore());

localStorage.setItem('settings', JSON.stringify({ theme: ' dark' }));

async function getUser() {
    try {
        await axios.get('/sanctum/csrf-cookie');
        const { data } = await axios.get('/api/user');

        if (data) {
            setUser(data);
        }
    } catch (error) {
        error.status === 401
            ? console.log('Not logged in yet')
            : console.log('Error: ' + error.message);
    }
}

function getUserSettings() {
    const settings = localStorage.getItem('settings');
    if (settings) {
        console.log('There are settings!', JSON.parse(settings));
    }
}

onMounted(async () => {
    if (user) await getUser();
    getUserSettings();
});
</script>

<template>
    <div
        class="relative max-w-md md:max-w-3xl mx-auto min-h-screen bg-rose-50 dark:bg-slate-950 transition-colors"
    >
        <AppLoader />
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
