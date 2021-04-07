<template>
  <v-container pa-3 mt-5>
    <v-row no-gutters>
      <v-col cols="12" md="6" lg="4" v-for="(item, i) in GetStores" :key="i">
        <v-card class="pa-2 ma-5" tile outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                {{ item.name }}
              </v-list-item-title>

              <v-card-subtitle>ownened by : {{ item.owner }}</v-card-subtitle>
              <v-card-subtitle class="text-no-wrap"
                >description : {{ item.description }}</v-card-subtitle
              >
            </v-list-item-content>

            <v-list-item-avatar size="100">
              <v-icon size="100" color="black">storefront</v-icon>
            </v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn
              class="ml-2 mt-5"
              outlined
              rounded
              small
              :to="{ path: `/shop/${item.id}` }"
            >
              Visit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { GET_ALL_STORES, GET_CURRENT_USER_DATA } from "../../api_calls";
export default {
  data: () => ({
    stores: [],
    items: [
      {
        color: "white",
        src: "storefront",
        title: "Store Name",
        artist: "owned by : Ismail Bentabet",
      },
    ],
  }),
  asyncComputed: {
    async GetStores() {
      let data = await GET_ALL_STORES();
      data.map(async (x) => {
        let user = await GET_CURRENT_USER_DATA(x.userId);

        this.stores.push({
          name: x.name,
          description: x.description,
          owner: user.data.username,
          id: x._id,
        });
      });
      return this.stores;
    },
  },
};
</script>

<style>
</style>