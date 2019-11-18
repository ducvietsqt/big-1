<template>
  <v-app :dark="$vuetify.theme.dark">
    <v-app-bar :clipped-left="clipped" fixed app flat dense>
      <v-container>
        <div class="d-flex">
          <v-toolbar-title>SatMatter</v-toolbar-title>
          <div class="flex-grow-1 px-4 d-flex align-center">
            <router-link to="/" class="link_head mr-4">Home</router-link>
            <router-link to="/inspire" class="link_head">Inspire</router-link>
          </div>
          <v-toolbar-items>
            <div class="d-flex align-center">
              <nuxt-link to="/auth/signin">Sign in</nuxt-link>
              <!--<v-btn class="text-capitalize" text color="primary" dark to="/auth/signin">Sign in</v-btn>-->
              <nuxt-link class="text-capitalize ml-2" rounded color="primary" dark to="/auth/signup">Sign Up
              </nuxt-link>
            </div>
          </v-toolbar-items>
        </div>
      </v-container>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt/>
      </v-container>
    </v-content>
    <!--<v-footer :fixed="fixed" app>
          <span>&copy; 2019</span>
        </v-footer>-->
  </v-app>
</template>

<script>
    import Cookies from 'js-cookie';
    export default {
        middleware: 'authenticated',
        data() {
            return {
                clipped: false,
                title: "Vuetify.js"
            }
        },
        mounted() {
          console.log('HELLO',this.$store)
        }
    }
</script>
<style lang="scss">
  .link_head {
    /*border: solid 1px red;*/
    text-decoration: none;
  }
</style>
