<script setup>
import { RouterLink } from 'vue-router';

defineProps({
    path: {
        type: String,
        required: true,
        default: '/'
    },
    classes: {
        type: String,
        default: ''
    }
});
</script>

<template>
    <RouterLink
        :to="path"
        class=""
        :class="classes"
    >
        <slot />
    </RouterLink>
</template>
