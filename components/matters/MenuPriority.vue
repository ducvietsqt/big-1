<template>
  <v-menu v-model="showMenu"
          :position-x="x"
          :position-y="y"
          absolute
          :close-on-content-click="false"
          offset-y>
    <v-card flat>
      <priority-list @change="change"></priority-list>
    </v-card>
  </v-menu>
</template>

<script>
  export default {
    data: () => ({
      showMenu: false,
      x: 0,
      y: 0,
      temp: {},
      title: ''
    }),
    methods: {
      show (e) {
        e.preventDefault()
        this.showMenu = false
        this.x = e.clientX
        this.y = e.clientY
        this.$nextTick(() => {
          this.showMenu = true
        })
      },
      change(item) {
        const {temp} = this;
        let data = {
          [temp['k']]: item.id
        }
        try {
          this.$store.dispatch("matters/updateMatter", {matterID: temp.item.matterID, data})
        }catch (e) {
          this.$emit("update", item)
        }
      }
    },
    mounted() {
      let _self = this;
      this.$bus.$on("menu-priority", ({e, val, item, k, title}) => {
        _self.temp = {val, item, k}
        _self.title = title
        _self.show(e)
      })
    }
  }
</script>

<style scoped>

</style>
