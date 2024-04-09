<script setup>
import ContainerBase from '@/components/Container/ContainerBase.vue';
import ButtonPrimary from '@/components/Button/ButtonPrimary.vue';

import { useUserStore } from '@/stores/useUserStore';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

const { userLogout } = useUserStore();
const { user } = storeToRefs(useUserStore());
const router = useRouter();

async function logout() {
    await userLogout();
    router.push({ name: 'home' });
}
</script>
<template>
    <ContainerBase>
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
            {{ user }}
        </div>
    </ContainerBase>
</template>
