import axios from '@/composables/useAxios';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        isLogged: false,
        settings: null
    }),
    getters: {},
    actions: {
        async getUser() {
            await axios
                .get('/api/user')
                .then((response) => {
                    this.setUser(response.data);
                })
                .catch((error) => {
                    error.status === 401
                        ? console.log('Not Logged in yet')
                        : console.log('Error: ' + error.message);
                })
                .finally(() => {
                    return this.isLogged ? true : false;
                });
        },
        setUser(data) {
            this.user = data;
            this.isLogged = true;
        },
        async userLogout() {
            axios
                .post('/logout')
                .then(() => {
                    (this.user = null), (this.isLogged = false);
                })
                .catch((error) => {
                    throw new Error(error.message);
                });
        }
    }
});
