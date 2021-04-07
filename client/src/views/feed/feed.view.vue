<template>
  <v-container pa-3 mt-5>
    <v-row>
      <v-col cols="12" sm="8" order="1">
        <storiesComponent />
        <createPostComponent :data="user_data" />

        <v-container>
          <postComponent :posts="newAllPosts" />
        </v-container>
      </v-col>
      <v-col cols="12" sm="4" order="-1" order-sm="2">
        <v-card min-height="300" elevation="0" outlined> </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import {
  GET_CURRENT_USER_DATA,
  GET_USER_POSTS,
  GET_ALL_POSTS,
} from "../../api_calls";

import createPostComponent from "../../components/feed/createPost.component.vue";
import postComponent from "../../components/feed/post.component.vue";
import storiesComponent from "../../components/story/stories.component.vue";
export default {
  name: "feedview",
  components: {
    createPostComponent,
    postComponent,
    storiesComponent,
  },
  data() {
    return {
      newAllPosts: "",
      user_posts: "",
      user_data: "",
      user_id: "",
      allPosts: "",
    };
  },

  created: async function () {
    let user_id = JSON.parse(this.$localStorage.get("vuex")).user_id;
    const data = await GET_CURRENT_USER_DATA(user_id.user);
    const posts = await GET_USER_POSTS(user_id.user);
    this.user_data = data;
    this.user_posts = posts;
    this.user_id = this.user_data.data._id;
    let allposts = await GET_ALL_POSTS();
    /* 
     let feedPosts =  data.data.followings.filter( ()=>{
   return allposts
    })  */

    let feedposts = allposts.data.map((x) => {
      if (
        data.data.followings.includes(x.userID) == true ||
        (x.userID == this.user_id) == true
      ) {
        return x;
      }
    });

    this.allPosts = feedposts.filter((x) => {
      return x != undefined;
    });

    this.newAllPosts = this.allPosts.map((x) => {
      return {
        title: x.title,
        content: x.content,
        subTitle: x.subTitle,
        id: x._id,
        userID: x.userID,
        created_at:x.created_at,
        image:x.image,
          likes: x.likes,
          dislikes: x.dislikes,
          loves: x.loves,
          isProduct:x.isProduct,
          tags:x.tags
      };
    });
this.newAllPosts = this.newAllPosts.sort(function(a,b){
  // Turn your strings into dates, and then subtract them
  // to get a value that is either negative, positive, or zero.
  return new Date(b.created_at) - new Date(a.created_at);
});



  },
};
</script>

<style>
</style>