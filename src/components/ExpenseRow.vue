<script setup>
import { inject } from 'vue';

const dayJS = inject('dayJS');

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  }
});
const date = dayJS(props.date);
const formattedDate = `${date.format('DD')} ${date.format('MMM')}`;
</script>

<template>
  <div class="w-full flex items-end justify-between my-1 p-2 bg-slate-50">
    <div class="text-xs">
      {{ formattedDate }}
    </div>
    <div class="ml-4 mr-auto">${{ amount }}</div>
    <div class="w-1/3">
      {{ name }}
    </div>
    <div></div>
  </div>
</template>
