<template>
    <div class="containerPost">
        <div class="message"> {{ message }} </div>
        <img :src="image" alt="post image">
        <div class="auteur">Posté par {{ Auteur }} </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props: ['authorId', 'message' , 'image'], 
    data() {
        return {
            Auteur: ''
        }
    },
    methods : {
        getUserName(authorId) {
            axios.get('http://localhost:3000/user/getInfos/' + authorId)
            .then(result => {
                console.log(result.data[0].pseudo)
                this.Auteur = result.data[0].pseudo;
            })
            .catch(error => {
                console.log(error)
            })
        }
    }, mounted() {
        this.getUserName(this.authorId);
        console.log(this.$router.currentRoute.fullPath);
    }
}
</script>

<style lang="scss" scoped>
.containerPost {
    margin-top: 2rem;
    width: 80%;
    margin-right:auto;
    margin-left: auto; 
    box-shadow: 0.2rem 0.2rem 0.3rem 0.3rem lightgrey;
}
.auteur {
    margin-top:1rem;
    text-align:right;
    font-size:0.8rem;
}
.message {
    font-weight: bold;
    margin-bottom: 1rem;
    border-bottom:1px solid grey;
}
</style>