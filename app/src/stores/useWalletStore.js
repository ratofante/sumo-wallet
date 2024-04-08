import { defineStore } from 'pinia';

export const useWalletStore = defineStore('wallet', {
    state: () => ({
        wallets: []
    }),
    getters: {},
    actions: {
        setWallets(resource) {
            console.log(this.wallets.length);
            if (this.wallets.length !== 0) this.emptyWallets();
            resource.data.forEach((wallet) => {
                this.wallets.push(wallet);
            });
            console.log(this.wallets);
        }
    },
    emptyWallets() {
        this.wallets = [];
    }
});
