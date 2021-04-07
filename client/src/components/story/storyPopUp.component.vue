<template>
  <div class="text-center">
    <v-dialog v-model="this.$props.storypopup" hide-overlay width="400">
      <v-card class="mx-auto" height="700">
        <v-list>
          <v-list-item class="px-2">
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
          height="616"
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
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: ["storypopup", "storiesdata", "storyId"],
  data() {
    return {};
  },
  computed: {
    getRightStory() {
      let data = this.$props.storiesdata.filter((x) => {
        return x.userId == this.$props.storyId;
      });
      console.log(data);
      return data[0];
    },
  },
  updated() {
    console.log(this.$props.storyId);

    console.log(this.getRightStory);
  },
};
</script>