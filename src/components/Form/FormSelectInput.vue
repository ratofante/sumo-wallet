<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
    label: {
        type: String,
        default: null
    },
    name: {
        type: String,
        required: true,
        default: 'select'
    },
    options: {
        type: Array,
        required: true
    },
    default: {
        type: String,
        required: false,
        default: null
    },
    tabindex: {
        type: Number,
        required: false,
        default: 0
    }
});

const selected = ref(
    props.default ? props.default : props.options.lenght > 0 ? props.options[0] : null
);

const open = ref(false);

const emit = defineEmits(['input']);

onMounted(() => {
    emit('input', selected.value);
});
</script>

<template>
    <div class="flex flex-col gap-2 my-4">
        <label
            :for="name"
            class="font-medium text-sm capitalize text-rose-100"
            :class="{ 'text-rose-300': open }"
        >
            {{ label }}
        </label>

        <div
            class="relative w-full text-left h-fir border-b-2 border-transparent rounded-b-sm z-10 focus-visible:outline-none focus:border-rose-400"
            :tabindex="tabindex"
            @blur="open = false"
        >
            <div
                class="selected h-10 p-2 bg-gray-100 rounded-sm text-zinc-800 font-medium"
                :class="{ open: open }"
                @click="open = !open"
            >
                {{ selected }}
            </div>
            <div
                class="items bg-zinc-900 rounded-b-md text-rose-50"
                :class="{ hidden: !open }"
            >
                <div
                    v-for="(option, i) of options"
                    :key="i"
                    @click="
                        selected = option;
                        open = false;
                        $emit('input', option);
                    "
                    class="capitalize p-2 cursor-pointer transition-colors hover:bg-rose-800 hover:text-slate-50"
                >
                    {{ option }}
                </div>
            </div>
        </div>
    </div>
</template>
