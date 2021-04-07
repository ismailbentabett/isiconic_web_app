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
          <v-form ref="form" class="pa-4 pt-6">
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
          </v-form>
          <v-card-actions>
            <v-btn text @click.stop="logIn()"> LogIn </v-btn>
            <v-spacer></v-spacer>

                        <v-btn text :to="{path:'/signup'}"> SignUp ? </v-btn>

          </v-card-actions>
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
   async logIn() {
      let payload = {
        email: this.email,
        password: this.password,
      };
    await  this.$store.dispatch("LOG_IN", payload);
   
    },

  },
  created(){
console.log( this.$cookies.get('loggedin'))
  }
};
</script>

<style>
</style>