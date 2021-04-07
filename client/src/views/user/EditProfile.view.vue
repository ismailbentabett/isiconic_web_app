<template>
  <v-row justify="center" class="mt-5">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card ref="form" elevation="0">
        <v-card-text>
          <v-text-field
            ref="FirstName"
            v-model="FirstName"
            label="FirstName"
          ></v-text-field>
          <v-text-field
            ref="LastName"
            v-model="LastName"
            label="LastName"
            placeholder="John Doe"
          ></v-text-field>

          <v-text-field
            ref="Living"
            v-model="Living"
            label="Living"
            placeholder="darna"
          ></v-text-field>

          <v-text-field
            ref="School"
            v-model="School"
            label="School"
            placeholder="moulay tahher"
          ></v-text-field>

          <v-autocomplete
            ref="country"
            v-model="country"
            :items="countries"
            label="Country"
            placeholder="Select..."
          ></v-autocomplete>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Birthday date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>

            <v-date-picker
              ref="picker"
              v-model="date"
              :max="new Date().toISOString().substr(0, 10)"
              min="1950-01-01"
              @change="save"
            ></v-date-picker>
          </v-menu>
          <v-textarea label="Bio" v-model="Bio"></v-textarea>
        <v-row align="center" justify="center">
          <v-col cols="10" align-self="center">
            <v-select
              v-model="sex"
              ref="sex"
              :items="Sexes"
              :menu-props="{ top: true, offsetY: true }"
              label="sex"
            ></v-select>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="10" align-self="center">
            <v-select
              v-model="relationship"
              :items="relations"
              :menu-props="{ top: true, offsetY: true }"
              label="relationship"
            ></v-select>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-switch v-model="seller" :label="`Seller`"></v-switch>
        </v-row>
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

          <v-btn color="primary" text @click="updateuser()"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>


<script>
import { GET_CURRENT_USER_DATA } from "../../api_calls";

import { UPDATE_USER /*UPLOAD_USER_IMAGE*/ } from "../../api_calls";
import axios from "axios";
export default {
  data() {
    return {
      seller: false,
      sex: "",
      relationship: "",
      Bio: "",
      Living: "",
      School: "",
      LastName: "",
      FirstName: "",
      switch1: "",
      country: "",
      Sexes: ["Male", "Female", "Mental Illness"],

      formHasErrors: false,
      date: null,
      menu: false,
      file: null,
      image: null,

      relations: [
        "single",
        "married",
        "engaged",
        "hajala",
        "single but ready to mingle",
      ],
      countries: [
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antigua &amp; Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia",
        "Bosnia &amp; Herzegovina",
        "Botswana",
        "Brazil",
        "British Virgin Islands",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cambodia",
        "Cameroon",
        "Cape Verde",
        "Cayman Islands",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Congo",
        "Cook Islands",
        "Costa Rica",
        "Cote D Ivoire",
        "Croatia",
        "Cruise Ship",
        "Cuba",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Estonia",
        "Ethiopia",
        "Falkland Islands",
        "Faroe Islands",
        "Fiji",
        "Finland",
        "France",
        "French Polynesia",
        "French West Indies",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea Bissau",
        "Guyana",
        "Haiti",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kuwait",
        "Kyrgyz Republic",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macau",
        "Macedonia",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Mauritania",
        "Mauritius",
        "Mexico",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Namibia",
        "Nepal",
        "Netherlands",
        "Netherlands Antilles",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "Norway",
        "Oman",
        "Pakistan",
        "Palestine",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Reunion",
        "Romania",
        "Russia",
        "Rwanda",
        "Saint Pierre &amp; Miquelon",
        "Samoa",
        "San Marino",
        "Satellite",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "South Africa",
        "South Korea",
        "Spain",
        "Sri Lanka",
        "St Kitts &amp; Nevis",
        "St Lucia",
        "St Vincent",
        "St. Lucia",
        "Sudan",
        "Suriname",
        "Swaziland",
        "Sweden",
        "Switzerland",
        "Syria",
        "Taiwan",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        `Timor L'Este`,
        "Togo",
        "Tonga",
        "Trinidad &amp; Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks &amp; Caicos",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "United States",
        "Uruguay",
        "Uzbekistan",
        "Venezuela",
        "Vietnam",
        "Virgin Islands (US)",
        "Yemen",
        "Zambia",
        "Zimbabwe",
      ],
    };
  },

  methods: {
    selectedFile(event) {
      console.log(event);
      this.file = event;
    },

    uploadImage: async function () {
      let data = new FormData();
      data.append("upload", this.file);
      for (var pair of data.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      let imageUrl = await axios
        .post("http://localhost:3000/api/image/user/upload/", data, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.$store.commit("USER_IMAGE", result.data.file.filename);
          return result;
        })
        .catch((e) => {
          console.log(e);
        });
      this.image = imageUrl.data.file.filename;
      console.log(this.image);
    },
    updateuser: async function () {
      if (this.file != null) {
        this.uploadImage().then(async () => {
          let updated_data = {
            firstName: this.FirstName,
            lastName: this.LastName,
            bio: this.Bio,
            birthday: this.date,
            location: this.country,
            Living: this.Living,
            school: this.School,
            relashioshipStatus: this.relationship,
            sex: this.sex,
            isSeller: this.seller,
            image: this.image,
          };
          console.log(updated_data);

          let user_id = JSON.parse(this.$localStorage.get("vuex")).user_id.user;
          await UPDATE_USER(user_id, updated_data);
        });
      } else {
        let updated_data = {
          firstName: this.FirstName,
          lastName: this.LastName,
          bio: this.Bio,
          birthday: this.date,
          location: this.country,
          Living: this.Living,
          school: this.School,
          relashioshipStatus: this.relationship,
          sex: this.sex,
          isSeller: this.seller,
          image: this.image,
        };
        console.log(updated_data);

        let user_id = JSON.parse(this.$localStorage.get("vuex")).user_id.user;
        await UPDATE_USER(user_id, updated_data);
      }
    },
  },

  created: async function () {
    let user_id = JSON.parse(this.$localStorage.get("vuex")).user_id;
    const data = await GET_CURRENT_USER_DATA(user_id.user);

    this.isSeller = data.data.isSeller;

    this.FirstName = data.data.firstName;
    this.LastName = data.data.lastName;
    this.Bio = data.data.bio;
    this.date = data.data.birthday;
    this.country = data.data.location;
    this.Living = data.data.Living;
    this.School = data.data.school;
    this.relationship = data.data.relashioshipStatus;
    this.sex = data.data.sex;
    this.seller = data.data.isSeller;
    this.image = data.data.image;
  },
};
</script>



   









