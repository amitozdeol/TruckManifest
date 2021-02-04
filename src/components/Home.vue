<template>
  <h1 class="title">Welcome {{ $firebase.auth().currentUser.displayName }}</h1>
  <form @submit.prevent="submit" method="post">
        <div class="field">
            <label class="label">Data1</label>
            <div class="control">
                <input class="input" type="text" v-model="data1">
            </div>
        </div>
        <div class="field">
            <label class="label">Data2</label>
            <div class="control">
                <input class="input" type="text" v-model="data2">
            </div>
        </div>
        <button ref="submitBtn" type="submit" class="button is-primary">Submit</button>
  </form>
</template>

<script>
export default {
  data() {
      return {
          data1: '',
          data2: '',
      }
  },
  methods:{
      login() {
        const submitBtn = this.$refs.submitBtn;
        submitBtn.classList.add('is-loading');
        this.$firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(data => {
                submitBtn.classList.remove('is-loading');
                console.log(data);
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