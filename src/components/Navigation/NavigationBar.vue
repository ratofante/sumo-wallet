<script setup>
import NavigationSectionsMenu from '@/components/Navigation/NavigationSectionsMenu.vue';
import NavigationUserMenu from '@/components/Navigation/NavigationUserMenu.vue';

import NavbarLogo from '@/components/Navbar/NavbarLogo.vue';
import NavbarUser from '@/components/Navbar/NavbarUser.vue';
import NavbarSignUp from '@/components/Navbar/NavbarSignUp.vue';

import ButtonTheme from '@/components/Button/ButtonTheme.vue';
import ButtonMenu from '@/components/Button/ButtonMenu.vue';

import { RouterLink } from 'vue-router';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import store from '@/stores/userStore';

const user = computed(() => store.state.user);

const isSectionsMenuOpen = ref(false);
function toggleSectionsMenu(e) {
  isSectionsMenuOpen.value = e ? true : false;
}

const isUserMenuOpen = ref(false);
function toggleUserMenu() {
  isUserMenuOpen.value = !isUserMenuOpen.value;
}

function refresh() {
  console.log(user);
}

onMounted(() => {
  window.addEventListener('signed-out', refresh);
});

onUnmounted(() => {
  window.removeEventListener('signed-out', refresh);
});
</script>
<template>
  <nav
    class="relative w-full h-12 flex container container:md mx-auto font-medium border-b-2 rounded-b-sm bg-slate-50 dark:bg-slate-900 dark:border-opacity-20 dark:border-slate-200 transition-colors"
  >
    <NavigationSectionsMenu v-show="isSectionsMenuOpen" />
    <NavigationUserMenu
      v-show="isUserMenuOpen"
      @close-user-menu="toggleUserMenu"
    />
    <div class="relative w-full flex items-center justify-between">
      <ButtonMenu
        @button-clicked="toggleSectionsMenu($event)"
        class="relative z-40"
      />
      <div class="mr-auto ml-4">
        <ButtonTheme />
      </div>

      <NavbarLogo />
      <!-- <NavbarIcon /> -->
      <ul class="hidden md:flex gap-4">
        <li><RouterLink to="/">Home</RouterLink></li>
        <li>Logout</li>
      </ul>
      <NavbarUser
        v-if="user"
        @avatar-clicked="toggleUserMenu"
      />
      <NavbarSignUp v-else />
    </div>
  </nav>
</template>
