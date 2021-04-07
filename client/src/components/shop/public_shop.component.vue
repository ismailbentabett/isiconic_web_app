<template>
  <v-container class="mt-10">

    <v-row no-gutters>
      <v-col cols="12">
        <v-card class="pa-2" tile outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">"Time To Get That Dolla"</div>
              <v-list-item-title class="headline mb-1">
                {{ getMyStore.name }}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="300"
              color="grey"
            ></v-list-item-avatar>
          </v-list-item>

<!--           <v-card-actions>
            <v-btn outlined rounded text> Contact Owner <v-icon right>message</v-icon> </v-btn>
          </v-card-actions> -->
        </v-card>
      </v-col>
    </v-row>
<PubproductComponent :storeId="getMyStore._id"/>
  </v-container>
</template>
<script>
import PubproductComponent from './public_product.component'
import {GET_CURRENT_USER_DATA} from '../../api_calls'
import axios from "axios";
export default {
  components:{PubproductComponent},
  data() {
    return {
      name: "Black Shoes for Men",
      rating: 3,
      price: 57.0,
      reduc: 0.5,
      color: "grey lighten-2",
      productadddialogue:false,
    };
  },
  computed: {
    display_price() {
      return this.price * this.reduc;
    },
  },
  methods: {

    colchange() {
      this.color = this.color === "blue" ? "grey lighten-2" : "blue";
    },
  },
  asyncComputed: {
    async getMyStore() {
          let useriddata = this.$route.params.id

 
      console.log(useriddata);
      let data = await axios
        .get(`http://localhost:3000/api/store/${useriddata}`, {
          withCredentials: true,
        })
        .then((result) => {
          return result.data;
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(data);
      return data;
    },

  },

  created:async function(){
        let user_id = JSON.parse(this.$localStorage.get("vuex")).user_id;

    let data =  await GET_CURRENT_USER_DATA(user_id.user)

    if(data.data.storeId == this.$route.params.id){
      this.$router.push({path:'/myshop'})

    }
  }

};
</script>

<style>
</style>