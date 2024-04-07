import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        test: 'Pinia Colada',
        user: null,
        isLogged: false,
        settings: null
    }),
    getters: {},
    actions: {
        setUser(data) {
            this.user = data;
            this.isLogged = true;
        },
        userLogout() {
            this.user = null;
            this.isLogged = false;
        }
    }
});
