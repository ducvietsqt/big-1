<template>
  <v-avatar :color="color || 'indigo'" :size="size || 36" v-if="$_member(user)">
    <img v-if="$_member(user).hasAvatar" :src="$_member(user).avatar" alt="">
    <span v-else class="white--text font-weight-bold" style="font-size: 75%">
      {{$_member(user).name | $strName}}
    </span>
  </v-avatar>
  <v-avatar :color="color || 'indigo'" :size="size || 36" v-else>
    <span class="white--text font-weight-bold" style="font-size: 75%">
      N/A
    </span>
  </v-avatar>
</template>
<script>
    export default {
        name: "AvatarMember",
        props: ["user", "size", "color"]
    }
</script>

<style scoped>

</style>
