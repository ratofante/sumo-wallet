<script setup></script>
<template>
  <button
    class="flex gap-1 items-center py-2 px-3 rounded-md font-medium text-sm text-slate-50 bg-rose-800"
  >
    <slot name="icon" />
    <slot name="label" />
  </button>
</template>
