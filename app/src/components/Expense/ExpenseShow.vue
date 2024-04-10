<script setup>
import ExpenseEdit from '@/components/Expense/ExpenseEdit.vue';
import ExpenseDelete from '@/components/Expense/ExpenseDelete.vue';
import ExpenseDetail from '@/components/Expense/ExpenseDetail.vue';
import ButtonSingleIcon from '@/components/Button/ButtonSingleIcon.vue';
import ModalDialog from '@/components/ModalDialog.vue';

import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/16/solid';

import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const props = defineProps({
    expense: {
        type: Object,
        required: true
    }
});

console.log(props.expense);

const editDialog = ref(null);
const deleteDialog = ref(null);
const router = useRouter();
const route = useRoute();
const goBackToWalletUrl = `/wallet/${route.params.walletId}`;

console.log(route.params.walletId);

const onExpenseEdited = () => {
    editDialog.value.close();
    router.push(goBackToWalletUrl);
};

const onExpenseDeleted = () => {
    deleteDialog.value.close();
    router.push(goBackToWalletUrl);
};
</script>

<template>
    <article class="w-full">
        <header class="flex justify-between items-end">
            <h2
                class="capitalize font-medium text-lg tracking-tight leading-none dark:text-slate-200"
            >
                {{ expense.name }}
            </h2>
            <menu class="flex gap-2">
                <li>
                    <ButtonSingleIcon @click="deleteDialog.show()">
                        <template v-slot:icon>
                            <TrashIcon class="w-4 h-4 text-slate-50" />
                        </template>
                    </ButtonSingleIcon>
                    <ModalDialog ref="deleteDialog">
                        <ExpenseDelete
                            :id="expense.id"
                            @expense-deleted="onExpenseDeleted"
                            @close-dialog="deleteDialog.close()"
                        />
                    </ModalDialog>
                </li>
                <li>
                    <ButtonSingleIcon
                        @click="editDialog.show()"
                        theme="secondary"
                    >
                        <template v-slot:icon>
                            <PencilSquareIcon class="w-4 h-4 text-slate-50" />
                        </template>
                    </ButtonSingleIcon>
                    <ModalDialog ref="editDialog">
                        <ExpenseEdit
                            :expense="expense"
                            @expense-edited="onExpenseEdited"
                            @close-dialog="editDialog.close()"
                        />
                    </ModalDialog>
                </li>
            </menu>
        </header>
        <ExpenseDetail
            :amount="expense.amount"
            :note="expense.note"
            :created-at="expense.created_at"
            :updated-at="expense.updated_at"
        />
    </article>
</template>
