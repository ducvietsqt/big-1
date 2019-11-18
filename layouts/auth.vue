<template>
    <v-app :dark="$vuetify.theme.dark">
        <v-content class="overflow-hidden">
            <v-container fill-height>
                <div>
<!--                    {{$store}}-->
                </div>
                <v-row>
                    <v-col cols="6">
                        <nuxt/>
                    </v-col>
                    <v-col cols="6">
                        <img class="img_auth" src="~/assets/img/undraw_status_update_jjgk.svg" alt="">
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

<style scoped lang="scss">
    .img_auth {
        display: block;
        max-width: 100%;
    }
</style>
<style>
    .link_bt {
        text-decoration: none;
    }
</style>
