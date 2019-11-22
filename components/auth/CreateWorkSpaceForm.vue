<template>
  <div>
    <v-form class="form_auth" @submit.prevent="submit" v-if="!submitting">
      <h2 class="headline font-weight-bold my-3">
        What's your workspace name?
      </h2>
      <v-layout align-center>
        <v-text-field
          v-model="subdomain"
          name="login"
          class="child-flex"
          label="Enter the URL for your workspace"
          type="text"
          autofocus
          outlined
          required
        />
        <label class="title font-weight-bold ml-1">
          .{{ currentHost }}
        </label>
      </v-layout>
      <v-btn
        :loading="submitting"
        :disabled="submitting || !subdomain"
        color="primary"
        class="ml-0"
        @click="submit"
      >
        Next
      </v-btn>
      <div class="subheading mt-3">
        Or,
        <router-link class="link_bt" :to="{ name: 'signin' }">
          Sign In workspace?
        </router-link>
      </div>
    </v-form>
    <SetPassword
      v-if="submitting && token && needSetPassword && !goingToDashBoard"
      :quick-token="token"
      :going-to-dash-board="goingToDashBoard"
      @changeGoingToDashBoard="onEventGoingToDashBoard"
    />
    <SetSubdomainToken
      v-if="token && subdomain && goingToDashBoard"
      :token="token"
      :subdomain="subdomain"
      :load="iframeLoaded"
    />
  </div>
</template>

<script>
import slugify from "slugify"
import { getSubdomainURL } from "../../utils/index"
import SetSubdomainToken from "./SetSubdomainToken"
import SetPassword from "./SetPassword"

export default {
  name: "CreateWorkSpace",
  components: { SetSubdomainToken, SetPassword },
  props: {
    email: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true
    }
  },
  data: () => ({
    subdomain: "",
    token: "",
    submitting: false,
    needSetPassword: true,
    goingToDashBoard: false,
    formError: "",
    dictionary: {
      custom: {
        subdomain: {
          required: () => "Sub domain code can not be empty",
          max: "The name field need entered 21 characters",
          regex: "The field name not enter special characters"
        }
      }
    }
  }),
  computed: {
    currentHost () {
      return location.hostname
    }
  },
  watch: {
    name (value) {
      this.subdomain = slugify(value)
        .toLowerCase()
        .replace(/^-+|-+$/g, "")
        .slice(0, 21)
    }
  },
  mounted () {
    // this.$validator.localize('en', this.dictionary)
  },
  methods: {
    iframeLoaded () {
      this.submitting = false
      const subdomainURL = getSubdomainURL(this.subdomain)
      location.href = `${subdomainURL}/auth/finish/?token=${this.token}`
    },
    submit () {
      const { email, code, subdomain } = this
      this.formError = []
      this.snackbar = false
      if (!this.subdomain) {
        this.snackbar = true
        this.formError = "Please enter your workspace url"
        return false
      }
      this.submitting = true
      this.$axios
        .post("/api/users/auth/create-workspace/", { email, code, name: subdomain })
        .then((response) => {
          this.needSetPassword = response.data.need_set_pass
          this.subdomain = response.data.workspace
          this.token = response.data.token
        })
        .catch((error) => {
          this.submitting = false
        })
    },
    onEventGoingToDashBoard (value) {
      this.goingToDashBoard = value
    }
  }
}
</script>

<style scoped>
  .flex_label {
    /*border: solid 1px red;*/
    display: flex;
    justify-content: space-between;
    align-items: center;

  }

  .flex_label ._title {
    flex: 1;
  }

  .flex_label ._icon {
    font-family: 'Roboto', sans-serif !important;
    background: #4caf50;
    padding: 4px 10px 2px 10px;
    margin-left: 0px;
    color: #fff;
    text-align: center;
    font-size: 16px;
  }
</style>
