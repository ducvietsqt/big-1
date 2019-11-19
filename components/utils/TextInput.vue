<template>
  <v-text-field flat single-line
                hide-details dense class="ma-0 text_input_list"
                :placeholder="t_placeholder"
                :disabled="disabled" aria-autocomplete="none"
                :autofocus="autofocus"
                @keyup.enter="handleInput($event)" v-model="text"></v-text-field>
</template>

<script>
    export default {
      data() {
        return {
          text: this.value || '',
        }
      },
      props: ["value", "disabled", "autofocus", "placeholder"],
      computed: {
        val: {
          get() {
            return this.value
          },
          set() {

          }
        },
        t_placeholder() {
            return this.placeholder || 'Task name'
        }
      },
      methods: {
        handleInput (event) {
          console.log('handleInput',event.target.value);
          this.$emit("change", event.target.value);
        }
      },
      watch: {
        value(val) {
          this.text = val;
        }
      }
    }
</script>

<style scoped>
  .text_input_list /deep/ >.v-input__control>.v-input__slot:before {
    border-color: transparent !important;
  }
  .text_input_list /deep/ .v-input input:focus, .v-input input:active {
    border-color: transparent !important;
  }
  .text_input_list.v-text-field.v-input--is-disabled /deep/ >.v-input__control>.v-input__slot:before {
    border-color: transparent !important;
    border-image: unset !important;
  }
</style>
