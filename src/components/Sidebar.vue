<template>
    <aside class="sidebar">
        <nav v-if="user" class="menu">
            <div class="menu-category">
                <header class="category-header">Admin</header>
                <ul class="menu-list">
                    <li>
                        <router-link to="/organization">Organization</router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </aside>
</template>

<script>
    import CheckLogin from './../mixin/CheckLogin';

    export default {
        mixins: [CheckLogin]
    }
</script>

<style>

</style>
