<template>
  <div class="about">
    <h1>Bienvenue sur le dashboard</h1>
    <div class="menuAdmin">
      <router-link to='/Dashboard/Posts'> <button class="btn btn-primary">Voir les posts flaggés</button> </router-link> - 
      <router-link to='/Dashboard/UsersList'> <button class="btn btn-primary"> Voir la liste des utilisateurs </button></router-link>
    </div>
    <div class="contenuDashBoard">
      <router-view></router-view>
    </div>
  </div>
</template>