<template>
    <v-container >
 <v-row no-gutters>
      <v-col
      
        cols="12"
      >
        <v-card
          class="pa-2"
          tile
          outlined
        >
<RoomsListComponent :data="myroomsdata"/>
        </v-card>
      </v-col>
     
    </v-row>
  </v-container>
</template>

<script>
import {GET_ALL_ROOMS,GET_CURRENT_USER_DATA,GET_LATEST_CHAT} from '../../api_calls'

import RoomsListComponent from '../../components/chat/roomsList.component'
export default {
name:"chatview",
components:{RoomsListComponent},
data(){return{myroomsdata:[]}},
     created: async function(){
      let user_id =`${JSON.parse(this.$localStorage.get('vuex')).user_id.user}`

    let userRooms = await  GET_ALL_ROOMS()


 let myrooms = userRooms.filter(x=>{
return x.chatters.includes(user_id)
   })

 myrooms.map(async (x)=>{
  let index = x.chatters.indexOf(user_id) - 1
let data =  x.chatters.splice(index, 1);


   let latestchar = await GET_LATEST_CHAT(x._id)
console.log(latestchar)

if(latestchar==null){
latestchar={
  nickname:'start messaging first',
  message:')'
}
}
 GET_CURRENT_USER_DATA(data[0]).then(name=>{

this.myroomsdata.push({
  id:x._id,
  roomName : x.room_name,
username : name.data.username,
latestchat:latestchar,
image: `http://localhost:3000/api/image/user/display/${name.data.image}`
})
})


})
console.log(this.myroomsdata)


  }

}
</script>

<style>

</style>