<template>
  <v-row no-gutters class="pa-10">
    <v-col cols="12" lg="6">
      <v-layout justify-center>
        <v-avatar
          size="200"
          v-if="getImage == 'http://localhost:3000/api/image/user/display/null'"
          color="white"
        >
          <v-icon color="black"  size="200"> mdi-account-circle </v-icon>
        </v-avatar>
        <v-avatar size="200" v-else>
          <img :src="getImage" alt="John"/>
        </v-avatar>
      </v-layout>
    </v-col>
    <v-col cols="12" lg="6" class="pa-10">
      <v-row class="mb-5">
        <v-col>
          <v-row class="mb-5">
            <v-col cols="12" lg="6" class="pa-10 d-flex justify-center">
              <span class="text-h6"> {{ getdata.username }}</span>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-divider class="mb-5 hidden-lg-and-up"></v-divider>
      <v-row class="mb-5">
        <v-col class="d-flex justify-center">
          <v-card class="pa-2 text-no-wrap" elevation="0" tile cols="12" lg="6">
            {{ getposts.length }} Posts
          </v-card>
        </v-col>
        <v-col class="d-flex justify-center">
          <v-card class="pa-2 text-no-wrap" elevation="0" tile cols="12" lg="6">
            {{ getdata.followers.length }} Followers
          </v-card>
        </v-col>
        <v-col class="d-flex justify-center">
          <v-card class="pa-2 text-no-wrap" elevation="0" tile cols="12" lg="6">
            {{ getdata.followings.length }} Followings
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="d-flex justify-center">
          <v-btn
            class="ma-2"
            outlined
            color="red"
            @click="unfollow()"
            v-if="alreadyfollowinghim"
          >
            Unfollow
            <template v-slot:loader>
              <span class="custom-loader">
                <v-icon light>mdi-cached</v-icon>
              </span>
            </template>
          </v-btn>

          <v-btn
            class="ma-2"
            color="info"
            @click="follow()"
            v-if="!alreadyfollowinghim"
          >
            Follow
            <template v-slot:loader>
              <span class="custom-loader">
                <v-icon light>mdi-cached</v-icon>
              </span>
            </template>
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { FOLLOW, UNFOLLOW } from "../../../api_calls";
export default {
  props: ["userprofile", "userPosts"],
  data() {
    return {
      followers_number: "",
      followings_number: "",
      username: "",
    };
  },
  asyncComputed: {
    async alreadyfollowinghim() {
      let sender = JSON.parse(this.$localStorage.get("vuex")).user_id.user;
      const thedata = this.$props.userprofile;
      console.log(thedata.data.username);
      return thedata.data.followers.includes(sender);
    },
    async getdata() {
      const thedata = this.$props.userprofile;
      console.log(this.$props);
      return thedata.data;
    },
    async getImage() {
      const thedata = this.$props.userprofile;
      return `http://localhost:3000/api/image/user/display/${thedata.data.image}`;
    },
    async getposts() {
      const thedata = this.$props.userPosts;
      let data = thedata.map((x) => {
        return x;
      });

      return data;
    },
  },
  created() {
    console.log(this.$props);
  },
  methods: {
    follow() {
      let sender = JSON.parse(this.$localStorage.get("vuex")).user_id.user;
      let reciever = this.$route.params.id;
      FOLLOW(this.$route.params.id, sender, reciever);
    },
    unfollow() {
      let sender = JSON.parse(this.$localStorage.get("vuex")).user_id.user;
      let reciever = this.$route.params.id;
      UNFOLLOW(this.$route.params.id, sender, reciever);
    },
  },
};
</script>

<style>
</style>
