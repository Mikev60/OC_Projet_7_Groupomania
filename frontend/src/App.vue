<template>
  <div id="app">
    <nav>
      <appHeader></appHeader>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import appHeader from './views/Header.vue'

export default {
  components: {
    appHeader
  },
    beforeUpdate() {
    this.$store.state.tokenToCheck = this.$ls.get('token');
    this.$store.state.userId = this.$ls.get('userId');
    this.$store.commit('CHECK_TOKEN');
  },
    created() {
    this.$store.state.tokenToCheck = this.$ls.get('token');
    this.$store.state.userId = this.$ls.get('userId');
    this.$store.dispatch('getInfos');
    this.$store.commit('CHECK_TOKEN');
  }
}
</script>

<style lang="scss">

@import './sass/main.scss';

* {
  padding:0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
