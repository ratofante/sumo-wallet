<script setup>
import { ref, onMounted } from 'vue';

defineProps({
  name: {
    type: String,
    default: '',
    required: true
  },
  label: {
    type: String,
    default: 'Input Label'
  },
  autofocus: {
    type: Boolean,
    default: false
  }
});

const model = defineModel({
  type: Number,
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
    <div class="flex flex-col-reverse gap-2">
      <input
        @input="$emit('updateValue', $event.target.value)"
        type="number"
        :name="name"
        :id="name"
        v-model="model"
        :autocomplete="name"
        :autofocus="autofocus"
        ref="input"
        class="peer box-border h-10 p-2 rounded-sm border-transparent focus:bg-white focus:border-rose-400 focus:outline-none focus:border-b-2 transition-colors"
      />
      <label
        :for="name"
        class="font-semibold text-sm text-slate-900 peer-focus:text-rose-900 dark:text-slate-200 dark:peer-focus:text-rose-600 transition-colors"
      >
        {{ label }}
      </label>
    </div>

    <div>
      <slot />
    </div>
  </div>
</template>
