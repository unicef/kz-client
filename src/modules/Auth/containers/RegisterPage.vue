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
      <v-card class="register-form">
        <v-toolbar class="headline justify-center" color="light-blue">{{ $t('createAccount.title') }}</v-toolbar>
        <v-container :class='{ "pt-4": $vuetify.breakpoint.xs }'>
          <v-card-text>
            <v-container grid-list-md class="px-0 pb-0" :class='{ "px-0": $vuetify.breakpoint.xs }'>
              <v-layout row>
                <v-flex sm12>
                  <v-text-field
                    name="Email"
                    :label='$t("common.fields.login") + "*"'
                    id="login"
                    v-model="credentials.email"
                    type="email"
                    :rules="rules.login"
                    required
                  />
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex sm12>
                  <v-text-field
                    name="Password"
                    :label='$t("common.fields.password") + "*"'
                    id="password"
                    v-model="credentials.password"
                    :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                    :type="showPassword ? 'text' : 'password'"
                    :rules="rules.password"
                    @click:append="showPassword = !showPassword"
                    required
                  />
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex sm12>
                  <v-text-field
                    name="repeatPassword"
                    :label='$t("common.fields.password.repeat") + "*"'
                    v-model="credentials.passwordConfirmation"
                    :append-icon="showPasswordConfirmation ? 'visibility' : 'visibility_off'"
                    :type="showPasswordConfirmation ? 'text' : 'password'"
                    :rules="rules.password_confirmation"
                    @click:append="showPasswordConfirmation = !showPasswordConfirmation"
                    required
                  />
                </v-flex>
              </v-layout>
              <v-layout wrap>
                <v-flex sm12 class="pb-4">
                  <v-checkbox
                    class="pb-2"
                    color="info"
                    v-model="credentials.agree"
                    :rules="rules.agree"
                    :label='$t("common.fields.agreement") + "*"'
                    required
                  ></v-checkbox>
                  <router-link
                    to="/dashboard/docs/terms"
                    target="_blank"
                  >{{ $t('common.btns.agreements') }}</router-link>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex sm12>
                  <vue-recaptcha
                    style="transform:scale(0.8);transform-origin:0 0"
                    class="recaptcha-modal"
                    ref="recaptcha"
                    @verify="verify"
                    sitekey="6Lem0KYUAAAAAPmN2LyGYEhbWeni_CzNjFVDXHG5"
                  ></vue-recaptcha>
                  <captcha-error v-if="recaptchaVerified"/>
                </v-flex>
              </v-layout>
              <!-- Success lert -->
              <v-flex sm12 v-if="successAlert.state">
                <v-alert :value="successAlert.state" type="success">{{ successAlert.msg }}</v-alert>
              </v-flex>
              <!-- Error Alert -->
              <v-layout row v-if="errorAlert.state">
                <v-flex sm12>
                  <v-alert :value="errorAlert.state" type="error">{{ errorAlert.msg }}</v-alert>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-layout align-center class="btns-wrapper">
              <a class="text-xs-center" @click="goToLogin">{{ $t('common.btns.alreadyHaveAnAccount') }}</a>
              <v-btn type="submit" :disabled="areBtnsDisabled" color="info mb-2 mt-2" depressed>{{ $t('common.btns.create') }}</v-btn>
            </v-layout>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-form>
  </v-layout>
</template>

<script>
  import VueRecaptcha from 'vue-recaptcha';
  import CaptchaError from '@/shared/components/CaptchaError';

  export default {
    name: 'RegisterPage',
    components: {
      VueRecaptcha,
      CaptchaError,
    },
    data() {
      return {
        recaptchaVerified: false,
        credentials: {
          email: '',
          password: '',
          passwordConfirmation: '',
          agree: false,
          'g-recaptcha-response': '',
        },
        showPassword: false,
        showPasswordConfirmation: false,
        areBtnsDisabled: false,
        rules: {
          login: [
            /* eslint-disable no-new */
            v => !!v || this.$root.$t('common.fields.validation.field.required'),
            v => /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/.test(v) || this.$root.$t('common.fields.validation.email'),
          ],
          password: [
            /* eslint-disable*/
            v => !!v || this.$root.$t('common.fields.validation.field.required'),
            v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*~^()_+`\-={}\[\]:;<>\\\/?])[A-Za-z\d#$@!%&*~^()_+`\-={}\[\]:;<>.\\\/?]{10,}$/.test(v) || this.$root.$t('common.fields.validation.password'),
          ],
          password_confirmation: [val => val === this.credentials.password || this.$root.$t('common.fields.validation.password.dontMatch')],
          agree: [v => !!v || this.$root.$t('common.fields.validation.field.required')],
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
    computed: {
      isLoginAdmin() {
        return this.$route.path.indexOf('login-admin') !== -1;
      },
    },
    methods: {
      async submit() {
        this.checkCaptcha();

        if (this.$refs.form.validate()) {
          if (this.recaptchaVerified) {
            return;
          }

          this.areBtnsDisabled = true;
          const data = await this.$store.dispatch('auth/auth/register', this.credentials);

          if (data.data.success) {
            this.$refs.form.reset();
            this.$refs.recaptcha.reset();
            this.recaptchaVerified = false;
            this.credentials['g-recaptcha-response'] = '';
            this.errorAlert.state = false;
            this.errorAlert.msg = '';
            this.successAlert.state = true;
            this.successAlert.msg = data.data.data.message;
            
            setTimeout(() => {
              this.successAlert.state = false;
              this.successAlert.msg = '';
              this.areBtnsDisabled = false;
              this.$router.push({ name: 'login' });
            }, 3000);
          } else {
            this.errorAlert.state = true;
            this.errorAlert.msg = data.data.error.message;
            this.areBtnsDisabled = false;
            this.$refs.recaptcha.reset();
            this.credentials['g-recaptcha-response'] = '';
          }
        }
      },
      goToLogin() {
        this.$router.push({ name: 'login' });
      },
      verify(response) {
        this.credentials['g-recaptcha-response'] = response;
        this.recaptchaVerified = false;
      },
      checkCaptcha() {
        if (this.credentials['g-recaptcha-response'] === '') {
          this.recaptchaVerified = true;
        } else {
          this.recaptchaVerified = false;
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}
.register-form {
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
