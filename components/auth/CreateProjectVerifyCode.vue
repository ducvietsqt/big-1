<template>
  <div>
    <v-form class="mt-3 btn_left form_auth" @submit.prevent="submit" ref="form_code_digit">
      <h3 class="headline font-weight-bold mb-2 pa-0">Check your email!</h3>
      <p class="subheading">
        We've sent a 6-digit confirmation code to
        <strong>{{email}}</strong>. It will expire shortly, so enter it soon.
      </p>
      <v-text-field text-center
                    solo
                    placeholder="462609"
                    autofocus
                    v-model="code"
                    data-vv-name="digit_code"
                    required
      ></v-text-field>
      <div class="px-0">
        <v-btn @click="submit"
               :loading="submitting"
               :disabled="submitting || !code"
               color="primary" class="ml-0">Submit
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
  export default {
    name: "CreateProjectVerifyCode",
    $_veeValidate: {
      validator: 'new'
    },
    props: {
      email: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        code: "",
        formError: "",
        submitting: false,
        dictionary: {
          custom: {
            digit_code: {
              required: () => 'Digit code can not be empty',
              max: 'The name field may not be greater than 6 characters',
              numeric: 'The name field is numeric'
              // custom messages
            }
          }
        }
      };
    },
    mounted() {
      // this.$validator.localize('en', this.dictionary)
    },
    watch: {
      code(newValue) {
        if (newValue && !/^\d+$/.test(newValue)) {
          this.code = "";
        }
      }
    },
    methods: {
      submit() {
        let email = this.email;
        let code = this.code;
        this.submitting = true;
        this.$axios
          .post("/api/users/auth/signup/verify-code/", {email, code})
          .then(() => {
            let code = this.code;
            this.$emit("nextStep", {code});
            this.$validator.reset();
            this.formError = "";
            // setAxiosAuthorizationHeader()
          })
          .catch(error => {
            this.submitting = false;
            
          });

      }
    }
  }
</script>

<style>
  input[data-vv-name="digit_code"], .code_digit {
    font-size: 26px;
    font-weight: bold;
    text-align: center !important;
    letter-spacing: 10px;
  }
</style>
