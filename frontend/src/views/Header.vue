<template>
<nav class="navbar navbar-expand-lg navbar-dark mb-0" style="background-color: #0f0b84" id="navbar">
  <a class="navbar-brand" href="#"> <img id="logo" src="../assets/logo.png" class="d-inline-block align-top" alt="bug"></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav" style="background-color: #0f0b84; width: 100%;">
      <li class="nav-item">
        <router-link class="nav-link" style="color: white" to="/">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" style="color: white" to="/Inscription" v-if="!(this.$store.state.isLogged)">Inscription</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" style="color: white" to="/Wall" v-if="this.$store.state.isLogged"> Mur </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" style="color: white" to="/Profile" v-if="this.$store.state.isLogged"> Profil </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" style="color: white" to="/Dashboard" v-if="this.$store.state.roleUser == 'admin'"> Dashboard </router-link>
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
  z-index: 9999;
}
.nav-linkColor{
  color:white;
}

@media all and(max-width:700px) {
  #navbar {
    height: 10vh;
  }
}
</style>
