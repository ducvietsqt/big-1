<template>
  <v-menu v-model="showMenu"
          :position-x="x"
          :position-y="y"
          absolute
          :close-on-content-click="false"
          offset-y
          max-width="290">
    <div class="card shadow">
      <div class="card-body">
        <p class="title_head ma-0 font-weight-bold">{{title || 'Need Jury Demand?'}}</p>
        <v-switch hide-details class="mt-0" :ripple="false" :value="switch1" @change="change"></v-switch>
      </div>
    </div>
  </v-menu>
</template>

<script>
    import moment from 'moment'
    export default {
        data: () => ({
            showMenu: false,
            x: 0,
            y: 0,
            temp: {},
            switch1: false,
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
            change(_switch) {
                const {temp} = this;
                 console.log('_switch',_switch)
                try {
                    let data = {
                        [temp['k']]: !!_switch
                    }
                    this.$store.dispatch("matters/updateMatter", {matterID: temp.matter.matterID, data})
                } catch (e) {
                    this.$emit("update", date)
                }
            }
        },
        mounted() {
            let _self = this;
            this.$bus.$on("menu-matter-switch", (e, switch1, matter, k, title) => {
                _self.temp = {switch1: switch1, matter, k}
                _self.switch1 = switch1
                _self.title = title
                _self.show(e)
            })
        },
        watch: {
            showMenu(n) {
                if(n === false) {
                    this.switch1 = false
                }
            }
        }
    }
</script>

<style scoped>
  .title_head {
    color: #7a797e;
    font-size: 14px;
    text-transform: none;
    font-weight: 600;
  }
</style>
