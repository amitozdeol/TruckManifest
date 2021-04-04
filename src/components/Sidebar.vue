<template>
    <aside class="sidebar">
        <nav v-if="user" class="menu">
            <div class="menu-category">
                <div class="sidebar-toggle is-flex is-justify-content-end pr-2 pt-2">
                    <ion-icon v-if="is_compressed" name="chevron-forward-outline" @click="updateSidebar(12)"></ion-icon>
                    <ion-icon v-else name="chevron-back-outline" @click="updateSidebar(4)"></ion-icon>
                </div>

                <header class="sidebar-header category-header">Admin</header>
                <ul class="menu-list">
                    <li>
                        <router-link class="is-flex is-align-items-center" :class="{ 'is-active' : (active=='Organizations'), 'is-justify-content-center' : is_compressed}"
                            to="/organizations"
                            @click="active='Organizations'">
                            <ion-icon name="earth-outline" class="mr-0 mr-xs-2"></ion-icon>
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
            }
        },
        created(){
            window.addEventListener("resize", this.init);
            this.init();
        },
        methods:{
            init(){
                if (window.innerWidth < 500) {
                    if(!this.is_compressed) this.updateSidebar(4); //compress
                }else{
                    if(this.is_compressed) this.updateSidebar(12); //expand
                }
            },

            /**
             * Compress or expand sidebar when click on icon on the sidebar
             */
            updateSidebar(e){
                console.log(window.innerWidth);
                document.documentElement.style.setProperty('--sidebar-width', e+'rem');
                this.is_compressed = !this.is_compressed;
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
