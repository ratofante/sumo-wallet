<script setup>
import AvatarForm from '@/components/AvatarForm.vue';
import ButtonSecondary from '@/components/Button/ButtonSecondary.vue';
import ButtonPrimary from '@/components/Button/ButtonPrimary.vue';
import FormInputText from '@/components/Form/FormInputText.vue';
import FormErrorMsg from '@/components/Form/FormErrorMsg.vue';

import { PencilSquareIcon, UserIcon, UserCircleIcon, XMarkIcon } from '@heroicons/vue/16/solid';

import { onMounted, ref, reactive } from 'vue';
import { supabase } from '../supabase';
import store from '@/stores/userStore';
import useDayJS from '@/composables/useDayJS';

const loading = ref(true);
const editing = ref(false);

const form = reactive({
    username: '',
    avatar_url: '',
    fullname: store.state.profile?.full_name ?? '',
    errorMsg: null
});

async function getProfile() {
    try {
        loading.value = true;

        const { data, error, status } = await supabase
            .from('profiles')
            .select(`username, avatar_url, full_name`)
            .eq('id', store.state.user.id)
            .single();

        if (error && status !== 406) throw error;

        if (data) {
            form.username = data.username;
            form.avatar_url = data.avatar_url;
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
    } finally {
        loading.value = false;
    }
}

async function updateProfile() {
    try {
        loading.value = true;

        const updates = {
            id: store.state.user.id,
            username: form.username,
            full_name: form.fullname,
            avatar_url: form.avatar_url,
            updated_at: new Date()
        };

        const { error } = await supabase.from('profiles').upsert(updates);

        if (error) throw error;
    } catch (error) {
        console.log(`Error: ${error.message}`);
    } finally {
        loading.value = false;
    }
}

const editProfile = () => {
    editing.value = !editing.value;
};

onMounted(() => {
    getProfile();
});
</script>

<template>
    <!-- Header -->
    <div class="flex justify-between mb-4">
        <h2 class="title-lg mb-0">Profile</h2>
        <ButtonSecondary @click="editProfile">
            <template #icon>
                <PencilSquareIcon
                    v-if="!editing"
                    class="w-4 h-4"
                />
                <XMarkIcon
                    v-else
                    class="w-4 h-4"
                />
            </template>
            <template #label>Edit</template>
        </ButtonSecondary>
    </div>
    <!-- Profile View -->
    <div class="flex items-center">
        <AvatarForm
            v-model:path="form.avatar_url"
            @upload="updateProfile"
        />
        <div class="">
            <span class="block mb-2 text-[10px] text-slate-800 dark:text-slate-400">
                Since {{ useDayJS(store.state.user.created_at, 'D MMM YYYY') }}
            </span>
            <span
                v-if="store.state.profile"
                class="block text-lg font-medium text-slate-950 dark:text-slate-50"
            >
                {{ store.state.profile.username }}
            </span>
            <span class="block text-xs text-rose-800 font-medium">
                {{ store.state.user.email }}
            </span>
        </div>
    </div>
    <!-- Profile Form -->
    <form
        class="form-widget"
        @submit.prevent="updateProfile"
    >
        <FormInputText
            name="username"
            :placeholder="store.state.profile?.username ?? 'Username'"
            v-model="form.username"
            :disabled="!editing"
        >
            Username
            <template #icon><UserCircleIcon class="w-4 h-4 dark:text-slate-50" /></template>
        </FormInputText>
        <FormInputText
            name="fullname"
            :placeholder="store.state.profile?.full_name ?? 'Sumo Catblacks'"
            v-model="form.fullname"
            :disabled="!editing"
        >
            Fullname
            <template #icon><UserIcon class="w-4 h-4 dark:text-slate-50" /></template>
        </FormInputText>

        <FormErrorMsg :message="form.errorMsg" />

        <Transition
            enter-active-class="ease-out duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="ease-in duration-200"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <ButtonPrimary
                v-show="editing"
                type="submit"
                size="small"
                :disabled="loading || !editing"
            >
                {{ loading ? 'Loading ...' : 'Update' }}
            </ButtonPrimary>
        </Transition>
    </form>
</template>
