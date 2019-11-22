<template>
  <div>
    <v-card>
      <v-card-title>Set your password</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="password"
            name="password"
            label="Enter your password"
            type="password"
            autofocus
            required
            outlined
          />
          <v-text-field
            v-model="repeatPassword"
            name="repeatPassword"
            label="Enter repeat password"
            type="password"
            autofocus
            required
            outlined
          />
          <div class="d-flex">
            <v-spacer />
            <v-btn
              :disabled="!matchPassword"
              @click="submit"
            >
              Set password
            </v-btn>
            <v-spacer />
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "SetPassword",
  props: {
    quickToken: {
      type: String,
      default: ""
    },
    goingToDashBoard: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      password: "",
      repeatPassword: ""
    }
  },
  computed: {
    matchPassword () {
      return this.password === this.repeatPassword
    }
  },
  methods: {
    submit () {
      const payload = {
        "new_password1": this.password,
        "new_password2": this.repeatPassword
      }
      const headers = {
        "Authorization": "JWT " + this.quickToken
      }
      this.$axios
        .post("/api/users/auth/password/change/", payload, { headers })
        .then((response) => {
          this.goingToDashBoard = true
          this.$emit("changeGoingToDashBoard", this.goingToDashBoard)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
