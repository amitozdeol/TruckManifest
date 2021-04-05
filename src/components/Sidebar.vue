<template>
    <aside class="sidebar">
        <nav v-if="user" class="menu">
            <div class="menu-category">
                <ul class="menu-list">
                    <li>
                        <a class="is-flex is-align-items-center" :class="{ 'is-justify-content-center' : is_compressed}" @click="updateSidebar()">
                            <font-awesome-icon  v-if="is_compressed" :icon="['fas', 'chevron-right']" size="2x" class="mr-xs-0 mr-sm-2"/>
                            <font-awesome-icon v-else :icon="['fas', 'chevron-left']" size="2x" class="mr-xs-0 mr-sm-2"/>
                            <span class="sidebar-text">Collapse</span>
                        </a>
                    </li>
                </ul>
                <header class="sidebar-header category-header">Admin</header>
                <ul class="menu-list">
                    <li>
                        <router-link class="is-flex is-align-items-center" :class="{ 'is-active' : (active=='Organizations'), 'is-justify-content-center' : is_compressed}"
                            to="/organizations"
                            @click="active='Organizations'">
                            <font-awesome-icon :icon="['fas', 'globe']" size="2x" class="mr-xs-0 mr-sm-2"/>
                            <span class="sidebar-text">Organizations</span>
                        </router-link>
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
                active: '',
                is_compressed: false
            }
        },
        watch:{
            $route (to){
                this.active = to.name
            },
            is_ready(){
                this.updateSidebar();
            }
        },
        mounted(){
            window.addEventListener("resize", this.init);
        },
        methods:{
            /**
             * Check for any resize even and change the sidebar accordingly
             */
            init(){
                if (window.innerWidth < 500) {
                    if(!this.is_compressed) this.updateSidebar(); //compress
                }else{
                    if(this.is_compressed) this.updateSidebar(); //expand
                }
            },

            /**
             * Compress or expand sidebar when click on icon on the sidebar
             */
            updateSidebar(){
                this.is_compressed = !this.is_compressed;

                const width = this.is_compressed ? 4 : 12;
                document.documentElement.style.setProperty('--sidebar-width', width+'rem');

                const navbar = document.getElementsByClassName('navbar')[0];
                if (this.is_compressed) {
                    navbar.classList.add('is-compressed');
                    this.toggleSidebarText(document.querySelectorAll('.sidebar-header'), true);
                    this.toggleSidebarText(document.querySelectorAll('.sidebar-text'), true);
                }else{
                    navbar.classList.remove('is-compressed');
                    this.toggleSidebarText(document.querySelectorAll('.sidebar-header'), false);
                    this.toggleSidebarText(document.querySelectorAll('.sidebar-text'), false);
                }
            },
            toggleSidebarText(elements, hide){
                for (var i = 0; i < elements.length; i++) {
                    if(hide){
                        elements[i].classList.add('is-hidden');
                    }else{
                        elements[i].classList.remove('is-hidden');
                    }
                }
            }
        }
    }
</script>

<style>
    ion-icon {
        font-size: 25px;
        cursor: pointer
    }
</style>
