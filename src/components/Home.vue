<template>
    <Loader :active="is_loading" />
    <Header title='Home'/>
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
                    <div class="select">
                        <select v-model="company">
                            <option v-for="org in orgs" :key="org.key" :value="org.key">{{org.name}}</option>
                        </select>
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
    import Header from './Header';
    import LoaderMixin from './../mixin/LoaderMixin';

    export default {
        components: {
            Header
        },
        mixins: [LoaderMixin],
        data() {
            return {
                orgs: [],
                license_plate: '',
                company: '',
                truck_number: '',
                truck_content: '',
                weight: '',
            }
        },
        async mounted(){
            const orgs = await this.$firebase.database()
                        .ref('org')
                        .once('value');
            orgs.forEach((d) => {
                this.orgs.push({key: d.key, ...d.val()});
            });
            this.is_loading= false;
        },
        methods: {
            submit() {
                const submitBtn = this.$refs.submitBtn;
                submitBtn.classList.add('is-loading');

                const tickets = this.$firebase.database().ref(`org/${this.company}/tickets`);
                var newticket = tickets.push();
                newticket.set({
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
