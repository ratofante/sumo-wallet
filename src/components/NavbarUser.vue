<script setup>
import { BellIcon } from '@heroicons/vue/24/outline';
import AvatarButton from './AvatarButton.vue';
</script>

<template>
  <div class="flex items-center gap-4">
    <button class="relative w-6 h-6 text-slate-800">
      <BellIcon />
      <div class="absolute bottom-0 left-0 text-[8px] bg-red-800 w-3 h-3 text-white rounded-full">
        1
      </div>
    </button>
    <button @click="$emit('avatar-clicked')">
      <AvatarButton />
    </button>
  </div>
</template>
