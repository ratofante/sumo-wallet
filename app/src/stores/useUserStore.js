import axios from '@/composables/useAxios';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        avatarUrl: null,
        isLogged: false,
        settings: null
    }),
    getters: {},
    actions: {
        async getUser() {
            try {
                const response = await axios.get('/api/user');
                this.setUser(response.data);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.log('Not Logged in yet');
                } else {
                    console.error('Error: ' + error.message);
                }
            }
        },
        setUser(data) {
            this.user = data;
            this.isLogged = true;
        },
        async userRegister(form) {
            try {
                let { error } = await axios.post('/register', {
                    name: form.name,
                    email: form.email,
                    password: form.password,
                    password_confirmation: form.password_confirmation
                });

                if (!error) {
                    await this.getUser();
                    return true;
                }
                return false;
            } catch (error) {
                throw new Error(error.message);
            }
        },
        async userLogin(form) {
            try {
                const response = await axios.post('/login', {
                    email: form.email,
                    password: form.password
                });
                if (response.status === 200) {
                    await this.getUser();
                    return true;
                }
                return false;
            } catch {
                (error) => {
                    throw new Error(error.message);
                };
            }
        },
        async userLogout() {
            try {
                await axios.post('/logout');
                this.user = null;
                this.isLogged = false;
                this.avatarUrl = null;
            } catch (error) {
                throw new Error(error.message);
            }
        },
        async uploadAvatar(formData) {
            try {
                const response = await axios.post('/api/upload-avatar', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                this.avatarUrl = 'http://localhost:8000' + response.data.url;
            } catch (error) {
                throw new Error(error.message);
            }
        },
        async getAvatar() {
            try {
                const response = await axios.get('/api/get-avatar');
                if (response.data?.url) {
                    console.log(response, response.data.url);
                    this.avatarUrl = 'http://localhost:8000' + response.data.url;
                }
            } catch (error) {
                throw new Error(error.message);
            }
        }
    }
});
