<template>
  <div class="about">
    <h1>Bienvenue sur le dashboard</h1>
    <div class="menuAdmin">
      <router-link to='/Dashboard/Posts'> Voir les posts </router-link>
      <router-link to='/Dashboard/Answers'> Voir les réponses </router-link>
      <router-link to='/Dashboard/UsersList'> Voir la liste des utilisateurs </router-link>
    </div>
    <div class="contenuDashBoard">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  methods: {
    getFlaggedPosts() {
      axios.get('http://localhost:3000/dashBoard/flagged/')
      .then(response => {
        console.log(response);
      })
      .catch(error => { 
        console.log(error);
      })
    }
  },
  mounted() {
    this.getFlaggedPosts();
  }
}
</script>