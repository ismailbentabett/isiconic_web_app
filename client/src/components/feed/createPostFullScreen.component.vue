<template>

    <v-dialog
      v-model="this.$props.fullpost"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      class="hidden-lg-and-up"
    >
    <v-card>
      <v-card-title>
        <span class="headline">Create a Post</span>
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
        <span
          v-if="index === 1"
          class="grey--text caption"
        >
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
        <v-btn color="blue darken-1" text @click="fullpost = !fullpost">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="postPost()"> Save </v-btn>
      </v-card-actions>
    </v-card>
    </v-dialog>

</template>

<script>
import axios from "axios";

export default {
  name: "fullScreenPost",
  props: ["fullpost","user_data"],
  data() {
    return {
        tags: ['Regular', 'Brag', 'Complain', 'Praise', 'Ask', 'Advice','post'],
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
      if(this.file.length > 0){

      
      let imagedata = new FormData();
      for (let file = 0; file < this.file.length; file++) {
        imagedata.append("upload", this.file[file]);
      }

      await axios
        .post(`http://localhost:3000/api/image/post/upload/${id}`, imagedata, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
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
    async postPost() {
      const today = new Date().toLocaleString();

      let user_id = this.$props.user_data;

      axios
        .post(
          `http://localhost:3000/api/post/${user_id}`,
          {
            title: this.title,
            subTitle: this.subTitle,
            content: this.content,
            isProduct: this.isProduct,
            productID: this.productID,
            created_at: today,
                        tags:this.tag

          },
          {
            withCredentials: true,
          }
        )
        .then((result) => {
          this.uploadImage(result.data._id);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style>
</style>