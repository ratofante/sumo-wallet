<script setup>
import { ref, onMounted } from 'vue';

defineProps({
    name: {
        type: String,
        default: '',
        required: true
    },
    autofocus: {
        type: Boolean,
        default: false
    },
    placeholder: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false
    }
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
                <input
                    @input="$emit('updateValue', $event.target.value)"
                    type="file"
                    accept="image/*"
                    :name="name"
                    :id="name"
                    :autofocus="autofocus"
                    :placeholder="placeholder"
                    :disabled="disabled"
                    ref="input"
                    class="peer h-10 p-2 text-slate-900 dark:text-slate-200 rounded-sm bg-transparent focus:outline-none disabled:opacity-50"
                />
            </div>
            <label
                :for="name"
                class="font-semibold text-sm text-slate-900 dark:text-slate-200 transition-colors"
            >
                <slot />
            </label>
        </div>

        <div>
            <slot name="hint" />
        </div>
    </div>
</template>
