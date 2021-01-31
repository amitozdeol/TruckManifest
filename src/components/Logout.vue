<template>
    <button @click="logout">Logout</button>
</template>

<script>
    import "firebase/auth";
    export default {
        name: 'Logout',
        methods:{
            logout() {
                this.$firebase.auth().signOut().then(() => {
                    // Sign-out successful.
                    console.log("success");
                }).catch((error) => {
                    // An error happened.
                    console.log(error);
                });
            }
        }
    }
</script>

<style>

</style>