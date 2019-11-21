<template>
  <v-app :dark="$vuetify.theme.dark">
    <nuxt/>
  </v-app>
</template>

<script>
    export default {
        middleware: 'authenticated',
        data() {
            return {
                clipped: false,
                title: "Vuetify.js"
            }
        },
        mounted() {
            console.log('HELLO', this.$store)
        }
    }
</script>
<style lang="scss">
  .link_head {
    /*border: solid 1px red;*/
    text-decoration: none;
  }
  button, .v-btn {
    &:active, &:focus {
      outline: none !important;
    }
  }
</style>

