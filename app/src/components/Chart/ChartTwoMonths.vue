<script setup>
import useFormatCurrency from '@/composables/useFormatCurrency';
import { useWalletStore } from '@/stores/useWalletStore';
import { storeToRefs } from 'pinia';
import { computed, onMounted } from 'vue';

const { wallets, getMonthlyExpended, getLastMonthExpended, getNumberOfTotalExpenses } =
    storeToRefs(useWalletStore());
const roof = computed(() => {
    const highestFloat = Math.max(getMonthlyExpended.value, getLastMonthExpended.value);
    const orderOfMagnitude = Math.pow(10, Math.floor(Math.log10(highestFloat)));
    const roundedUpFloat = Math.ceil(highestFloat / orderOfMagnitude) * orderOfMagnitude;
    return roundedUpFloat;
});
const currentMonthPercentage = computed(() => {
    return `${parseInt(getMonthlyExpended.value * 100) / roof.value}%`;
});
const lastMonthPercentage = computed(() => {
    return `${(parseInt(getLastMonthExpended.value) * 100) / roof.value}%`;
});

onMounted(() => {
    console.log(wallets.value, wallets.value[0]?.expenses);
});
</script>
<template>
    <div class="flex">
        <div
            class="relative flex gap-4 min-h-24 border-l-2 border-b-2 border-rose-900 border-opacity-50 px-4 mr-4"
        >
            <div class="absolute top-0 left-[-2px] flex items-center -translate-y-1/2 text-[8px]">
                <div class="w-2 h-[2px] bg-rose-900 bg-opacity-50"></div>
                {{ useFormatCurrency(roof) }}
            </div>
            <div class="h-full flex items-end">
                <div
                    class="bg-slate-900 w-8 rounded-t-sm"
                    :style="`height: ${lastMonthPercentage}`"
                ></div>
            </div>
            <div class="h-full flex items-end">
                <div
                    class="bg-rose-900 w-8 rounded-t-sm"
                    :style="`height: ${currentMonthPercentage}`"
                ></div>
            </div>
        </div>

        <div class="flex flex-col gap-4 justify-between">
            <div>
                <div class="text-rose-900 font-semibold">
                    This month:
                    <span>{{ useFormatCurrency(getMonthlyExpended) }}</span>
                </div>
                <div class="text-xs text-slate-950 font-semibold">
                    Last month:
                    <span>{{ useFormatCurrency(getLastMonthExpended) }}</span>
                </div>
            </div>
            <div>
                <div class="text-xs tracking-tighter text-slate-800 font-medium">
                    From {{ wallets.length }} wallets and {{ getNumberOfTotalExpenses }} expenses
                </div>
            </div>
        </div>
    </div>
</template>
