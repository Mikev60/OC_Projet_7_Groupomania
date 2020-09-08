<template>
<div id="containerProfile">
    <h1> Mon profil </h1>
    <div class="alert" :class="{'alert-success': !isAlert, 'alert-danger': isAlert}" v-if="feedbackMessageAvatar != ''"> {{ feedbackMessageAvatar }}</div>
    <form>
        <div class="form-group">
            <h2>Changer mon avatar</h2>
            <img :src="img.url" max-width="300" max-height="300" alt="Preview avatar" style="border-radius:50%">
            <br><br><input type="file" ref="file" accept="image/*" @change="checkImage()"> <br><br>
            <button class="btn btn-primary" :disabled="!imgIsChecked" @click.prevent="changeAvatar">Changer</button>
        </div>
    </form>
    <form>
        <div class="alert" :class="{'alert-success': !isAlertPassword, 'alert-danger': isAlertPassword}" v-if="feedbackMessagePassword != ''"> {{ feedbackMessagePassword }}</div>
        <div class="form-group" :class="{invalid: $v.typedCurrentPassword.$error}">
            <label for="passwordActuel">Password actuel :</label>
            <input type="password" placeholder="Mot de passe actuel" class="form-control" name="passwordActuel" v-model="typedCurrentPassword" @blur="$v.typedCurrentPassword.$touch()" required>
            <small v-if="!$v.typedCurrentPassword.syntaxe && typedCurrentPassword != ''" id="emailHelp" class="form-text">Le mot de passe contient des caractères non autorisés</small>
            <small v-if="!$v.typedCurrentPassword.minLength && typedCurrentPassword != ''" id="emailHelp" class="form-text">Le mot de passe actuel contient forcément au moins 8 caractères</small>
            <small v-if="!$v.typedCurrentPassword.maxLength && typedCurrentPassword != ''" id="emailHelp" class="form-text">Le mot de passe ne peut contenir au maximum que 60 caractères</small>
        </div>
        <div class="form-group" :class="{invalid: $v.newPassword.$error}">
            <label for="newPassword">Nouveau password :</label>
            <input type="password" placeholder="Votre nouveau mot de passe" class="form-control" name="newPassword" v-model="newPassword" required @blur="$v.newPassword.$touch()">
            <small v-if="!$v.newPassword.syntaxe && newPassword != ''" id="emailHelp" class="form-text">Le mot de passe contient des caractères non autorisés</small>
            <small v-if="!$v.newPassword.minLength && newPassword != ''" id="emailHelp" class="form-text">Le mot de passe doit contenir au moins 8 caractères</small>
            <small v-if="!$v.newPassword.maxLength && newPassword != ''" id="emailHelp" class="form-text">Le mot de passe ne peut contenir au maximum que 60 caractères</small>
        </div>
        <div class="form-group" :class="{invalid: $v.confirmNewPassword.$error}">
            <label for="confirmNewPassword">Confirmer nouveau password :</label>
            <input type="password" placeholder="Votre nouveau mot de passe" class="form-control" v-model="confirmNewPassword" required @blur="$v.confirmNewPassword.$touch()">
            <small v-if="!$v.confirmNewPassword.sameAsPassword && confirmNewPassword != ''" id="emailHelp" class="form-text">Le mot de passe et la confirmation ne sont pas identiques.</small>
        </div>
            <button class="btn btn-primary" :disabled="$v.$invalid" @click.prevent="changePassword"> Changer mot de passe </button>
    </form>
   <br> <button class="btn btn-danger" @click.prevent="displayDeleteMessage = !displayDeleteMessage"> Danger zone </button>

   <div class="deleteMessage" v-if="displayDeleteMessage">
       <h3>Voulez-vous vraiment supprimer le compte ?</h3>
       <div class="form-group">
           <label for="passwordDeleteAccount">Tapez votre mot de passe :</label>
           <input type="password" class="form-control" placeholder="Votre mot de passe" v-model="passwordDeleteAccount">
           <button class="btn btn-danger" @click.prevent="deleteAccount"> Supprimer le compte </button>
       </div>
   </div>
</div>

</template>

<script>
import axios from 'axios'
import { required, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            isAlert: true,
            isAlertPassword: false,
            feedbackMessageAvatar: '',
            feedbackMessagePassword: '',
            passwordDeleteAccount: '',
            displayDeleteMessage: false,
            imgIsChecked: false, 
            img : {
                size: 0, 
                height: 0, 
                width: 0, 
                url: this.$store.state.avatarUser
            },
            typedCurrentPassword: '',
            newPassword:'', 
            confirmNewPassword:''
        }
    },
    validations: {
        typedCurrentPassword: {
            required,
            maxLength: maxLength(60), 
            minLength: minLength(2),
            syntaxe: value => {
                return /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-]{1,}$/.test(value);
            }
        },
        newPassword: {
            required,
            maxLength: maxLength(60), 
            minLength: minLength(8),
            syntaxe: value => {
                return /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-]{1,}$/.test(value);
            }
        },
        confirmNewPassword: {
            required,
            sameAsPassword: sameAs('newPassword')
        }
    },
    methods: {
        checkImage() {
            let imageToCheck = this.$refs.file.files[0];
            const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

            if(!imageToCheck || imageToCheck.type.indexOf('image/') !== 0) {
                this.feedbackMessageAvatar = "Erreur dans le type de fichier";
                this.isAlert = true; 
                this.imgIsChecked = false;
                return;
            }

            if(!allowedTypes.includes(imageToCheck.type)){
                this.feedbackMessageAvatar = "Seules sont autorisées les images jpg, jpeg, png et gif"
                this.isAlert = true; 
                this.imgIsChecked = false; 
                return;
            }

            this.img.size = imageToCheck.size / 1000;

            if(this.img.size > 1000) {
                this.feedbackMessageAvatar = "L'image transmise est trop lourde (1Mo max)";
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
                    if(this.img.height > 300 || this.img.width > 300){
                        this.feedbackMessageAvatar = "L'image doit être de taille 300x300 max";
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
        },
        changeAvatar(){
            if(this.imgIsChecked) {
                let file = this.$refs.file.files[0];
                let formData = new FormData();
                formData.append("image", file);
                formData.append("userId", this.$store.state.userId);
                formData.append("avatarActuel", this.$store.state.avatarUser);
                axios.put('http://localhost:3000/profile/avatar/', formData, { 
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }})
                .then(response => {
                    this.isAlert = false;
                    this.feedbackMessageAvatar = response.data.message;
                    this.img.size = 0;
                    this.img.height = 0; 
                    this.img.width = 0;
                    this.imgIsChecked = false;
                    this.$store.dispatch('getInfos');
                })
                .catch (error => {
                    console.log(error);
                })
            }
        },
        changePassword(){
            let passwordObject = {
                userId: this.$store.state.userId,
                currentPassword: this.typedCurrentPassword, 
                newPassword: this.newPassword
            }
            axios.put('http://localhost:3000/profile/changePassword/', passwordObject)
            .then(response => {
                this.isAlertPassword = false;
                this.feedbackMessagePassword = response.data.message;
            })
            .catch(error => {
                this.isAlertPassword = true;
                this.feedbackMessagePassword = error.response.data.message;
            })
        },
        deleteAccount() {
            let dataDeleteAccount = {
                userId: this.$store.state.userId, 
                password: this.passwordDeleteAccount
            }
            axios.put('http://localhost:3000/profile/deleteAccount/', dataDeleteAccount)
            .then(response => {
                this.$ls.clear();
                this.$store.commit('LOGOUT');
                this.$store.commit('CLEAR_STATE');
                this.$router.push('Home');
                console.log('ok cleared');
                console.log(response);
            })
            .catch(error => console.log(error.response.data.message))
        }
    }
}
</script>

<style lang="scss" scoped>
#containerProfile {
    width:80%;
    margin:auto;
}
.invalid {
  input {
    border:1px solid red;
    background-color: #ffc9aa;
  }
  label {
    color:red;
  }
  small {
    color:red;
  }
}
.deleteMessage {
    background-color: #ffc9aa;
    border: 1px solid red;
    border-radius:10px;
    margin-top: 1rem;
    margin-bottom: 1rem;
    input {
        width: 30%;
        margin:auto;
        margin-bottom: 1rem; 
    }
}
</style>