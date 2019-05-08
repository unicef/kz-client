<template>
  <div class="container mt-5">

    <!-- Success -->
    <div v-if='successAlert'>
      <h1 class='text-sm-center mb-2'>
        {{ $t('activateAccount.title') }}
      </h1>
      <div class='text-sm-center subheading mb-5'>
        {{ $t('activateAccount.subtitle') }}
      </div>
    </div>

    <!-- Resend Activation -->
    <div v-if='resendAlert'>
      <h1 class='text-sm-center mb-2'>
        {{ $t('registrationMessage.title') }}
      </h1>
      <div class='text-sm-center subheading mb-5'>
        <i18n path="registrationMessage.subtitleRepeat" tag="div" class="mb-2">
          <span 
            place="accent" 
            class="font-weight-bold" 
            v-t="'registrationMessage.subtitleRepeat.accent'" />
        </i18n>
        <div>
          {{ $t('registrationMessage.subtitle2') }}
        </div>
      </div>
    </div>

    <!-- Error -->
    <div v-if='errorAlert.state'>
      <h1 class='text-sm-center mb-2'>
        {{ $t('registrationMessage.title') }}
      </h1>
      <v-alert class='auth-alert mb-4' :value="errorAlert.state" type="error">
        {{ errorAlert.msg }}
      </v-alert>
      <div class='text-sm-center'>
        <v-btn depressed color='info' @click='resendActivation'>
          {{ $t('common.labels.sendAgain') }}
        </v-btn>
      </div>
    </div>

  </div>
</template>

<script>
  import { baseUrl } from '@/shared/helpers/baseUrl';

  export default {
    name: 'ActivateAccountPage',
    data() {
      return {
        successAlert: false,
        resendAlert: false,
        errorAlert: {
          state: false,
          msg: '',
        },
      };
    },
    methods: {
      baseUrl,
      async resendActivation() {
        const activationData = {
          user_id: this.$route.query.user,
          base_url: `${this.baseUrl()}/auth/activate-account`,
        };

        await this.$store.dispatch('auth/auth/resendActivation', activationData);
        this.resendAlert = true;
        this.errorAlert.state = false;
        this.errorAlert.msg = '';
      },
    },
    async created() {
      if (!this.$route.query.activation && !this.$route.query.user) {
        this.$router.push({ name: 'auth' });
        return;
      }

      const activationData = {
        activation: this.$route.query.activation,
        user: this.$route.query.user,
      };

      const data = await this.$store.dispatch('auth/auth/activate', activationData);

      if (data.data.success) {
        this.successAlert = true;
        this.errorAlert.state = false;
        this.errorAlert.msg = '';


        setTimeout(() => {
          this.$router.push({ name: 'login' });
        }, 3000);
      } else {
        this.errorAlert.state = true;
        this.errorAlert.msg = data.data.err;
      }
    },
  };
</script>
