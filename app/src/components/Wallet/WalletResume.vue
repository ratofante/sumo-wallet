<script setup>
import ExpenseResume from '@/components//Expense/ExpenseResume.vue';
import WalletEdit from '@/components/Wallet/WalletEdit.vue';
import ButtonSingleIcon from '../Button/ButtonSingleIcon.vue';

import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/16/solid';

import { inject, ref } from 'vue';
import { RouterLink } from 'vue-router';
import useFormatCurrency from '@/composables/useFormatCurrency';
import ModalDialog from '../ModalDialog.vue';
import WalletDelete from './WalletDelete.vue';

const props = defineProps({
    wallet: {
        type: Object,
        required: true
    }
});
const walletEdit = ref();
const walletDelete = ref();
const editWalletDialog = ref();
const deleteWalletDialog = ref();
const dayJS = inject('dayJS');
const createdAt = dayJS(props.wallet.created_at);

const sumAllExpenses = () => {
    let sum = 0;
    props.wallet.expenses.forEach((expense) => {
        sum = sum + parseFloat(expense.amount);
    });
    return useFormatCurrency(sum);
};
const onEditOpen = () => {
    editWalletDialog.value.show();
    walletEdit.value.onOpenEditDialog();
};
const onDeleteOpen = () => {
    deleteWalletDialog.value.show();
    walletDelete.value.onOpenDeleteDialog();
};
</script>

<template>
    <article class="bg-slate-50 p-2 mb-4 border-b-2 rounded-md shadow-md">
        <header class="flex justify-between items-center px-2 mb-2">
            <h6 class="text-2xl font-serif">{{ wallet.name }}</h6>
            <div class="text-xs tracking-tighter ml-auto mr-4">
                {{ createdAt.format('DD MMM YYYY') }}
            </div>
            <menu class="flex gap-2">
                <li>
                    <ButtonSingleIcon
                        theme="secondary"
                        @click="onDeleteOpen"
                    >
                        <template v-slot:icon>
                            <TrashIcon class="w-4 h-4" />
                        </template>
                    </ButtonSingleIcon>
                    <ModalDialog ref="deleteWalletDialog">
                        <WalletDelete
                            ref="walletDelete"
                            :wallet-id="wallet.id"
                            @wallet-delete="deleteWalletDialog.close()"
                            @close-dialog="deleteWalletDialog.close()"
                        />
                    </ModalDialog>
                </li>
                <li>
                    <ButtonSingleIcon
                        theme="secondary"
                        @click="onEditOpen"
                    >
                        <template v-slot:icon>
                            <PencilSquareIcon class="w-4 h-4" />
                        </template>
                    </ButtonSingleIcon>
                    <ModalDialog ref="editWalletDialog">
                        <WalletEdit
                            ref="walletEdit"
                            :wallet-id="wallet.id"
                            @wallet-edit="editWalletDialog.close()"
                            @close-dialog="editWalletDialog.close()"
                        />
                    </ModalDialog>
                </li>
            </menu>
        </header>
        <RouterLink :to="`/wallet/${wallet.id}`">
            <div
                v-if="wallet.expenses.length > 0"
                class="bg-rose-200 py-4 px-2 border-b-2 border-rose-300 rounded-sm overflow-hidden"
            >
                <div class="flex justify-between items-center text-sm mb-4">
                    <span class="tracking-tight">{{ wallet.expenses.length }} expenses</span>
                    <span>
                        Total:
                        <span class="text-rose-900 font-semibold tracking-tighter">
                            {{ sumAllExpenses() }}
                        </span>
                    </span>
                </div>
                <div class="pointer-events-none">
                    <span class="text-sm text-rose-900 font-medium">Last added:</span>
                    <ExpenseResume
                        v-if="wallet.expenses[0]"
                        :expense="wallet.expenses[0]"
                        :wallet-id="wallet.id"
                    />
                </div>
            </div>
            <div
                v-else
                class="px-2 text-sm text-rose-950 font-medium"
            >
                There's no expenses yet
            </div>
        </RouterLink>
    </article>
</template>
