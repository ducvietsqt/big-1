<template>
  <div class="card shadow">
    <div>
      <!--      {{matters}}-->
    </div>
    <div>
      <!--            {{courts}}-->
    </div>
    <v-data-table :headers="headers" fixed-header
                  :items="matters"
                  hide-default-footer
                  :loading="loading"
                  class="elevation-1 table_list_custom"
                  :calculate-widths="true">
      <template v-slot:item.link="{ item }">
        <router-link to="#" :title="item.name">
          <i class="fa fa-external-link" aria-hidden="true"></i>
        </router-link>
      </template>
      <template v-slot:item.drop="{ item }">
        <div class="handle-wrapper" style="cursor: move;">
          <v-icon color="#b5b5b5" small style="font-size: 14px;">fa fa-ellipsis-v</v-icon>
          <v-icon color="#b5b5b5" small style="font-size: 14px; margin: 0px -2px">fa fa-ellipsis-v</v-icon>
          <v-icon color="#b5b5b5" small style="font-size: 14px;">fa fa-ellipsis-v</v-icon>
        </div>
      </template>
      <template v-slot:item.name="{ item }">
        <div style="width: 200px">
          <input-list :value="item.name"
                      :disabled="false"
                      :autofocus="item.focus"
                      @change="(val) => changeTitle(item, val)"/>
        </div>
      </template>

      <template v-slot:item.court="{ item }">
        <div class="d-flex align-center" style="width: 200px">
          <div class="flex-grow-1">
            <template v-if="item.jurisdiction">
              <!--              {{$_court(item.jurisdiction)['short_name']}}-->
              {{item.jurisdiction['short_name']}}
            </template>
          </div>
          <div>
            <div class="fa-user-plus1" @click="$bus.$emit('menu-absolute', $event, item.courtID, item)">
              <!--<v-icon small>fas fa-location-arrow</v-icon>-->
              <!--<i class="fas fa-location-arrow"></i>-->
              <i class="fas fa-map-marker-alt"></i>
            </div>
          </div>
        </div>
      </template>

      <template v-slot:item.risk_level="{ item }">

      </template>

      <template v-slot:item.priority="{ item }">
        <div class="d-flex align-center" style="width: 100px">
          <div class="flex-grow-1">
            <span class="badge d-block"
                  :style="{background: $hexToRgbA(item.priorityColor), color: item.priorityColor}">
                          {{item.priorityLevel}}
                        </span>
          </div>
          <div class="fa-user-plus1 ml-2" @click="$bus.$emit('menu-priority', $event, item.priority, item)">
            <v-icon small :color="item.priorityColor">fas fa-angle-double-up</v-icon>
          </div>
        </div>
      </template>

      <template v-slot:item.status="{ item }">
        <span class="badge_status text-uppercase">
          2134
        </span>
      </template>

      <template v-slot:item.members="{ item }">
        <div class="d-flex align-center">
          <div class="flex-grow-1 no_content">
            <template v-if="item.hasMember">
              <template v-for="m in item.members">
                <member-link :key="'mb-meeting-'+m.user"
                             v-if="m.user"
                             :ID="m.user">
                  <avatar-member :user="m.user" :size="25"></avatar-member>
                </member-link>
              </template>
            </template>
          </div>

          <div class="fa-user-plus1" @click="$bus.$emit('menu-member', $event, item.members, item)">
            <!--<v-icon>fa fa-user-plus</v-icon>-->
            <i class="fa fa-user-plus ml-2" aria-hidden="true"></i>
          </div>

        </div>
      </template>
      <template v-slot:item.time="{ item }">
        <div class="d-flex align-center cell-date" style="color: #8898aa;">
          <div class="flex-grow-1">
            <span>2019-19-11 11:02 am</span>
          </div>
          <i class="fa fa-calendar"></i>
        </div>
      </template>
      <template v-slot:item.location="{ item }">
        <div class="d-flex align-center">
          <div class="flex-grow-1">
            <span>Ho chi minh city</span>
          </div>
          <i class="fa fa-map-marker fa-cell-icon" aria-hidden="true"></i>
        </div>
      </template>
      <template v-slot:item.creator="{ item }">
        <div class="d-flex align-center">
          <div class="flex-grow-1">
            <template v-if="item.hasCreator">
              <member-link :ID="item.creator">
                <avatar-member :user="item.creator" :size="25"></avatar-member>
              </member-link>
            </template>
          </div>
        </div>
      </template>
      <template v-slot:item.progress="{ item }">
        <div class="d-flex align-center">
          <div class="flex-grow-1">
            <v-progress-linear color="#5e72e4"
                               height="15"
                               :value="item.progress"
                               reactive>
              <template v-slot="{ value }">
                <strong style="font-size: 75%">{{ Math.ceil(value) }}%</strong>
              </template>
            </v-progress-linear>
          </div>
        </div>
      </template>
      <template v-slot:item.active="{ item }">
        <div class="d-flex align-center">
          <div class="flex-grow-1">
            <span v-if="item.activate" class="badge badge-success">
                          active
                        </span>
            <span v-else class="badge badge-warning">
                          inactive
                        </span>

          </div>
        </div>
      </template>
      <template v-slot:item.clients="{ item }">
        <div class="d-flex align-center">
          <div class="flex-grow-1">
            <span v-if="item.activate" class="badge badge-success">
                          active
                        </span>
            <span v-else class="badge badge-warning">
                          inactive
                        </span>

          </div>
        </div>
      </template>
      <template v-slot:item.types="{ item }">
        <div class="d-flex align-center" style="width: 200px;">
          <div class="flex-grow-1" style="max-width: 100%">
            <div style="white-space: normal" class="py-2">
              <span class="badge badge-pill badge-info text-capitalize d-inline-block badge-tag"
                    style="padding: 5px 10px; margin: 2px 2px"
                    :style="{background: '#'+tag.color, color:'#fff'}"
                    v-for="(tag) in item.types"
                    :key="'tag-column-'+tag.pk">
                          {{tag.name}}
                        </span>
            </div>
          </div>
          <div>
            <div class="fa-user-plus1 ml-2" @click="$bus.$emit('menu-types', $event, item.types, item)">
              <i class="fa fa-tag" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:item.start_date="{ item }">
        <div class="d-flex align-center">
          <div class="flex-grow-1">
            <p v-if="item.start_date" class="caption ma-0">
              {{$formatDateTime(item.start_date, 'MMM Do YY')}}
            </p>
          </div>
          <div>
            <div class="fa-user-plus1 ml-2"
                 @click="$bus.$emit('menu-matter-date', $event, item.start_date, item, 'start_date')">
              <v-icon x-small color="#8898aa">fas fa-calendar-alt</v-icon>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:item.date_filled="{ item }">
        <div class="d-flex align-center">
          <div class="flex-grow-1">
            <p v-if="item.date_filled" class="caption ma-0">
              {{$formatDateTime(item.start_date, 'MMM Do YY')}}
            </p>
          </div>
          <div>
            <div class="fa-user-plus1 ml-2"
                 @click="$bus.$emit('menu-matter-date', $event, item.date_filled, item, 'date_filled')">
              <v-icon x-small color="#8898aa">fas fa-calendar-alt</v-icon>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:item.est_time="{ item }">
        <div class="d-flex align-center">
          <div class="flex-grow-1">
            <p v-if="item.est_time" class="caption ma-0">
              {{$formatTimeToDay(item.est_time)}}
            </p>
          </div>
          <div>
            <div class="fa-user-plus1 ml-2"
                 @click="$bus.$emit('menu-matter-time', $event, item.date_filled, item, 'est_time')">
              <v-icon x-small color="#8898aa">far fa-clock</v-icon>
              <!--              <i class="far fa-clock"></i>-->
            </div>
          </div>
        </div>
      </template>
      <template v-slot:item.jury_demand="{ item }">
        <div class="d-flex align-center">
          <div class="flex-grow-1">
            <div @click="$bus.$emit('menu-matter-switch', $event, item.jury_demand, item, 'jury_demand')"">
              <span v-if="item.jury_demand"
                    class="badge badge-success cusor--pointer">
                          Yes
                        </span>
              <span v-else
                    class="badge badge-danger cusor--pointer">
                          No
                        </span>
            </div>
          </div>
          <!--<div>
            <div class="fa-user-plus1 ml-2"
                 @click="$bus.$emit('menu-matter-switch', $event, item.jury_demand, item, 'jury_demand')">
              <v-icon x-small color="#8898aa">fas fa-pen</v-icon>
            </div>
          </div>-->
        </div>
      </template>


    </v-data-table>


  </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'listView',
        data() {
            return {
                headers: [

                    {
                        text: '',
                        align: 'left',
                        sortable: false,
                        value: 'drop'
                    },
                    {
                        text: '',
                        align: 'left',
                        sortable: false,
                        value: 'link'
                    },
                    {
                        text: 'Name',
                        align: 'left',
                        sortable: true,
                        value: 'name'
                    },
                    {text: 'Created By ', value: 'creator'},
                    {text: 'Court District', value: 'court'},
                    {text: 'Members', value: 'members'}, // N/A
                    {text: 'Progress', value: 'progress'}, // N/A
                    {text: 'Docket Number', value: 'docket_number'}, // N/A
                    {text: 'Priority', value: 'priority'}, // done
                    {text: 'Lead Attorneys', value: 'lead_attorneys'}, // N/A
                    {text: 'Matter Type ', value: 'types'},

                    {text: 'Start Date', value: 'start_date'},
                    {text: 'Time Est. ', value: 'est_time'},
                    {text: 'Total Time Logged', value: 'total_time'},
                    {text: 'Total Billable Hours', value: 'total_hours'}, // N/A
                    {text: 'Risk Level', value: 'risk_level'},
                    {text: 'Matter Stage', value: 'matter_stage'},
                    {text: 'Total Expense ', value: 'total_expense'},
                    {text: 'Judge', value: 'judge'}, // N/A
                    {text: 'Date Filed', value: 'date_filled'},
                    {text: 'Jury Demand', value: 'jury_demand'},
                    {text: 'Client', value: 'clients'},
                    {text: 'Active', value: 'active'},
                    {text: 'Next Court Date', value: 'complaints'} // N/A

                ],
                list: [],
                totalDesserts: 0,
                options: {
                    // itemsPerPage: 20
                },
                next: null
            }
        },
        computed: {
            ...mapGetters({
                matters: 'matters/list',
                loading: 'matters/pending',
                findMemberByID: 'workspace/findMemberByID',
                members: 'workspace/workspaceMembers',
                findCourtByID: 'courts/findCourtByID'
            })

        },
        methods: {
            changeTitle(item, val) {
                console.log(item, val)
                this.$store.dispatch('matters/updateMatter', {matterID: item.matterID, data: {name: val}})
            },
        },
        mounted() {

        }
    }
</script>

<style scoped lang="scss">
  .fa-user-plus1, .fa-map-marker, .fa-cell-icon {
    color: #7a797e;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    transition: all 0.25s linear;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover, &.active {
      background: rgba(17, 205, 239, 0.5);
      color: #fff;

      * {
        color: #fff !important;
      }
    }
  }
</style>
<style scoped>
  .table_list_custom /deep/ .v-data-table-header th {
    box-shadow: none !important;
    font-size: 14px !important;
    text-transform: none !important;
    font-weight: 600 !important;
  }

  .table_list_custom /deep/ .v-data-table-header {
    border-color: transparent !important;

  }

  .table_list_custom /deep/ .v-data-footer {
    margin-right: 0px;
  }

  .table_list_custom /deep/ tbody tr td {
    white-space: nowrap;
    border-color: transparent !important;
  }

  .table_list_custom /deep/ tbody tr:nth-child(even) {
    background-color: hsla(0, 0%, 100%, .1);

  }

  .table_list_custom /deep/ tbody tr:nth-child(odd) {
    /*background-color: rgba(255, 255, 255, .1);*/
    background: #f4f5f7
  }

  /*#f4f5f7*/
  .table_list_custom /deep/ .v-data-table-header th {
    border-color: transparent !important;
    white-space: nowrap;
    /*box-shadow: unset !important;*/

    font-size: 14px;
    text-transform: none;
    font-weight: 600;
    color: rgba(0, 0, 0, .87);
  }
</style>
<style lang="scss">
  .badge_status {
    font-size: 66%;
    font-weight: 600;
    line-height: 1;

    padding: .35rem .375rem;
    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    text-align: center;
    vertical-align: baseline;
    white-space: nowrap;
    border-radius: .25rem;

    background: rgba(255, 55, 9, 0.2);
    color: rgb(255, 55, 9);

    &.success {
      background: rgba(36, 179, 20, 0.2);
      color: rgb(36, 179, 20);
    }

    &.upcoming {
      background: rgba(36, 179, 20, 0.2);
      color: rgb(36, 179, 20);
    }

    &.default {
      background: gainsboro;
      color: #000000;
    }
  }

  .cell-date {
    font-size: 12px;

  }

  .badge-tag {
    font-size: 8px;
    margin-right: 5px;
    text-transform: capitalize;
    line-height: normal;
    padding: 3px 10px;
    border-radius: 10rem;
  }
</style>
<style scoped>
  /*@import "https://demos.creative-tim.com/argon-design-system/assets/css/argon.min.css?v=1.0";*/
  /*@import "https://demos.creative-tim.com/argon-design-system/assets/css/docs.min.css?v=1.0.1";*/
</style>
<style>
  .icon_dot {
    width: 10px;
    height: 10px;
    border-radius: 100%;
    overflow: hidden;
    font-size: 0px;
    display: block;
  }
</style>
