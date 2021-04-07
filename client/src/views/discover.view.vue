<template>
  <v-card elevation="0">
    <v-tabs v-model="tab" align-with-title>
      <v-tabs-slider color="yellow"></v-tabs-slider>

      <v-tab v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item key="Profiles">
        <v-card flat color="grey lighten-3">
          <v-container fluid>
            <v-row>
              <v-col >
                <userComponent/>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-tab-item>
      <v-tab-item key="Products">
        <v-card flat color="grey lighten-3">
          <v-container fluid>
            <v-row>
              <v-col >
              <productComponent/>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-tab-item>
      <v-tab-item key="Posts">
        <v-card flat color="grey lighten-3">
          <v-container fluid>
            <v-row>
              <v-col>
               <postComponent/>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-tab-item>
      <v-tab-item key="Shops">
        <v-card flat color="grey lighten-3">
          <v-container fluid>
            <v-row>
              <v-col >
                <shopComponent/>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
  import shopComponent from '../components/discover/discover_shop.component'
  import userComponent from '../components/discover/discover_user.component'
  import productComponent from '../components/discover/discover_product.component'
  import postComponent from '../components/discover/discover_post.component'
export default {
  components:{shopComponent,userComponent,productComponent,postComponent},
  data() {
    return {
      tab: null,
      items: ["Profiles", "Products", "Posts", "Shops"],
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
};
</script>

<style>
</style>