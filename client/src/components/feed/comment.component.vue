
<template>
  <v-dialog v-model="this.$props.commentpopupprop" class="hidden-md-and-down">
    <v-card>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="blue darken-1" text @click="postAcomment()"> Save </v-btn>
      </v-card-actions>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-textarea
                label="Write a comment"
                type="text"
                required
                v-model="detail"
                counter
                :loading="loadingUser"
                no-resize
                rows="4"
              >
              </v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card>
        <v-list>
          <v-list-group v-for="item in getCommentsAndReplies" :key="item" no-action>
            <template v-slot:activator>
              <v-list-item-avatar>
                <img :src="item.img" alt="John" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="item.username"> </v-list-item-title>
                <v-list-item-subtitle class="ismail"
                  >{{ item.comment }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </template>

            <v-row>
              <v-col align="right" class="ma-5">
                <v-btn @click="openreplydialogue(item.id)" text>reply</v-btn>
              </v-col>
            </v-row>

            <v-list-item v-for="child in item.replies" :key="child.title">
              <v-list-item-avatar>
                <img :src="child.img" alt="John" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="child.username"></v-list-item-title>
                <v-list-item-subtitle class="ismail">{{
                  child.detail
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-card>
    </v-card>
    <v-dialog v-model="replydlg" max-width="600px" class="hidden-md-and-down">
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="blue darken-1" text @click="postReply()"> Save </v-btn>
        </v-card-actions>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  label="Write a reply"
                  type="text"
                  required
                  v-model="reply"
                  counter
                  :loading="loadingUser"
                  no-resize
                  rows="4"
                >
                </v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>
<script>
import axios from "axios";
export default {
  props: ["commentpopupprop", "data"],

  data() {
    return {
      reply: "",
      detail: "",
      replydlg: false,
      parentCommentId: "",
      allcomments: [],
      comments: [],
      replies: [],
      items: [
        {
          img: "https://cdn.vuetifyjs.com/images/john.jpg",
          items: [
            {
              title: "Breakfast & brunch",
              img: "https://cdn.vuetifyjs.com/images/john.jpg",
            },
            {
              img: "https://cdn.vuetifyjs.com/images/john.jpg",

              title: "New American",
            },
            {
              img: "https://cdn.vuetifyjs.com/images/john.jpg",

              title: "Sushi",
            },
          ],
          title: "username",
        },
      ],
    };
  },
  methods: {
    openreplydialogue(parentCommentId) {
      this.replydlg = !this.replydlg;
      this.parentCommentId = parentCommentId;
    },
    async getCommentId(parentCommentId) {
      this.parentCommentId = parentCommentId;
    },
    async postAcomment() {
      let payload = {
        userId: this.$props.data.user_id,
        username: this.$props.data.username,
        detail: this.detail,
        postId: this.$props.data.post_id,
      };
      console.log(this.$props)
      await axios
        .post(
          "http://localhost:3000/api/comment/post",
          {
            userId: payload.userId,
            username: payload.username,
            detail: payload.detail,
            postId: payload.postId,
          },
          {
            withCredentials: true,
          }
        )
        .then(() => {
          this.detail = "";
        })
        .catch((err) => {
          console.log(err);
        });
    },
    postReply: async function () {
      let payload = {
        userId: this.$props.data.user_id,
        username: this.$props.data.username,
        detail: this.reply,
        postId: this.$props.data.post_id,
        parentCommentId: this.parentCommentId,
      };
      console.log(payload);
      await axios
        .post(
          "http://localhost:3000/api/comment/post",
          {
            userId: payload.userId,
            username: payload.username,
            detail: payload.detail,
            postId: payload.postId,
            parentCommentId: payload.parentCommentId,
          },
          {
            withCredentials: true,
          }
        )
        .then(async () => {
          this.detail = "";

          await axios
            .put(
              `http://localhost:3000/api/comment/addreply/${this.parentCommentId}`,
              {
                userId: payload.userId,
                username: payload.username,
                detail: payload.detail,
              },
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
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  asyncComputed: {
    async getCommentsAndReplies() {
      let postId = this.$props.data.post_id;
      let data = await axios
        .get(
          `http://localhost:3000/api/comment/${postId}`,

          {
            withCredentials: true,
          }
        )
        .then((result) => {
          return result.data;
        })
        .catch((err) => {
          console.log(err);
        });

      let commentsmap = data.map((x) => {
        return {
          username: x.username,
          comment: x.detail,
          parentCommentId: x.parentCommentId,
          id: x._id,
          userId: x.userId,

          replies: x.replies,
        };
      });

      let lasttry = commentsmap.filter((x) => {
        if (x.parentCommentId == undefined) {
          return x != undefined;
        }
      });

 console.log(lasttry)
      return lasttry
    },
  },


};
</script>

<style scoped>
.ismail {
  -webkit-line-clamp: unset !important;
  white-space: normal;
}
</style>