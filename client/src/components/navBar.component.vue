<template>
  <div>
    <v-app-bar color="white red--text" flat app>
      <v-spacer class="hidden-md-and-down"></v-spacer>

      <v-app-bar-nav-icon
        x-large
        @click.stop="drawer = !drawer"
        class="hidden-lg-and-up"
      ></v-app-bar-nav-icon>

      <v-btn icon x-large :to="{ name: 'feedview' }">
        <v-icon color="black">people_alt </v-icon>
      </v-btn>

      <v-spacer></v-spacer>
      <v-text-field
        class="mx-4 hidden-md-and-down"
        flat
        hide-details
        label="Search"
        prepend-inner-icon="mdi-magnify"
        solo-inverted
      ></v-text-field>

      <v-btn icon class="my-2 hidden-lg-and-up hidden-xs-only">
        <v-icon medium color="black">search </v-icon>
      </v-btn>
      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            class="my-2"
            :to="{ path: '/discover' }"
          >
            <v-icon color="black" medium>explore</v-icon>
          </v-btn>
        </template>
        <span>explore</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            class="my-2 hidden-md-and-down"
            :to="{ path: '/cart' }"
          >
            <v-icon color="black" medium>shopping_cart </v-icon>
          </v-btn>
        </template>
        <span>shopping cart</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            class="my-2 hidden-md-and-down"
            :to="{ path: 'shopslist' }"
          >
            <v-icon color="black" medium>store</v-icon>
          </v-btn>
        </template>
        <span>stores</span>
      </v-tooltip>

      <v-btn icon class="my-2" :to="{ name: 'chatview' }">
        <v-icon color="black" medium>message</v-icon>
      </v-btn>

      <v-menu left bottom class="hidden-md-and-down">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" class="my-2">
            <v-icon color="black" medium>notifications</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="title">
                Notifications
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list>
          <v-list-item
            v-for="item in notifications"
            :key="item.title"
            @click="() => {}"
          >
            <v-list-item-content>
              <v-list-item-title> {{ item.title }}</v-list-item-title>
              <v-list-item-subtitle> {{ item.title }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu left bottom class="hidden-md-and-down">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" class="hidden-md-and-down">
            <v-avatar
          size="40"
          v-if="image == 'http://localhost:3000/api/image/user/display/null'"
          color="white"
        >
          <v-icon color="black"  size="40"> mdi-account-circle </v-icon>
        </v-avatar>
            <v-avatar size="40" v-else>
              <img :src="image" />
            </v-avatar>
          </v-btn>
        </template>

        <v-list>
           <v-list-item :to="{ path: '/profile' }">
            <v-list-item-icon>
              <v-icon color="black">face</v-icon>
            </v-list-item-icon>
            <v-list-item-title> Profile </v-list-item-title>
          </v-list-item>
  
          <v-list-item :to="{ path: '/profile/edit' }">
            <v-list-item-icon>
              <v-icon color="black">settings</v-icon>
            </v-list-item-icon>
            <v-list-item-title> Settings </v-list-item-title>
          </v-list-item>
        <v-list-item @click="logOut()">
            <v-list-item-icon>
              <v-icon color="black">logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title> Logout </v-list-item-title>
          </v-list-item>
         
        </v-list>
      </v-menu>
      <v-spacer class="hidden-md-and-down"></v-spacer>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" class="hidden-lg-and-up">
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img :src="image"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">
              Ismail Bentabet
            </v-list-item-title>
            <v-list-item-subtitle
              >ismailbentabett@gmail.com</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="{ path: item.path }"
        >
          <v-list-item-icon>
            <v-icon color="black">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template>
        <v-row justify="space-around pa-10">
          <v-btn outlined @click="logOut()">
            <v-icon left color="black"> logout </v-icon>
            Logout now
          </v-btn>
        </v-row>
      </template></v-navigation-drawer
    >
  </div>
</template>

<script>
import { GET_CURRENT_USER_DATA } from "../api_calls";
export default {
  name: "navBar",
  data() {
    return {
      items: [
        { title: "Profile", icon: "face", path: "/profile" },
        { title: "Shops", icon: "store", path: "/shopslist" },
        { title: "Cart", icon: "shopping_cart", path: "/cart" },
        { title: "Settings", icon: "settings", path: "/profile/edit" },
        { title: "Search", icon: "search", path: "/discover" },
      ],

      notifications: [
        { title: "coming soon" },
        { title: "coming soon" },
        { title: "coming soon" },
      ],
      right: null,
      drawer: false,
      image: null,
    };
  },

  created: async function () {
    let user_id = JSON.parse(this.$localStorage.get("vuex")).user_id;
    const data = await GET_CURRENT_USER_DATA(user_id.user);
    this.image = `http://localhost:3000/api/image/user/display/${data.data.image}`;
  },
  methods: {
    logOut() {
      this.$store.dispatch("LOG_OUT");
    },
  },
};
</script>

<style>
</style>