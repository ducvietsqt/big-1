<template>
  <v-menu v-model="showMenu"
          :position-x="x"
          :position-y="y"
          absolute allow-overflow
          :close-on-content-click="false"
          offset-y>
    <v-card flat>
      <client-list v-if="showMenu"
                   :value="temp.val"
                   @change="change"
                   placeholder="Search clients" title="Clients"></client-list>
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
      show(e) {
        e.preventDefault()
        this.showMenu = false
        this.x = e.clientX
        this.y = e.clientY
        this.$nextTick(() => {
          this.showMenu = true
        })
      },
      change(item) {
        const { temp } = this
        if(item.length === 0) return
        try {
          let data = {
            [temp['k']]: item.map(i => i.clientID)
          }
          this.$store.dispatch('matters/updateMatter', { matterID: temp.item.matterID, data })
        } catch (e) {
          console.log(e.message, item)
          this.$emit('update', item)
        }
      }
    },
    mounted() {
      let _self = this
      this.$bus.$on('menu-clients', ({ e, val, item, k, title }) => {
        _self.temp = { val, item, k }
        _self.title = title
        _self.show(e)
      })
    }
  }
</script>

<style scoped>

</style>
