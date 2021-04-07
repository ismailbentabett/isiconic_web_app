<template>
  <v-dialog
    v-model="this.$props.editpopup"
    max-width="600px"
    class="hidden-md-and-down"
  >
    <v-card>
      <v-card-title>
        <span class="headline">Edit Postt</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="title"
                :rules="nameRules"
                label="Title"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="subTitle"
                :rules="nameRules"
                :counter="10"
                label="SubTitle"
                required
              ></v-text-field
            ></v-col>

            <v-col cols="12">
              <v-textarea
                v-model="content"
                clearable
                clear-icon="mdi-close-circle"
                label="Text"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-file-input
                type="file"
                name="import_file"
                @change="selectedFile($event)"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                label="Avatar"
                multiple
              ></v-file-input>
            </v-col>

            <v-col cols="12">
              <v-select
                v-model="tag"
                :items="tags"
                label="Select Tags"
                multiple
              >
                <template v-slot:selection="{ item, index }">
                  <v-chip v-if="index === 0">
                    <span>{{ item }}</span>
                  </v-chip>
                  <span v-if="index === 1" class="grey--text caption">
                    (+{{ tag.length - 1 }} others)
                  </span>
                </template>
              </v-select>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <v-switch v-model="switch1" :label="`Product ?`"></v-switch>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="blue darken-1" text @click="editPost()"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import axios from "axios";
import {GET_POST_BY_ID} from '../../api_calls'
export default {
  name: "editpostPopUp",
  props: ["editpopup", "user_data", "editedpostid"],
  data() {
    return {
      tags: ["Regular", "Brag", "Complain", "Praise", "Ask", "Advice", "post"],
      tag: [],
      title: "",
      content: "",
      subTitle: "",
      // image: [String],
      type: "",
      isProduct: false,

      productID: "",
      file: null,
      image: null,
      post_id: "",
    };
  },
  methods: {
    selectedFile(event) {
      console.log(event);
      this.file = event;
    },

    async uploadImage(id) {
      if (this.file.length > 0) {
        let imagedata = new FormData();
        for (let file = 0; file < this.file.length; file++) {
          imagedata.append("upload", this.file[file]);
        }

        await axios
          .post(
            `http://localhost:3000/api/image/post/upload/${id}`,
            imagedata,
            {
              withCredentials: true,
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((result) => {
            console.log(result);

            let Images = result.data.file.map((x) => {
              return x.filename;
            });
            console.log(Images);
            axios
              .put(
                `http://localhost:3000/api/post/addimage/${id}`,
                { image: Images },
                { withCredentials: true }
              )
              .then((res) => {
                console.log(res);
              })
              .catch((e) => {
                console.log(e);
              });

            return result;
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    async editPost() {
      const today = new Date().toLocaleString();

      let postid = this.$props.editedpostid;
      axios
        .put(
          `http://localhost:3000/api/post/${postid}`,
          {
            title: this.title,
            subTitle: this.subTitle,
            content: this.content,
            isProduct: this.isProduct,
            productID: this.productID,
            updated_at: today,
            tags: this.tag,
          },
          {
            withCredentials: true,
          }
        )
        .then(() => {
          console.log("editPost");

          this.uploadImage(postid);
        })
        .catch((e) => {
          console.log(e);
        });
    },

  },
  asyncCmputed:{
  getPostData:async function(){
          let postid = this.$props.editedpostid;

    let data = await GET_POST_BY_ID(postid)
    console.log(data)
  }
  }

};
</script>

<style>
</style>