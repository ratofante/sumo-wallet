<script setup>
import ButtonPrimary from '@/components/Button/ButtonPrimary.vue';
import axios from '@/composables/useAxios';
import { useUserStore } from '@/stores/useUserStore';
import { useRouter } from 'vue-router';

const store = useUserStore();
const router = useRouter();

function logout() {
    axios
        .post('/logout')
        .then(() => {
            store.userLogout();
            router.push({ name: 'home' });
        })
        .catch((e) => {
            console.log(e);
        });
}
</script>

<template>
    <div>
        <h2 class="title-lg">Dashboard</h2>
    </div>
    <div class="flex flex-col gap-4">
        <ButtonPrimary
            size="small"
            @click="logout"
        >
            Logout
        </ButtonPrimary>
    </div>

    <div>
        {{ store.user }}
    </div>
</template>
