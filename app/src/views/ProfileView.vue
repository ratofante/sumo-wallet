<script setup>
import ContainerBase from '@/components/Container/ContainerBase.vue';
import AvatarImage from '@/components/AvatarImage.vue';
import AvatarForm from '@/components/AvatarForm.vue';
import RegisterForm from '@/components/RegisterForm.vue';
import ButtonSecondary from '@/components/Button/ButtonSecondary.vue';

import { PencilSquareIcon, XMarkIcon } from '@heroicons/vue/24/outline';

import useDayJS from '@/composables/useDayJS';
import { useUserStore } from '@/stores/useUserStore';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

const { user } = storeToRefs(useUserStore());
const form = ref();
const editing = ref(false);
const toggleEditing = () => {
    editing.value = !editing.value;
    form.value.toggleEditing();
};

onMounted(() => {
    form.value.toggleEditing();
});
</script>

<template>
    <ContainerBase>
        <div class="bg-slate-50 dark:bg-slate-800 transition-colors">
            <div class="mb-4 w-full">
                <div class="flex justify-between">
                    <h2 class="title-lg">Profile</h2>
                    <ButtonSecondary
                        class="h-fit w-fit ml-auto"
                        @click="toggleEditing"
                    >
                        <template v-slot:icon>
                            <PencilSquareIcon
                                v-if="!editing"
                                class="w-4"
                            />
                            <XMarkIcon
                                v-else
                                class="w-4"
                            />
                        </template>
                    </ButtonSecondary>
                </div>
                <div class="flex items-center gap-8">
                    <div class="relative w-24">
                        <div class="rounded-full overflow-hidden">
                            <AvatarImage />
                        </div>

                        <div class="absolute right-0 bottom-0">
                            <AvatarForm
                                v-if="editing"
                                @avatar-uploaded="toggleEditing"
                            />
                        </div>
                    </div>
                    <div>
                        <span class="block text-xs text-rose-800 font-medium dark:text-rose-300">
                            Since
                            {{ user?.created_at ? useDayJS(user.created_at, 'D MMM YYYY') : '' }}
                        </span>
                        <span
                            class="block mt-2 text-3xl capitalize text-slate-950 font-semibold dark:text-slate-100"
                        >
                            {{ user?.name }}
                        </span>
                        <span class="block text-sm dark:text-slate-400">{{ user?.email }}</span>
                    </div>
                </div>
            </div>
            <RegisterForm ref="form" />
        </div>
    </ContainerBase>
</template>
