<script setup>
import NotificationBell from '@/components/NotificationBell.vue';
import AvatarButton from '@/components/AvatarButton.vue';
</script>

<template>
    <div class="flex items-center gap-4">
        <NotificationBell />
        <button @click="$emit('avatar-clicked')">
            <AvatarButton />
        </button>
    </div>
</template>
