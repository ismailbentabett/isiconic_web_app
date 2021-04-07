<template>
  <v-list subheader>
    <v-subheader>Recent chat</v-subheader>

    <v-list-item v-for="room in this.$props.data" :key="room">
    <v-list-item-avatar>
        <v-img :alt="`${room.image} avatar`" :src="room.image"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-text="room.username"></v-list-item-title>
        <v-list-item-subtitle >{{`${room.latestchat.nickname} : ${room.latestchat.message}`}}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-icon>
        <v-btn icon :to="{path:`/chat/${room.id}`}">
        <v-icon :color="grey"> mdi-message-outline </v-icon>
        </v-btn>
      </v-list-item-icon>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  props:['data'],
  name: "roomsList",
  data() {
    return {


    };


  },


};
</script>

<style>
</style>