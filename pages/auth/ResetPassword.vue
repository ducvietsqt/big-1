<template>
  <div v-if="!submitted">
    <v-form ref="form" v-model="valid" class="px-5 form_auth" lazy-validation @submit.prevent="submit">
      <div class="headline text-xs-left mb-3 font-weight-bold">
        Password Reset
      </div>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="Enter your email address"
        outlined
        autofocus
        required
      />
      <v-btn
        color="primary"
        :loading="submitting"
        block
        :disabled="submitting || !valid"
        @click="submit"
      >
        Get Reset Link
      </v-btn>
      <nuxt-link class="link_bt mt-4 d-block" to="/auth/signin">
        Sign in
      </nuxt-link>
    </v-form>
  </div>
  <div v-else class="form_auth">
    <v-card-title class="layout align-center justify-center pb-0 text-xs-left">
      <div class="display-1 text-center font-weight-bold">
        Email Sent!
      </div>
    </v-card-title>
    <v-card-text>
      <v-card-title class="layout pt-0 pl-0 justify-start">
        <div class="headline text-center subheading">
          Check your <strong>{{ email }}</strong> inbox for instruction from
          us on how to reset your password
        </div>
      </v-card-title>
    </v-card-text>
  </div>
</template>

<script>
export default {
  name: "ResetPassword",
  metaInfo: {
    title: "Reset Password"
  },
  data () {
    return {
      email: "",
      submitted: false,
      submitting: false,
      valid: true,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ]
    }
  },
  methods: {
    submit () {
      const email = this.email
      this.$axios.post("/api/users/auth/password/reset/", { email })
        .then(() => (this.submitted = true))
        .catch(() => {

        })
    }
  }
}
</script>
