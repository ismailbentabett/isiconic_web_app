<template>
  <v-container>
    <v-fab-transition v-if="isSeller == true && ihaveaatore == false">
      <v-btn color="white" fixed bottom right fab @click="createshopdgmethod()">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>

    <!---->
    <v-row no-gutters v-if="isSeller == true && ihaveaatore == true">
      <v-col cols="12">
        <v-card class="pa-2" tile outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                {{ getMyStore[0].name }}
              </v-list-item-title>

              <v-card-subtitle>ownened by : {{ username }}</v-card-subtitle>
              <v-card-subtitle
                >description : {{ getMyStore[0].description }}</v-card-subtitle
              >
            </v-list-item-content>

            <v-list-item-avatar size="300">
              <v-icon size="250" color="black">storefront</v-icon>
            </v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn
              class="ml-2 mt-5"
              outlined
              rounded
              small
              :to="{ path: '/myshop' }"
            >
              Visit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <shopsListComponent />
      </v-col>
    </v-row>
    <createShopComponent :createshopdg="createshopdg" />
  </v-container>
</template>
<script>
import axios from "axios";
import createShopComponent from "../../components/shop/createShop.component";
import { GET_CURRENT_USER_DATA, GET_ALL_STORES } from "../../api_calls";
import shopsListComponent from "../../components/shop/shopsList.component";
export default {
  components: { shopsListComponent, createShopComponent },
  data() {
    return {
      isSeller: false,
      createshopdg: false,
      ihaveaatore: false,
      mystore: [],
      username: "",
    };
  },
  methods: {
    createshopdgmethod() {
      this.createshopdg = !this.createshopdg;
    },
  },
  asyncComputed: {
    getMyStore() {
      let user_id = JSON.parse(this.$localStorage.get("vuex")).user_id;
      let useriddata = user_id.user;
      let data = axios
        .get(`http://localhost:3000/api/store/mystore/${useriddata}`, {
          withCredentials: true,
        })
        .then((result) => {
          return result.data;
        })
        .catch((err) => {
          console.log(err);
        });
      return data;
    },
  },

  created: async function () {
    let user_id = JSON.parse(this.$localStorage.get("vuex")).user_id;
    const data = await GET_CURRENT_USER_DATA(user_id.user);
    let stores = await GET_ALL_STORES();
    console.log(stores);
    this.isSeller = data.data.isSeller;
    this.username = data.data.username;
    let ids = stores.map((x) => {
      return x.userId;
    });
    this.ihaveaatore = ids.includes(user_id.user);
    console.log(this.ihaveaatore);

    console.log(data);
  },
};
</script>

<style  scoped>
</style>
