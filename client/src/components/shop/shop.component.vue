<template>
  <v-container class="mt-10">
    <addProductComponent :addProductpg="productadddialogue" />
    <v-fab-transition>
      <v-btn color="white" fixed bottom right fab @click="addproductpd()">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-row no-gutters>
      <v-col cols="12">
        <v-card class="pa-2" tile outlined>
          <v-list-item three-line>
            <v-list-item-content>
             <v-list-item-title class="headline mb-1">
               My Store
              </v-list-item-title>
              <v-list-item-title class="headline mb-1">
                name : {{ getMyStore.name }}
              </v-list-item-title>
             
              <v-list-subtitle class="ismail" >
               <v-list-item-title class="headline mb-1">
                description
              </v-list-item-title>
                {{ getMyStore.description }}
              </v-list-subtitle>
            </v-list-item-content>

            <v-list-item-avatar tile size="300">
              <img
                style="border: 2px solid black"
                class="pa-1"
                :src="getMyStore.image"
                alt=""
              />
            </v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn outlined rounded text :to="{ path: '/myshop/edit' }"
              ><v-icon left>edit</v-icon> Edit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <productComponent :storeId="getMyStore._id" />
  </v-container>
</template>
<script>
import productComponent from "./product.component";
import addProductComponent from "./addProduct.component";
import axios from "axios";
export default {
  components: { addProductComponent, productComponent },
  data() {
    return {
      name: "Black Shoes for Men",
      rating: 3,
      price: 57.0,
      reduc: 0.5,
      color: "grey lighten-2",
      productadddialogue: false,
    };
  },
  computed: {
    display_price() {
      return this.price * this.reduc;
    },
  },
  methods: {
    addproductpd() {
      this.productadddialogue = !this.productadddialogue;
    },
    colchange() {
      this.color = this.color === "blue" ? "grey lighten-2" : "blue";
    },
  },
  asyncComputed: {
    async getMyStore() {
      let user_id = JSON.parse(this.$localStorage.get("vuex")).user_id;
      let useriddata = user_id.user;
      console.log(useriddata);
      let data = await axios
        .get(`http://localhost:3000/api/store/mystore/${useriddata}`, {
          withCredentials: true,
        })
        .then((result) => {
          return result.data[0];
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(data);
      return {
        name: data.name,
        description: data.description,
        image: `http://localhost:3000/api/image/store/display/${data.image}`,
        _id: data._id,
      };
    },
  },
};
</script>


<style scoped>
.ismail {
  -webkit-line-clamp: unset !important;
  white-space: normal;
}
</style>