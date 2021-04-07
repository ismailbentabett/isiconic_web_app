<template>
  <div>
    <editpostPopUp :editpopup="dialog" :editedpostid="editedpostid" />

    <commentComponent
      :commentpopupprop="returncommentdialogue"
      :data="comment_payload"
    />

    <v-card
      :loading="loading"
      v-for="(post, index) in userData"
      :key="index"
      class="mb-5"
      elevation="0"
      outlined
    >
      <v-row>
        <v-col>
          <v-list>
            <v-list-item class="px-2">
              <v-list-item-avatar
               
                size="40"
                v-if="
                  post.image ==
                  'http://localhost:3000/api/image/user/display/null'
                "
                color="white"
              >
              <v-btn  :to="{ path: `/user/${post.userID}` }"  icon>
                <v-icon color="black" size="40"> mdi-account-circle </v-icon>

              </v-btn >
              </v-list-item-avatar>
              <v-list-item-avatar v-else :to="{ path: `/user/${post.userID}` }">
                <v-img :src="post.image"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="title">
                  {{ post.username }}
                </v-list-item-title>
                <v-list-item-subtitle> {{ post.email }} </v-list-item-subtitle>
                <v-list-item-subtitle>
                  <time-ago
                    :refresh="60"
                    :datetime="post.created_at"
                    locale="en"
                    long
                  ></time-ago>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <v-spacer></v-spacer>
        <v-menu
          left
          bottom
          class="hidden-md-and-down"
          v-if="my_id == post.userID"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              class="ma-10"
              align-self="center"
            >
              <v-icon>more_horiz </v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click="deletePost(post.id)">
              <v-list-item-icon>
                <v-icon color="black">delete</v-icon>
              </v-list-item-icon>
              <v-list-item-title> delete </v-list-item-title>
            </v-list-item>
            <v-list-item @click="openDialogue(post.id)">
              <v-list-item-icon>
                <v-icon color="black">edit</v-icon>
              </v-list-item-icon>
              <v-list-item-title> edit </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-row>
      <v-divider></v-divider>
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-carousel
        v-if="post.postImages.length > 0"
        :continuous="false"
        :cycle="cycle"
        :show-arrows="false"
        hide-delimiter-background
        delimiter-icon="mdi-minus"
        height="400"
      >
        <v-carousel-item
          v-for="(item, i) in post.postImages"
          :key="i"
          :src="item"
          reverse-transition="fade-transition"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>

      <v-card-title>{{ post.title }}</v-card-title>

      <v-card-text>
        <div class="my-4 subtitle-1">{{ post.subTitle }}</div>

        <div>
          {{ post.content }}
        </div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title>Tags</v-card-title>

      <v-card-text>
     

        <v-chip-group
          v-model="selection"
          active-class="deep-purple accent-4 white--text"
          column
          
        >
          <v-chip v-for="tag in post.tags" :key="tag" :to="{path:`tag/${tag}`}">
            {{tag}}
          </v-chip>

        
        </v-chip-group>
      </v-card-text>

      <v-card-actions>
        <v-btn
          class="ma-2"
          :color="post.likes.includes(post.myUserId) === true ? 'indigo' : ''"
          text
          icon
          @click="
            post.likes.includes(post.myUserId) === true
              ? UnLike(post.id)
              : Like(post.id)
          "
        >
          <v-icon>mdi-thumb-up</v-icon>
        </v-btn>

        <v-btn
          class="ma-2"
          :color="
            post.dislikes.includes(post.myUserId) === true ? 'indigo' : ''
          "
          text
          icon
          @click="
            post.dislikes.includes(post.myUserId) === true
              ? UnDislike(post.id)
              : Dislike(post.id)
          "
        >
          <v-icon>mdi-thumb-down</v-icon>
        </v-btn>
        <v-btn
          class="ma-2"
          :color="post.loves.includes(post.myUserId) === true ? 'indigo' : ''"
          text
          icon
          @click="
            post.loves.includes(post.myUserId) === true
              ? UnLove(post.id)
              : Love(post.id)
          "
        >
          <v-icon>favorite</v-icon>
        </v-btn>
        <v-btn class="ma-2" text icon @click="commentpopupdg(post.id)">
          <v-icon>comment</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn v-if="post.isProduct == true" class="ma-2" text icon>
          <v-icon>add_shopping_cart </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import editpostPopUp from "./editPostPopUp.component";
import commentComponent from "./comment.component";
import { TimeAgo } from "vue2-timeago";
import axios from "axios";
import { GET_CURRENT_USER_DATA, DELETE_A_POST } from "../../api_calls";
export default {
  name: "post",
  props: ["posts"],
  components: { editpostPopUp, TimeAgo, commentComponent },
  data: () => ({
    comment_payload: "",
    loading: false,
    selection: 1,
    allPosts: "",
    dialog: "",

    items: [
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
      },
    ],
    post_settings: [
      { title: "edit", icon: "edit" },
      { title: "delete", icon: "delete", click: "deletePost(item._id)" },
    ],
    cycle: false,
    users: "",
    postssss: null,
    userdatares: [],
    my_id: "",
    editedpostid: "",
    commentpopupdgvar: "",
    commentpostid: "",
  }),

  methods: {
    commentpopupdg: async function (post_id) {
      this.commentpopupdgvar = !this.commentpopupdgvar;

      let user_id = JSON.parse(this.$localStorage.get("vuex")).user_id;
      let user_id_data = `${user_id.user}`;
      let userrealdata = await GET_CURRENT_USER_DATA(user_id_data);
      console.log(userrealdata);
      this.comment_payload = {
        post_id: post_id,
        user_id: user_id_data,
        username: userrealdata.data.username,
      };
    },
    openDialogue(id) {
      this.dialog = !this.dialog;
      this.editedpostid = id;
    },
    async deletePost(post_id) {
      await DELETE_A_POST(post_id);
      console.log(post_id);
    },

    Like(post_id) {
      let user_id = JSON.parse(this.$localStorage.get("vuex")).user_id;
      let user_id_data = `${user_id.user}`;
      axios
        .put(
          `http://localhost:3000/api/post/reaction/like/${post_id}`,
          { reactionistId: user_id_data },
          {
            withCredentials: true,
          }
        )
        .then((result) => {
          console.log(result);
          this.UnDislike(result.data.postId);

          this.UnLove(result.data.postId);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    Dislike(post_id) {
      let user_id = JSON.parse(this.$localStorage.get("vuex")).user_id;
      let user_id_data = `${user_id.user}`;
      console.log(user_id_data);
      axios
        .put(
          `http://localhost:3000/api/post/reaction/dislike/${post_id}`,
          { reactionistId: user_id_data },
          {
            withCredentials: true,
          }
        )
        .then((result) => {
          console.log(result);
          this.UnLike(result.data.postId);

          this.UnLove(result.data.postId);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    Love(post_id) {
      let user_id = JSON.parse(this.$localStorage.get("vuex")).user_id;
      let user_id_data = `${user_id.user}`;
      console.log(user_id_data);
      axios
        .put(
          `http://localhost:3000/api/post/reaction/love/${post_id}`,
          { reactionistId: user_id_data },
          {
            withCredentials: true,
          }
        )
        .then((result) => {
          console.log(result);
          this.UnLike(result.data.postId);

          this.UnDislike(result.data.postId);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    UnLike(post_id) {
      let user_id = JSON.parse(this.$localStorage.get("vuex")).user_id;
      let user_id_data = `${user_id.user}`;
      console.log(user_id_data);
      axios
        .put(
          `http://localhost:3000/api/post/reaction/unlike/${post_id}`,
          { reactionistId: user_id_data },
          {
            withCredentials: true,
          }
        )
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    UnDislike(post_id) {
      let user_id = JSON.parse(this.$localStorage.get("vuex")).user_id;
      let user_id_data = `${user_id.user}`;
      console.log(user_id_data);
      axios
        .put(
          `http://localhost:3000/api/post/reaction/undislike/${post_id}`,
          { reactionistId: user_id_data },
          {
            withCredentials: true,
          }
        )
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    UnLove(post_id) {
      let user_id = JSON.parse(this.$localStorage.get("vuex")).user_id;
      let user_id_data = `${user_id.user}`;
      console.log(user_id_data);
      axios
        .put(
          `http://localhost:3000/api/post/reaction/unlove/${post_id}`,
          { reactionistId: user_id_data },
          {
            withCredentials: true,
          }
        )
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  asyncComputed: {
    async returndialogue() {
      return this.dialog;
    },
    async returncommentdialogue() {
      return this.commentpopupdgvar;
    },
    async userData() {
      this.my_id = `${JSON.parse(this.$localStorage.get("vuex")).user_id.user}`;

      let userdata = this.$props.posts;
      await userdata.forEach(async (x) => {
        let userrealdata = await GET_CURRENT_USER_DATA(x.userID);
        let postimg = x.image.map((img) => {
          return `http://localhost:3000/api/image/post/display/${img}`;
        });
        let data = {
          username: userrealdata.data.username,
          email: userrealdata.data.email,
          image: `http://localhost:3000/api/image/user/display/${userrealdata.data.image}`,
          title: x.title,
          content: x.content,
          subTitle: x.subTitle,
          id: x.id,
          userID: x.userID,
          created_at: x.created_at,
          postImages: postimg,
          likes: x.likes,
          dislikes: x.dislikes,
          loves: x.loves,
          isProduct: x.isProduct,
          myUserId: this.my_id,
          tags:x.tags
        };
        this.userdatares.push(data);
      });
      console.log(this.userdatares);
      return this.userdatares;
    },
  },
};
</script>

<style>
</style>