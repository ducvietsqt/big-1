<template>
  <div>
    <div v-if="step === steps.ENTER_EMAIL">
      <v-form class="form_auth" @submit.prevent="submit" lazy-validation v-model="valid">
        <v-card-title class="layout align-center px-0">
          <div class="headline font-weight-bold text-center">Create New Workspace</div>
        </v-card-title>
        <v-text-field
          name="email"
          label="Enter your email address"
          v-model="email"
          :rules="emailRules"
          type="text"
          autofocus
          hide-details
          required
          outlined
        >
        </v-text-field>
        <div class="pt-4 px-0">
          <v-btn @click="submit"
                 :disabled="!valid || submitting || !email"
                 :loading="submitting"
                 color="primary" class="ml-0">Next
          </v-btn>
          <div class="subheading mt-3">
            Or, <router-link class="link_bt" :to="{ name: 'signin' }">Sign In workspace?</router-link>
          </div>
        </div>

      </v-form>
    </div>
    <CreateProjectVerifyCode :email="email"
                             @nextStep="nextStep"
                             v-if="steps.VERIFY_CODE === step"/>
    <CreateWorkSpace :email="email"
                     :code="code"
                     @nextStep="nextStep"
                     v-else-if="steps.ENTER_COMPANY === step"/>
  </div>
</template>

<script>
  import CreateProjectVerifyCode from '../../components/auth/CreateProjectVerifyCode';
  import CreateWorkSpace from '../../components/auth/CreateWorkSpaceForm';
  import _ from 'lodash';

  const STEPS = {
    ENTER_EMAIL: "ENTER_EMAIL",
    VERIFY_CODE: "VERIFY_CODE",
    ENTER_COMPANY: "ENTER_COMPANY"
  };
  export default {
    name: "CreateProject",
    components: {CreateProjectVerifyCode, CreateWorkSpace},
    metaInfo: {
      title: "Create Workspace"
    },
    data() {
      return {
        email: "",
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        valid: false,
        submitting: false,
        step: STEPS.ENTER_EMAIL,
        // step: STEPS.ENTER_COMPANY,
        code: ""
      };
    },
    computed: {
      steps() {
        return STEPS;
      }
    },
    methods: {
      nextStep(data) {
        let step = this.step;
        switch (step) {
          case STEPS.ENTER_EMAIL:
            step = STEPS.VERIFY_CODE;
            break;
          case STEPS.VERIFY_CODE:
            step = STEPS.ENTER_COMPANY;
            break;
        }
        this.step = step;
        if (data) {
          _.assign(this.$data, data);
        }
      },
      submit() {
        let email = this.email;
        this.submitting = true;
        this.$axios
          .post("/api/users/auth/signup/", {email})
          .then(() => {
            this.submitting = false;
            this.step = STEPS.VERIFY_CODE
          })
          .catch(() => {
            this.submitting = false;
          });
      }
    },

  };
</script>

<style scoped>
  .thumb-workspace-intro {
    margin-top: 15px;
  }

  .thumb-workspace-intro img {
    display: block;
    max-width: 100%;
  }

  .title-small {
    font-size: 12px;
  }
</style>
