<template>
  <v-layout justify-center column class="container mt-4 mb-4">
    <v-form
      ref="form"
      @submit.prevent="submit"
      align-center
      justify-center
      lazy-validation
      class="mt-4 pb-4"
    >
      <v-card class="forgot-password-form">
        <v-toolbar class="headline justify-center" color="light-blue">{{ $t('forgotPassword.title') }}</v-toolbar>
        <v-container :class='{ "pt-4": $vuetify.breakpoint.xs }'>
          <v-card-text>
            <v-container grid-list-md class="px-0 pb-0" :class='{ "px-0": $vuetify.breakpoint.xs }'>
              
              <!-- Email -->
              <v-layout row>
                <v-flex sm12 >
                  <v-text-field
                    name='email'
                    :label='$t("common.fields.email") + "*"'
                    v-model='credentials.email'
                    type='text'
                    :rules='rules.email'
                    required />
                </v-flex>
              </v-layout>
              
              <!-- Alerts -->
              <v-alert class='auth-alert mb-3 text-sm-center' :value="successAlert.state" type="success">
                {{ successAlert.msg }}
              </v-alert>

              <v-alert class='auth-alert mb-3' :value="errorAlert.state" type="error">
                {{ errorAlert.msg }}
              </v-alert>

            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-layout align-center class="btns-wrapper">
              <v-btn type='submit' :disabled="areBtnsDisabled" depressed color='info'>
              {{ $t('common.btns.forgotPassword') }}
            </v-btn>
            </v-layout>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-form>
  </v-layout>
  
</template>

<script>
  export default {
    name: 'ForgotPasswordPage',
    data() {
      return {
        credentials: {
          email: '',
        },
        rules: {
          email: [
            /* eslint-disable no-new */
            v => !!v || this.$t('common.fields.validation.field.required'),
            v => /^\w+([+.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(v) || this.$t('common.fields.validation.email'),
          ],
        },
        errorAlert: {
          state: false,
          msg: '',
        },
        successAlert: {
          state: false,
          msg: '',
        },
        areBtnsDisabled: false,
      };
    },
    methods: {
      async submit() {
        if (this.$refs.form.validate()) {
          this.areBtnsDisabled = true;
          const response = await this.$store.dispatch('auth/auth/forgotPassword', this.credentials);

          if (response.data.success) {
            this.$refs.form.reset();

            this.errorAlert.state = false;
            this.errorAlert.msg = '';
            this.successAlert.state = true;
            this.successAlert.msg = response.data.data.message;

            setTimeout(() => {
              this.areBtnsDisabled = false;
              this.$router.push({ name: 'login' });
            }, 2000);
          } else {
            this.successAlert.state = false;
            this.successAlert.msg = '';
            this.errorAlert.state = true;
            this.areBtnsDisabled = false;
            this.errorAlert.msg = response.data.error.message;
          }
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}
.forgot-password-form {
  max-width: 400px;
  margin: 0 auto;

  .btns-wrapper {
    justify-content: space-around;
    a {
      text-decoration: underline;

      &:hover {
        text-decoration: none;
      }
    }
  }
}
.headline {
  text-align: center;
  text-transform: uppercase;
  color: #fff;

  @media (max-width: 767px) {
    font-size: 18px !important;
  }
}
</style>

