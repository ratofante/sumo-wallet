<script setup>
import { ref } from 'vue';
import { supabase } from '@/supabase';
import { RouterView, useRouter } from 'vue-router';
import NavigationBar from './components/Navigation/NavigationBar.vue';
import store from './stores/userStore';
import useDispatchEvent from './composables/useDispatchEvent.js';
</script>

<template>
    <div
        class="relative max-w-md md:max-w-3xl mx-auto min-h-screen bg-rose-50 dark:bg-slate-950 transition-colors"
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
