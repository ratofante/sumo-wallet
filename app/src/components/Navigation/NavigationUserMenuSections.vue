<script setup>
import LinkSimple from '../Link/LinkSimple.vue';

import {
    ClipboardDocumentListIcon as DashboardIcon,
    WalletIcon,
    UserCircleIcon
} from '@heroicons/vue/24/outline';

const links = [
    { path: '/dashboard', icon: DashboardIcon, label: 'Dashboard' },
    { path: '/profile', icon: UserCircleIcon, label: 'Profile' },
    { path: '/wallets', icon: WalletIcon, label: 'Wallets' }
];
</script>
<template>
    <div class="border-t-2 mt-4 py-4 border-rose-400 border-opacity-65">
        <ul class="text-md">
            <li
                v-for="(link, i) in links"
                :key="i"
            >
                <LinkSimple
                    :path="link.path"
                    @click="$emit('close-user-menu')"
                    class="flex items-center gap-2 py-2 dark:text-slate-200"
                >
                    <component
                        :is="link.icon"
                        class="w-4 h-4 opacity-80"
                    />
                    {{ link.label }}
                </LinkSimple>
            </li>
        </ul>
    </div>
</template>
