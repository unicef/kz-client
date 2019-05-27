<template>
  <v-layout row justify-center>
    <v-dialog transition="slide-y-transition" v-model="seedDialog" persistent max-width="690">
      <v-card class="confirm-dialog">
        <v-card-title class="headline">Attention!</v-card-title>
        <v-card-text v-if="step===1">
          <p>Your secret phrase makes it easy to back up and restore your account</p>
          <p>Warning! Never dicslose your backup phrase. Anyone with this phrase can take your Ether forever</p>
          <v-alert value="true" type="info" class="mb-4">{{ seed.phrase }}</v-alert>
          <a :href="seed.link">Download in txt</a>
        </v-card-text>
        <v-card-text v-if="step===2">
          <p>Please save these 12 words on paper (order is important). This seed will allow you recover your wallet in case of computer failure</p>
          <v-alert value="true" type="info" class="mb-4">{{ seed.phrase }}</v-alert>
          <a :href="seed.link">Download in txt</a>
        </v-card-text>
        <v-card-text v-if="step===3">
          <v-layout wrap>
            <v-flex xs12 sm6 mb-4 :class="{ 'pr-4': $vuetify.breakpoint.smAndUp }">
              <p>NOTICE! Please write down the seed and password in safe place. If you forget password, you won't be able to access your wallet</p>
              <a :href="seed.link">Download in txt</a>
            </v-flex>
            <v-flex xs12 sm6 :class="{ 'pl-4': $vuetify.breakpoint.smAndUp }">
              <v-alert value="true" type="info" class="mb-4">{{ seed.phrase }}</v-alert>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-text v-if="step===4">
          <p>NOTICE! Please write down the seed and password in safe place. If you forget your password, you won't be able to access your wallet.</p>
          <p>You also can download the seed phrase file</p>
          <v-alert value="true" type="info" class="mb-4">{{ seed.phrase }}</v-alert>
          <a :href="seed.link">Download in txt</a>
        </v-card-text>
        <v-card-actions class="px-3">
          <v-spacer></v-spacer>
          <v-btn color="success mb-2 mt-2" depressed v-if="step<4" @click="step++">Next</v-btn>
          <v-btn
            color="success mb-2 mt-2"
            depressed
            v-if="step===4"
            @click="changeSeedState"
          >I have written this down in safe place</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    name: 'ShowSeedDialog',
    data() {
      return {
        step: 1,
      };
    },
    computed: {
      seedDialog: {
        get() {
          return this.$store.getters['dashboard/profile/getShowSeedDialogState'];
        },
        set(value) {
          if (!value) {
            this.close();
          }
        },
      },
      seed() {
        return this.$store.getters['dashboard/profile/seed'];
      },
    },
    methods: {
      async changeSeedState() {
        const data = await this.$store.dispatch('dashboard/profile/changeSeedState');

        if (data.data.success) {
          await this.$store.dispatch('auth/auth/getMyInfo');
        } else {
          this.step = 1;
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
.confirm-dialog {
  .v-btn {
    text-transform: initial;
  }
}
</style>