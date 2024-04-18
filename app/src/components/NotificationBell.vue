<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { BellIcon } from '@heroicons/vue/24/outline';
import ButtonDropdown from '@/components/Button/ButtonDropdown.vue';
import LinkSimple from '@/components/Link/LinkSimple.vue';

const dropdown = ref();
const notifications = ref([
    {
        message: "Welcome to Sumo's Wallet",
        unread: false
    },
    {
        message: 'Guide for new users',
        unread: true
    },
    {
        message: 'This is a notification with a very large text',
        unread: true
    }
]);

const createNotification = (opts) => {
    notifications.value.push(opts);
};

const checkProfile = () => {
    if (profileNeedsUpdate()) {
        createNotification({
            message: 'Complete your profile'
        });
    }
};

// /***
//  * Checks for profile and missings fields
//  * @returns {boolean}
//  */
// const profileNeedsUpdate = () => {
//     return (
//         store.state.profile &&
//         (!store.state.profile.username ||
//             !store.state.profile.full_name ||
//             !store.state.profile.avatar_url)
//     );
// };

const closeDropdown = () => {
    dropdown.value.toggleDropdown();
};

onMounted(() => {
    window.addEventListener('new-profile', checkProfile);
});

onUnmounted(() => {
    window.removeEventListener('new-profile', checkProfile);
});
</script>

<template>
    <ButtonDropdown
        side="right"
        ref="dropdown"
    >
        <template v-slot:trigger>
            <button class="relative w-6 h-6 text-slate-800 dark:text-slate-200 transition-colors">
                <BellIcon />

                <div
                    v-if="notifications.length > 0"
                    class="absolute bottom-0 left-0 text-[8px] bg-red-800 w-3 h-3 text-slate-50 rounded-full"
                >
                    {{ notifications.length }}
                </div>
            </button>
        </template>
        <template v-slot:content>
            <ul>
                <li
                    v-for="(notification, i) in notifications"
                    :key="i"
                    class="my-1 p-2 bg-slate-900 rounded-sm hover:bg-opacity-80 transition-colors"
                    :class="{ 'bg-slate-700': notification.unread }"
                >
                    <LinkSimple
                        path="/notifications"
                        @click="closeDropdown"
                    >
                        <span class="font-normal text-xs line-clamp-1">
                            {{ notification.message }}
                        </span>
                    </LinkSimple>
                </li>
            </ul>
        </template>
    </ButtonDropdown>
</template>
