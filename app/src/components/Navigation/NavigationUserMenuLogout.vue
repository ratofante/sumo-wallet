<script setup>
import { PowerIcon } from '@heroicons/vue/24/outline';

import axios from '@/composables/useAxios';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/useUserStore';

const emit = defineEmits(['close-user-menu']);
const router = useRouter();
const { userLogout } = useUserStore();

const logout = async () => {
    await axios
        .post('/logout')
        .then(() => {
            userLogout();
            router.push({ name: 'home' });
        })
        .catch((e) => {
            console.log(e);
        })
        .finally(() => {
            emit('close-user-menu');
            router.push({ name: 'home' });
        });
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
