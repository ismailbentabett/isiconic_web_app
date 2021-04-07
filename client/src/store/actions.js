import axios from 'axios';
import router from '../router/index'
import Vue from 'vue'


export default {

  async SIGN_UP({
    commit
  }, {
    username,
    email,
    password
  }, ) {
    axios.post('http://localhost:3000/auth/signup', {
        username: username,
        email: email,
        password: password

      }, {
        withCredentials: true
      })
      .then((result) => {
        commit('SAVE_USER_ID', result.data)
        commit('USER_STATE', true)
        router.push("/");

      })
      .catch(e => {

        console.log(e)
      })



  },

  async LOG_IN({
    commit,
  }, {
    email,
    password
  }) {
    axios.post('http://localhost:3000/auth/login', {
        email: email,
        password: password

      }, {
        withCredentials: true
      })
      .then((result) => {
        commit('SAVE_USER_ID', result.data)
        commit('USER_STATE', true)
        router.push("/");


      })
      .catch(e => {

        console.log(e)
      })



  },


  async LOG_OUT({
    commit
  }) {
    axios.get('http://localhost:3000/auth/logout', {
        withCredentials: true
      })
      .then(() => {
        commit('USER_STATE', false)
        Vue.localStorage.remove('vuex')


        router.push("/login");

      })
      .catch(e => {

        console.log(e)
      })
  },


}