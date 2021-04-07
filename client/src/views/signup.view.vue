<template>
  <v-container fill-height fluid>

    <v-row align="center" justify="center">
      <v-col>
        <v-card class="mx-auto mt-10" style="max-width: 500px">
         
  <v-toolbar color="white" cards flat >
            <v-spacer></v-spacer>
   <v-col class="d-flex justify-space-around">
            <v-card-title class="title font-weight-regular ">
              
                          <v-icon size="80" color="black" class="ma-5">person</v-icon>

            </v-card-title>
                </v-col>

                        <v-spacer></v-spacer>

          </v-toolbar> 
          <v-form ref="form" v-model="form" class="pa-4 pt-6">
            <v-text-field
              v-model="username"
              filled
              color="deep-purple"
              label="Username"
            ></v-text-field>
            <v-text-field
              v-model="email"
              :rules="[rules.email]"
              filled
              color="deep-purple"
              label="Email address"
              type="email"
            ></v-text-field>
            <v-text-field
              v-model="password"
              :rules="[rules.password, rules.length(6)]"
              filled
              color="deep-purple"
              counter="6"
              label="Password"
              style="min-height: 96px"
              type="password"
            ></v-text-field>

            <v-checkbox
              v-model="agreement"
              :rules="[rules.required]"
              color="deep-purple"
            >
              <template v-slot:label>
                <span>
                  I agree to the&nbsp;
                  <a href="#" @click.stop.prevent="dialog = true"
                    >Terms of Service</a
                  >
                  &nbsp;and&nbsp;
                  <a href="#" @click.stop.prevent="dialog = true"
                    >Privacy Policy</a
                  >*
                </span>
              </template>
            </v-checkbox>
          </v-form>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn text @click="signUp()"> SignUp </v-btn>
            <v-spacer></v-spacer>

            <v-btn text :to="{path:'/login'}"> LogIn? </v-btn>
          </v-card-actions>
          <v-dialog v-model="dialog" absolute max-width="400" persistent>
            <v-card>
              <v-card-title class="headline grey lighten-3">
                Legal
              </v-card-title>
              <v-card-text>
                if you are a pretty girl slide into my Dm
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn text @click="(agreement = false), (dialog = false)">
                  No
                </v-btn>
                <v-spacer></v-spacer>

                <v-spacer></v-spacer>
                <v-btn
                  class="white--text"
                  color="deep-purple accent-4"
                  @click="(agreement = true), (dialog = false)"
                >
                  Yes
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      agreement: false,
      bio:
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts",
      dialog: false,
      email: undefined,
      form: false,
      isLoading: false,
      password: undefined,
      phone: undefined,
      rules: {
        email: (v) => !!(v || "").match(/@/) || "Please enter a valid email",
        length: (len) => (v) =>
          (v || "").length >= len ||
          `Invalid character length, required ${len}`,
        password: (v) =>
          !!(v || "").match(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/
          ) ||
          "Password must contain an upper case letter, a numeric character, and a special character",
        required: (v) => !!v || "This field is required",
      },
    };
  },

  methods: {
    signUp() {
      let payload = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch("SIGN_UP", payload);
    },
  },
};
</script>

<style>
</style>