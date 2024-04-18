<script setup>
import { useUserStore } from '@/stores/useUserStore';
import { storeToRefs } from 'pinia';
import { onMounted, watch } from 'vue';

const { avatarUrl, isLogged } = storeToRefs(useUserStore());
const { getAvatar } = useUserStore();
watch(avatarUrl, async (newValue) => {
    if (newValue) await getAvatar();
});

onMounted(async () => {
    if (isLogged.value) await getAvatar();
});
</script>
<template>
    <img
        class="w-full object-cover"
        :src="avatarUrl ? avatarUrl : 'https://picsum.photos/100/100'"
        alt=""
    />
</template>
