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
            <v-col cols="12" lg="6" class="pa-10 d-flex justify-center">
              <v-btn small outlined elevation="0" :to="{path:'/profile/edit'}">
                <v-icon dark left > edit </v-icon>
                Edit
              </v-btn>
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
 
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script> 
import {GET_POST_IMAGE_ARRAY} from '../../api_calls'
export default {
  props: ["userprofile", "userPosts"],
  data() {
    return {
      followers_number: "",
      followings_number: "",
      username: "",
    };
  },
  computed: {
    getdata() {
      const thedata = this.$props.userprofile;
      return thedata.data;
    },
    getposts() {
      const thedata = this.$props.userPosts;
      let data =  thedata.map(x=>{
        return x
      });

      return data
    },
        getImage(){
      //http://localhost:3000/api/image/user/display/profile_image
          const thedata = this.$props.userprofile;
             return `http://localhost:3000/api/image/user/display/${thedata.data.image}`;
    
    },
  },
  created:async function(){
    console.log(this.$props.userPosts[0]._id)
      let data = await GET_POST_IMAGE_ARRAY(this.$props.userPosts[0]._id)
      console.log(data)
  }
};
</script>

<style>
</style>