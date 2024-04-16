<script setup>
import AvatarImage from '@/components/AvatarImage.vue';

import { onMounted } from 'vue';
import { useUserStore } from '@/stores/useUserStore.js';
import { storeToRefs } from 'pinia';

const { user, avatarUrl } = storeToRefs(useUserStore());
const { getAvatar } = useUserStore();

onMounted(async () => {
    getAvatar();
});
</script>
<template>
    <div class="flex gap-8 justify-between">
        <div class="flex flex-col">
            <span class="font-medium text-lg text-slate-800 dark:text-slate-50">
                {{ user?.name ?? 'Username' }}
            </span>
            <span class="text-rose-400 text-opacity-80 font text-xs">
                {{ user?.email ?? 'user@mail.com' }}
            </span>
        </div>
        <div class="w-16 h-16 rounded-full border-2 border-rose-800 overflow-hidden">
            <AvatarImage />
        </div>
    </div>
</template>
