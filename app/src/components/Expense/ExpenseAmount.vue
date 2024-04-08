<script setup>
import useFormatCurrency from '@/composables/useFormatCurrency';
defineProps({
    amount: {
        type: Number,
        required: true
    }
});
</script>
<template>
    <span class="font-medium">{{ useFormatCurrency(amount) }}</span>
</template>
