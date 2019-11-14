<template>
  <iframe
    style="width:0;height:0;border:0; border:none;"
    :src="iframeSrc"
    v-if="subdomain && token"
    @load="load"
  ></iframe>
</template>

<script>
  import { getSubdomainURL, setSESSION, SESSION } from "../../utils/index";

  export default {
    name: "SetSubdomainToken",
    props: {
      subdomain: {
        type: String,
        default: ""
      },
      token: {
        type: String,
        default: ""
      },
      load: {
        type: Function,
        default: () => null
      }
    },
    created() {
      // let { token } = this.$route.query;
      // alert(this.$route.query.token);
      if (this.$route.query.token) {
        setSESSION(SESSION.TOKEN, this.$route.query.token);
      }
    },
    computed: {
      iframeSrc() {
        let subdomainURL = getSubdomainURL(this.subdomain);
        return `${subdomainURL}/set-token?token=${this.token}`;
      }
    }
  };
</script>
