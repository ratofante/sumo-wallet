<script setup>
import { ref } from 'vue';

const dialogRef = ref(null);

const showDialog = () => dialogRef.value?.showModal();
const closeDialog = () => dialogRef.value?.close();
defineExpose({ show: showDialog, close: closeDialog });
</script>
<template>
  <dialog
    ref="dialogRef"
    class="h-svh top-0 left-0 right-0 bottom-0 bg-transparent"
  >
    <div
      @click="closeDialog"
      class="fixed top-0 left-0 right-0 bottom-0 bg-slate-800 bg-opacity-30 z-40"
    ></div>

    <div class="relative z-50">
      <slot />
    </div>
  </dialog>
</template>
