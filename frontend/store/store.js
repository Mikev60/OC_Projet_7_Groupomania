import Vue from 'vue'
import Vuex from 'vuex'
import jwt from 'jsonwebtoken'
import axios from 'axios'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        tokenToCheck: '',
        userId: '',
        isValid: 'test',
        isLogged: false,
        prenomUser: '', 
        nomUser: '', 
        pseudoUser: '', 
        emailUser: ''
    }, 
    getters: {
        isLogged: (state) => {
            return state.isLogged; 
        }
    },
    mutations: {
        CHECK_TOKEN(state) {
            try{
                jwt.verify(state.tokenToCheck, 'RANDOM_TOKEN');
                state.isValid = 'ok';
                state.isLogged = true;
                return true;
            } catch(error) {
                console.log(error);
                console.log(state.tokenToCheck);
                console.log('erreur test token'); 
                state.isValid = "expiry"; 
                state.isLogged = false;
                return false;
            }
        }
    }, actions: {
        getInfos(context) {
            axios.get('http://localhost:3000/user/getInfos/' + context.state.userId)
            .then(result => {
                this.state.prenomUser = result.data[0].prenom;
                this.state.nomUser = result.data[0].nom;
                this.state.pseudo = result.data[0].pseudo;
                this.state.email = result.data[0].email;
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
});