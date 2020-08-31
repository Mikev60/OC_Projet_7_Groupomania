<template>
    <div id="container">
        <div id="formPost">
            <button class="btn btn-primary" @click.prevent="displayFormPost = !displayFormPost">Créer un post</button>
            <form v-if="displayFormPost">
            <input type="text" class="form-control" placeholder="Entrer la description de l'image" v-model="messageToPost">
            <input type="file" ref="file">  <button class="btn btn-primary" @click.prevent="postMessage">Poster</button>
        </form>
        </div> 
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            displayFormPost: false,
            messageToPost: ''
        }
    }, 
    methods: {
        postMessage() {
            let file = this.$refs.file.files[0];
            let message = this.messageToPost; 
            console.log(file);
            axios.post('http://localhost:3000/wall/post/', { message , file } )
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
        }
    }
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