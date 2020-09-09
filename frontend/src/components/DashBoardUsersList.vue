<template>
    <div>
    <h1> Liste des utilisateurs </h1>
    <div v-for="(user,index) in usersList" :key="index"> 
        <router-link :to="{ name: 'Users', params: { id: user.id }}"> {{ user.pseudo }}</router-link> (Nom: {{ user.nom }} , Prénom: {{ user.prenom}})
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
            axios.get('http://localhost:3000/user/getAllUsers')
            .then(response => {
                console.log(response.data);
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