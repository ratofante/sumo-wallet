<script setup>
defineProps({
    classes: {
        type: String
    },
    headless: {
        type: Boolean,
        default: false
    },
    title: {
        type: String
    },
    date: {
        type: String
    }
});
</script>
<template>
    <article
        :class="classes"
        class="rounded-sm bg-rose-50 shadow-md"
    >
        <header
            :class="{ hidden: headless }"
            class="flex justify-between items-start p-2 border rounded-t-sm border-rose-200"
        >
            <h6 class="font-serif text-2xl text-slate-900">
                {{ title }}
            </h6>
            <div>
                <span
                    v-if="date"
                    class="text-xs text-slate-600"
                >
                    {{ date }}
                </span>
                <div>
                    <slot name="buttons"></slot>
                </div>
            </div>
        </header>
        <div class="p-2">
            <slot name="body"></slot>
        </div>
    </article>
</template>
