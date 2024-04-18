<script setup>
import { ArrowUpIcon } from '@heroicons/vue/24/outline';

import { useUserStore } from '@/stores/useUserStore';
import { ref } from 'vue';

const { uploadAvatar } = useUserStore();
const input = ref();
const emit = defineEmits(['avatar-uploaded']);

const onClick = () => {
    input.value.click();
};

const handleFileChange = async (ev) => {
    let file = ev.target.files[0];

    const formData = new FormData();
    formData.append('avatar', file);

    await uploadAvatar(formData);
    emit('avatar-uploaded');
};
</script>
<template>
    <div>
        <input
            ref="input"
            id="avatar_upload"
            class="text-xs"
            type="file"
            accept="image/*"
            @change="handleFileChange"
            hidden
        />
        <button
            class="bg-rose-900 text-slate-50 w-6 h-6 grid place-items-center rounded-full border-0"
            @click="onClick"
        >
            <ArrowUpIcon class="w-3 h-3" />
        </button>
    </div>
</template>
