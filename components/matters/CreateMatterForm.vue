<template>
  <v-form lazy-validation @submit.prevent="submit">
    <v-text-field v-model="name"
                  :error="error"
                  label="Matter Name"
                  required></v-text-field>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" :loading="loading" :disabled="loading" @click.stop="submit">Submit</v-btn>
      <v-btn color="primary">
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
    </v-card-actions>
  </v-form>
</template>

<script>
    export default {
        name: "CreateMatterForm",
        data() {
          return {
              name: '',
              loading: false,
              error: false
          }
        },
        methods: {
            async submit() {
                this.loading = true
                let rs =  await this.$store.dispatch("matters/createMatter", {name: this.name})
                if(rs) {
                    this.error = false;
                    this.name = ''
                }else {
                    this.error = true;
                }
                this.loading = false
            }
        }
    }
</script>

<style scoped>

</style>
