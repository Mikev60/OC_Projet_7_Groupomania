<template>
  <form>
    <div>{{ this.$store.state.isLogged }}</div>
    <div class="alert" :class="{'alert-danger': isAlert, 'alert-success': !isAlert}" v-if="errorMessage != ''">{{ errorMessage }}</div>
    <div class="form-group" :class="{invalid:$v.nomUtilisateur.$error}">
    <label for="nomUtilisateur">Nom d'utilisateur</label> <br>
    <input type="text" placeholder="Nom d'utilisateur" id="nomUtilisateur" class="form-control" v-model="nomUtilisateur" @blur="$v.nomUtilisateur.$touch()">
    <small v-if="!$v.nomUtilisateur.minLength" id="emailHelp" class="form-text">Le nom d'utilisateur doit contenir au moins 2 caractères</small>
    <small v-if="!$v.nomUtilisateur.syntaxe && nomUtilisateur != ''" id="emailHelp" class="form-text">Le nom d'utilisateur contient des caractères non autorisés</small>
    </div>
    <div class="form-group" :class="{invalid:$v.nom.$error}">
    <label for="nom">Nom</label> <br>
    <input type="text" placeholder="Nom" id="nom" class="form-control" v-model="nom" @blur="$v.nom.$touch()">
    <small v-if="!$v.nom.minLength" id="emailHelp" class="form-text">Le nom doit contenir au moins 2 caractères</small>
    <small v-if="!$v.nom.syntaxe && nom != ''" id="nomHelp" class="form-text">Le nom contient des caractères non autorisés</small>
  </div>
  <div class="form-group" :class="{invalid:$v.prenom.$error}">
    <label for="prenom">Prénom</label> <br>
    <input type="text" placeholder="Prénom" id="prenom" class="form-control" v-model="prenom" @blur="$v.prenom.$touch()"> {{ prenom }}
    <small v-if="!$v.prenom.minLength" id="emailHelp" class="form-text">Le prénom doit contenir au moins 2 caractères</small>
    <small v-if="!$v.prenom.syntaxe && prenom != ''" id="nomHelp" class="form-text">Le prénom contient des caractères non autorisés</small>
  </div>
  <div class="form-group" :class="{invalid: $v.email.$error}">
    <label for="email">Adresse e-mail</label> <br>
    <input type="email" placeholder="Adresse e-mail" id="email" class="form-control" v-model="email" @blur="$v.email.$touch()">
    <small v-if="!$v.email.email" id="emailHelp" class="form-text">L'adresse email fournie est invalide. Merci de respecter le format nom@hebergeur.extension</small>
  </div>
  <div class="form-group" :class="{invalid: $v.password.$error}">
    <label for="password">Mot de passe</label> <br>
    <input type="password" placeholder="Mot de passe" id="password" class="form-control" v-model="password" @blur="$v.password.$touch()">
    <small v-if="!$v.password.minLength" id="emailHelp" class="form-text">Le mot de passe doit contenir au moins 2 caractères</small>
    <small v-if="!$v.password.syntaxe && password != ''" id="nomHelp" class="form-text">Le password contient des caractères non autorisés</small>
  </div>
  <div class="form-group" :class="{invalid: $v.confirmation.$error}">
    <label for="passwordConfirm">Confirmation du mot de passe</label> <br>
    <input type="password" placeholder="Confirmez le mot de passe" id="passwordConfirm" class="form-control" v-model="confirmation" @blur="$v.confirmation.$touch()">
    <small v-if="!$v.confirmation.sameAsPassword && confirmation != ''" id="nomHelp" class="form-text">La confirmation n'est pas identique au mot de passe {{ $v.confirmation.syntaxe }}</small>
  </div>
    <button class="btn btn-primary" :disabled="$v.$invalid" @click.prevent="signUpUser">S'inscrire</button>
  </form>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
  data() {
    return {
      nomUtilisateur: '',
      email: '',
      nom: '',
      prenom:'',
      password: '',
      confirmation: '',
      errorMessage: '', 
      isAlert: false
    }
  },
  validations: {
    email: {
      required,
      email
    },
    nomUtilisateur: {
      required,
      minLength: minLength(2),
      syntaxe: value => {
        return /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-]{1,}$/.test(value);
      }
    },
    nom: {
      required,
      minLength: minLength(2),
      syntaxe: value => {
        return /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-]{1,}$/.test(value);
      }
    },
      prenom: {
        required,
        minLength: minLength(2),
        syntaxe: value => {
          return /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-]{1,}$/.test(value);
        }
    },
      password: {
        required,
        minLength: minLength(2),
        syntaxe: value => {
          return /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-]{1,}$/.test(value);
        }
    },
    confirmation: {
      required,
      sameAsPassword: sameAs('password')
    }
  }, 
  methods: {
    signUpUser() {
        let user = {
        nom: this.nom,
        prenom: this.prenom,
        pseudo: this.nomUtilisateur,
        email: this.email,
        password: this.password
      }
      console.log(user); 
      axios.post('http://localhost:3000/user/signup/', user)
        .then((response) => {
          this.errorMessage = response.data.message;
          this.isAlert = false;
          setTimeout(() => {
            this.$router.push({ path: '/' })  
          }, 2000)
          console.log('ok'); 
          console.log(response);
        })
        .catch(error => { 
          console.log(error.response.data.message);
          this.errorMessage = error.response.data.message;
          this.isAlert = true;  
          console.log("nok");
          });
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  margin-top:1rem;
  width: 40%;
  margin-left:auto;
  margin-right: auto;
}
.btn {
  margin-top:1rem;
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
</style>
