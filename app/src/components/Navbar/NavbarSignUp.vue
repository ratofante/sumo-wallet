<script setup>
import LinkSimple from '@/components/Link/LinkSimple.vue';
</script>
<template>
    <ul class="relative flex gap-4 text-xs font-medium">
        <li>
            <LinkSimple
                path="/register"
                class="text-rose-800 dark:text-rose-100 transition-colors"
            >
                Sign up
            </LinkSimple>
        </li>
        <li>
            <LinkSimple
                path="/login"
                class="text-slate-900 dark:text-rose-400 transition-colors"
            >
                Login
            </LinkSimple>
        </li>
    </ul>
</template>
