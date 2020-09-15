<template>
    <div>
    <h1> Liste des utilisateurs </h1>
    <div class="container">
        <div v-for="(user,index) in usersList" :key="index" class="userList"> 
            <router-link :to="{ name: 'Users', params: { id: user.id }}"> {{ user.pseudo }}</router-link> (Nom: {{ user.nom }} , Prénom: {{ user.prenom}})
        </div>
    </div>

    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            usersList: []
        }
    }, 
    methods: {
        getUserList() {
            axios.get('http://localhost:3000/user/getAllUsers', { headers: {
                'Authorization': `token ${this.$store.state.tokenToCheck}`
                }})
            .then(response => {
                this.usersList = response.data;
            })
            .catch(error => {
                console.log(error);
            })
        }
    }, 
    mounted() {
        this.getUserList();
    }
}
</script>

<style lang="scss">
.userList{
    a {
        color: darkblue;
    }
}
</style>