<template>
  <h1 class="title">Welcome {{ $firebase.auth().currentUser.displayName }}</h1>
  <form @submit.prevent="submit" method="post">
        <div class="columns">
            <div class="column">
                <div class="field">
                    <label class="label">Truck License Plate</label>
                    <div class="control">
                        <input class="input" type="text" v-model="license_plate">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Company</label>
                    <div class="control">
                        <input class="input" type="text" v-model="company">
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="field">
                    <label class="label">Truck Number</label>
                    <div class="control">
                        <input class="input" type="text" v-model="truck_number">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Weight</label>
                    <div class="control">
                        <input class="input" type="text" v-model="weight">
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="field">
                    <label class="label">Truck Content</label>
                    <div class="control">
                        <textarea class="textarea" v-model="truck_content"></textarea>
                    </div>
                </div>
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
          license_plate: '',
          company: '',
          truck_number: '',
          truck_content: '',
          weight: '',
      }
  },
  methods:{
      submit() {
        const submitBtn = this.$refs.submitBtn;
        submitBtn.classList.add('is-loading');

        this.$firebase.database().ref('truck').set({
          license_plate: this.license_plate,
          company: this.company,
          truck_number: this.truck_number,
          truck_content: this.truck_content,
          weight: this.weight,
          created_at: Date.now()
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
