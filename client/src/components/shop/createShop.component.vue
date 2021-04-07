<template>
  <v-row justify="center">
    <v-dialog
      v-model="this.$props.createshopdg"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Create a Shop</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="storeName"
                  :rules="nameRules"
                  label="storeName"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  v-model="storeDescription"
                  clearable
                  clear-icon="mdi-close-circle"
                  label="Description"
                ></v-textarea>
              </v-col>
              <v-col cols="12"> </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="createshopdg = !createshopdg"
          >
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="createStore()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";
export default {
  props: ["createshopdg"],
  data() {
    return {
      storeName: "",
      storeDescription: "",
    };
  },
  methods: {
    createStore: async function () {
      let user_id = JSON.parse(this.$localStorage.get("vuex")).user_id;
      let useriddata = user_id.user;
      await axios
        .post(
          "http://localhost:3000/api/store",
          {
            name: this.storeName,
            description: this.storeDescription,
            userId: useriddata,
          },
          {
            withCredentials: true,
          }
        )
        .then((result) => {
          console.log(result);
          let storeId = result.data._id;
          ///addStore/:userId
          axios
            .put(
              `http://localhost:3000/api/user/addStore/${useriddata}`,
              { storeId: storeId },
              {
                withCredentials: true,
              }
            )
            .then((result2) => {
              console.log(result2);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>