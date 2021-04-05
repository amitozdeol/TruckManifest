var mixin = {
    data(){
        return {
            user: null,
            is_ready: false
        }
    },
    watch:{
        async $route (to, from){
            console.log(to.name, from.name);
            this.user = await this.getCurrentUser();
        }
    },
    async beforeMount(){
        this.user = await this.getCurrentUser();
        this.$nextTick(() => {
            this.is_ready = true;
        });
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
