<template>
    <div>
        <nuxt-child/>
    </div>
</template>
<script>
  // import { getSubdomain, isValidSubdomain } from '../utils'

  export default {
    layout: "auth",
    /*validate(context) {
      const { req, res, beforeNuxtRender } = context;
      let _domain = req.headers.host.split(":")[0];
      let subdomain = getSubdomain(_domain);
      return true;
      return isValidSubdomain(subdomain);
    },*/
    mounted() {
    }
  }
</script>
<style scoped>

</style>
