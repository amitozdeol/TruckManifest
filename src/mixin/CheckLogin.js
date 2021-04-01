var mixin = {
    data(){
        return {
            user: null,
        }
    },
    watch:{
        async $route (to, from){
            console.log(to.name, from.name);
            this.user = await this.getCurrentUser();
        }
    },
    async mounted(){
        this.user = await this.getCurrentUser();
    },
    methods: {
        /**
         * Get current logged in user
         */
        getCurrentUser(){
            return new Promise((resolve, reject) => {
                const unsubscribe = this.$firebase.auth().onAuthStateChanged(user => {
                    unsubscribe();
                    resolve(user);
                }, reject);
            });
        },
    }
}

export default mixin;
