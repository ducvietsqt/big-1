<template>
    <div v-if="!token">
        <v-form class="px-5 form_auth" @submit.prevent="login">
            <v-card-title class="layout align-center justify-center pb-0 mb-3 text-xs-left">
                <div class="display-1 text-center font-weight-bold">Sign In</div>
            </v-card-title>
            <v-card-title class="layout pt-0 justify-center">
                <div class="headline text-xs-left">{{workspace}}.{{domain}}</div>
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
                <router-link class="caption link_bt" to="/auth/ResetPassword">Forgot password?</router-link>
                <v-spacer></v-spacer>
                <a class="caption link_bt" :href="createCompanyLink"> Create new workspace?</a>
            </v-card-actions>
        </v-form>
    </div>
    <TwoFA :token="token"
            :clear-token="clearToken"
            @authSuccess="authSuccess"
            v-else
    />
</template>

<script>
  import {getMainURL, getSubdomain} from "../../utils/index";
  import TwoFA from './TwoFA';
  export default {
    components: {TwoFA},
    metaInfo: {
      title: "Sign In"
    },

    data: () => ({
      domain: process.env.baseUrl,
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
      workspace: null,
    }),
    mounted() {
      // if(location) {
        console.log('MOUNTED', location)
        this.workspace = getSubdomain(location.hostname)
      // }

    },
    methods: {
      login() {
        let email = this.email;
        let password = this.password;
        this.formError = "";
        this.submitting = true;
        this.$store.dispatch("auth/login", {email, password, workspace: this.workspace})
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
          });
      },
      clearToken() {
        this.token = "";
      },
      authSuccess() {
        let path = this.$route.query["redirect"] || "/";
        this.$router.replace({path});
      }
    },
    computed: {
      createCompanyLink() {
        try {
          return `${getMainURL()}/auth/create-work-space`;
        }catch (e) {
          return ''
        }
      }
    }
  }
</script>

