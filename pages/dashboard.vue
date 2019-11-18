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
        <div>
          Welcome to project
        </div>
        <v-card>
          <v-card-text>
            <v-form lazy-validation @submit.prevent="submit">
              <v-text-field v-model="name"
                            label="Matter Name"
                            required></v-text-field>
              <v-btn color="primary" @click.stop="submit">Submit</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
        <!-- If using vue-router -->
        {{$store.state.matters.list}}
      </v-container>
    </v-content>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
    export default {
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
            await context.store.dispatch('matters/load')
        },
        data() {
          return {
              name: ''
          }
        },
        mounted() {
            console.log('MATTER', this.$store.state, this.$store.getters['matters/list'])
        },
        methods: {
            async submit() {
                await this.$store.dispatch("matters/createMatter", {name: this.name})
            }
        }
    }
</script>

<style scoped>

</style>
