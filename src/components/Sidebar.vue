<template>
    <aside class="sidebar">
        <nav v-if="user" class="menu">
            <div class="menu-category">
                <header class="category-header">Admin</header>
                <ul class="menu-list">
                    <li>
                        <router-link :class="active=='organizations' ? 'is-active' : ''" to="/organizations" @click="active='organizations'">Organizations</router-link>
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
    }
</script>

<style>

</style>
