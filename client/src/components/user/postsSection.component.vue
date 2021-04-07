<template>
  <v-card elevation="0">
    <v-tabs v-model="tab" align-with-title>
      <v-tabs-slider color="yellow"></v-tabs-slider>

      <v-tab v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item  key="Posts">
        <v-card flat color="grey lighten-3">
          <v-container fluid>
            <v-row>
              <v-col  cols="12" >
             
                   <Post :data="getposts" :user_data="datatopost"/>
                  
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-tab-item>
           <v-tab-item key="Products">
        <v-card flat color="grey lighten-3">
          <v-container fluid>
            <v-row>
              <v-col  cols="12" >
               <Product  :storeId="datatopost.data._id"/>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>

import Post from './post.component'
import Product from './user_product.component'
 export default {
   props:["posts","user_data"],
    data() {
    return {
      datatopost:'',
      tab: null,
      items: ["Posts", "Products"],
      data:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
components:{Post,Product},
created(){
this.datatopost = this.$props.user_data
console.log(this.datatopost.data._id)

},
computed:{
  getposts(){

    return this.$props.posts
    
    }
}
 }
</script>

<style>
</style>