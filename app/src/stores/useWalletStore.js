import axios from '@/composables/useAxios';
import { defineStore } from 'pinia';

export const useWalletStore = defineStore('wallet', {
    state: () => ({
        wallets: [],
        activeWallet: null
    }),
    getters: {
        getExpenseById: (state) => {
            return (id) =>
                [...state.activeWallet.expenses].find((expense) => expense.id === parseInt(id));
        },
        getWalletById: (state) => {
            return (id) => [...state.wallets].find((wallet) => wallet.id === parseInt(id));
        },
        getWalletsByMostRecent() {
            return [...this.wallets].sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );
        },
        getWalletsByOldest() {
            return [...this.wallets].sort(
                (a, b) => new Date(a.created_at) - new Date(b.created_at)
            );
        }
    },
    actions: {
        async getWallets() {
            axios
                .get(`/api/wallet`)
                .then((response) => {
                    this.wallets = response.data.data;
                })
                .catch((error) => {
                    throw new Error(error.message);
                });
        },
        setWallets(resource) {
            if (this.wallets.length !== 0) this.emptyWallets();
            resource.data.forEach((wallet) => {
                this.wallets.push(wallet);
            });
        },
        emptyWallets() {
            this.wallets = [];
        },
        setActiveWallet(id) {
            const activeWallet = (id) =>
                [...this.wallets].find((wallet) => wallet.id === parseInt(id));
            this.activeWallet = activeWallet(id);
            console.log(this.activeWallet);
        },
        async createWallet(form) {
            axios
                .post('/api/wallet', {
                    name: form.name,
                    user_id: form.user_id
                })
                .then((response) => {
                    this.wallets.push(response.data.data);
                })
                .catch((error) => {
                    throw new Error(error.message);
                });
        },
        async editWallet(form) {
            axios
                .patch(`/api/wallet/${form.wallet_id}`, {
                    name: form.name,
                    user_id: form.user_id
                })
                .then((response) => {
                    let updated = response.data.data;
                    let index = this.wallets.findIndex((wallet) => wallet.id === updated.id);
                    if (index !== -1) {
                        this.wallets[index].name = updated.name;
                    }
                });
        },
        async deleteWallet(id) {
            await axios
                .delete(`/api/wallet/${id}`)
                .then(() => {
                    let index = this.wallets.findIndex((wallet) => wallet.id === id);
                    if (index !== -1) {
                        this.wallets.splice(index, 1);
                    }
                })
                .catch((error) => {
                    throw new Error('Error: ' + error.message);
                });
        },
        async createExpense(form) {
            await axios
                .post('/api/expense', {
                    name: form.name,
                    amount: form.amount,
                    note: form?.note,
                    wallet_id: form.wallet_id
                })
                .then((response) => {
                    const expense = response.data.data;
                    this.activeWallet.expenses.push(expense);
                })
                .catch((error) => {
                    throw new Error('Error: ' + error.message);
                });
        },
        async editExpense(form) {
            await axios
                .patch(`/api/expense/${form.expenseId}`, {
                    name: form.name,
                    amount: form.amount,
                    note: form.note
                })
                .then((response) => {
                    const updatedExpense = response.data.data;
                    let index = this.activeWallet.expenses.findIndex(
                        (expense) => expense.id === updatedExpense.id
                    );
                    if (index !== -1) {
                        this.activeWallet.expenses[index] = updatedExpense;
                    }
                })
                .catch((error) => {
                    throw new Error('Error: ' + error.message);
                });
        },
        async deleteExpense(id) {
            await axios
                .delete(`/api/expense/${id}`)
                .then(() => {
                    let index = this.activeWallet.expenses.findIndex(
                        (expense) => expense.id === id
                    );
                    if (index !== -1) {
                        this.activeWallet.expenses.splice(index, 1);
                    }
                })
                .catch((error) => {
                    throw new Error('Error: ' + error.message);
                });
        }
    }
});
