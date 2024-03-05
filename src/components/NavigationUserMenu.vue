<script setup>
import LinkSimple from '@/components/LinkSimple.vue';
import { supabase } from '@/supabase';
import { useRouter } from 'vue-router';
import {
  ClipboardDocumentListIcon as DashboardIcon,
  WalletIcon,
  UserCircleIcon,
  PowerIcon
} from '@heroicons/vue/24/outline';

const links = [
  { path: '/', icon: DashboardIcon, label: 'Dashboard' },
  { path: '/', icon: UserCircleIcon, label: 'Profile' },
  { path: '/', icon: WalletIcon, label: 'Wallets' }
];

const emit = defineEmits(['close-user-menu']);

const router = useRouter();

const logout = async () => {
  await supabase.auth.signOut();
  router.push({ name: 'home' });
  emit('close-user-menu');
};
</script>

<template>
  <div>
    <div
      @click="$emit('close-user-menu')"
      class="fixed w-full h-full top-0 bottom-0 left-0 rigth-0 bg-slate-900 bg-opacity-15"
    />
    <div
      class="user__menu fixed translate-x-full right-0 top-16 w-72 bg-slate-900 pt-8 pb-4 px-4 pl-8 rounded-l-md z-30 transition-transform"
    >
      <div class="flex gap-8 justify-between">
        <div class="flex flex-col">
          <span class="font-medium text-lg text-white">Username</span>
          <span class="text-rose-100 text-opacity-80 font text-xs">user@mail.com</span>
        </div>
        <div class="w-16 h-16 rounded-full border-2 border-rose-800 overflow-hidden">
          <img
            class="grayscale"
            src="https://picsum.photos/64/64"
            alt=""
          />
        </div>
      </div>
      <div class="border-t-2 mt-4 py-4 border-rose-600 border-opacity-65">
        <ul class="text-md">
          <li
            v-for="(link, i) in links"
            :key="i"
            class="flex items-center gap-2 py-2"
          >
            <component
              :is="link.icon"
              class="w-4 h-4 opacity-80"
            />
            {{ link.label }}
          </li>
        </ul>
      </div>
      <div class="border-t-2 mt-4 py-4 border-rose-600 border-opacity-65">
        <button
          @click="logout"
          class="flex items-center gap-2 py-2"
        >
          <PowerIcon class="w-4 h-4" />
          Logout
        </button>
      </div>
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
