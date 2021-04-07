<template>
  <v-container pa-3 mt-5>
    <editQyantityComponent :quantitydg="quantitydg"  :productdataprop="productdata"/>
    <v-row>
        
      <v-col cols="12" lg="6" order="1">
        <v-card min-height="300" elevation="0" outlined>
          <v-toolbar extended elevation="0">
            <v-toolbar-title>
              <v-icon> shopping_cart </v-icon>
              My Cart
            </v-toolbar-title>
          </v-toolbar>
          <v-list three-line>
            <template v-for="item in get_cart_data.products">
              <v-divider :key="item.title"></v-divider>

              <v-list-item :key="item.title">
                <v-list-item-avatar>
                  <v-icon color="grey lighten-1">category</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{item.name}}</v-list-item-title>
                  <v-list-item-subtitle> price : {{item.price}}$ </v-list-item-subtitle>
                  <v-list-item-subtitle> quantity : {{item.quantity}} </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon>
                    <v-icon color="grey lighten-1" @click="openQuantityDG(item)">edit</v-icon>
                  </v-btn>
                  <v-btn icon @click="deletefromcart(item)">
                    <v-icon color="grey lighten-1">delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </template>
            <v-list-item>
              <v-list-item-avatar>
                <v-icon color="grey lighten-1">local_offer</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Total</v-list-item-title>
                <v-list-item-subtitle> {{calculateTotal}}$ </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" lg="6" order="2" order-sm="2">
        <v-card min-height="300" elevation="0" outlined>
          <v-card-title class="headline">Checkout</v-card-title>
          <v-stepper v-model="e13" vertical class="elevation-0">
            <v-stepper-step step="1" complete class="elevation-0" color="black">
              Name of step 1
            </v-stepper-step>

            <v-stepper-content step="1" class="elevation-0">
              <v-card
                color="grey lighten-1"
                class="mb-12"
                height="200px"
                elevation="0"
              ></v-card>
              <v-btn color="dark" @click="e13 = 2"> Continue </v-btn>
              <v-btn text> Cancel </v-btn>
            </v-stepper-content>

            <v-stepper-step step="2" complete color="black">
              Name of step 2
            </v-stepper-step>

            <v-stepper-content step="2">
              <v-card
                color="grey lighten-1"
                class="mb-12"
                height="200px"
              ></v-card>
              <v-btn color="dark" @click="e13 = 3"> Continue </v-btn>
              <v-btn text> Cancel </v-btn>
            </v-stepper-content>

            <v-stepper-step step="1" complete class="elevation-0" color="black">
              Ad templates
            </v-stepper-step>

            <v-stepper-content step="3">
              <v-card
                color="grey lighten-1"
                class="mb-12"
                height="200px"
              ></v-card>
              <v-btn color="dark" @click="e13 = 4"> Continue </v-btn>
              <v-btn text> Cancel </v-btn>
            </v-stepper-content>

            <v-stepper-step step="4" color="black">
              View setup instructions
            </v-stepper-step>

            <v-stepper-content step="4">
              <v-card
                color="grey lighten-1"
                class="mb-12"
                height="200px"
              ></v-card>
              <v-btn color="dark" @click="e13 = 1"> Continue </v-btn>
              <v-btn text> Cancel </v-btn>
            </v-stepper-content>
          </v-stepper>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import editQyantityComponent from './editCartProduct.component'
import { GET_CART_DATA,DELETE_FROM_CART } from "../../api_calls";
export default {
  components:{editQyantityComponent},
  data: () => ({
    e13: 1,
    total:null,
    productdata:'',
    quantitydg:false
  }),

methods:{
  openQuantityDG(productdata){
    this.quantitydg = !this.quantitydg
    
    this.productdata = productdata
  },

  async deletefromcart(payload ){
          let user_id = JSON.parse(this.$localStorage.get("vuex")).user_id;
  let user_id_data = user_id.user 
  let data = 
    {
         productId: payload.productId,
         quantity: payload.quantity,
         name: payload.name,
         price: payload.price
       }
  await DELETE_FROM_CART(user_id_data,data)
  }
}
,


 


  asyncComputed: {
    async get_cart_data() {
      let user_id = JSON.parse(this.$localStorage.get("vuex")).user_id;
      let user_id_data = user_id.user;
      let data = await GET_CART_DATA(user_id_data);
     
return data 

},
async calculateTotal(){
  
      let user_id = JSON.parse(this.$localStorage.get("vuex")).user_id;
      let user_id_data = user_id.user;
      let data = await GET_CART_DATA(user_id_data);

 data.products.forEach(x=>{
   this.total+= x.price
 })
 return this.total
}

  },
};
</script>
<style>
</style>