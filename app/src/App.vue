<script setup>
import AppLoader from './components/AppLoader.vue';
import NavigationBar from './components/Navigation/NavigationBar.vue';

import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import axios from '@/composables/useAxios.js';
import { useUserStore } from './stores/useUserStore';
import { storeToRefs } from 'pinia';
import { easeOutQuint } from './utils/useBeziers';

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

const onEnterAnim = (el) => {
    return el.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 800,
        easing: easeOutQuint,
        fill: 'forwards'
    });
};

const onLeaveAnim = (el) => {
    return el.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 800,
        easing: easeOutQuint
    });
};

function onEnter(el, done) {
    el.classList.add('absolute');
    const anim = onEnterAnim(el);
    anim.onfinish = () => {
        done();
    };
}

function onLeave(el, done) {
    const anim = onLeaveAnim(el);
    anim.onfinish = () => {
        done();
    };
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
        <header class="absolute top-0 left-0 w-full z-50">
            <NavigationBar />
        </header>
        <div class="container md:container">
            <main class="min-h-screen flex flex-col pt-24">
                <RouterView v-slot="{ Component }">
                    <Transition
                        @enter="onEnter"
                        @leave="onLeave"
                        :css="false"
                    >
                        <component :is="Component" />
                    </Transition>
                </RouterView>
            </main>
        </div>
    </div>
</template>
