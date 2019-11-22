<template>
  <div class="all-wrapper menu-side with-pattern">
    <SetSubdomainToken
      :token="token"
      :subdomain="subdomain"
      :load="iframeLoaded"
    />
  </div>
</template>

<script>
import SetSubdomainToken from '../../components/auth/SetSubdomainToken'
import { getSubdomainURL } from '../../utils'

export default {
  name: 'JoinInvite',
  components: { SetSubdomainToken },
  metaInfo: {
    title: 'Create account'
  },
  created () {
    this.$axios
      .post(`/api/users/auth/invitations/join/${this.$route.params.key}/`)
      .then(response => {
        this.token = response.data.token
        this.subdomain = response.data.workspace
      })
      .catch(error => {
        this.error = true
      })
  },
  data () {
    return {
      error: '',
      token: '',
      subdomain: ''
    }
  },
  methods: {
    iframeLoaded () {
      let subdomainURL = getSubdomainURL(this.subdomain)
      location.href = `${subdomainURL}/project`
    }
  }
}
</script>

<style scoped></style>
