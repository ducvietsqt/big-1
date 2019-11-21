<template>
  <v-card flat width="100%">
    <v-card-text>
      <v-form
        v-model="valid"
        lazy-validation
        class="form_auth"
        @submit.prevent="submit"
      >
        <h4 class="mb-4 text-primary headline font-weight-bold">
          Invite members
        </h4>
        <v-layout v-for="(_, index) in emails" :key="index" align-center>
          <v-text-field
            v-model="emails[index]"
            label="Email"
            placeholder="name@example.com"
            required
            autofocus
            type="email"
            :rules="emailRules"
            filled
          />
          <v-btn
            icon
            color="primary"
            small
            @click.stop="remove(index)"
          >
            <v-icon small>
              close
            </v-icon>
          </v-btn>
        </v-layout>
        <div class="mt-3">
          <div>
            <v-btn
              :disabled="submitting"
              text
              color="green"
              class="ma-0 px-0"
              @click.stop="add"
            >
              <v-icon left>
                add_circle
              </v-icon>
              Add another
            </v-btn>
          </div>
          <div class="mt-3">
            <v-btn
              color="primary"
              :disabled="!valid"
              :loading="submitting"
              class="ma-0"
              @click.stop="submit"
            >
              Send Invitations
            </v-btn>
          </div>
          <div class="subheading mt-3">
            Or,
            <router-link class="link_bt" to="/">
              Skip for now
            </router-link>
          </div>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
// @ is an alias to /src
import { getSubdomain } from "../../utils"

export default {
  name: "InviteMembers",

  metaInfo: {
    title: "Invite Members"
  },
  data () {
    return {
      overlay: true,
      emails: ["", "", ""],
      valid: true,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      submitting: false
    }
  },
  methods: {
    submit () {
      const workspace = getSubdomain(location.hostname)
      const emails = this.emails.filter(email => email)
      if (!emails) { return false }
      this.submitting = true
      this.$http
        .post("/api/users/auth/invitations/send", { workspace, emails })
        .then(() => this.$router.push({ path: "/project" })).catch(() => {
          this.$eventHub.$emit(this.$eventTypes.snackNotify, "Email information invalid")
        }).finally(() => {
          this.submitting = false
        })
    },
    add () {
      this.emails.push("")
      this.$nextTick(() => {
        const inputs = document.querySelectorAll("input[type='email']")
        const newAdded = inputs[inputs.length - 1]
        if (newAdded) {
          newAdded.focus()
        }
      })
    },
    remove (index) {
      this.emails.splice(index, 1)
    }
  }
}
</script>
