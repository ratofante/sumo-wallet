<script setup>
import LinkSimple from '@/components/LinkSimple.vue';
</script>
<template>
  <ul class="relative flex gap-4 text-xs font-medium">
    <li>
      <LinkSimple
        path="/register"
        class="text-rose-800"
      >
        Sign up
      </LinkSimple>
    </li>
    <li>
      <LinkSimple
        path="/login"
        class="text-slate-900"
      >
        Login
      </LinkSimple>
    </li>
  </ul>
</template>
