<script setup>
defineProps({
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
</script>

<template>
  <div class="flex">
    <div class="">
      {{ amount }}
    </div>
    <div class="">
      {{ name }}
    </div>
    <div class="">
      {{ date }}
    </div>
  </div>
</template>
