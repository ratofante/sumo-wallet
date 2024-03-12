<script setup>
import { ref, onMounted } from 'vue';

defineProps({
  name: {
    type: String,
    required: true
  },
  autofocus: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: 'Write your notes..'
  }
});

const model = defineModel({
  type: String,
  required: true
});

const input = ref(null);

defineEmits(['updateValue']);

onMounted(() => {
  if (input.value.hasAttribute('autofocus')) input.value.focus();
});
</script>

<template>
  <div class="flex flex-col gap-2 my-4">
    <div class="flex flex-col-reverse gap-2 border-b-2 has-[:focus]:border-rose-800">
      <div class="flex items-center gap-2">
        <slot name="icon" />
        <textarea
          @input="$emit('updateValue', $event.target.value)"
          :name="name"
          :id="name"
          rows="2"
          cols="8"
          v-model="model"
          :autocomplete="name"
          :autofocus="autofocus"
          :placeholder="placeholder"
          ref="input"
          class="peer w-full resize-none h-10 p-2 text-slate-900 dark:text-slate-200 rounded-sm bg-transparent focus:outline-none"
        />
      </div>
      <label
        :for="name"
        class="font-semibold text-sm text-slate-900 peer-focus:text-rose-900 dark:text-slate-200 dark:peer-focus:text-rose-600 transition-colors"
      >
        <slot />
      </label>
    </div>

    <div>
      <slot name="hint" />
    </div>
  </div>
</template>
