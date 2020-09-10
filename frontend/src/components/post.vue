<template>
    <div class="containerPost">
        <div class="message"> {{ message }}<a href="#" @click.prevent="flagPost(id, isFlagged);$emit('postflagged', id)" v-if="this.$store.state.roleUser == 'admin'"><img src="../assets/flag.png" width="24" height="24" ></a></div>
        <img :src="image" alt="post image">
        <div class="auteur">
            <img :src="avatarAuteur" width="48" height="48" alt="" style="border-radius:100%"><span class="displayAuthor">Posté par <router-link :to="{ name: 'Users', params: { id: authorId }}">{{ Auteur }} </router-link></span>
        </div>
        <div class="arrowDisplay">
            <button class="btn btn-secondary btn-sm" @click.prevent="addToDisplayForm(index); displayAnswers(id);">Commentaires</button>
        </div>
        <div class="alert" :class="{'alert-success': !isAlert, 'alert-danger': isAlert}" v-if="feedbackMessage != ''"> {{ feedbackMessage }}</div>
        <div class="answerForm" v-if="displayPostAnswers.includes(index)"> 
            <div class="avatar">
                <img :src="this.$store.state.avatarUser" width="48" height="48" alt="" style="border-radius:100%">
            </div>
            <form>
                <div class="inputAnswerContainer">
                <input type="text" class="form-control form-control-sm inputAnswer" :class="{invalid: $v.answerToPost.$error}" placeholder="Votre commentaire"  @blur="$v.answerToPost.$touch()" v-model="answerToPost">
                <small v-if="answerToPost.length > 0" id="emailHelp" class="form-text">{{ answerToPost.length }} / 100</small>
                <small v-if="!$v.answerToPost.minLength" id="emailHelp" class="form-text">Le message doit contenir au moins 2 caractères</small>
                <small v-if="!$v.answerToPost.maxLength" id="emailHelp" class="form-text">Le message doit contenir 100 caractères maximum</small>
                <small v-if="!$v.answerToPost.syntaxe && answerToPost != ''" id="nomHelp" class="form-text">Le message contient des caractères non autorisés</small>
                </div>
                <div><button class="btn btn-primary btn-sm" :disabled="$v.$invalid" @click.prevent="postAnswer(id)">Répondre</button></div>
            </form>
        </div>
        <div v-if="displayPostAnswers.includes(index)">
        <div v-for="answer in answers" :key="answer.id" class="answerDisplayer" > 
            <div class="containerEachAnswer">
                <div class="avatarAuteur">
                    <img :src="answer.avatar" width="48" height="48" style="border-radius:100%" alt="">
                </div>
                <div class="answer">
                <span>
                <strong>{{ answer.auteur }}</strong><br>
                {{ answer.message}}
                </span>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { required, maxLength, minLength } from 'vuelidate/lib/validators'

export default {
    props: ['authorId', 'message' , 'image', 'index', 'id', 'isFlagged'], 
    data() {
        return {
            Auteur: '',
            avatarAuteur: '',
            displayPostAnswers: [],
            answerToPost: '',
            isAlert: true,
            feedbackMessage: '',
            answers: []
        }
    },
    validations: {
        answerToPost: {
            minLength: minLength(2),
            maxLength: maxLength(100), 
            required, 
            syntaxe: (value) => {
                return /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-]{1,}$/.test(value);
            }
        }
    },
    methods : {
        getInfos(authorId) {
            axios.get('http://localhost:3000/user/getInfos/' + authorId, { 
                        headers: {
                            'Authorization': `token ${this.$store.state.tokenToCheck}`
                        }
                    })
            .then(result => {
                    console.log(result.data[0].pseudo)
                    this.Auteur = result.data[0].pseudo;
                    this.avatarAuteur = result.data[0].avatar;
            })
            .catch(error => {
                console.log(error)
            })
        },
        addToDisplayForm(index) {
            if(this.displayPostAnswers.includes(index)) {
                let indexToDelete = this.displayPostAnswers.indexOf(index);
                this.displayPostAnswers.splice(indexToDelete, 1);
            } else {
                this.displayPostAnswers.push(index);
            }
        },
        postAnswer(id) {
            let syntaxe = /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-]{1,}$/;
            if(syntaxe.test(this.answerToPost)) {
                let answer = {
                    message: this.answerToPost,
                    postId: id,
                    auteur: this.$store.state.pseudoUser,
                    idAuteur: this.$store.state.userId
                }
                axios.post('http://localhost:3000/wall/post/answer', answer , { 
                        headers: {
                            'Authorization': `token ${this.$store.state.tokenToCheck}`
                        }
                    })
                .then(response => {
                    console.log(response);
                    this.feedbackMessage = response.data.message;
                    this.isAlert = false; 
                    this.answers.push(this.answerToPost);
                    this.answerToPost = '';
                    setTimeout(() => {
                        this.feedbackMessage = ''
                    }, 2000);
                    this.displayAnswers(id);
                })
                .catch(error => {
                    console.log(error);
                    this.feedbackMessage = error.response.data.message; 
                    this.isAlert = true; 
                })
            } else {
                this.errorMessage = "Le message ne respecte pas la syntaxe autorisée";
                return;
            }
        },
        displayAnswers(id) {
            axios.get('http://localhost:3000/wall/answer/get/'+id , { 
                        headers: {
                            'Authorization': `token ${this.$store.state.tokenToCheck}`
                        }
                    })
            .then(response => {
                this.answers = response.data.resultat;
                console.log(this.answers);
            })
            .catch(error => {
                console.log(error);
            })
        },
        flagPost(id, isFlagged)
        {
            console.log(isFlagged);
            let data = {
                idToFlag: id, 
                userId: this.$store.state.userId,
                roleUser: this.$store.state.roleUser,
                isFlagged: isFlagged
            }
            axios.put('http://localhost:3000/dashBoard/flagPost/'+id, data , { headers: {
                'Authorization': `token ${this.$store.state.tokenToCheck}`
                }})
            .then(response => {
                this.feedbackMessage = response.data.message;
                this.isAlert = false; 
                this.$emit('postFlagged');
            })
            .catch(error => {
                console.log(error.response.data.message);
            })
        }
    }, mounted() {
        this.getInfos(this.authorId);
        console.log(this.$router.currentRoute.fullPath);
    }
}
</script>

<style lang="scss" scoped>
.containerPost {
    margin-top: 2rem;
    width: 40%;
    margin-right:auto;
    margin-left: auto; 
    box-shadow: 0.2rem 0.2rem 0.3rem 0.3rem lightgrey;
    border-radius: 30px;
    padding: 1rem; 
    background-color: white;
}
.auteur {
    margin-top:1rem;
    font-size:0.8rem;
    display: flex; 
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    .displayAuthor {
        align-self: center;
        margin-left:0.4rem;
    }
}
.message {
    font-weight: bold;
    margin-bottom: 1rem;
    border-bottom:1px solid rgb(206, 202, 202);
}
.answerForm {
    display:flex; 
    flex-direction: row;
    align-items: center;
    margin-top:1rem;
    form {
        flex:4;
        display:flex;
        flex-direction: row;
        .inputAnswer{
            width: 80%;
            display:inline-block;
            margin-right: 0.5rem; 
        }
        .inputAnswerContainer {
            width: 80%;
        }
        button {
            max-width:100%;
        }
    }
}

.invalid {
    border:1px solid red;
    background-color: #ffc9aa;
  small {
    color:red;
  }
}

.answerDisplayer {
    display:flex;
    flex-direction: column;
    text-align:left;
}

.containerEachAnswer {
    display:flex;
    flex-direction: row;
    align-items:center;
        border-bottom: 1px solid lightgray;
}

.answer {
    margin-left: 1rem;
    margin-bottom: 1rem; 
}
</style>