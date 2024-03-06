<script setup>
import { RouterLink } from 'vue-router';
import { computed, ref } from 'vue';
import store from '@/stores/userStore';
import ButtonMenu from './ButtonMenu.vue';
import NavigationSectionsMenu from './NavigationSectionsMenu.vue';
import ButtonTheme from '@/components/ButtonTheme.vue';
import NavbarIcon from '@/components/NavbarIcon.vue';
import NavbarUser from '@/components/NavbarUser.vue';
import NavbarSignUp from '@/components/NavbarSignUp.vue';
import NavigationUserMenu from './NavigationUserMenu.vue';
import NavbarLogo from '@/components/NavbarLogo.vue';

const user = computed(() => store.state.user);

const isSectionsMenuOpen = ref(false);
const isUserMenuOpen = ref(false);

function toggleSectionsMenu(e) {
  isSectionsMenuOpen.value = e ? true : false;
}

function toggleUserMenu() {
  isUserMenuOpen.value = !isUserMenuOpen.value;
}
</script>
<template>
  <nav
    class="relative w-full h-12 flex container container:md mx-auto text-gray-100 font-medium border-b-2 rounded-b-sm dark:bg-slate-900 dark:border-opacity-20 dark:border-slate-200 transition-colors"
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
