<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-0" id="navbar">
  <a class="navbar-brand" href="#"> <img id="logo" src="../assets/logo.png" class="d-inline-block align-top" alt="bug"></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link class="nav-link" to="/">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/Inscription" v-if="!(this.$store.state.isLogged)">Inscription</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/Wall" v-if="this.$store.state.isLogged"> Mur </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/Profile" v-if="this.$store.state.isLogged"> Profil </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/Dashboard" v-if="this.$store.state.roleUser == 'admin'"> Dashboard </router-link>
      </li>
    </ul>
  </div>
</nav>
</template>

<style lang="scss">
#logo {
  width:150px;
  height:auto;
}
#navbar {
  height:7vh;
  margin-bottom:none;
}
</style>
