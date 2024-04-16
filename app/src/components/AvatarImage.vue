<script setup>
import { useUserStore } from '@/stores/useUserStore';
import { storeToRefs } from 'pinia';

const { avatarUrl } = storeToRefs(useUserStore());
</script>
<template>
    <img
        :src="avatarUrl ? avatarUrl : 'https://picsum.photos/64/64'"
        alt=""
    />
</template>
