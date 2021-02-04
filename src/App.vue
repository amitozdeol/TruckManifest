<template>
  <Nav/>
  <div class="container">
    <main class="section">
        <router-view></router-view>
    </main>
  </div>
</template>

<script>
import './styles/main.css';
import Nav from './components/Nav';

export default {
  name: 'App',
  components: {
    Nav
  }
}
</script>