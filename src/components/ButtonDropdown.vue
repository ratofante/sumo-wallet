<script setup>
import { ref } from 'vue';
const open = ref(false);
</script>

<template>
  <div class="relative">
    <div
      @click="open = !open"
      class="grid place-items-center"
    >
      <slot name="trigger" />
    </div>

    <div
      v-show="open"
      @click="open = !open"
      class="fixed inset-0 z-40 bg-black opacity-20"
    ></div>
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-show="open"
        class="absolute bottom-0 translate-y-[100%] z-50"
      >
        <div
          class="flex flex-col bg-gray-dark py-8 px-4 w-fit min-w-48 md:min-w-56 rounded-md border-2 border-opacity-20 border-green"
        >
          <slot name="content" />
        </div>
      </div>
    </Transition>
  </div>
</template>
