import { defineStore } from 'pinia';

/**
 * Pinia store for managing wallet data.
 */
export const useWalletStore = defineStore('wallet', {
    state: () => ({
        /**
         * Array containing wallet data.
         * @type {Array<Object>}
         */
        wallets: []
    }),
    getters: {
        /**
         * Get wallets sorted by most recent.
         * @returns {Array<Object>} Array of wallets sorted by most recent.
         */
        getWalletsByMostRecent() {
            return [...this.wallets].sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );
        },
        /**
         * Get wallets sorted by oldest.
         * @returns {Array<Object>} Array of wallets sorted by oldest.
         */
        getWalletsByOldest() {
            return [...this.wallets].sort(
                (a, b) => new Date(a.created_at) - new Date(b.created_at)
            );
        }
    },
    actions: {
        /**
         * Set wallets data.
         * @param {Object} resource - Resource containing wallet data.
         */
        setWallets(resource) {
            if (this.wallets.length !== 0) this.emptyWallets();
            resource.data.forEach((wallet) => {
                this.wallets.push(wallet);
            });
        },
        /**
         * Empty wallets array.
         */
        emptyWallets() {
            this.wallets = [];
        }
    }
});
