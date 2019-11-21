<template>
  <v-menu v-model="showMenu"
          :position-x="x"
          :position-y="y"
          absolute
          :close-on-content-click="false" max-width="250"
          offset-y>
    <div>
      <type-list v-if="showMenu" :value="friends" @change="change"></type-list>
    </div>
  </v-menu>
</template>

<script>
  import {mapGetters} from 'vuex'
  import _ from 'lodash'
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
      this.$bus.$on('menu-types', (e, types, matter) => {
        try {
          console.log(types)
          _self.show(e)
          let _types = types.map(mb => _self.findMatterTypeByID(mb.pk))
          _self.temp = {types: _types, matter}
          _self.friends = _types
        } catch (e) {
          console.log('menu-member', e.message)
        }
      })
    },
    computed: {
      ...mapGetters({
        findMatterTypeByID: "types/findMatterTypeByID",
        pending: "types/pending",
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
        const {temp} = this;
        let types = _.differenceBy([...item], [...this.friends], 'typeID');
        console.log('VC',types, temp.types)
        if(types.length === 0 && temp.types.length > 0) return;
        if(temp.types.length === 0 && types.length === 0) return;
        types = types.map(mb => mb.typeID)

        try {
          this.$store.dispatch("matters/updateMatter", {matterID: temp.matter.matterID, data: {types}})
        }catch (e) {
          this.$emit("update", types)
        }
      }
    },
    watch: {
      showMenu(n) {
        if(n === false) {
          this.friends = []
        }
      }
    }
  }
</script>

<style scoped>

</style>
