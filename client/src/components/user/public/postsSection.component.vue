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
             
                   <Post :data="getposts" :user_data="getuserdata"/>
                  
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
               <Product :storeId="getuserdata.data._id"/>
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
import Product from './public_product.component'
 export default {
   props:["posts","user_data"],
    data() {
    return {
      nami:'',
      tab: null,
      items: ["Posts", "Products"],
      data:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
components:{Post,Product},
created(){
},
asyncComputed:{
  async getposts(){
    let data = this.$props.posts
    return data
  },
  async getuserdata(){
    let data = this.$props.user_data

return  data

  }
}
 }
</script>

<style>
</style>