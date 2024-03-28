<script setup>
import ButtonPrimary from '@/components/Button/ButtonPrimary.vue';
import axios from '@/composables/useAxios';
import { ref } from 'vue';

const user = ref();

async function getUser() {
    const { data } = await axios.get('/api/user');

    if (data) {
        user.value = data;
    }
}

async function logout() {
    await axios.post('/logout');
    user.value = null;
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
        <ButtonPrimary
            size="small"
            @click="getUser"
        >
            Get User
        </ButtonPrimary>
    </div>

    <div>
        {{ user }}
    </div>
</template>
