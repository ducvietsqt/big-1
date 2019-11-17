<template>
  <div v-if="!submitted">
    <v-form class="px-5 form_auth" ref="form" @submit.prevent="submit" lazy-validation v-model="valid">
      <div class="headline text-xs-left mb-3 font-weight-bold">Password Reset</div>
      <v-text-field v-model="email"
                    :rules="emailRules"
                    label="Enter your email address"
                    outlined
                    autofocus
                    required>
      </v-text-field>
      <v-btn color="primary"
             @click="submit"
             :loading="submitting"
             block
             :disabled="submitting || !valid">
        Get Reset Link
      </v-btn>
    </v-form>
  </div>
  <div class="form_auth" v-else>
    <v-card-title class="layout align-center justify-center pb-0 text-xs-left">
      <div class="display-1 text-center font-weight-bold">Email Sent!</div>
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
    data() {
      return {
        domain: location.hostname,
        email: "",
        submitted: false,
        submitting: false,
        valid: true,
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
      };
    },
    methods: {
      submit() {
        let email = this.email;
        this.$axios.post("/api/users/auth/password/reset/", {email})
          .then(() => (this.submitted = true))
          .catch(() => {

          });

      }
    }
  };
</script>
