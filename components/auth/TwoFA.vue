<template>
  <div>
    <form class="form_auth form_verification px-4"
          @submit.prevent="submit">
      <div class="mb-3">
        <div class="display-1 font-weight-bold text-xs-left">Verification code</div>
        <div class="body-2">
          A verification code has been sent to your email
          address
        </div>
      </div>
      <v-text-field v-model="code"
                    autofocus
                    type="number"
                    label="Enter Code Verification"
                    outlined
                    data-vv-name="fa_code"
                    class="mb-0 pb-0 text-center"></v-text-field>
      <v-btn color="primary"
             @click="submit"
             block
             class="mt-0"
             :loading="submitting"
             :disabled="submitting || !code">
        Submit
      </v-btn>
      <p class="body-2 link_bt text-xs-left mt-3">
        Haven't received code yet?<a href="" @click.prevent="clearToken">
        Resend Code</a>
      </p>
    </form>

  </div>
</template>

<script>
  // @ is an alias to /src
  export default {
    name: "TwoFA",

    metaInfo: {
      title: "Secure Login"
    },
    props: {
      token: {
        type: String,
        required: true
      },
      clearToken: {
        type: Function,
        required: true
      }
    },
    data() {
      return {
        code: "",
        formError: "",
        submitting: false,

      };
    },
    methods: {
      submit() {
        let code_token = this.token;
        let code = this.code;
        if (!code) {
          this.formError = "Please enter verification code";
          return this.snackbar = true;
        }
        this.submitting = true;
        this.$store
          .dispatch("auth/login2", {code_token, code})
          .then(() => {
            this.$emit("authSuccess");

          })
          .catch(err => {
            if (err.response.data.detail) {
              this.formError = err.response.data.detail;
              this.code = "";
            }
          }).finally(() => {
          this.submitting = false;
        });
      }
    }
  };
</script>

<style>
  .form_verification .v-btn {
    /*opacity: 0;*/
    display: block;
    margin-left: 0;
  }

  .color-white {
    color: #fff !important;
  }

  .code_digit, input[data-vv-name="fa_code"] {
    font-size: 26px;
    font-weight: bold;
    text-align: center !important;
    /*letter-spacing: 10px;*/
  }
</style>
