<script setup>
import useAddThousandSeparator from '@/composables/useAddThousandSeparator.js';
defineProps({
    amount: {
        type: Number,
        required: true
    }
});
</script>
<template>
    <span class="font-medium">$ {{ useAddThousandSeparator(amount) }}</span>
</template>
