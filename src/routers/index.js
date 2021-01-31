import { createWebHistory, createRouter } from "vue-router";
import Login from '../components/Login'
import Logout from '../components/Logout'
import Register from '../components/Register'
import Dashboard from '../components/Dashboard'
import firebase from "firebase/app";

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/logout',
        name: 'Logout',
        component: Logout,
        meta: { requiresAuth: true }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register 
    },
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true }
    }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

/**
 * Prevent user from going to dahsboard page if they're not logged in
 * Prevent user from accessing login or register page if they're logged in
 */
router.beforeEach((to, from, next) => {
    const requireAuth = to.meta.requiresAuth ?? false;
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          if (to.name === 'Login' || to.name === 'Register') next({ name: 'Dashboard' })
          else next()
        } else {
          // No user is signed in.
          if (requireAuth) next({ name: 'Login' })
          else next()
        }
    });
})
export default router