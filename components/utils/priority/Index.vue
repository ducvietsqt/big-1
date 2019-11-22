<template>
  <div class="card shadow">
    <div class="card-body">
      <p class="description">Set priority of your task</p>
      <v-radio-group column class="ma-0" v-model="priority">
        <v-radio class="radio-custom-slick" v-for="item in list"
                 :key="item.id"
                 :ripple="false"
                 label="red"
                 :color="item.color"
                 :value="item">
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
  data () {
    return {
      list: [
        { title: 'High', color: '#f5365c', id: 23454, icon_num: 3 },
        { title: 'Medium', color: '#ffbb33', id: 7485236, icon_num: 2 },
        { title: 'Low', color: '#5e72e4', id: 748522536, icon_num: 1 },
        { title: 'None', color: '#37474f', id: 748524336, icon_num: 3 },
      ]
    }
  },
  props: ['value'],

  computed: {
    priority: {
      get () {
        return this.value
      },
      set (value) {
        try {
          this.$emit('change', value)
          console.log(value)
          return false
        } catch (e) { // eslint-disable-line

        }
      }
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
