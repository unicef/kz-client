<template>
  <v-form
    ref="form"
    @submit.prevent="submit"
    align-center
    justify-center
    lazy-validation
    class="pb-4"
  >
    <v-card class="change-password">
      <v-container :class="{ 'pt-4': $vuetify.breakpoint.xs }">
        <v-card-title class="title">{{ $t('changePassword.title') }}</v-card-title>

        <v-card-text>
          <v-container grid-list-md class="px-0 py-0" :class="{ 'px-0': $vuetify.breakpoint.xs }">
            <!-- Current Password -->
            <v-layout row>
              <v-flex sm12>
                <v-text-field
                  name="currentPassword"
                  :label='$t("common.fields.currentPassword") + "*"'
                  v-model="setData.currentPassword"
                  :append-icon="showCurrentPassword ? 'visibility' : 'visibility_off'"
                  :type="showCurrentPassword ? 'text' : 'password'"
                  :rules="rules.currentPassword"
                  @click:append="showCurrentPassword = !showCurrentPassword"
                  required
                />
              </v-flex>
            </v-layout>
            <!-- New Password -->
            <v-layout row>
              <v-flex sm12>
                <v-text-field
                  name="password"
                  :label='$t("common.fields.newPassword") + "*"'
                  v-model="setData.password"
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
                  v-model="setData.passwordConfirmation"
                  :append-icon="showPasswordConfirmation ? 'visibility' : 'visibility_off'"
                  :type="showPasswordConfirmation ? 'text' : 'password'"
                  :rules="rules.repeatPassword"
                  @click:append="showPasswordConfirmation = !showPasswordConfirmation"
                  required
                />
              </v-flex>
            </v-layout>

            <!-- Alerts -->
            <v-alert
              class="auth-alert mb-3 text-sm-center"
              :value="successAlert.state"
              type="success"
            >{{ successAlert.msg }}</v-alert>

            <v-alert
              class="auth-alert mb-3"
              :value="errorAlert.state"
              type="error"
            >{{ errorAlert.msg }}</v-alert>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-layout align-center class="btns-wrapper">
            <v-btn type="submit" :disabled="areBtnsDisabled" depressed color="info">{{ $t('common.btns.changePassword') }}</v-btn>
          </v-layout>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-form>
</template>

<script>
  export default {
    name: 'ChangePasswordForm',
    components: {
    },
    data() {
      return {
        setData: {
          currentPassword: '',
          password: '',
          passwordConfirmation: '',
        },
        showCurrentPassword: false,
        showPassword: false,
        showPasswordConfirmation: false,
        rules: {
          currentPassword: [
            /* eslint-disable*/
            v => !!v || this.$t('common.fields.validation.field.required'),
          ],
          password: [
            /* eslint-disable*/
            v => !!v || this.$t('common.fields.validation.field.required'),
            v => v !== this.setData.currentPassword || this.$t('common.fields.validation.password.matchPrevious'),
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
        areBtnsDisabled: false,
      };
    },
    methods: {
      async submit() {
        if (this.$refs.form.validate()) {
          this.areBtnsDisabled = true;
          const response = await this.$store.dispatch('users/changeUserPassword', this.setData);

          if (response.data.success) {
            this.$refs.form.reset();
            
            this.errorAlert.state = false;
            this.errorAlert.msg = '';
            this.successAlert.state = true;
            this.successAlert.msg = response.data.data.message;

            setTimeout(() => {
              this.successAlert.state = false;
              this.successAlert.msg = '';
              this.areBtnsDisabled = false;
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
</style>