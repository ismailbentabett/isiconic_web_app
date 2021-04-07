<template>
  <v-card class="mx-auto" elevation="0">
    <v-card-text>
      <p class="display-1 text--primary">Bio</p>
      <v-divider class="mb-5"></v-divider>

      <div class="text--primary">
       {{BIO}}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props:['bio'],
  computed:{
    BIO(){
      return this.$props.bio
    }
  }
};
</script>

<style>
</style>