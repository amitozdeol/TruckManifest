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
import 'firebase/database';

export default {
  data() {
      return {
          data1: '',
          data2: '',
      }
  },
  methods:{
      submit() {
        const submitBtn = this.$refs.submitBtn;
        submitBtn.classList.add('is-loading');

        this.$firebase.database().ref('truck').set({
          data: this.data1,
          data1: this.data2,
        }, (error) => {
          if (error) {
            // The write failed...
            console.log(error);
          } else {
            // Data saved successfully!
            console.log("data saved");
            submitBtn.classList.remove('is-loading');
          }
        });

      }
  }
}
</script>

<style>

</style>
