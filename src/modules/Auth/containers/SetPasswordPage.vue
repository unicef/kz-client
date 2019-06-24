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
      <v-card class="set-password-form">
        <v-toolbar class="headline justify-center" color="light-blue">{{ $t('setPassword.title') }}</v-toolbar>
        <v-container :class='{ "pt-4": $vuetify.breakpoint.xs }'>
          <v-card-text>
            <v-container grid-list-md class="px-0 pb-0" :class='{ "px-0": $vuetify.breakpoint.xs }'>
              
              <!-- Password -->
              <v-layout row>
                <v-flex sm12 >
                  <v-text-field
                    name='password'
                    :label='$t("common.fields.password") + "*"'
                    v-model='setData.password'
                    type='password'
                    :rules='rules.password'
                    required />
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex sm12 >
                  <v-text-field
                    name='repeatPassword'
                    :label='$t("common.fields.password.repeat") + "*"'
                    v-model='setData.passwordConfirmation'
                    type='password'
                    :rules='rules.repeatPassword'
                    required />
                </v-flex>
              </v-layout>
              
              <!-- Alerts -->
              <v-alert class='auth-alert mb-3 text-sm-center' :value="successAlert.state" type="success">
                {{ $t('setPassword.success') }}
              </v-alert>

              <v-alert class='auth-alert mb-3' :value="errorAlert.state" type="error">
                {{ errorAlert.msg }}
              </v-alert>

            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-layout align-center class="btns-wrapper">
              <v-btn type='submit' depressed color='info'>
              {{ $t('common.btns.setPassword') }}
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
    name: 'SetPasswordPage',
    data() {
      return {
        setData: {
          hash: null,
          password: '',
          passwordConfirmation: '',
        },
        rules: {
          password: [
            /* eslint-disable*/
            v => !!v || this.$t('common.fields.validation.field.required'),
            v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*~^()_+`\-={}\[\]:;<>\\\/?])[A-Za-z\d#$@!%&*~^()_+`\-={}\[\]:;<>.\\\/?]{10,}$/.test(v) || this.$t('common.fields.validation.password'),
          ],
          repeatPassword: [val => val === this.setData.password || this.$t('common.fields.validation.password.dontMatch')],
        },
        errorAlert: {
          state: false,
          msg: '',
        },
        successAlert: {
          state: false,
          msg: '',
        },
      };
    },
    methods: {
      async submit() {
        if (this.$refs.form.validate()) {
          const response = await this.$store.dispatch('auth/auth/setPassword', this.setData);

          if (response.data.success) {
            this.$refs.form.reset();
            
            this.errorAlert.state = false;
            this.errorAlert.msg = '';
            this.successAlert.state = true;
            this.successAlert.msg = response.data.data.message;

            setTimeout(() => {
              this.$router.push({ name: 'login' });
            }, 2000);
          } else {
            this.successAlert.state = false;
            this.successAlert.msg = '';
            this.errorAlert.state = true;
            this.errorAlert.msg = response.data.error.message;
          }
        }
      },
    },
    created() {
      this.setData.hash = this.$route.query['user_token'];
    },
  };
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}
.set-password-form {
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

