<script setup>
import { RouterLink } from 'vue-router';
import { computed, ref } from 'vue';
import store from '@/stores/userStore';
import ButtonMenu from './ButtonMenu.vue';
import NavigationSectionsMenu from './NavigationSectionsMenu.vue';
import NavbarIcon from '@/components/NavbarIcon.vue';
import NavbarUser from '@/components/NavbarUser.vue';
import NavbarSignUp from '@/components/NavbarSignUp.vue';
import NavigationUserMenu from './NavigationUserMenu.vue';

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
    class="relative w-full h-12 container container:md mx-auto py-3 text-gray-100 font-medium rounded-b-sm"
  >
    <NavigationSectionsMenu v-show="isSectionsMenuOpen" />
    <NavigationUserMenu
      v-show="isUserMenuOpen"
      @close-user-menu="toggleUserMenu"
    />
    <div class="relative flex items-center justify-between">
      <ButtonMenu
        @button-clicked="toggleSectionsMenu($event)"
        class="relative z-40"
      />
      <NavbarIcon />
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
