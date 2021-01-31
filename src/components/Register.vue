<template>
    <h1>Sign Up</h1>
    <form @submit.prevent="Register" method="post">

        <input type="text" name="firstname" v-model="firstname">
        <input type="text" name="lastname" v-model="lastname">
        <input type="email" name="email" v-model="email">
        <input type="password" name="password" v-model="password">
        <button type="submit">Sign Up</button>
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
                this.$firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        if(user){
                            user.updateProfile({
                                displayName: `${this.firstname} ${this.lastname}`
                            })
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