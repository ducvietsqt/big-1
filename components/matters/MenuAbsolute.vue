<template>
  <v-menu v-model="showMenu"
          :position-x="x"
          :position-y="y"
          absolute
          :close-on-content-click="false"
          offset-y>
    <v-card v-if="showMenu" :loading="pending">
      <v-card-text class="pa-1">
        <v-autocomplete background-color="white"
                        v-model="friends"
                        :items="courts"
                        filled dense
                        return-object
                        hide-details
                        color="blue-grey lighten-2"
                        label="Courts District"
                        item-text="short_name"
                        item-value="courtID" @change="change">
          <template v-slot:item="data">
            <v-list-item-avatar color="primary">
              <span class="white--text">{{data.item.short_name | $strName}}</span>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="data.item.short_name"></v-list-item-title>
              <v-list-item-subtitle v-html="data.item.full_name"></v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-autocomplete>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        data: () => ({
            showMenu: false,
            x: 0,
            y: 0,

            friends: [],
            temp: {}
        }),
        mounted() {
            const _self = this;
            this.$bus.$on('menu-absolute', (e, courtID, matter) => {
                try {
                    _self.show(e)
                    _self.temp = {courtID, matter}
                } catch (e) {
                    console.log('menu-absolute', e.message)
                }
            })
        },
        computed: {
            ...mapGetters({
                courts: "courts/list",
                findCourtByID: "courts/findCourtByID",
                pending: "courts/pending",
            })
        },
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

            remove() {

            },
            change(item) {
                console.log(item)
                const {temp} = this;
                this.$bus.$emit("change-courts", item, temp.matter);
            }
        },
    }
</script>

<style scoped>

</style>
