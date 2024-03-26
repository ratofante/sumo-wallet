<script setup>
import { ArrowUpOnSquareIcon, ArrowPathIcon } from '@heroicons/vue/16/solid';

import { supabase } from '@/supabase';
import { toRefs, watch, ref } from 'vue';

const props = defineProps(['path']);
const { path, size } = toRefs(props);

const emit = defineEmits(['upload', 'update:patch']);
const uploading = ref(false);
const src = ref('');
const files = ref('');

const downloadImage = async () => {
    try {
        const { data, error } = await supabase.storage.from('avatars').download(path.value);
        if (error) throw error;
        src.value = URL.createObjectURL(data);
    } catch (error) {
        console.error('Error downloading image: ', error.message);
    }
};

const uploadAvatar = async (evt) => {
    files.value = evt.target.files;
    try {
        uploading.value = true;
        if (!files.value || files.value.length === 0) {
            throw new Error('You must select an image to upload.');
        }

        const file = files.value[0];
        const fileExt = file.name.split('.').pop();
        const filePath = `${Math.random()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, file);

        if (uploadError) throw uploadError;
        emit('update:path', filePath);
        emit('upload');
    } catch (error) {
        alert(error.message);
    } finally {
        uploading.value = false;
    }
};

watch(path, () => {
    if (path.value) downloadImage();
});
</script>
<template>
    <div class="relative w-fit">
        <div class="w-32 h-32">
            <img
                v-if="src"
                :src="src"
                alt="Avatar"
                class="w-full"
            />
            <div
                v-else
                class="avatar no-image"
                :style="{ height: size + 'em', width: size + 'em' }"
            />
        </div>

        <div
            class="absolute bottom-4 right-4 w-6 h-6 bg-rose-900 text-slate-50 grid place-items-center rounded-full"
        >
            <label
                class="button primary block"
                for="single"
            >
                <span class="sr-only">{{ uploading ? 'Uploading ...' : 'Upload' }}</span>
                <ArrowUpOnSquareIcon
                    v-if="!uploading"
                    class="w-4 h-4"
                />
                <ArrowPathIcon
                    v-else
                    class="w-4 h4"
                />
            </label>
            <input
                style="visibility: hidden; position: absolute"
                type="file"
                id="single"
                accept="image/*"
                @change="uploadAvatar"
                :disabled="uploading"
            />
        </div>
    </div>
</template>
