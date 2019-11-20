<template>
  <v-app>
    <v-navigation-drawer app>
      <!-- -->
    </v-navigation-drawer>
    <v-app-bar app>
      <!-- -->
    </v-app-bar>
    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <v-card max-width="350">
          <v-card-title>Create matter</v-card-title>
          <v-card-text>
              <create-matter-form/>
          </v-card-text>
        </v-card>
        <ListView/>
        <!-- If using vue-router -->
      </v-container>
    </v-content>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
    import ListView from "../components/matters/listView";

    export default {
        components: {ListView},
        layout: "app",
        head() {
            return {
                title: 'Welcome to Satlegal',
                meta: [
                    // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                    {hid: 'description', name: 'description', content: 'My custom description'}
                ]
            }
        },
        async asyncData(context) {

        },
        data() {
            return {
                name: ''
            }
        },
        async mounted() {
            await this.$store.dispatch('matters/load')
        },
        computed: {

        },

    }
</script>

<style scoped>

</style>
