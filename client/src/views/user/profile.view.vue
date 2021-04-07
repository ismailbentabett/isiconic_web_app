<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12">
        <v-card class="pa-2" tile outlined>
          <userProfileComponent :userprofile="data" :userPosts="posts"/>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" lg="3">
        <v-card class="pa-2 mb-1" tile outlined>
          <bioSectionComponent  :bio="data.data.bio"/>
        </v-card>

        <v-card class="pa-2" tile outlined>
          <aboutSectionComponent :data="data"/>
        </v-card>
      </v-col>

      <v-col cols="12" lg="9">
        <v-card class="pa-2" tile outlined>
          <postsComponent :posts="posts" :user_data="data" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {GET_CURRENT_USER_DATA,GET_USER_POSTS} from '../../api_calls'
import userProfileComponent from "../../components/user/userProfile.component.vue";
import bioSectionComponent from "../../components/user/bioSection.component.vue";
import aboutSectionComponent from "../../components/user/aboutSection.component.vue";
import postsComponent from "../../components/user/postsSection.component.vue";

export default {
  name: "profileview",
  components: {
    userProfileComponent,
    bioSectionComponent,
    aboutSectionComponent,
    postsComponent,
  },
data(){
return{
  user_data : '',
bio:'',
userprofile:'',
about_data:'',
data:'',
posts:''
}
},
created: async function(){
  let user_id =      JSON.parse(this.$localStorage.get('vuex')).user_id
  const data = await GET_CURRENT_USER_DATA(user_id.user)
const posts = await GET_USER_POSTS(user_id.user)
this.data = data
this.posts = posts
},

};
</script>

<style>
</style>