<template>


  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <span v-on="on">
      <router-link class="link_wp_mb"
                   @click.native="$emit('click', $event)"
                   target="_blank"
                   to="/">
        <slot>
          {{ $_labelMember(ID)}}
        </slot>
      </router-link>
        </span>
    </template>
    <span>{{ $_labelMember(ID)}}</span>
  </v-tooltip>
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
  a.link_wp_mb {

    font-weight: 900;
    color: #6d42c7;

    &:before {
      /*content: "@";*/
    }
  }

</style>
<style lang="scss">
  .no_content {
    text-decoration: none !important;
    cursor: pointer !important;
  }

  .no_content:before, .no_content a.link_wp_mb:before {
    content: "" !important;
  }

  .no_content.font-weight-normal {
    font-weight: normal !important;
  }
</style>
