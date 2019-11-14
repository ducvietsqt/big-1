<template>
  <div v-if="!token">

    <v-form class="px-5 form_auth" @submit.prevent="login">
      <v-card-title class="layout align-center justify-center pb-0 mb-3 text-xs-left">
        <div class="display-1 text-center font-weight-bold">Sign In</div>
      </v-card-title>
      <v-card-title class="layout pt-0 justify-center">
        <div class="headline text-xs-left">{{workspace.name}}.{{domain}}</div>
      </v-card-title>

        <v-text-field label="Email"
                      v-model="email"
                      required
                      outlined
                      autofocus
                      :rules="emailRules"
                      type="text">
        </v-text-field>

      <v-text-field name="password"
                    label="Password"
                    v-model="password"
                    :rules="passwordRules"
                    outlined
                    type="password" required></v-text-field>
      <v-card-actions class="px-0">
        <v-btn color="primary"
               type="submit"
               :loading="submitting"
               :disabled="submitting || !email || !password"
               block
               @click="login">Login
        </v-btn>
      </v-card-actions>
      <v-card-actions class="px-0">
        <router-link class="subheading link_bt" :to="{ name: 'forgot-password' }">Forgot password?</router-link>
        <v-spacer></v-spacer>
        <a class="subheading link_bt" :href="createCompanyLink"> Create new workspace?</a>
      </v-card-actions>
    </v-form>
  </div>
  <TwoFA
    :token="token"
    :clear-token="clearToken"
    @authSuccess="authSuccess"
    v-else
  />
</template>

<script>
  import {getMainURL, getSESSION, getSubdomain, SESSION} from "../../../utils/index";
  import {setAxiosAuthorizationHeader} from "../../../store/modules/auth";
  import TwoFA from './TwoFA';
  // import LogoAuth from './LogoAuth';

  export default {
    name: "LogIn",
    $_veeValidate: {
      validator: "new"
    },
    components: {TwoFA},
    metaInfo: {
      title: "Sign In"
    },
    props: {
      workspace: {
        type: Object,
        required: true
      }
    },
    data: () => ({
      domain: process.env.VUE_APP_DOMAIN,
      email: "",
      valid: false,
      password: "",
      passwordRules: [
        v => !!v || 'Password is required',
      ],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      token: "",
      formError: "",
      allowSpaces: true,
      submitting: false,
    }),
    created() {
      // alert(1)
      // this.$validator.localize("en");
    },
    methods: {
      login() {
        let email = this.email;
        let password = this.password;
        let subdomain = getSubdomain(location.hostname);
        this.formError = "";
        this.submitting = true;
        this.$store
            .dispatch("auth/login", {email, password, workspace: subdomain})
            .then(response => {
              this.submitting = false;
              if (this.$store.getters["auth/isLoggedIn"]) {
                // todo
                this.authSuccess();
              } else {
                this.token = response.data.token;
              }
            })
            .catch(err => {
              this.submitting = false;
              if (err.response.data.detail) {
                this.formError = err.response.data.detail;
                this.$eventHub.$emit(this.$eventTypes.snackNotify, this.formError);
              } else {
                this.$eventHub.$emit(this.$eventTypes.snackNotify, "Server internal error");
              }
            });
        setAxiosAuthorizationHeader(this.$getSESSION(SESSION.TOKEN));
      },
      clearToken() {
        this.token = "";
      },
      authSuccess() {
        let path = this.$route.query["redirect"] || "/project";
        this.$router.replace({path});
      }
    },
    computed: {
      createCompanyLink() {
        return `${getMainURL()}/create-workspace`;
      }
    }
  }
</script>

<style>
  /* input:-internal-autofill-previewed, input:-internal-autofill-selected, textarea:-internal-autofill-previewed, textarea:-internal-autofill-selected, select:-internal-autofill-previewed, select:-internal-autofill-selected {
     background-color: #fff !important;
     background-image: none !important;
     color: rgb(0, 0, 0) !important;
   }*/
</style>
