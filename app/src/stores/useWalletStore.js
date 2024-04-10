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
        }
    }
});
