<script setup>
import { useRouter } from 'vue-router';

import { PowerIcon } from '@heroicons/vue/24/outline';

const emit = defineEmits(['close-user-menu']);
const router = useRouter();

const logout = async () => {
    router.push({ name: 'home' });
    emit('close-user-menu');
};
</script>
<template>
    <div class="border-t-2 py-4 border-rose-400 border-opacity-65">
        <button
            @click="logout"
            class="flex items-center gap-2 py-2 dark:text-slate-200"
        >
            <PowerIcon class="w-4 h-4" />
            Logout
        </button>
    </div>
</template>
