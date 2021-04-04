<template>
    <Loader :active="is_loading" />
    <Header :title='org.name' :subtitle="org.detail"/>
    <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
            <li><router-link to="/organizations">Organizations</router-link></li>
            <li class="is-active"><router-link :to="'/organization/'+org.key">{{org.name}}</router-link></li>
        </ul>
    </nav>
    <div class="columns is-flex-wrap-wrap">
        <div v-for="ticket in org.tickets" :key="ticket" class="column is-half-tablet is-one-quarter-desktop is-narrow-desktop">
            <router-link :to="'/organization/'+org.key" class="tile is-child box">
                <p>{{ticket.license_plate}}</p>
                <p>{{ticket.truck_number}}</p>
                <p>{{ticket.weight}}</p>
                <p>{{ticket.truck_content}}</p>
            </router-link>
        </div>
    </div>
</template>

<script>
    import 'firebase/database';
    import Header from './Header';
    import LoaderMixin from './../mixin/LoaderMixin';

    export default {
        components: {
            Header,
        },
        mixins: [LoaderMixin],
        data() {
            return {
                org: {},
                name: '',
                detail: ''
            }
        },
        async mounted(){
            var orgs = await this.$firebase.database().ref(`org/${this.$route.params.id}`);
            orgs.once('value', (data) => {
                this.org = data.val();
                this.is_loading= false;
            });
        },
    }
</script>

<style>

</style>
