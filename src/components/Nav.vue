<template>
    <nav class="navbar is-light is-fixed-top" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a href="/" class="navbar-item logo">
                <img src="favicon/favicon-32x32.png" >  &nbsp;
                <strong class="has-text-white logo-text">Truck Manifest</strong>
            </a>

            <a role="button" class="navbar-burger" :class="{'is-active': toggleNav}" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" @click="toggleNav = !toggleNav">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu " :class="{'is-active': toggleNav}">
            <div class="navbar-start">
                <router-link to="/" class="navbar-item is-tab" :class="user ? 'is-active': ''">Home</router-link>
            </div>

            <div class="navbar-end">
                <div class="navbar-item">
                    <small v-if="user" class="tag is-link is-light mb-md-2">{{user.displayName}}</small>
                    <div v-if="user" class="buttons">
                        <button class="button is-light" @click="logout">Logout</button>
                    </div>
                    <div v-else class="buttons">
                        <router-link to="/register" class="button is-primary">Register</router-link>
                        <router-link to="/login" class="button is-light">Login</router-link>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
<script>
    import CheckLogin from './../mixin/CheckLogin';

    export default {
        mixins: [CheckLogin],
        data(){
            return {
                toggleNav: false
            }
        },
        methods: {
            logout() {
                this.$firebase.auth().signOut().then(() => {
                    // Sign-out successful.
                    console.log("success");
                    this.$router.replace({ name: "Login" });
                }).catch((error) => {
                    // An error happened.
                    console.log(error);
                });
            }
        },
    }
</script>
<style lang="">

</style>
