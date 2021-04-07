
<template>
  <v-container >

    <v-card outlined elevation="0" class="pa-5" >
        <p>{{typingit}}</p> 
      <v-container         class="overflow-y-auto"
    style="max-height: 70vh"
    v-chat-scroll
>
        <v-row class="fill-height pb-14" align="end">
          <v-col>
            
            <v-col
            
              v-for="(item, index) in messages"
              :key="index"
              :class="[
                'd-flex flex-row align-center my-2',
                item.nickname == mynickname ? 'justify-end' : null,
              ]"
            >
            
              <v-card
                v-if="item.nickname == mynickname"
                class="white--text mr-3 text-wrap"
                outlined
                color="light-blue darken-1
"
                max-width="200"
                >  
                 <v-card-text>
 {{ item.message }}
        </v-card-text>
                   <v-card-subtitle>
           <time-ago
                      :refresh="60"
                      :datetime="item.created_date"
                      locale="en"
                      long
                    ></time-ago>
  
        </v-card-subtitle>
       
        </v-card
              >
              
              <v-avatar
                size="36"
                v-for="image in getPics" :key="image"
              >
              <img :src="image.image" v-if="image.username == item.nickname"/>
             
              </v-avatar>
          
              <v-card
                        v-bind="attrs"
          v-on="on"
                v-if="item.nickname != mynickname"
                class="white--text ml-3 text-wrap"
                outlined
                color="grey lighten-1
"
                max-width="200"
                >
        <v-card-text>
 {{ item.message }}
        </v-card-text>
                   <v-card-subtitle >
           <time-ago
                      :refresh="60"
                      :datetime="item.created_date"
                      locale="en"
                      long
                    ></time-ago>
  
        </v-card-subtitle>
               

                </v-card >
         
            </v-col>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-card outlined elevation="0" class="pa-5">
      <v-container class="ma-0 pa-0">
        <v-row no-gutters>
          <v-col>
            <div class="d-flex flex-row align-center">
             
              <v-text-field
                v-model.trim="chat"
                placeholder="Type Something"
                @keydown.once="typing"
                @keypress.enter="send"
              ></v-text-field>
              <v-btn icon class="ml-4" @click="send()"
                ><v-icon>mdi-send</v-icon></v-btn >
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { TimeAgo } from 'vue2-timeago'

import Vue from "vue";
import {
  GET_USER_ROOMS,
  GET_USER_CHATS,
  CREATE_A_CHAT,
  GET_CURRENT_USER_DATA,
} from "../../api_calls";
import VueChatScroll from "vue-chat-scroll";
Vue.use(VueChatScroll);
import * as io from "socket.io-client";

export default {
  name: "chatSend",
  components:{TimeAgo},
  data() {
    return {
      messages: [],
      users: [],
      mynickname: "",
      isLogged: false,
      chat: "",
      room_id: "",
      socket: io("http://localhost:4000"),
      typingit:'',
      avatars:[]
    };
  },
  methods: {
    send: async function () {
      this.socket.emit("chat", {
        message: this.chat,
        nickname: this.mynickname,
        room: this.$route.params.room_id,
      });

      let payload = {
        room: this.$route.params.room_id,
        nickname: this.mynickname,
        message: this.chat,
      };
      await CREATE_A_CHAT(payload).then(() => {});
      this.message = "";
    },
    typing(){
      //keydown
          this.socket.emit('typing', {typing:'typing...'});


    }
  },

updated(){
    this.socket.on('typing', function(data){
         if (data.room == this.$route.params.room_id) {
          console.log(data.typing)
this.typingit = data.typing
}
})
  }
,
asyncComputed:{
async getPics(){
      let room = await GET_USER_ROOMS(this.$route.params.room_id);
room.data.chatters.map(async (x)=>{
let usersdata = await GET_CURRENT_USER_DATA(x)
this.avatars.push({
username:usersdata.data.username,
id:usersdata.data._id,
image:`http://localhost:3000/api/image/user/display/${usersdata.data.image}`,
})
})
return this.avatars
}

},
  created: async function () {
    let room = await GET_USER_ROOMS(this.$route.params.room_id);
    let chats = await GET_USER_CHATS(room.data._id);
    this.messages = chats;

    let user_id = JSON.parse(this.$localStorage.get("vuex")).user_id;
    const mydata = await GET_CURRENT_USER_DATA(user_id.user);

    this.mynickname = mydata.data.username;
    this.socket.on(
      "chat",
      function (data) {
        if (data.room == this.$route.params.room_id) {
          console.log(data);
          this.messages.push(data);
        }
      }.bind(this))

    
    
  },
};
</script>

