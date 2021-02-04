<template>
    <h1 class="title">Sign Up</h1>
    <form @submit.prevent="Register" method="post">
        <div class="columns is-desktop">
            <div class="column field">
                <label class="label">First Name</label>
                <div class="control">
                    <input class="input" type="text" v-model="firstname">
                </div>
            </div>
            <div class="column field">
                <label class="label">Last Name</label>
                <div class="control">
                    <input class="input" type="text" v-model="lastname">
                </div>
            </div>
        </div>
        <div class="columns is-desktop">
            <div class="column field">
                <label class="label">Email</label>
                <div class="control has-icons-left">
                    <input class="input" type="email" v-model="email" placeholder="Email input">
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                    </span>
                </div>
            </div>
            <div class="column field">
                <label class="label">Password</label>
                <div class="control has-icons-left">
                    <input class="input" type="password" v-model="password" placeholder="Password">
                    <span class="icon is-small is-left">
                        <i class="fas fa-key"></i>
                    </span>
                </div>
            </div>
        </div>
        <!-- <input type="text" name="firstname" v-model="firstname">
        <input type="text" name="lastname" v-model="lastname">
        <input type="email" name="email" v-model="email">
        <input type="password" name="password" v-model="password"> -->
        <button ref="submitBtn" type="submit" class="button is-primary">Sign Up</button>
    </form>
</template>

<script>
    import "firebase/auth";

    export default {
        name: 'Register',
        data() {
            return {
                firstname: '',
                lastname: '',
                email: '',
                password: ''
            }
        },
        methods:{
            Register(){
                const submitBtn = this.$refs.submitBtn;
                submitBtn.classList.add('is-loading');
                this.$firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        if(user){
                            user.updateProfile({
                                displayName: `${this.firstname} ${this.lastname}`
                            })
                            submitBtn.classList.remove('is-loading');
                            this.$router.replace({ name: "Home" });
                        }
                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log(errorCode, errorMessage);
                    });
            },
            
        }
    }
</script>

<style>

</style>