<template>
  <div class="card shadow">
    <div class="card-body" v-if="!addInvite">
      <p class="title_head mb-0">{{title || 'Members'}}</p>
      <div class="new-tag">
        <div class="row">
          <div class="col-md-12">
            <div class="form-group mb-0">
              <input type="text"
                     class="form-control form-control-alternative"
                     :placeholder="placeholder || 'Search member'"
                     autocomplete="off"
                     ref="searchInput"
                     v-model="searchQuery"
                     v-on:keydown.enter="createNewTag"/>
            </div>
          </div>
        </div>
      </div>
      <div class="tags-wrapper">
        <div class="tag-item" v-for="(tag) in searchTag" :key="'mb_filled-'+tag.clientID">
          <v-checkbox hide-details class="check-custom-slick"
                      :ripple="false"
                      v-model="selected"
                      label="John"
                      :value="tag">
            <template v-slot:label class="mb-0">
              <v-hover v-slot:default="{ hover }">
                <v-list-item dense style="min-height: unset">
                  <v-list-item-avatar style="margin-bottom: 0" class="my-0 white--text" color="teal" size="25">
                    <v-img v-if="tag.avatar" :src="tag.avatar"/>
                    <template v-else>{{tag.name | $strName}}</template>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{tag.username}}
                    </v-list-item-title>
                    <v-list-item-subtitle v-text="tag.email"></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-hover>
            </template>
          </v-checkbox>
        </div>
        <template v-if="searchTag.length<=0">
          <div class="tag-item mark"
               @click="createNewTag">Invite "{{searchQuery}}"
          </div>
        </template>
      </div>
    </div>
    <div>
      <v-slide-y-transition class="py-0"
                            tag="div">
        <v-card v-if="addInvite">
          <v-card-text>
            <v-form @submit.prevent="sendInvite">
              <div class="position-relative">
                <p class="title_head">Create client</p>
                <v-btn icon small absolute style="top: 0; right: 0;" @click="addInvite = false">
                  <v-icon x-small>fas fa-times</v-icon>
                </v-btn>
                <v-text-field v-model="first_name" ref="emailInvite"
                              label="First name"
                              required
                              autofocus
                              :error="errorInvite"
                              :loading="emailInviteLoading" required></v-text-field>
                <v-text-field label="Last name" v-model="last_name"
                              required
                              :error="errorInvite"
                              :loading="emailInviteLoading"
                              @keydown.enter="sendInvite"
                              @click:append="sendInvite"
                              required></v-text-field>
                <label class="mb-0">Client types</label>
                <v-radio-group v-model="clientType">
                  <v-radio class="lb_gr" :ripple="false"
                           v-for="n in clientTypes"
                           :key="'clt-'+n.value"
                           :label="`${n.label}`"
                           :value="n.value"
                  ></v-radio>
                </v-radio-group>
                <v-card-actions class="pa-0">
                  <v-spacer></v-spacer>
                  <v-btn :disabled="emailInviteLoading"
                         :loading="emailInviteLoading"
                         class="text-capitalize" color="primary"
                         @click="sendInvite">Create</v-btn>
                </v-card-actions>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-slide-y-transition>
    </div>
  </div>
</template>

<script>
  import uuidv4 from 'uuid/v4'
  import _ from 'lodash'
  import { mapGetters } from 'vuex'
  import { Client } from '../../models/client'

  export default {
    data() {
      return {
        searchText: '',
        selected: [],
        addInvite: false,

        email: '',
        emailInviteLoading: false,
        errorInvite: false,

        first_name: '',
        last_name: '',
        clientTypes: [{ 'value': 'i', 'label': 'Individual' }, { 'value': 'c', 'label': 'Corporation' }],
        clientType: 'i',

      }
    },
    props: {
      value: {
        type: Array,
        default: () => []
      },
      title: {
        type: String,
        default: () => ''
      },
      placeholder: {
        type: String,
        default: () => ''
      }

    },
    computed: {
      searchTag: {
        get() {
          // let _k = 'id'
          let _k = 'clientID'
          let items = _.differenceBy(this.allTags, this.value, _k)
          console.log(items)

          return this.allTags.filter(tag => {
            if (tag) {
              return tag.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            }
          })
        }
      },
      searchQuery: {
        get() {
          return this.searchText
        },
        set(val) {
          this.searchText = val
          if (this.searchTag.length > 0) {
            this.addInvite = false
            this.errorInvite = false
          }
        }
      },
      ...mapGetters({
        'allTags': 'clients/list'
      })
    },
    methods: {
      createNewTag() { // eslint-disable-line
        try {
          this.addInvite = true
          this.email = this.searchQuery
          this.$refs.emailInvite.focus()
        } catch (e) { // eslint-disable-line

        }
      },
      async sendInvite() {
        // loading
        if (this.emailInviteLoading || !this.first_name.trim() || !this.last_name.trim()) return
        let data = {
          // emails: [this.email],
          // workspace: 'sat-prj'
          first_name: this.first_name,
          last_name: this.last_name,
          client_type: this.clientType
        }
        this.emailInviteLoading = true
        try {
          let client = await this.$store.dispatch('clients/createClient', data)

          this.emailInviteLoading = false
          if(client) {
            // this.allTags.unshift(client)
            this.selected.unshift(client)
            this.errorInvite = false
            try {
              this.$emit('change', client)
            } catch (e) { // eslint-disable-line

            }
          }


          this.email = ''
          this.searchText = ''
          this.first_name = ''
          this.last_name = ''
          // this.$refs.searchInput.focus()

        } catch (e) {
          this.emailInviteLoading = false
          this.errorInvite = true
          console.log(e.message)
        }


      }
    },
    destroyed() {
      // console.log('destroyed')
    },
    created() {
      // alert('created')
    },
    watch: {
      value(val) {
        this.selected = val
        console.log(1, val)
      },
      selected(val) {
        console.log(2, val)
        this.$emit('change', val)
      }
    }
  }
</script>

<style scoped>
  .check-custom-slick /deep/ .v-label {
    margin-bottom: 0px;
  }
</style>

<style scoped lang="scss">
  .tag-item {
    &.mark {
      cursor: pointer;
    }

    .tag_name_small {
      font-size: 14px;
    }
  }
</style>
