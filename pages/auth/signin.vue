<template>
  <div>
    <div v-if="submitting">
      <!--Loading-->
    </div>
    <login v-else-if="isValidSubDomain"/>
    <v-form v-else ref="form" @submit.prevent="submit" lazy-validation class="form_auth">
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
          <nuxt-link class="link_bt" to="/auth/create-work-space">Create a new workspace?</nuxt-link>
        </div>
      </div>
    </v-form>

    <div v-if="notExistSubdomain">
      <h4 class="auth-header mb-4 font-weight-bold text-primary headline text-xs-left">
        WorkSpace does not exist
      </h4>
    </div>
  </div>
</template>

<script>
import { getSubdomain, getSubdomainURL, isValidSubdomain } from '../../utils'
import login from '../../components/auth/login'

export default {
  components: {
    login
  },
  layout: "auth",
  async asyncData (context) {
    const { req, res, $axios } = context
    // using req and res
    if (process.server) {
      let _domain = req.headers.host.split(':')[0]
      let subdomain = getSubdomain(_domain)
      let isValid = isValidSubdomain(subdomain)
      try {
        let dd = await $axios.get(`/api/workspaces/${subdomain}/check/`)
        // return { host: req.headers.host, isValidSubDomain: isValid, subdomain }
        return {}
      } catch (e) {
        // console.log('ERROR',e.response.status)
        return { host: req.headers.host, isValidSubDomain: false }
      }

    }
    return {}
  },
  data () {
    return {
      subdomain: null,
      domain: process.env.baseUrl,
      isValidSubDomain: false,
      submitting: false,
      valid: false,
      workspace: null,
      notExistSubdomain: false
    }
  },

  created () {

  },
  async mounted () {
    let subdomain = getSubdomain(location.hostname)
    if (subdomain) {
      this.subdomain = subdomain
      await this.getWorkspace(subdomain)
    }

  },
  methods: {
    async getWorkspace (subdomain) {
      let hostsubdomain = getSubdomain(location.hostname)
      this.submitting = true
      try {
        let rs = await this.$axios.get(`/api/workspaces/${subdomain}/check/`)
        if (!hostsubdomain) {
          location.href = getSubdomainURL(subdomain)
        }
        this.isValidSubDomain = true
      } catch (e) {
        this.notExistSubdomain = true
      }
      this.submitting = false
    },
    submit () {
      if (!this.subdomain) {
        return
      }
      this.getWorkspace(this.subdomain)
    }
  },
  watch: {}
}
</script>

<style scoped>
  .text-append {
    transform: translateY(20px);
    font-size: 20px;
  }
</style>
