<template>
  <v-row justify="center" class="mt-5">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card ref="form" elevation="0">
        <v-card-text>
          <v-text-field ref="name" v-model="name" label="name"></v-text-field>

          <v-textarea label="description" v-model="description"></v-textarea>

          <v-file-input
            type="file"
            name="import_file"
            @change="selectedFile($event)"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Pick an avatar"
            prepend-icon="mdi-camera"
            label="Avatar"
          ></v-file-input>
        </v-card-text>

        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary" text @click="updatestore()"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>


<script>
 import { UPDATE_A_STORE } from "../../api_calls";
 import axios from "axios";
export default {
  data() {
    return {
      name: "",
      description: "",
      image: "",
      file: null,
      store_id:'',
      updated_data:''
    };
  },
  methods: {
    async getStoreId() {
      let user_id = JSON.parse(this.$localStorage.get("vuex")).user_id;
      let useriddata = user_id.user;
      let data = axios
        .get(`http://localhost:3000/api/store/mystore/${useriddata}`, {
          withCredentials: true,
        })
        .then((result) => {
          return result.data;
        })
        .catch((err) => {
          console.log(err);
        });

      return data;
    },
    selectedFile(event) {
      console.log(event);
      this.file = event;
    },

    uploadImage: async function (store_id) {
      let data = new FormData();
      data.append("upload", this.file);
      for (var pair of data.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      await axios

        .post(
          `http://localhost:3000/api/image/store/upload/${store_id}`,
          data,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((result) => {
           this.image = result.data.file.filename;

        })
        .catch((e) => {
          console.log(e);
        });
     

return  this.image 
                  
    },
    updatestore: async function () {
       this.getStoreId().then(async (store_data) => {
     this.store_id = store_data[0]._id;
         if (this.file != null) {

  this.uploadImage(this.store_id).then(async (data)=>{
    console.log(data)
this.updated_data = {
              name: this.name,
              description: this.description,
              image: data,
            };
            await UPDATE_A_STORE(this.store_id,this.updated_data);

  })

          


 
        }  else  {
          let updated_data = {
            name: this.name,
            description: this.description,
            image: this.image,
          };


       this.updated_data = {
              name: this.name,
              description: this.description,
              image:   this.image,
            };

          await UPDATE_A_STORE(this.store_id, updated_data);
        }  
      });
    },
  },

  created:async function(){
    let data = await this.getStoreId()
    console.log(data[0])
    this.name = data[0].name
    this.description = data[0].description
    this.image = data[0].image
  }
};
</script>




   









