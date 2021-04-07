<template>
  <div>
    <v-card class="mb-5 hidden-md-and-down" elevation="0" outlined>
      <v-row>
        <v-col cols="12" sm="1" md="1" align-self="center" > 
            <v-avatar 
            class="ma-5 mr-5"
          size="50"
          v-if="image == 'http://localhost:3000/api/image/user/display/null'"
          color="white"
        >
          <v-icon color="black"  size="50"> mdi-account-circle </v-icon>
              </v-avatar >
          <v-avatar size="50" class="ma-5 mr-5" v-else>
            <img :src="image" />
          </v-avatar>
        </v-col>
        <v-col cols="12" sm="11" md="11">
          <v-text-field
            @click="openDialogue()"
            align-self="center"
            outlined
            label="Create a post..."
            class="pa-4 mt-7"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row justify="space-around">
        <v-col cols="12" sm="12" md="12">
          <v-sheet elevation="0" class="py-4 px-1">
            <v-chip-group mandatory active-class="primary--text">
              <v-chip v-for="tag in tags" :key="tag">
                {{ tag }}
              </v-chip>
            </v-chip-group>
          </v-sheet>
        </v-col>
      </v-row>
    </v-card>
    <postPopUpComponent :popup="dialog" :user_data="data"  class="hidden-lg-and-down" />

    <v-btn
      @click="openFullDialogue()"
      block
      depressed
      elevation="2"
      plain
      class="hidden-lg-and-up mb-10 white"
    >
      <v-icon dark> add </v-icon>
    </v-btn>
    <fullScreenPostComponent :fullpost="fullDialoge" :user_data="data" class="hidden-lg-and-up" />
  </div>
</template>

<script>
import {GET_CURRENT_USER_DATA} from '../../api_calls'
import postPopUpComponent from "./createPostPopUp.component.vue";
import fullScreenPostComponent from "./createPostFullScreen.component.vue";
export default {
  name: "createPost",
  components: { postPopUpComponent, fullScreenPostComponent },
  props:['user_id'],
  data() {
    return {
      data:'',
      tags: [
        "Regular",
        "Praising",
        "Complain",
        "Brag",

      ],

      dialog: false,
      fullDialoge: false,
      image:null
    };
  },
  methods: {


    openDialogue() {
      this.dialog = !this.dialog;
    },
    openFullDialogue() {
      this.fullDialoge = !this.fullDialoge;
    },
  },
  created: async function(){
    this.data =JSON.parse(this.$localStorage.get('vuex')).user_id.user
      const data = await GET_CURRENT_USER_DATA(this.data);

  this.image = `http://localhost:3000/api/image/user/display/${data.data.image}`
  }
};
</script>

<style scoped>
.ismail {
  width: 400px;
}
</style>