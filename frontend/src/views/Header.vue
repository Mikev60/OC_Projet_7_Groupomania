<template>
  <div id="header">
    <div id="logo"><img src="../assets/logo.png" alt=""></div>
    <div id="links"><router-link to="/">Home</router-link> |
    <router-link to="/Inscription" v-if="!(this.$store.state.isLogged)">Inscription</router-link>
    <router-link to="/Wall" v-if="this.$store.state.isLogged"> Mur </router-link>
    <router-link to="/Profile" v-if="this.$store.state.isLogged"> Profil </router-link>
    <div>
      <p>{{ this.$store.state.prenomUser }}, {{ this.$store.state.nomUser }}, {{ this.$store.state.pseudo }}, {{ this.$store.state.email }}</p>
    </div>
  </div>
  </div>
</template>

<style lang="scss">
#header {
  width:100%;
  height: 3rem;
  background-color: #1a2684;
  display: flex;
  flex-direction: row;
  #logo {
    width:20%;
    text-align:left;
    line-height: 3rem;
    img {
      max-width: 90%;
      height:auto;
    }
  }
  #links
  {
    width:70%;
  }
  a {
    color:white;
    line-height: 3rem;
  }
}
</style>
