<template>
  <div>
    {{matters}}
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

      <template v-slot:item.name="{ item }">
        <input-list :value="item.name"
                    :disabled="false"
                    :autofocus="item.focus"
                    @change="(val) => changeTitle(item, val)"/>
      </template>

      <template v-slot:item.risk_level="{ item }">
        {{item.riskLevel()}}
      </template>

      <template v-slot:item.priority="{ item }">
        {{item.riskLevel()}}
      </template>

      <template v-slot:item.status="{ item }">
        <span class="badge_status text-uppercase">
          2134
        </span>
      </template>

      <template v-slot:item.members="{ item }">
        <div class="d-flex align-center">
          <div class="flex-grow-1">
<!--            {{findMemberByID}}-->
            <template v-for="m in item.members">
              <member-link :key="'mb-meeting-'+m.user"
                           v-if="m.user"
                           :ID="m.user" class="no_content font-weight-normal">
<!--                <span>HOIGAY{{findMemberByID(m.user)}}</span>-->
              </member-link>
            </template>
          </div>
          <i class="fa fa-user-plus ml-2 fa-cell-icon" aria-hidden="true"></i>
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
      <template v-slot:item.project="{ item }">
        <div class="d-flex align-center">
          <div class="flex-grow-1">
            <span>fdsfds</span>
          </div>
          <i class="fa fa-folder-open fa-cell-icon" aria-hidden="true"></i>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "listView",
        data() {
            return {
                headers: [
                    {
                        text: '',
                        align: 'left',
                        sortable: false,
                        value: 'link',
                    },
                    {
                        text: 'Name',
                        align: 'left',
                        sortable: true,
                        value: 'name',
                    },
                    {text: 'Court District', value: 'next_courts'},
                    {text: 'Docket Number', value: 'clients'}, // N/A
                    {text: 'Priority', value: 'priority'}, // done
                    {text: 'Lead Attorneys', value: 'clients'}, // N/A
                    {text: 'Matter Type ', value: 'types'},
                    {text: 'Created By ', value: 'creator'},
                    {text: 'Start Date', value: 'start_date'},
                    {text: 'Time Est. ', value: 'est_time'},
                    {text: 'Total Time Logged', value: 'clients'},
                    {text: 'Total Billable Hours', value: 'clients'}, // N/A
                    {text: 'Risk Level', value: 'risk_level'},
                    {text: 'Matter Stage', value: 'clients'},
                    {text: 'Total Expense ', value: 'clients'},
                    {text: 'Judge', value: 'clients'}, // N/A
                    {text: 'Date Filed', value: 'date_filled'},
                    {text: 'Jury Demand', value: 'jury_demand'},
                    {text: 'Client', value: 'clients'},
                    {text: 'Active', value: 'active'},
                    {text: 'Next Court Date', value: 'complaints'}, // N/A
                    {text: 'Members', value: 'members'}, // N/A
                    {text: 'Progress', value: 'members'}, // N/A
                ],
                list: [],
                totalDesserts: 0,
                options: {
                    // itemsPerPage: 20
                },
                loading: true,
                next: null
            }
        },
        computed: {
            ...mapGetters({
                matters: "matters/list",
                findMemberByID: "workspace/findMemberByID",
            }),

        },
        methods: {
            changeTitle() {

            }
        }
    }
</script>

<style scoped lang="scss">
  .fa-user-plus, .fa-map-marker, .fa-cell-icon {
    color: #7a797e;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    transition: all 0.25s linear;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover, &.active {
      background: rgba(17, 205, 239, 0.5);
      color: #fff;
    }
  }
</style>
<style scoped>
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
    background: #f4f5f7
  }

  .table_list_custom /deep/ tbody tr:nth-child(odd) {
    background-color: rgba(255, 255, 255, .1);
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
</style>
