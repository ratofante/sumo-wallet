<script setup>
import { RouterLink } from 'vue-router';
defineProps({
  classes: {
    type: String,
    default: ''
  },
  path: {
    type: String,
    required: true
  }
});
</script>

<template>
  <RouterLink
    :to="path"
    class="inline-block font-serif text-slate-50 tracking-wider py-2 px-8 rounded-md bg-red-800"
    :class="classes"
  >
    <span class="opacity-90 group-hover:opacity-100"><slot /></span>
  </RouterLink>
</template>
