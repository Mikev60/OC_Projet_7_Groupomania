import Vue from 'vue'
import Vuex from 'vuex'
import jwt from 'jsonwebtoken'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        tokenToCheck: '',
        isValid: 'test',
        isLogged: false,
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
    }
});