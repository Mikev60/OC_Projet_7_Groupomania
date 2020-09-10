<template>
    <div id="container">
        <div id="formPost">

            <div id="feedArea">
            <div class="alert feedbackMessage" :class="{'alert-success': !isAlert, 'alert-danger': isAlert}" v-if="feedbackMessage != ''"> {{ feedbackMessage }}</div>
            <button class="btn btn-primary" @click.prevent="displayFormPost = !displayFormPost">Créer un post</button>
            <form v-if="displayFormPost">
            <input type="text" class="form-control" placeholder="Entrer la description de l'image" v-model="messageToPost">
            <div>
                <p> Aperçu du message : </P>
                <p>{{ messageToPost }}</p>
                <img :src="this.img.url" width="200" height="200" v-if="this.imgIsChecked" alt="Preview post">
            </div>
            <input type="file" ref="file"  @change="checkImage" accept="image/*">  <button class="btn btn-primary" @click.prevent="postMessage">Poster</button>
        </form>
        </div>
        <Post @postFlagged="displayAllPosts()" v-for="(post, postIndex) in posts" :key="post.id" :authorId="post.authorId" :message="post.message" :image="post.image" :index="postIndex" :id="post.id" :isFlagged="post.isFlagged"></Post>
        </div> 
    </div>
</template>

<script>
import axios from 'axios'
import Post from '../components/post.vue'

export default {
    data() {
        return {
            displayFormPost: false,
            messageToPost: '',
            isAlert: true,
            feedbackMessage: '',
            imgIsChecked: false, 
            posts: [],
            img : {
                size: 0, 
                height: 0, 
                width: 0, 
                url:''
            }
        }
    },
    components: {
        Post
    },
    methods: {
        postMessage() {
            if(this.imgIsChecked)
            {
                let file = this.$refs.file.files[0];
                let message = this.messageToPost;
                let syntaxeMessageAllowed = /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9!?'$€-]{2,100}$/;  
                if(syntaxeMessageAllowed.test(message)) {
                    console.log(file); 
                    const formData = new FormData();
                    formData.append ("authorId", this.$store.state.userId)
                    formData.append("image", file);
                    formData.append("message", message);
                    axios.post('http://localhost:3000/wall/post/', formData, { 
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `token ${this.$store.state.tokenToCheck}`
                        }
                    })
                    .then(response => {
                        this.feedbackMessage = response.data.message;
                        this.isAlert = false; 
                        this.displayFormPost = false;
                        this.img.url = '';
                        this.img.size = 0;
                        this.img.height = 0; 
                        this.img.width = 0;
                        this.messageToPost = '';
                        this.imgIsChecked = false;
                        this.displayAllPosts();
                    })
                    .catch(error => {
                        console.log(error);
                        this.feedbackMessage = error.response.data.message; 
                        this.isAlert = true; 
                    })
                }
                else {
                    this.feedbackMessage = "Le message contient des caractères non autorisés ou est supérieur à 100 caractères"
                    this.isAlert = true; 
                }
            } else {
                this.feedbackMessage = "Erreur avec l'image transmise";
                this.isAlert = true;
            }
        },
        displayAllPosts(){
            axios.get('http://localhost:3000/wall/getAll/',{ headers: {
                'Authorization': `token ${this.$store.state.tokenToCheck}`
                }})
            .then(response => {
                console.log(response.data.resultat);
                this.posts = response.data.resultat; 
            })
            .catch(error => {
                console.log(error);
            })
        },
        checkImage() {
            let imageToCheck = this.$refs.file.files[0];
            const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

            if(!imageToCheck || imageToCheck.type.indexOf('image/') !== 0) {
                this.feedbackMessage = "Erreur dans le type de fichier";
                this.isAlert = true; 
                this.imgIsChecked = false;
                return;
            }

            if(!allowedTypes.includes(imageToCheck.type)){
                this.feedbackMessage = "Seules sont autorisées les images jpg, jpeg, png et gif"
                this.isAlert = true; 
                this.imgIsChecked = false; 
                return;
            }

            this.img.size = imageToCheck.size / 1000;

            if(this.img.size > 1000) {
                this.feedbackMessage = "L'image transmise est trop lourde (1Mo max)";
                this.isAlert = true; 
                this.imgIsChecked = false;
                return;
            }

            let fileReader = new FileReader(); 
            fileReader.readAsDataURL(imageToCheck);
            fileReader.onload = evt => {
                let image = new Image();
                image.onload = () => {
                    this.img.height = image.height;
                    this.img.width = image.width;
                    if(this.img.height > 600 || this.img.width > 600){
                        this.feedbackMessage = "L'image doit être de taille 600x600 max";
                        this.isAlert = true; 
                        this.imgIsChecked = false;
                        return;
                    }
                }
                image.src = evt.target.result;
            }

            this.imgIsChecked = true;
            this.feedbackMessage = ''; 
            this.isAlert = false;
            this.img.url = URL.createObjectURL(imageToCheck);
            return;
        }
    }, 
   mounted() {
        this.displayAllPosts();
    },
    beforeupdated() {
        this.displayAllPosts();
    }
}
</script>

<style lang="scss" scoped>
#container {
    width: 100%;
    margin:auto;
    background-color: #eae8e8;
}
.feedbackMessage {
    width: 40%;
    margin: auto;
    margin-bottom: 1rem; 
}
#formPost {
    padding-top:1rem; 
    input{
        margin-top:1rem;
    }
}
#feedArea {
    width: 40%;
    margin:auto;
    background-color: white;
    padding: 1rem; 
    border-radius: 30px;
    box-shadow: 0.2rem 0.2rem 0.3rem 0.3rem lightgrey;
}
</style>