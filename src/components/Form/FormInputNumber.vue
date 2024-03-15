<script setup>
import { ref, onMounted } from 'vue';

defineProps({
    name: {
        type: String,
        default: '',
        required: true
    },
    placeholder: {
        type: String,
        default: ''
    },
    autofocus: {
        type: Boolean,
        default: false
    }
});

const model = defineModel({
    type: String,
    required: true
});
const input = ref(null);

defineEmits(['updateValue']);

const checkDigit = (ev) => {
    if (ev.key.length === 1 && isNaN(Number(ev.key))) {
        ev.preventDefault();
    }
};

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
                    @keydown="checkDigit"
                    type="text"
                    :name="name"
                    :id="name"
                    v-model="model"
                    :placeholder="placeholder"
                    :autocomplete="name"
                    :autofocus="autofocus"
                    ref="input"
                    class="peer h-10 p-2 text-slate-900 dark:text-slate-200 rounded-sm bg-transparent focus:outline-none"
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
