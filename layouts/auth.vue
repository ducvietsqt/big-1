<template>
    <v-app :dark="$vuetify.theme.dark">
        <v-content class="overflow-hidden">
            <v-container fluid fill-height pa-0>
                <v-row>
                    <v-col cols="6">
                        <nuxt/>
                    </v-col>
                    <v-col cols="6">
                        <img src="~/assets/img/undraw_status_update_jjgk.svg" alt="">
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
  export default {
    data() {
      return {
        img: ''
      }
    }
  }
</script>

<style scoped>

</style>
