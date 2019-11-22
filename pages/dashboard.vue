<template>
  <div>
    <v-navigation-drawer app width="150">
      <!-- -->
    </v-navigation-drawer>
    <v-app-bar app flat>
      <!-- -->
    </v-app-bar>
    <!-- Sizes your content based upon application components -->
    <v-content>
      <!--      <div class="fill-scroll">-->
      <!-- Provides the application the proper gutter -->
      <!--      <v-container fluid>-->
      <v-flex xs12 style="overflow:auto; height: calc(100vh - 64px)">
        <ListView/>
        <menu-absolute></menu-absolute>
        <menu-priority></menu-priority>
        <menu-member></menu-member>
        <menu-type-list></menu-type-list>
        <menu-date></menu-date>
        <menu-time></menu-time>
        <menu-switch></menu-switch>
        <menu-clients></menu-clients>
        <menu-stages></menu-stages>
        <!-- If using vue-router -->
        <v-menu offset-y :close-on-content-click="false" top right>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="pink"
                   fab
                   dark
                   small
                   fixed
                   bottom
                   right>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card max-width="350">
            <v-card-title>Create matter</v-card-title>
            <v-card-text>
              <create-matter-form/>
            </v-card-text>
          </v-card>
        </v-menu>
      </v-flex>
      <!--      </v-container>-->
      <!--      </div>-->
    </v-content>
  </div>
</template>

<script>
import ListView from "../components/matters/listView";
import MenuTypeList from '../components/matters/MenuTypeList'

export default {
    components: {MenuTypeList, ListView},
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
    computed: {},

}
</script>

<style scoped>

</style>
