<template>
    <Header title='Organization' subtitle="Manage all the organizations from this page"/>
    <form @submit.prevent="submit" method="post">
        <div class="columns">
            <div class="column">
                <div class="field">
                    <label class="label">Name</label>
                    <div class="control">
                        <input class="input" type="text" v-model="name">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Detail</label>
                    <div class="control">
                        <input class="input" type="text" v-model="detail">
                    </div>
                </div>
            </div>
        </div>
        <button ref="submitBtn" type="submit" class="button is-primary">Add</button>
    </form>
</template>

<script>
    import 'firebase/database';
    import Header from './Header';

    export default {
        components: {
            Header,
        },
        data() {
            return {
                name: '',
                detail: ''
            }
        },
        methods: {
            submit() {
                const submitBtn = this.$refs.submitBtn;
                submitBtn.classList.add('is-loading');

                this.$firebase.database().ref('org').set({
                    name: this.name,
                    detail: this.detail,
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
