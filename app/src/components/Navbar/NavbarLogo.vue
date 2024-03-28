<script setup>
import { RouterLink } from 'vue-router';

const centered = 'absolute left left-1/2 translate-x-[-50%]';
//const besideMenu = 'mr-auto ml-4';
</script>

<template>
    <RouterLink
        to="/"
        class="grid place-items-center w-8 h-8"
        :class="centered"
    >
        <img
            src="/img/logo_eyes.png"
            alt="Sumo's wallet app logo"
        />
    </RouterLink>
</template>
