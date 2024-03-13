<script setup>
import { ref } from 'vue';
defineProps({
  side: {
    type: String,
    default: 'left'
  }
});
const open = ref(false);
function toggleDropdown() {
  open.value = !open.value;
}
defineExpose({ toggleDropdown });
</script>

<template>
  <div class="relative">
    <div
      @click="toggleDropdown"
      class="grid place-items-center"
    >
      <slot name="trigger" />
    </div>

    <div
      v-show="open"
      @click="toggleDropdown"
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
        class="absolute bottom-0 right-0 translate-y-[100%] z-50 rounded-md overflow-hidden bg-slate-900 border-2 border-slate-50"
        :class="side === 'left' ? 'left-0' : 'right-0'"
      >
        <div class="flex flex-col bg-gray-dark p-4 w-fit min-w-52 md:min-w-56">
          <slot name="content" />
        </div>
      </div>
    </Transition>
  </div>
</template>
