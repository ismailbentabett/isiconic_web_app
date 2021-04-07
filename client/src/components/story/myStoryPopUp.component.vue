<template>
  <div class="text-center">
    <v-dialog v-model="this.$props.mystorypopup" height="900" width="400">
      <v-card >
      
           
              <v-list>
          <v-list-item >
            <v-list-item-avatar
              size="40"
              v-if="
                getRightStory.avatar ==
                'http://localhost:3000/api/image/user/display/null'
              "
              color="white"
            >
              <v-icon color="black" size="40"> mdi-account-circle </v-icon>
            </v-list-item-avatar>
            <v-list-item-avatar v-else>
              <img :src="getRightStory.avatar" alt="John" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="title"
                >{{ getRightStory.username }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ getRightStory.email }}
              </v-list-item-subtitle>
              <v-list-item-subtitle> </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          
        </v-list>

    
            

   
        <v-carousel
          :continuous="false"
          :cycle="cycle"
          :show-arrows="false"
          hide-delimiter-background
          delimiter-icon="mdi-minus"
        >
          <v-carousel-item
            :src="getRightStory.img"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
            <v-row class="fill-height" align="center" justify="center">
              <div class="display-3">
                <v-card-title>{{ getRightStory.content }}</v-card-title>
              </div>
            </v-row>
          </v-carousel-item>
        </v-carousel>
<v-card-actions>
    <v-spacer></v-spacer>
    <v-btn icon outlined @click="delete_story(getRightStory.id)">
    <v-icon color="black">delete</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    </v-card-actions>            

      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import {DELETE_A_STORY} from '../../api_calls'
export default {
  props: ["mystorypopup", "getMyStoryprop" ],
  data() {
    return {};
  },
  computed:{
      getRightStory(){
          return this.$props.getMyStoryprop
      },
    
  },
  methods:{
      async delete_story(id){
          console.log(id)
         let data =  await DELETE_A_STORY(id)
         console.log(data)
      }
  }


};
</script>