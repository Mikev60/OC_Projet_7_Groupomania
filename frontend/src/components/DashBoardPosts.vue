<template>
<div>

    <h1> Posts taggés </h1>

    <div class="container">
        <Post v-for="(post, postIndex) in posts" :key="post.id" :authorId="post.authorId" :message="post.message" :image="post.image" :index="postIndex" :id="post.id" :isFlagged="post.isFlagged"></Post>
    </div>
    
</div>
</template>

<script>
import axios from 'axios'

import Post from '../components/post.vue'

export default {
    data() {
        return {
            posts: [],
        }
    },
    methods: {
        getFlaggedPosts() {
            axios.get('http://localhost:3000/dashBoard/flaggedPosts', { headers: {
                'Authorization': `token ${this.$store.state.tokenToCheck}`
                }} )
            .then(response => {
                this.posts = response.data.resultat; 
            })
            .catch(error => {
                console.log(error);
            })
        }
    },
    components: {
        Post
    },
    mounted() {
        this.getFlaggedPosts();
    }
}
</script>