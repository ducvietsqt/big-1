<template>
  <div>
    <v-combobox
      v-model="model"
      :filter="filter"
      :hide-no-data="!search"
      :items="list"
      :search-input.sync="search"
      hide-selected
      label="Search for an types"
      multiple
      small-chips
      hide-details
      solo
      item-text="name"
      item-value="typeID"
      return-object
    >
      <template v-slot:no-data>
        <v-list-item>
          <span class="subheading">Create</span> &nbsp;
          <v-chip
            :color="`${colors[nonce - 1]} lighten-3`"
            label
            small
          >
            {{ search }}
          </v-chip>
        </v-list-item>
      </template>
      <template v-slot:selection="{ attrs, item, parent, selected }">
        <v-chip
          v-if="item === Object(item)"
          v-bind="attrs"
          :color="`#${item.color} lighten-3`"
          :input-value="selected"
          label
          small
        >
          <span class="pr-2">
            {{ item.name }}
          </span>
          <v-icon x-small
                  @click="parent.selectItem(item)">fas fa-times
          </v-icon>
        </v-chip>
      </template>
      <template v-slot:item="{ index, item }">
        <v-text-field
          v-if="editing === item"
          :value="editing.name"
          autofocus
          flat
          background-color="transparent"
          hide-details
          solo
          @keyup.enter="edit(index, item, $event)"
        ></v-text-field>
        <v-chip
          v-else
          :color="`${item.color} lighten-3`"
          dark
          label
          small
        >
          {{ item.name }}
        </v-chip>
        <v-spacer></v-spacer>
        <v-list-item-action @click.stop>
          <v-btn
            icon
            @click.stop.prevent="edit(index, item)"
          >
            <v-icon x-small>{{ editing !== item ? 'fas fa-pen' : 'fas fa-check' }}</v-icon>
          </v-btn>
        </v-list-item-action>
      </template>
    </v-combobox>
    <!--{{items}}-->
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    data: () => ({
      activator: null,
      attach: null,
      colors: ['90CAF9', 'A5D6A7', 'ce93d8', '80cbc4', 'ffcc80', 'EF9A9A', '9fa8da', 'e0e0e0'],
      editing: null,
      index: -1,
      nonce: 1,
      menu: false,
      model: [

      ],

      x: 0,
      search: null,
      y: 0
    }),
    computed: {
      ...mapGetters({
        list: "types/list"
      })
    },
    mounted() {
      this.model = this.value
    },
    props: {
      value: {
        type: Array,
        default: []
      }
    },
    watch: {
      model(val, prev) {
        if (val.length === prev.length) return

        this.model = val.map(v => {
          if (typeof v === 'string') {
            v = {
              name: v,
              color: this.colors[this.nonce - 1]
            }
            this.$store.dispatch("types/createType", v)
            // this.items.push(v)
            this.nonce++
          }

          return v
        })
        this.$emit("change", this.model)
      },
      value(val) {
        // this.model = val
      }
    },

    methods: {
      edit(index, item, e) {
        console.log(arguments)
        if (!this.editing) {
          this.editing = item
          this.index = index
        } else {
          this.editing = null
          this.index = -1
        }
      },
      filter(item, queryText, itemText) {
        if (item.header) return false

        const hasValue = val => val != null ? val : ''

        const text = hasValue(itemText)
        const query = hasValue(queryText)

        return text.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      }
    }
  }
</script>

<style scoped>

</style>
