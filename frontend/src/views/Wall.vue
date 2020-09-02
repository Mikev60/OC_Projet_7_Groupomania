<template>
    <div id="container">
        <div id="formPost">
            <div class="alert" :class="{'alert-success': !isAlert, 'alert-danger': isAlert}" v-if="feedbackMessage != ''"> {{ feedbackMessage }}</div>
            <button class="btn btn-primary" @click.prevent="displayFormPost = !displayFormPost">Créer un post</button>
            <form v-if="displayFormPost">
            <input type="text" class="form-control" placeholder="Entrer la description de l'image" v-model="messageToPost">
            <input type="file" ref="file">  <button class="btn btn-primary" @click.prevent="postMessage">Poster</button>
        </form>
        <div v-for="post in posts" :key="post.id">{{ post.id }}, {{ post.authorId }}, {{ post.message }}, {{ post.message }}, {{ post.image }} </div>
        </div> 
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            displayFormPost: false,
            messageToPost: '',
            isAlert: true,
            feedbackMessage: '',
            posts: ''
        }
    },
    watch: {
        posts() {
            
        }
    },
    methods: {
        postMessage() {
            let file = this.$refs.file.files[0];
            let message = this.messageToPost; 
            console.log(file); 
            const formData = new FormData();
            formData.append("image", file);
            formData.append("message", message);
            axios.post('http://localhost:3000/wall/post/', formData, { 
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                this.feedbackMessage = response.data.message;
                this.isAlert = false; 
                this.displayFormPost = false;
                this.displayAllPosts();
            })
            .catch(error => {
                console.log(error);
                this.feedbackMessage = error.response.data.message; 
                this.isAlert = true; 
            })
        },
        displayAllPosts(){
            axios.get('http://localhost:3000/wall/getAll/')
            .then(response => {
                console.log(response.data.resultat);
                this.posts = response.data.resultat; 
            })
            .catch(error => {
                console.log(error);
            })
        }
    }, 
   mounted() {
        this.displayAllPosts();
    } /* ,
    updated() {
        this.displayAllPosts();
    } */ 
}
</script>

<style lang="scss" scoped>
#container {
    width: 60%;
    margin:auto;
}
#formPost {
    padding-top:1rem; 
    input{
        margin-top:1rem;
    }
}
</style>