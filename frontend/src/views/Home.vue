<template>
  <div class="home">
    <p>token actuel : {{ tokenToCheck }}</p>
    <p>{{ isValid }}</p>
    <p>{{ this.$store.state.isLogged }}</p>
    <p> {{ test }} </p>
    <div class="alert alert-success" v-if="loggedIn"><p>Tu es connecté</p></div>
    <h1>Groupomania, le réseau social de votre entreprise</h1>
    <div id="conteneur">
      <div id="accueil">A compléter</div>
      <div id="form-connexion">
        <h2>Déjà enregistré ? Connectez-vous</h2>
         <div class="alert" :class="{'alert-danger': isAlert, 'alert-success': !isAlert}" v-if="errorMessage != ''">{{ errorMessage }}</div>
        <form>
          <div class="form-group" :class="{invalid: $v.pseudo.$error}">
          <label for="pseudo">Pseudo</label>
          <input type="text" placeholder="Votre pseudo" class="form-control" v-model="pseudo" @blur="$v.pseudo.$touch()">
          <small v-if="!$v.pseudo.minLength" class="form-text">Le nom doit contenir au moins 2 caractères</small>
          <small v-if="!$v.pseudo.syntaxe && pseudo != ''" class="form-text">Le pseudo contient des caractères non autorisés</small>
          </div>
          <div class="form-group" :class="{invalid: $v.password.$error}">
          <label for="password">Votre mot de passe</label>
          <input type="password" placeholder="Votre mot de passe" class="form-control" v-model="password" @blur="$v.password.$touch()">
          <small v-if="!$v.password.minLength" class="form-text">Le password doit contenir au moins 2 caractères</small>
          <small v-if="!$v.password.syntaxe && password != ''" class="form-text">Le password contient des caractères non autorisés</small>
          </div>
          <button class="btn btn-primary" :disabled="$v.$invalid" @click.prevent="login">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import axios from 'axios'

export default {

  name: 'Home',
  data() {
    return {
      pseudo: '', 
      test: this.$ls.get('token'), 
      password: '', 
      errorMessage:'',
      token: '',
      isAlert: false,
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.isLogged; 
    }, 
    isValid(){
      return this.$store.state.isValid;
    },
    tokenToCheck() {
      return this.$store.state.tokenToCheck;
    }
  },
  methods: {
    login() {
      let user = {
        pseudo: this.pseudo,
        password: this.password
      }
      axios.post('http://localhost:3000/user/login/', user)
        .then((response) => {
          this.errorMessage = response.data.message;
          this.$ls.set('token', response.data.token);
          this.isAlert = false;
          this.$router.push('Wall');
        })
        .catch(error => { 
          console.log(error.response.data.message);
          this.errorMessage = error.response.data.message;
          this.isAlert = true;  
          });
    }
  }, 
  validations: {
    pseudo: {
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
  }
}
</script>

<style lang="scss" scoped>
#conteneur {
  display:flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  width: 100%;

}
h1 {
  margin-top: 1rem;
  margin-bottom: 3rem; 
}
#accueil {
  margin:auto; 
}
#form-connexion {
  margin:auto; 
  padding: 1rem; 
  border: 1px solid rgb(121, 111, 111);
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
