<script setup>
defineProps({
  theme: {
    type: String,
    default: 'primary'
  }
});
</script>
<template>
  <button
    class="grid place-items-center w-8 h-8 text-slate-50 rounded-md"
    :class="{ 'bg-rose-800': theme === 'primary', 'bg-slate-800': theme === 'secondary' }"
  >
    <slot name="icon" />
  </button>
</template>
