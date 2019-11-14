<template>
    <v-form ref="form" @submit.prevent="submit" lazy-validation class="form_auth">
        <h4 class="auth-header mb-4 font-weight-bold text-primary headline text-xs-left">Sign in to your workspace</h4>
        <v-layout align-center>
            <v-text-field name="login"
                          class="child-flex"
                          label="Enter your workspace URL"
                          type="text"
                          autofocus
                          outlined
                          v-model.trim="subdomain">
                <template v-slot:append-outer>
                    <div class="text-append">
                    <span>.{{domain}}</span>
                    </div>
                </template>
            </v-text-field>
        </v-layout>
        <div class="px-0">
            <v-btn color="primary" class="ml-0"
                   @click="submit"
                   :loading="submitting"
                   :disabled="submitting || !subdomain"
                   :class="{ red: !valid, green: valid }">
                Continue
<!--                <v-icon right dark>arrow_forward</v-icon>-->
            </v-btn>
            <div class="subheading mt-3">
                Or,
                <router-link class="link_bt" to="/auth/create-work-space">Create a new workspace?</router-link>
            </div>
        </div>
    </v-form>
</template>

<script>
   import { getSubdomainURL, getSubdomain, isValidSubdomain } from "../../utils"
   
export default {
  data() {
    return {
      subdomain: '',
      domain: process.env.baseUrl,
      showLoginForm: false,
      submitting: false,
      valid: false,
      workspace: {}
    }
  },
  asyncData ({error}) {
    console.log('error_context', error)
    return { project: 'nuxt' }
  },
  computed: {
    _subdomain() {
      try {
        return getSubdomain(location.hostname)
      }catch (e) {
        return ''
      }
    },
    isSubdomain() {
      isValidSubdomain(this.subdomain)
    }
  },
  created() {
    if (this.subdomain) {
      this.getWorkspace(this.subdomain);
    }
  },
  mounted() {
    console.log('location',location);
  },
  methods: {
    async getWorkspace(subdomain) {
      this.submitting = true;
      try {
        let rs = await this.$axios.get(`/api/workspaces/${subdomain}/check/`);
        console.log('$axios',rs)
      }catch (e) {
        console.log('$axios',e.response)
      }
      this.submitting = false;
    },
    submit() {
      if (!this.subdomain) return;
      this.getWorkspace(this.subdomain);
    }
  }
}
</script>

<style scoped>
    .text-append {
        transform: translateY(20px);
        font-size: 20px;
    }
</style>
