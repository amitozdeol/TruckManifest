<template>
    <Loader :active="is_loading" />
    <Header title='Organizations' subtitle="Manage all the organizations from this page"/>
    <div class="columns is-flex-wrap-wrap">
        <div v-for="org in orgs" :key="org.key" class="column is-half-tablet is-one-quarter-desktop is-narrow-desktop">
            <router-link :to="'/organization/'+org.key" class="tile is-child box">
                <p class="title is-5">{{org.name}}</p>
                <p class="subtitle">{{org.detail}}</p>
            </router-link>
        </div>
    </div>

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
    import Loader from './Loader';

    export default {
        components: {
            Header,
            Loader
        },
        data() {
            return {
                is_loading: true,
                orgs: [],
                name: '',
                detail: ''
            }
        },
        mounted(){
            var orgs = this.$firebase.database().ref('org');
            orgs.on('child_added', (data) => {
                this.orgs.push({key: data.key, ...data.val()});
                this.is_loading= false;
            });
        },
        methods: {
            submit() {
                const submitBtn = this.$refs.submitBtn;
                submitBtn.classList.add('is-loading');

                const orgs = this.$firebase.database().ref('org');
                var neworg = orgs.push();
                neworg.set({
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
