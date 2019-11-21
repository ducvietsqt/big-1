<template>
  <v-menu v-model="showMenu"
          :position-x="x"
          :position-y="y"
          absolute
          :close-on-content-click="false"
          offset-y>
    <div class="card card-shadow pa-2" v-if="showMenu" :loading="pending">
        <v-autocomplete v-model="friends"
                        :items="list"
                        filled
                        rounded
                        dense
                        multiple
                        hide-details
                        return-object
                        color="blue-grey lighten-2"
                        label="Select Members"
                        item-text="username"
                        item-value="userID"
                        @change="change">
          <template v-slot:item="data">
            <v-list-item-avatar color="primary">
              <span class="white--text">{{data.item.name | $strName}}</span>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="data.item.username"></v-list-item-title>
              <v-list-item-subtitle v-html="data.item.email"></v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-autocomplete>
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
      this.$bus.$on('menu-member', (e, members, matter) => {
        try {
          _self.show(e)
          let _members = members.map(mb => this.findMemberByID(mb.user))
          _self.temp = {members: _members, matter}
          _self.friends = _members
        } catch (e) {
          console.log('menu-member', e.message)
        }
      })
    },
    computed: {
      ...mapGetters({
        list: "workspace/workspaceMembers",
        findMemberByID: "workspace/findMemberByID",
        pending: "workspace/pending",
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
        let members = _.differenceBy([...this.friends], [...temp.members], 'userID');
        if(members.length === 0) return;
        members = members.map(mb => mb.userID)
        try {
          this.$store.dispatch("matters/updateMatter", {matterID: temp.matter.matterID, data: {members}})
        }catch (e) {
          this.$emit("update", members)
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
