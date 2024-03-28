<script setup>
import { ref } from 'vue';
defineProps({
    active: {
        type: Boolean,
        default: false
    }
});

const isOpen = ref(false);

const emit = defineEmits(['buttonClicked']);

const toggleMenu = () => {
    isOpen.value = !isOpen.value;
    emit('buttonClicked', isOpen.value);
};
</script>
<template>
    <button
        @click="toggleMenu"
        class="relative w-[20px] h-[14px]"
    >
        <!-- big box for better accesibility -->
        <div class="absolute center-absolute grid place-items-center w-12 h-12">
            <!-- closed menu button (burger) -->
            <div
                :class="{ hidden: isOpen }"
                class="w-[20px] h-[14px] flex flex-col items-stretch justify-between"
            >
                <div class="w-full h-[2px] rounded overflow-hidden">
                    <div class="bar w-full h-full bg-rose-800"></div>
                </div>
                <div class="w-full h-[2px] rounded overflow-hidden">
                    <div class="bar w-full h-full bg-rose-800"></div>
                </div>
                <div class="w-full h-[2px] rounded overflow-hidden">
                    <div class="bar w-full h-full bg-rose-800"></div>
                </div>
            </div>
            <!-- open menu button (cross) -->
            <div
                :class="{ hidden: !isOpen }"
                class="absolute"
            >
                <div class="relative w-[20px] h-[14px] grid place-items-center">
                    <div class="bar absolute rotate-45 w-full h-[2px] bg-slate-50"></div>
                    <div class="bar absolute -rotate-45 w-full h-[2px] bg-slate-50"></div>
                </div>
            </div>
        </div>
    </button>
</template>

<style scoped>
.bar {
    animation: bars-in 300ms ease;
}

@keyframes bars-in {
    from {
        width: 0%;
    }
    to {
        width: 100%;
    }
}
</style>
