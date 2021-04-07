<template>
  <!-- App.vue -->

  <v-app  >
    <navBarComponent />

    <!-- Sizes your content based upon application components -->
    <v-main class="grey lighten-3">
      <!-- Provides the application the proper gutter -->

      <!-- If using vue-router -->
      <router-view></router-view>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import navBarComponent from "./components/navBar.component.vue";

export default {
  name: "App",

  components: {
    navBarComponent,
  },

  data: () => ({
    //
  }),
};
</script>
