<template>
    <nav class="navbar is-light" role="navigation" aria-label="main navigation">
        <div class="container">
            <div class="navbar-brand">
                <a href="/" class="navbar-item">
                    <strong class="has-text-white">Truck Manifest</strong>
                </a>

                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" @click="toggleNav = !toggleNav">
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
        </div>
    </nav>
</template>
<script>
    export default {
        data(){
            return {
                user: null,
                toggleNav: false
            }
        },
        watch:{
            async $route (to, from){
                console.log(to.name, from.name);
                this.user = await this.getCurrentUser();
            }
        },
        async mounted(){
            this.user = await this.getCurrentUser();
        },
        methods: {
            /**
             * Get current logged in user
             */
            getCurrentUser(){
                return new Promise((resolve, reject) => {
                    const unsubscribe = this.$firebase.auth().onAuthStateChanged(user => {
                        unsubscribe();
                        resolve(user);
                    }, reject);
                });
            },

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
