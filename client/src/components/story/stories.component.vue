<template>
  <v-sheet class="mx-auto mb-5" elevation="0">
    <addStoryPopUpComponent :popup="dialogue"/>
    <stotyDgComponent :storypopup="storydialogue" :storiesdata="getStories"  :storyId="storyId"/>
    <mymystorypopup :mystorypopup="mystorydialogue" :getMyStoryprop="getMyStory"/>
    <v-slide-group
      v-model="model"
      class="pa-4"
      active-class="success"
      show-arrows
    >
      <v-card
        v-if="getMyStory.exist == false"
        color="grey lighten-1"
        class="ma-4"
        height="200"
        width="100"
        elevation="0"
      >
        <v-row class="fill-height" align="center" justify="center">
          <v-btn depressed icon plain raised x-large @click="openg()">
            <v-icon color="white" size="70">add</v-icon>
          </v-btn>
        </v-row>
      </v-card>
      <v-card
        v-else
        color="grey lighten-1"
        class="ma-4"
        height="200"
        width="100"
        elevation="0"
        @click="openmystorypopup()"

      >
        <v-row class="fill-height" align="center" justify="center">
          <v-avatar
            v-if="
              GetMyAvatar != 'http://localhost:3000/api/image/user/display/null'
            "
          >
            <img :src="GetMyAvatar" alt="John" />`
          </v-avatar>
          <v-avatar v-else>
            <v-icon color="black" size="40">person</v-icon>
          </v-avatar>
        </v-row>
      </v-card>
      <v-slide-item v-for="n in getStories" :key="n">
        <v-card
          class="ma-4"
          height="200"
          width="100"
          outlined
          color="grey lighten-1"
                                  @click="openstoryg(n.userId)"

        >
        
          <v-row class="fill-height" align="center" justify="center">
            <v-avatar
              v-if="
                n.avatar != 'http://localhost:3000/api/image/user/display/null'
              "

            >
              <img :src="n.avatar" alt="John" />`
            </v-avatar>
            <v-avatar v-else>
              <v-icon color="black" size="40">person</v-icon>
            </v-avatar>
          </v-row>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
import stotyDgComponent from './storyPopUp.component'
import mymystorypopup from './myStoryPopUp.component'
import addStoryPopUpComponent from "./addStoryPopUp.component";
import { GET_CURRENT_USER_DATA, GET_USER_STORY } from "../../api_calls";
export default {
  components: { addStoryPopUpComponent,stotyDgComponent ,mymystorypopup},
  data() {
    return {
      model: null,
      dialogue: false,
       storydialogue: false,
      storiess: [],
      avatars: [],
      storyId:'',
      mystorydialogue:false
    };
  },
  methods: {
    openg() {
      this.dialogue = !this.dialogue;
    },
      openstoryg(id) {
              this.storyId = id

      this.storydialogue = !this.storydialogue;
    },
  openmystorypopup(){
          this.mystorydialogue = !this.mystorydialogue;

  }
  },
  asyncComputed: {
    async GetMyAvatar() {
      let user_id = JSON.parse(this.$localStorage.get("vuex")).user_id;
      let user_id_data = user_id.user;

      let data = await GET_CURRENT_USER_DATA(user_id_data);
      return `http://localhost:3000/api/image/user/display/${data.data.image}`;
    },
    async getStories() {
      let user_id = JSON.parse(this.$localStorage.get("vuex")).user_id;
      let user_id_data = user_id.user;
      console.log(user_id_data);
      let data = await GET_CURRENT_USER_DATA(user_id_data);
      data.data.followings.map(async (x) => {
        let data = await GET_USER_STORY(x);
        console.log(data);
        let image = await GET_CURRENT_USER_DATA(x);

        if (data) {
          this.storiess.push({
            content: data.content,
            img: `http://localhost:3000/api/image/story/display/${data.image}`,
            userId: data.userId,
            exist: true,
            avatar: `http://localhost:3000/api/image/user/display/${image.data.image}`,
            username:image.data.username,
            email:image.data.email
          });
        }
      });
      console.log(this.storiess);
      return this.storiess;
    },
    async getMyStory() {
      let user_id = JSON.parse(this.$localStorage.get("vuex")).user_id;
      let user_id_data = user_id.user;
      let data = await GET_USER_STORY(user_id_data);
            let userdata = await GET_CURRENT_USER_DATA(user_id_data);

      console.log(data);
      if (data) {
        return {
          content: data.content,
          img:`http://localhost:3000/api/image/story/display/${data.image}`,
          userId: data.userId,
               exist: true,
            avatar: `http://localhost:3000/api/image/user/display/${userdata.data.image}`,
            username:userdata.data.username,
            email:userdata.data.email,
            id:data._id
        };
      } else {
        return { exist: false };
      }
    },
  },
};
</script>>

<style scoped>
</style>