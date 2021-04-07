<template>
  <v-container pa-3 mt-5>
    <editPostComponent :editProductpopup="producteditialogue" :productId="productId"/>
    <v-row>
      <v-col v-for="item in getPRoduct" :key="item._id" cols="12" >
        <br />
        <v-card elevation="0">
          <v-carousel
            v-if="item.image.length > 0"
            :continuous="false"
            :cycle="cycle"
            :show-arrows="false"
            hide-delimiter-background
            delimiter-icon="mdi-minus"
            height="400"
          >
            <v-carousel-item
              v-for="(img, i) in item.image"
              :key="i"
              :src="img"
              reverse-transition="fade-transition"
              transition="fade-transition"
            ></v-carousel-item>
          </v-carousel>
          <v-card-title> {{ item.name }} </v-card-title>

          <v-card-title> Price : {{ item.price }}$</v-card-title>
          <v-card-subtitle> {{ item.quantity }} in Stock </v-card-subtitle>
          <v-card-text>{{ item.description }}</v-card-text>

          <v-card-text>
            <v-chip-group
              v-model="selection"
              active-class="deep-purple accent-4 white--text"
              column
            >
              <v-chip>{{ item.category }}</v-chip>
              <v-chip>{{ item.Subcategory }}</v-chip>
            </v-chip-group>
          </v-card-text>
          <v-card-actions>
       
            <v-spacer></v-spacer>
             <v-btn class="ml-2 mt-5 mx-auto" outlined rounded small @click="openeditedpostid(item.id)">
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn class="ml-2 mt-5 mx-auto" outlined rounded small @click="deleteProduct(item.id)">
              <v-icon>delete</v-icon>
            </v-btn>
            
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import editPostComponent from './editProduct.component'
import axios from "axios";
import {DELETE_A_PRODUCT} from '../../api_calls'
export default {
  props: ["storeId"],
  components:{editPostComponent},
  data() {
    return {
      name: "Black Shoes for Men",
      rating: 3,
      price: 57.0,
      reduc: 0.5,
      color: "grey lighten-2",
      producteditialogue: false,
      products: [],
      productId:''

    };
  },
  methods:{
    openeditedpostid(id){
this.producteditialogue = !this.producteditialogue
this.productId = id
    },
    deleteProduct:async function(id){
     await DELETE_A_PRODUCT(id);
    }
  },
  computed: {
    display_price() {
      return this.price * this.reduc;
    },
  },
  asyncComputed: {
    async getPRoduct() {
      let data = await axios
        .get(`http://localhost:3000/api/product/user/${this.$props.storeId}`, {
          withCredentials: true,
        })
        .then((result) => {
          return result.data;
        })
        .catch((err) => {
          console.log(err);
        });
      data.map((x) => {
        let productimg = x.image.map((img) => {
          return `http://localhost:3000/api/image/product/display/${img}`;
        });
        this.products.push({
          id: x._id,
          name: x.name,
          description: x.description,
          image: productimg,
          category: x.category,
          Subcategory: x.Subcategory,
          price: x.price,
          quantity: x.quantity,
        });
      });
      console.log(this.products);
      return this.products;
    },
  },
};
</script>
<style>
</style>
