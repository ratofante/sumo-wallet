import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RegisterView from '@/views/RegisterView.vue';
import LoginView from '@/views/LoginView.vue';
import ForgotPasswordView from '@/views/ForgotPasswordView.vue';
import UpdatePasswordView from '@/views/UpdatePasswordView.vue';
import DashboardView from '@/views/DashboardView.vue';
import ProfileView from '@/views/ProfileView.vue';
import NotificationsView from '@/views/NotificationsView.vue';
import ExpenseShowView from '@/views/ExpenseShowView.vue';
import WalletsView from '@/views/WalletsView.vue';
import WalletShowView from '@/views/WalletShowView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/reset-password',
            name: 'reset-password',
            component: ForgotPasswordView
        },
        {
            path: '/update-password',
            name: 'update-password',
            component: UpdatePasswordView
        },
        {
            path: '/notifications',
            name: 'notifications',
            component: NotificationsView
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: DashboardView
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfileView
        },
        {
            path: '/wallets',
            name: 'wallets',
            component: WalletsView
        },
        {
            path: '/wallet/:id',
            component: WalletShowView
        },
        {
            path: '/wallet/:walletId/expense/:id',
            component: ExpenseShowView
        }
    ]
});

export default router;
