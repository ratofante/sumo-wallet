<script setup>
defineProps({
  classes: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <button
    class="group font-serif bg-red-800 rounded-md text-white font-medium tracking-wider border-2 border-transparent border-opacity-50 transition-colors py-2 px-8 my-2 hover:bg-900 hover:border-rose-100"
    :class="classes"
  >
    <span class="opacity-90 group-hover:opacity-100"><slot /></span>
  </button>
</template>
