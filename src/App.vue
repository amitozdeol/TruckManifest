<template>
    <Nav />
    <div class="wrapper">
        <div>
            <Sidebar />
            <main class="main">
                <router-view></router-view>
            </main>
        </div>
    </div>
</template>

<script>
    import './styles/all.scss';
    import Nav from './components/Nav';
    import Sidebar from './components/Sidebar';

    export default {
        name: 'App',
        components: {
            Nav,
            Sidebar
        }
    }
</script>
