<template>
  <v-menu v-model="showMenu"
          :position-x="x"
          :position-y="y"
          absolute
          :close-on-content-click="false"
          offset-y
          max-width="290">
      <v-card>
        <v-card-text>
          <v-text-field hint="For example, 1d, 8h, 1.5d"
                        persistent-hint
                        placeholder="Total hours"
                        v-model="value"
                        v-mask="mask"
                        @keyup.enter="change($event)"
                        label="Time estimate"></v-text-field>
        </v-card-text>
      </v-card>
  </v-menu>
</template>

<script>
    import moment from 'moment'
    import { mask } from 'vue-the-mask'

    export default {
        directives: {
            mask,
        },
        data: () => ({
            showMenu: false,
            x: 0,
            y: 0,
            temp: {},
            // date: this.$formatDateTime(new Date(), 'YYYY-MM-DD')
            date: moment(new Date()).format('YYYY-MM-DD'),

            // mask: '##:##:##',
            mask: '#######################',
            value: '',
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
            change(e) {
                const {temp} = this;
                 console.log(e.target.value)
                let time = e.target.value
                try {
                    let data = {
                        [temp['k']]: time
                    }
                    this.$store.dispatch("matters/updateMatter", {matterID: temp.matter.matterID, data})
                } catch (e) {
                    this.$emit("update", date)
                }
            }
        },
        mounted() {
            let _self = this;
            this.$bus.$on("menu-matter-time", (e, date, matter, k) => {
                _self.temp = {date, matter, k}
                _self.show(e)
            })
        },
        watch: {
            showMenu(n) {
                if(n === false) {
                    this.value = ''
                }
            }
        }
    }
</script>

<style scoped>

</style>
