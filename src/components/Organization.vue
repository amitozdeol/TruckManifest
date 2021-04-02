<template>
    <Loader :active="is_loading" />
    <Header :title='org.name' :subtitle="org.detail"/>
    <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
            <li><router-link to="/organizations">Organizations</router-link></li>
            <li class="is-active"><router-link :to="'/organization/'+org.key">{{org.name}}</router-link></li>
        </ul>
    </nav>

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
        mounted(){
            var orgs = this.$firebase.database().ref(`org/${this.$route.params.id}`);
            orgs.on('value', (data) => {
                this.org = data.val();
                this.is_loading= false;
            });
        },
    }
</script>

<style>

</style>
