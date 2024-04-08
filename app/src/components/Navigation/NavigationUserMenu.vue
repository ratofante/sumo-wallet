<script setup>
import NavigationUserResume from './NavigationUserResume.vue';
import NavigationUserMenuSections from './NavigationUserMenuSections.vue';
import NavigationUserMenuLogout from './NavigationUserMenuLogout.vue';

defineEmits(['close-user-menu']);
</script>
<template>
    <div>
        <div
            @click="$emit('close-user-menu')"
            class="fixed w-full h-full top-0 bottom-0 left-0 rigth-0 bg-slate-900 bg-opacity-15"
        />
        <div
            class="user__menu fixed translate-x-full right-0 top-16 w-72 border-4 border-slate-200 bg-slate-50 dark:bg-slate-900 dark:border-opacity-20 pt-8 pb-4 px-4 pl-8 rounded-l-md z-30 transition-transform"
        >
            <NavigationUserResume />
            <NavigationUserMenuSections />
            <NavigationUserMenuLogout @close-user-menu="$emit('close-user-menu')" />
        </div>
    </div>
</template>

<style scoped>
@keyframes fromTheRight {
    from {
        transform: translate(100%, 0%);
    }
    to {
        transform: translate(0%, 0%);
    }
}
.user__menu {
    animation: fromTheRight 300ms ease forwards;
}
</style>
