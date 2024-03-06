<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { BellIcon } from '@heroicons/vue/24/outline';
import store from '@/stores/userStore.js';
import ButtonDropdown from '@/components/ButtonDropdown.vue';

const notifications = ref([]);

const createAlarm = (opts) => {
  notifications.value.push(opts);
  console.log(notifications.value);
};
const checkProfile = () => {
  if (profileNeedsUpdate()) {
    createAlarm({ message: 'Complete your profile' });
  }
};
/***
 * Checks for profile and missings fields
 * @returns {boolean}
 */
const profileNeedsUpdate = () => {
  if (store.state.profile) {
    console.log(true);
  } else {
    console.log(false);
    console.log(store.state.profile);
  }

  return (
    store.state.profile &&
    (!store.state.profile.username ||
      !store.state.profile.full_name ||
      !store.state.profile.avatar_url)
  );
};
onMounted(() => {
  window.addEventListener('new-profile', checkProfile);
});
onUnmounted(() => {
  window.removeEventListener('new-profile', checkProfile);
});
</script>

<template>
  <ButtonDropdown>
    <template v-slot:trigger>
      <button class="relative w-6 h-6 text-slate-800 dark:text-slate-200 transition-colors">
        <BellIcon />

        <div
          v-if="notifications.length > 0"
          class="absolute bottom-0 left-0 text-[8px] bg-red-800 w-3 h-3 text-white rounded-full"
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
        >
          {{ notification.message }}
        </li>
      </ul>
    </template>
  </ButtonDropdown>
</template>
