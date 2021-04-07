<template>
  <v-list dense class="pa-5">
    <v-list-item-title class="ml-5"> About</v-list-item-title>
    <v-list-item-group v-model="selectedItem" color="primary">
      <v-list-item v-for="(item, i) in newitems" :key="i">
        <v-list-item-icon>
          <v-icon v-text="item.icon"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import moment from "moment";

export default {
  props: ["data"],
  data: () => ({
    selectedItem: 1,
  }),

  computed: {
    newitems() {
      let data = this.$props.data.data;
      let birthday = moment(String(this.$props.data.data.birthday)).format(
        "YYYY-MM-DD"
      );
      let newitme = [
        { text: birthday, icon: "cake" },
        { text: data.relashioshipStatus, icon: "favorite" },
        { text: data.Living, icon: "home" },
        { text: data.location, icon: "room" },
        { text: data.school, icon: "school" },
        { text: data.sex, icon: "wc" },
      ];
      return newitme;
    },
  },
};
</script>

<style>
</style>