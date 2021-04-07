<template>
  <v-row justify="center">
    <v-dialog v-model="this.$props.quantitydg" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{this.$props.productdataprop.name}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" >
                <v-slider
                  v-model="setQuantity"
                  :rules="rules"
                  label="Quantity?"
                  
                  step="1"
                  thumb-label="always"
                  ticks
                ></v-slider>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="UpdateQuantity()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from 'axios'
export default {
  props: ["quantitydg", "productdataprop"],
  data() {
    return {
      value: 0,
    };
  },
  asyncComputed: {
    setQuantity() {
      this.value = this.$props.productdataprop.quantity;
      return this.value;
    },
  },
  methods:{
     async  UpdateQuantity(){
            let user_id = JSON.parse(this.$localStorage.get("vuex")).user_id;
      let user_id_data = user_id.user;
   await  axios.put(`http://localhost:3000/api/cart/update/${user_id_data}/${this.$props.productdataprop.productId}`, {
    quantity:this.setQuantity,
    
          productId:this.$props.productdataprop.productId,
        name:this.$props.productdataprop.name,
        price:this.$props.productdataprop.price,
       }, {
         withCredentials: true,
 
       },
 
     )
     .then((result) => {
       console.log(result)
       return result
 
     })
     .catch(e => {
       console.log(e)
     })

      }
  }
};
</script>

<style>
</style>