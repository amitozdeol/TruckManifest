import { createWebHistory, createRouter } from "vue-router";
import Login from '../components/Login'
import Register from '../components/Register'
import Home from '../components/Home'
import firebase from "firebase/app";

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register 
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true }
    }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

/**
 * Get current logged in user
 */
firebase.getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        unsubscribe();
        resolve(user);
      }, reject);
    }
)}; 

/**
 * Prevent user from going to home page if they're not logged in
 * Prevent user from accessing login or register page if they're logged in
 */
router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const user = await firebase.getCurrentUser();
    if(user){
        if (to.name === 'Login' || to.name === 'Register') next({ name: 'Home' });
        else next();
    }else{
        if (requiresAuth) next('Login');
        else next();
    }
})
export default router