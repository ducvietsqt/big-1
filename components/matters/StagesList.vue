<template>
  <div class="card shadow">
    <div class="card-body">
      <p class="description">{{title || 'Priority'}}</p>
      <v-radio-group column class="ma-0" v-model="priority">
        <v-radio class="radio-custom-slick" v-for="item in list"
                 :key="'mn-stg-'+item.id"
                 :ripple="false"
                 label="red"
                 :color="item.color"
                 :value="item.id">
          <template v-slot:label class="mb-0">
            <div class="d-flex align-center">
              <div class="mr-1 d-flex justify-center" style="width: 30px;">
                <i v-for="i in item.icon_num"
                   :style="{color: item.color}"
                   :key="i"
                   class="fa fa-exclamation" aria-hidden="true"></i>
              </div>
              <small class="black--text">{{item.title}}</small>
            </div>
          </template>
        </v-radio>
      </v-radio-group>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            // single select option N/A, New, Preparation, Pre-trial, Discovery, Awaiting Decisions, Trial, Appeal, Done.
            return {
                list: [
                    {title: 'N/A', color: '#37474f', id: 1, icon_num: 1},
                    {title: 'New', color: '#5e72e4', id: 2, icon_num: 1},
                    {title: 'Preparation', color: '#ffbb33', id: 3, icon_num: 1},
                    {title: 'Pre-trial', color: '#8700ff', id: 4, icon_num: 1},
                    {title: 'Discovery', color: '#f5365c', id: 5, icon_num: 1},
                    {title: 'Awaiting Decisions', color: '#f50300', id: 6, icon_num: 1},
                    {title: 'Trial', color: '#f5b60d', id: 7, icon_num: 1},
                    {title: 'Appeal', color: '#3cd9f5', id: 8, icon_num: 1},
                    {title: 'Done', color: '#4CF599', id: 9, icon_num: 1},
                ],
                priority: null
            }
        },
        props: ["value", "title"],
        mounted() {
            this.priority = this.value
        },
        watch: {
            value(val) {
                this.priority = val
            },
            priority(val, prev) {
                console.log(val, prev)
                if(!prev) return
                this.$emit('change', val)
            }
        }
    }
</script>

<style scoped>
  .radio-custom-slick /deep/ .v-label {
    margin-bottom: 0px;
  }
</style>

<style scoped lang="scss">
  .custom-control {
    .icon-wrapper {
      width: 40px;
      display: inline-block;
      text-align: center;
    }

    .high i {
      color: #f5365c;
    }

    .medium i {
      color: #ffbb33;
    }

    .low i {
      color: #5e72e4;
    }

    .none i {
      color: #37474f;
    }
  }


  // #tabs-icons-text-3 {
  //   .card-body {
  //     padding: 1.7rem;
  //   }
  // }


  .group-color-dialog {
    position: relative;
    padding: 5px;
    line-height: 0px;

    .group-color-item {
      cursor: pointer;
      width: 20px;
      height: 20px;
      display: inline-block;
      border-radius: 50%;
      transition: opacity 0.1 ease;
      margin: 3px;
    }
  }
</style>
