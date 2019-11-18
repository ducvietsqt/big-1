<template>
    <v-sheet
            :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
            class="px-3 pt-3 pb-3">
        <v-skeleton-loader
                class="mx-auto"
                max-width="300"
                type="card"
        ></v-skeleton-loader>
    </v-sheet>
</template>

<script>
  export default {
    asyncData(context) {
    },
    async mounted() {
      
      if (this.$route.query.token) {
        let token = this.$route.query.token
        await this.$store.commit("auth/authToken", { token })
        this.$axios.setToken("JWT " + token)
        await this.$store.dispatch("auth/getUser")
        this.$router.push('/app')
      }

    },
    inject: ["theme"]
  }
</script>

<style scoped>

</style>
