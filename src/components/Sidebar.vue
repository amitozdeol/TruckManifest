<template>
    <aside class="sidebar">
        <nav v-if="user" class="menu">
            <div class="menu-category">
                <header class="category-header">Admin</header>
                <ul class="menu-list">
                    <li>
                        <router-link :class="active=='Organizations' ? 'is-active' : ''"
                            to="/organizations"
                            @click="active='Organizations'">Organizations</router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </aside>
</template>

<script>
    import CheckLogin from './../mixin/CheckLogin';

    export default {
        mixins: [CheckLogin],
        data() {
            return {
                active: ''
            }
        },
        watch:{
            $route (to){
                this.active = to.name
            }
        }
    }
</script>

<style>

</style>
