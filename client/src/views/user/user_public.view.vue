<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12">
        <v-card class="pa-2" tile outlined>
          <userProfileComponent :userprofile="getdata" :userPosts="getposts"/>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" lg="3">
        <v-card class="pa-2 mb-1" tile outlined>
          <bioSectionComponent :bio="getbio"/>
        </v-card>

        <v-card class="pa-2" tile outlined>
          <aboutSectionComponent :data="getdata"/>
        </v-card>
      </v-col>

      <v-col cols="12" lg="9">
        <v-card class="pa-2" tile outlined>
          <postsComponent :posts="getposts" :user_data="getdata" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {GET_CURRENT_USER_DATA,GET_USER_POSTS} from '../../api_calls'
import userProfileComponent from "../../components/user/public/userProfile.component.vue";
import bioSectionComponent from "../../components/user/public/bioSection.component.vue";
import aboutSectionComponent from "../../components/user/public/aboutSection.component.vue";
import postsComponent from "../../components/user/public/postsSection.component.vue";

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

asyncComputed:{
async getdata(){
  let data = await GET_CURRENT_USER_DATA(this.$route.params.id)
  console.log(data)

return data
},
async getposts(){
let posts = await GET_USER_POSTS(this.$route.params.id)
console.log(posts)

return posts
},
async getbio(){
let data = await GET_CURRENT_USER_DATA(this.$route.params.id)
console.log(data.data.bio)

return data.data.bio
},

}

,
beforeCreate(){
        let user_state = JSON.parse(this.$localStorage.get('vuex')).user_id
if(user_state.user == this.$route.params.id){
this.$router.push({path:'/profile'})
}
},


};
</script>

<style>
</style>