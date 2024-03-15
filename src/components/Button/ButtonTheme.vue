<script setup>
import { ref, computed, onMounted } from 'vue';
import { SunIcon, MoonIcon } from '@heroicons/vue/16/solid';

const root = document.documentElement.classList;
const lightTheme = ref(true);
const classes = computed(() => {
    return lightTheme.value ? 'ml-0' : 'ml-4';
});

function toggleTheme() {
    lightTheme.value = !lightTheme.value;
    setTheme();
}

function setTheme() {
    if (lightTheme.value) {
        root.contains('dark') && root.remove('dark');
        root.add('light');
    } else {
        root.remove('light');
        root.add('dark');
    }
}

onMounted(() => {
    //Logic for setting theme
    setTheme();
});
</script>

<template>
    <button
        @click="toggleTheme"
        class="flex items-center px-[2px] w-8 h-4 ml- rounded-full bg-rose-100 dark:bg-slate-600 transition-colors"
    >
        <div
            class="grid place-items-center rounded-full w-3 h-3 bg-slate-50"
            :class="classes"
        >
            <SunIcon
                v-if="lightTheme"
                class="w-3 h-3 text-slate-900"
            />
            <MoonIcon
                v-else
                class="w-3 h-3 text-slate-900"
            />
        </div>
    </button>
</template>

<style scoped>
button div {
    transition: margin 300ms ease;
}
</style>
