<template>
    <h1>Login</h1>
    <form @submit.prevent="login" method="post">

        <input type="email" name="email" v-model="email">
        <input type="password" name="password" v-model="password">
        <button type="submit">Login</button>
    </form>
</template>

<script>
    import "firebase/auth";
    export default {
        name: 'Login',
        data() {
            return {
                email: '',
                password: ''
            }
        },
        methods:{
            login() {
                this.$firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                    .then(data => {
                        console.log(data);
                        this.$router.replace({ name: "Dashboard" });
                    })
                    .catch(err => {
                        this.error = err.message;
                    });
            }
        }
    }
</script>

<style>

</style>