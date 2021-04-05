<template>
    <h1 class="title">Login</h1>
    <form @submit.prevent="login" method="post">
        <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left">
                <input class="input" type="email" v-model="email" placeholder="Email input">
                <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                </span>
            </div>
        </div>
        <div class="field">
            <label class="label">Password</label>
            <div class="control has-icons-left">
                <input class="input" type="password" v-model="password" placeholder="Password">
                <span class="icon is-small is-left">
                    <i class="fas fa-key"></i>
                </span>
            </div>
        </div>
        <button ref="submitBtn" type="submit" class="button is-primary">Login</button>
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
                const submitBtn = this.$refs.submitBtn;
                submitBtn.classList.add('is-loading');
                this.$firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                    .then(() => {
                        submitBtn.classList.remove('is-loading');
                        this.$router.replace({ name: "Home" });
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
