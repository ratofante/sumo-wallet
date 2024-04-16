<script setup>
import AvatarImage from '@/components/AvatarImage.vue';
import NotificationBell from '@/components/NotificationBell.vue';
</script>

<template>
    <div class="flex items-center gap-4">
        <NotificationBell />
        <button @click="$emit('avatar-clicked')">
            <div class="w-8 h-8 rounded-full border-2 border-rose-800 overflow-hidden">
                <AvatarImage />
            </div>
        </button>
    </div>
</template>
