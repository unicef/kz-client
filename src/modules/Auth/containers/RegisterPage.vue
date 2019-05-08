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
        <v-toolbar class="headline justify-center" color="light-blue">Create account</v-toolbar>
        <v-container :class='{ "pt-4": $vuetify.breakpoint.xs }'>
          <v-card-text>
            <v-container grid-list-md class="px-0 pb-0" :class='{ "px-0": $vuetify.breakpoint.xs }'>
              <v-layout row>
                <v-flex sm12>
                  <v-text-field
                    name="Email"
                    label="Login"
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
                    label="Password"
                    id="password"
                    v-model="credentials.password"
                    type="password"
                    :rules="rules.password"
                    required
                  />
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex sm12>
                  <v-text-field
                    name="repeatPassword"
                    :label='$t("common.fields.password.repeat")'
                    v-model="credentials.password_confirmation"
                    type="password"
                    :rules="rules.password_confirmation"
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
                    :label='$t("common.fields.agreement")'
                    required
                  ></v-checkbox>
                  <router-link
                    to="/dashboard/docs/agreements"
                    target="_blank"
                  >{{ $t('common.labels.agreemtns') }}</router-link>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex sm12>
                  <vue-recaptcha
                    style="transform:scale(0.8);transform-origin:0 0"
                    class="recaptcha-modal"
                    ref="recaptcha"
                    @verify="verify"
                    sitekey="6LdpFhITAAAAABR7WnW0Y6OAExfC9xW0xxFcJsDF"
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
              <a class="text-xs-center" @click="goToLogin">I already have account</a>
              <v-btn type="submit" color="info mb-2 mt-2" depressed>Create</v-btn>
            </v-layout>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-form>
  </v-layout>
</template>

<script>
//   import store from '@/store';
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
          password_confirmation: '',
          agree: false,
          'g-recaptcha-response': '',
        },
        rules: {
          login: [
            /* eslint-disable no-new */
            v => !!v || this.$t('common.fields.validation.email.required'),
            v => /^\w+([+.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(v) || this.$t('common.fields.validation.email.invalid'),
          ],
          password: [
            /* eslint-disable*/
            v => !!v || this.$t('common.fields.validation.password.required'),
            v => /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*~^()_+`\-={}\[\]:;<>\\\/?])[A-Za-z\d#$@!%&*~^()_+`\-={}\[\]:;<>.\\\/?]{10,}$/.test(v) || 'Password must be at least 10 characters and contain at least 1 number, 1 special sign and 1 capital letter.',
          ],
          password_confirmation: [val => val === this.credentials.password || this.$t('common.fields.validation.password.dontMatch')],
          agree: [v => !!v || this.$t('common.fields.validation.agreement')],
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

          this.credentials.lang = localStorage.getItem('language');
          this.credentials.name = 'testmytest';
          this.credentials.not_usa_citizen = true;
          this.credentials.base_url = "http://bitok.iskytest.com/auth/activate-account";
          const data = await this.$store.dispatch('auth/auth/register', this.credentials);

          if (data.data.success) {
            this.$refs.form.reset();
            this.$refs.recaptcha.reset();
            this.recaptchaVerified = false;
            this.credentials['g-recaptcha-response'] = '';
            this.errorAlert.state = false;
            this.errorAlert.msg = '';
            this.successAlert.state = true;
            this.successAlert.msg = data.data.message;
            
            setTimeout(() => {
              this.successAlert.state = false;
              this.successAlert.msg = '';
              this.$router.push({ name: 'login' });
            }, 3000);
          } else {
            this.errorAlert.state = true;
            this.errorAlert.msg = data.data.err;
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
