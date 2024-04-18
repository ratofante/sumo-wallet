<script setup>
import ContainerBase from '@/components/Container/ContainerBase.vue';
import CardContainer from '@/components/Card/CardContainer.vue';
import ChartTwoMonths from '@/components/Chart/ChartTwoMonths.vue';

import { useUserStore } from '@/stores/useUserStore';
import { storeToRefs } from 'pinia';
import useDayJS from '@/composables/useDayJS';
import { useWalletStore } from '@/stores/useWalletStore';
import { computed } from 'vue';

const { user } = storeToRefs(useUserStore());
const { wallets } = storeToRefs(useWalletStore());
const emptyWallets = computed(() => {
    return wallets.value && wallets.value[0]?.expenses ? false : true;
});
</script>
<template>
    <ContainerBase>
        <div class="">
            <h2 class="title-lg">Dashboard</h2>
            <p class="text-slate-900 dark:text-slate-50">
                Welcome
                <span class="capitalize font-semibold text-rose-800 dark:text-rose-400">
                    {{ user?.name }}
                </span>
                !
            </p>
        </div>
        <CardContainer
            v-if="!emptyWallets"
            classes="mt-8"
            title="Your resume"
            :date="useDayJS(new Date(), 'dddd D MMMM')"
        >
            <template v-slot:body>
                <ChartTwoMonths />
            </template>
        </CardContainer>
    </ContainerBase>
</template>
