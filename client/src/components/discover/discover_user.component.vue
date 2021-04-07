<template>
  <v-container pa-3 mt-5>
    <v-row no-gutters>
      <v-col cols="12" md="6" lg="4" v-for="(item, i) in users" :key="i">
        <v-card class="ma-5" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                {{ item.username }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ item.email }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar
              size="60"
              v-if="
                item.image ==
                'http://localhost:3000/api/image/user/display/null'
              "
              color="white"
            >
              <v-btn icon outlined :to="{ path: `/user/${item.id}` }">
                <v-icon color="black" size="60"> mdi-account-circle </v-icon>
              </v-btn>
            </v-list-item-avatar>
            <v-list-item-avatar size="60" v-else>
              <img :src="item.image" />
            </v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn outlined rounded text :to="{path:`user/${item.id}`}"> visit </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {ADD_TO_CART} from '../../api_calls'

import { GET_ALL_USERS } from "../../api_calls";
export default {
  
  asyncComputed: {
    async users() {
      let data = await GET_ALL_USERS();

      let result = data.data.map((x) => {
        return {
          username: x.username,
          image: `http://localhost:3000/api/image/user/display/${x.image}`,
          email: x.email,
          id: x._id,
        };
      });
      return result;
    },
  },
    methods:{
     addToCart:async function(data){
          let user_id = JSON.parse(this.$localStorage.get("vuex")).user_id;
  let user_id_data = user_id.user 

let payload = {
      productId:data.id,
    quantity:1,
    name:data.name,
    price:data.price
}
console.log(payload)
console.log(user_id_data)
  await ADD_TO_CART(user_id_data,payload)
    }
  },
};
</script>

<style>
</style>