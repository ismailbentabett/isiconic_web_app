<template>
  <v-dialog
    v-model="this.$props.editProductpopup"
    max-width="600px"
    class="hidden-md-and-down"
  >
    <v-card>
      <v-card-title>
        <span class="headline">Edit Product</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Product Name"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model="description"
                clearable
                clear-icon="mdi-close-circle"
                label="Description"
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
            <v-col cols="12" align-self="center">
              <v-select
                v-model="category"
                ref="category"
                :items="Categories"
                :menu-props="{ top: true, offsetY: true }"
                label="categories"
              ></v-select>
              <v-select
                v-model="Subcategory"
                ref="subcategory"
                :items="Categories"
                :menu-props="{ top: true, offsetY: true }"
                label="subcategories"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-slider
                v-model="price"
                :max="1000"
                label="Price"
                class="align-center"
                thumb-label="always"
              >
                <template v-slot:append>
                  <v-text-field
                    v-model="price"
                    class="mt-0 pt-0"
                    type="number"
                    style="width: 60px"
                  ></v-text-field>
                </template>
              </v-slider>
            </v-col>
            <v-col cols="12">
              <v-slider
                v-model="quantity"
                :rules="rules"
                :max="1000"
                label="quantity"
                step="1"
                thumb-label="always"
                ticks
              ></v-slider>
              <template v-slot:append>
                <v-text-field
                  v-model="quantity"
                  class="mt-0 pt-0"
                  type="number"
                  style="width: 60px"
                ></v-text-field>
              </template>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="editProductpopup = !editProductpopup">
          Close
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="editProduct()"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import axios from "axios";

export default {
  name: "editProductpopup",
  props: [ "editProductpopup","productId"],
 data() {
    return {
      name: "",
      description: "",
      quanity: null,
      price: null,
      category: "",
      Subcategory: "",

      Categories: [
        "Appliances",
        "Apps & Games",
        "Arts, Crafts, & Sewing",
        "Automotive Parts & Accessories",
        "Baby",
        "Beauty & Personal Care",
        "Books",
        "CDs & Vinyl",
        "Cell Phones & Accessories",
        "Clothing, Shoes and Jewelry",
        "Collectibles & Fine Art",
        "Computers",
        "Electronics",
        "Garden & Outdoor",
        "Grocery & Gourmet Food",
        "Handmade",
        "Health, Household & Baby Care",
        "Home & Kitchen",
        "Industrial & Scientific",
        "Kindle",
        "Luggage & Travel Gear",
        "Movies & TV",
        "Musical Instruments",
        "Office Products",
        "Pet Supplies",
        "Sports & Outdoors",
        "Tools & Home Improvement",
        "Toys & Games",
        "Video Games",
      ],

      storeName: "",
      storeDescription: "",
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
            `http://localhost:3000/api/image/product/upload/${id}`,
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
                `http://localhost:3000/api/product/addimage/${id}`,
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
    async editProduct() {
      const today = new Date().toLocaleString();
let productId = this.$props.productId
      axios
        .put(
          `http://localhost:3000/api/product/${productId}`,
          {
           name: this.name,
            description: this.description,
            quantity: this.quantity,
            price: this.price,
            category: this.category,
            Subcategory: this.Subcategory,
            updated_at: today,
          },
          {
            withCredentials: true,
          }
        )
        .then(() => {
          console.log("editProduct");

          this.uploadImage(productId);
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