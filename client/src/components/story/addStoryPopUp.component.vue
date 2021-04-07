<template>
  <v-dialog
    v-model="this.$props.popup"
    max-width="600px"
    class="hidden-md-and-down"
  >
    <v-card>
      <v-card-title>
        <span class="headline">Create a Story</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="content"
                label="Content"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-file-input
                type="file"
                name="import_file"
                @change="selectedFile($event)"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick a story"
                prepend-icon="mdi-camera"
                label="story"
              ></v-file-input>
              ></v-col
            >
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="blue darken-1" text @click="uploadStory()"> save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import axios from "axios";

import { ADD_A_STORY } from "../../api_calls";
export default {
  name: "postPopUp",
  props: ["popup"],
  data() {
    return {
      content: "",
      file: null,
    };
  },
  methods: {
    selectedFile(event) {
      console.log(event);
      this.file = event;
    },
    async uploadImage(id) {

    let data = new FormData();
      data.append("upload", this.file);
      for (var pair of data.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
       await axios
          .post(
            `http://localhost:3000/api/image/story/upload`,
            data,
            {
              withCredentials: true,
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((result) => {
              console.log(result)
            let Images = result.data.file.filename;

         axios
              .put(
                `http://localhost:3000/api/story/addimage/${id}`,
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

    },
      uploadStory: async function () {
     
       let updated_data = {
          content: this.content,

        };

        let user_id = JSON.parse(this.$localStorage.get("vuex")).user_id.user;
        let data = await ADD_A_STORY(user_id, updated_data);

  this.uploadImage(data._id)

  },
  },

};
</script>

<style>
</style>