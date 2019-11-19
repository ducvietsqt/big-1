<template>
  <router-link class="link_wp_mb"
               @click.native="$emit('click', $event)" target="_blank"
               to="/">
    <slot>
      {{ $_labelMember(ID) }}
    </slot>
  </router-link>
</template>
<script>
    export default {
        props: {
            ID: {
                // type: String,
                required: true,
            },
        },
    }
</script>

<style scoped lang="scss">
  a {

    font-weight: 900;
    color: #6d42c7;

    &:before {
      content: "@";
    }
  }

</style>
<style>
  .no_content {
    text-decoration: none !important;
    cursor: pointer !important;
  }
  .no_content:before {
    content: "" !important;
  }
  .no_content.font-weight-normal {
    font-weight: normal !important;
  }
</style>
