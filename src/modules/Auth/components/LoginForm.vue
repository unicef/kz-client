<template>
    <v-form ref="form" @submit.prevent="submit" align-center justify-center lazy-validation class="mt-4 pb-4">
      <v-card class="login-form">
        <v-toolbar class="headline justify-center" color="light-blue">{{ $t('signIn.title') }}</v-toolbar>
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
                    type="password"
                    :rules="rules.password"
                    required
                  />
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex sm12 >
                  <vue-recaptcha
                    style="transform:scale(0.8);transform-origin:0 0"
                    class='recaptcha-modal'
                    ref="recaptcha"
                    @verify="verify"
                    sitekey="6Lem0KYUAAAAAPmN2LyGYEhbWeni_CzNjFVDXHG5"></vue-recaptcha>
                    <captcha-error v-if='recaptchaVerified' />
                </v-flex>
              </v-layout>
              <!-- Alert -->
              <v-layout row v-if="errorAlert.state">
                <v-flex sm12>
                  <v-alert :value="errorAlert.state" type="error">{{ errorAlert.msg }}</v-alert>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-layout align-center class="btns-wrapper">
              <a
                  v-if="!isLoginAdmin"
                  class='text-xs-center' 
                  @click='forgotPassword'>
                  {{ $t('common.btns.forgotPassword') }}
                </a>
              <v-btn type="submit" color="info mb-2 mt-2" depressed>{{ $t('common.btns.signIn') }}</v-btn>
            </v-layout>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-form>
</template>

<script>
//    import store from '@/store';
  import VueRecaptcha from 'vue-recaptcha';
  import CaptchaError from '@/shared/components/CaptchaError';

  export default {
    name: 'LoginForm',
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
          'g-recaptcha-response': '',
        },
        rules: {
          login: [
            /* eslint-disable no-new */
            v => !!v || this.$t('common.fields.validation.field.required'),
            v => /^\w+([+.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(v) || this.$t('common.fields.validation.email'),
          ],
          password: [
            /* eslint-disable*/
            v => !!v || this.$t('common.fields.validation.field.required'),
          ],
        },
        errorAlert: {
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

          const data = await this.$store.dispatch('auth/auth/login', this.credentials);

          if (data.data.success) {
            localStorage.setItem('token', data.data.data.token);
            this.$store.commit('auth/auth/setAuthenticated', true);
            await this.$store.dispatch('auth/auth/getMyInfo');
            this.$store.commit('global/setRoles', { root: true });
            this.$refs.form.reset();
            this.$refs.recaptcha.reset();
            this.recaptchaVerified = false;
            this.credentials['g-recaptcha-response'] = '';
            this.errorAlert.state = false;
            this.errorAlert.msg = '';
            if(this.isLoginAdmin) {
              this.$router.push({ name: 'unicef-users-list' });
            } else {
              this.$router.push({ name: 'user-details' });
            }
          } else {
            this.errorAlert.state = true;
            this.errorAlert.msg = data.data.error.message;
            this.$refs.recaptcha.reset();
            this.credentials['g-recaptcha-response'] = '';
          }
        }
      },
      forgotPassword() {
        this.$router.push({ name: 'forgot-password' });
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
.login-form {
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
</style>
