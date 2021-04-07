import Vue from 'vue'
import VueRouter from 'vue-router'


import feedView from '../views/feed/feed.view.vue'
import chatView from '../views/chat/chat.view.vue'
import profileView from '../views/user/profile.view.vue'
import loginView from '../views/login.view.vue'
import signupView from '../views/signup.view.vue'
import shopView from '../views/shop/shop.view.vue'
import discoverView from '../views/discover.view.vue'
import shopComponent from '../components/shop/shop.component.vue'
import public_shopComponent from '../components/shop/public_shop.component.vue'
import cartComponent from '../components/shop/cart.component.vue'
import productComponent from '../components/shop/product.component.vue'
import user_public from '../views/user/user_public.view.vue'
import profileedit from '../views/user/EditProfile.view.vue'
import PageNotFound from '../views/noFound404.view.vue'
import chatdata from '../components/chat/chatSend.component'
import editShopView from '../views/shop/editShop.view.vue'
import tagComponent from '../components/tags/tags.component.vue'
Vue.use(VueRouter)

const routes = [{
    path: "*",
    component: PageNotFound,
    beforeEnter(to, from, next) {
      // check vuex store //


     if(Vue.localStorage.get('vuex') === null){
      next({
        name: "loginview"
      });
     }else {
   
        next();
    
      
     }
    }
  },
  {
    path: '/tag/:tag',
    component: tagComponent,
    beforeEnter(to, from, next) {
      // check vuex store //


     if(Vue.localStorage.get('vuex') === null){
      next({
        name: "loginview"
      });
     }else {
   
        next();
    
      
     }
    }
  },
  {
    path: '/profile/edit',
    component: profileedit,
    beforeEnter(to, from, next) {
      // check vuex store //


     if(Vue.localStorage.get('vuex') === null){
      next({
        name: "loginview"
      });
     }else {
   
        next();
    
      
     }
    }
  }

  ,
  {
    path: '/user/:id',
    component: user_public,
     beforeEnter(to, from, next) {
      // check vuex store //


     if(Vue.localStorage.get('vuex') === null){
      next({
        name: "loginview"
      });
     }else {
   
        next();
    
      
     }
    } 
  },



  {


    path: '/discover',
    component: discoverView,
       beforeEnter(to, from, next) {
      // check vuex store //

      let vuex = Vue.$cookies.get('loggedin')
       if(vuex == 'false'){
        Vue.localStorage.remove('vuex')

         next({
        name: "loginview"
      });
      }
        


     if(Vue.localStorage.get('vuex') === null){
      next({
        name: "loginview"
      });
     }else if(vuex == 'true'){
   
        next();
    
      
     }
    } 
  },
  {
    path: '/myshop/edit',
    component: editShopView,
       beforeEnter(to, from, next) {
      // check vuex store //

      let vuex = Vue.$cookies.get('loggedin')
       if(vuex == 'false'){
        Vue.localStorage.remove('vuex')

         next({
        name: "loginview"
      });
      }
        


     if(Vue.localStorage.get('vuex') === null){
      next({
        name: "loginview"
      });
     }else if(vuex == 'true'){
   
        next();
    
      
     }
    } 
  },
  {
    path: '/myshop',
    component: shopComponent,
       beforeEnter(to, from, next) {
      // check vuex store //

      let vuex = Vue.$cookies.get('loggedin')
       if(vuex == 'false'){
        Vue.localStorage.remove('vuex')

         next({
        name: "loginview"
      });
      }
        


     if(Vue.localStorage.get('vuex') === null){
      next({
        name: "loginview"
      });
     }else if(vuex == 'true'){
   
        next();
    
      
     }
    } 
  },


  {
    path: '/shop/:id',
    component: public_shopComponent,
       beforeEnter(to, from, next) {
      // check vuex store //

      let vuex = Vue.$cookies.get('loggedin')
       if(vuex == 'false'){
        Vue.localStorage.remove('vuex')

         next({
        name: "loginview"
      });
      }
        


     if(Vue.localStorage.get('vuex') === null){
      next({
        name: "loginview"
      });
     }else if(vuex == 'true'){
   
        next();
    
      
     }
    } 
  },


  {
    path: '/cart',
    component: cartComponent,
       beforeEnter(to, from, next) {
      // check vuex store //

      let vuex = Vue.$cookies.get('loggedin')
       if(vuex == 'false'){
        Vue.localStorage.remove('vuex')

         next({
        name: "loginview"
      });
      }
        


     if(Vue.localStorage.get('vuex') === null){
      next({
        name: "loginview"
      });
     }else if(vuex == 'true'){
   
        next();
    
      
     }
    } 
  },




  {
    path: '/product',
    component: productComponent,
       beforeEnter(to, from, next) {
      // check vuex store //

      let vuex = Vue.$cookies.get('loggedin')
       if(vuex == 'false'){
        Vue.localStorage.remove('vuex')

         next({
        name: "loginview"
      });
      }
        


     if(Vue.localStorage.get('vuex') === null){
      next({
        name: "loginview"
      });
     }else if(vuex == 'true'){
   
        next();
    
      
     }
    } 
  },

  {
    path: '/',
    name: 'feedview',
    component: feedView,
     beforeEnter(to, from, next) {
      // check vuex store //

      let vuex = Vue.$cookies.get('loggedin')
       if(vuex == 'false'){
        Vue.localStorage.remove('vuex')

         next({
        name: "loginview"
      });
      }
        


     if(Vue.localStorage.get('vuex') === null){
      next({
        name: "loginview"
      });
     }else if(vuex == 'true'){
   
        next();
    
      
     }
    } 
  },
  {
    path: '/chat',
    name: 'chatview',
    component: chatView,
       beforeEnter(to, from, next) {
      // check vuex store //

      let vuex = Vue.$cookies.get('loggedin')
       if(vuex == 'false'){
        Vue.localStorage.remove('vuex')

         next({
        name: "loginview"
      });
      }
        


     if(Vue.localStorage.get('vuex') === null){
      next({
        name: "loginview"
      });
     }else if(vuex == 'true'){
   
        next();
    
      
     }
    } 
  },
  {
    path: '/chat/:room_id',
    name: 'chatdataview',
    component: chatdata,
       beforeEnter(to, from, next) {
      // check vuex store //

      let vuex = Vue.$cookies.get('loggedin')
       if(vuex == 'false'){
        Vue.localStorage.remove('vuex')

         next({
        name: "loginview"
      });
      }
        


     if(Vue.localStorage.get('vuex') === null){
      next({
        name: "loginview"
      });
     }else if(vuex == 'true'){
   
        next();
    
      
     }
    } 
  },
  {
    path: '/profile',
    name: 'profileview',
    component: profileView,

       beforeEnter(to, from, next) {
      // check vuex store //

      let vuex = Vue.$cookies.get('loggedin')
       if(vuex == 'false'){
        Vue.localStorage.remove('vuex')

         next({
        name: "loginview"
      });
      }
        


     if(Vue.localStorage.get('vuex') === null){
      next({
        name: "loginview"
      });
     }else if(vuex == 'true'){
   
        next();
    
      
     }
    } 
  },
  {
    path: '/login',
    name: 'loginview',
    component: loginView,
    beforeEnter(to, from, next) {
      // check vuex store //
      let vuex = Vue.$cookies.get('loggedin')

     if(Vue.localStorage.get('vuex') != null && vuex == 'true'){
      next({
        name: "feedview"
      });
     }else if(vuex == 'false'){
   
      
        next();
    
      
     }
    } 
  },
  {
    path: '/signup',
    name: 'signupview',
    component: signupView,
    beforeEnter(to, from, next) {
      // check vuex store //
      let vuex = Vue.$cookies.get('loggedin')

     if(Vue.localStorage.get('vuex') != null && vuex == 'true'){
      next({
        name: "feedview"
      });
     }else if(vuex == 'false'){
   
      
        next();
    
      
     }
    }
  },
  {
    path: '/shopslist',
    name: 'shopview',
    component: shopView,
       beforeEnter(to, from, next) {
      // check vuex store //

      let vuex = Vue.$cookies.get('loggedin')
       if(vuex == 'false'){
        Vue.localStorage.remove('vuex')

         next({
        name: "loginview"
      });
      }
        


     if(Vue.localStorage.get('vuex') === null){
      next({
        name: "loginview"
      });
     }else if(vuex == 'true'){
   
        next();
    
      
     }
    } 
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router