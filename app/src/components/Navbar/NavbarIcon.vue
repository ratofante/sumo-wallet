<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <RouterLink
        to="/"
        class="absolute left left-1/2 translate-x-[-50%] grid place-items-center w-12 h-12"
    >
        <div class="absolute w-3 h-3 rounded-full bg-rose-700"></div>
    </RouterLink>
</template>
