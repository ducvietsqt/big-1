<template>
  <v-menu v-model="showMenu"
          :position-x="x"
          :position-y="y"
          absolute
          :close-on-content-click="true"
          offset-y
          max-width="290">
    <v-date-picker no-title scrollable
                   v-model="date" @change="change"
    ></v-date-picker>
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
            // date: this.$formatDateTime(new Date(), 'YYYY-MM-DD')
            date: moment(new Date()).format('YYYY-MM-DD')
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
            change(date) {
                const {temp} = this;
                try {
                    let data = {
                        [temp['k']]: date
                    }
                    this.$store.dispatch("matters/updateMatter", {matterID: temp.matter.matterID, data})
                } catch (e) {
                    this.$emit("update", date)
                }
            }
        },
        mounted() {
            let _self = this;
            this.$bus.$on("menu-matter-date", (e, date, matter, k) => {
                _self.temp = {date, matter, k}
                _self.show(e)
            })
        },
        watch: {
            showMenu(n) {
                if(n === false) {
                    this.date = moment(new Date()).format('YYYY-MM-DD')
                }
            }
        }
    }
</script>

<style scoped>

</style>
