<template>
  <v-layout row justify-center>
    <v-dialog transition="slide-y-transition" v-model="seedDialog" persistent max-width="690">
      <v-card class="confirm-dialog">
        <v-card-title class="headline">{{ $t('seedDialog.title') }}</v-card-title>
        <v-card-text v-if="step===1">
          <p>{{ $t('seedDialog.step1.text1') }}</p>
          <p>{{ $t('seedDialog.step1.text2') }}</p>
          <v-alert value="true" type="info" class="mb-4">{{ seed.phrase }}</v-alert>
          <a @click="downloadFile()">{{ $t('common.btns.downloadInTxt') }}</a>
        </v-card-text>
        <v-card-text v-if="step===2">
          <p>{{ $t('seedDialog.step2.text1') }}</p>
          <v-alert value="true" type="info" class="mb-4">{{ seed.phrase }}</v-alert>
          <a @click="downloadFile()">{{ $t('common.btns.downloadInTxt') }}</a>
        </v-card-text>
        <v-card-text v-if="step===3">
          <v-layout wrap>
            <v-flex xs12 sm6 mb-4 :class="{ 'pr-4': $vuetify.breakpoint.smAndUp }">
              <p>{{ $t('seedDialog.step3.text1') }}</p>
              <a @click="downloadFile()">{{ $t('common.btns.downloadInTxt') }}</a>
            </v-flex>
            <v-flex xs12 sm6 :class="{ 'pl-4': $vuetify.breakpoint.smAndUp }">
              <v-alert value="true" type="info" class="mb-4">{{ seed.phrase }}</v-alert>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-text v-if="step===4">
          <p>{{ $t('seedDialog.step4.text1') }}</p>
          <p>{{ $t('seedDialog.step4.text2') }}</p>
          <v-alert value="true" type="info" class="mb-4">{{ seed.phrase }}</v-alert>
          <a @click="downloadFile()">{{ $t('common.btns.downloadInTxt') }}</a>
        </v-card-text>
        <v-card-actions class="px-3">
          <v-spacer></v-spacer>
          <v-btn color="success mb-2 mt-2" depressed v-if="step<4" @click="step++">{{ $t('common.btns.next') }}</v-btn>
          <v-btn
            color="success mb-2 mt-2"
            depressed
            v-if="step===4"
            @click="changeSeedState"
          >{{ $t('common.btns.closeSeedDialog') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import { saveAs } from 'file-saver';
  import { base64StringToBlob } from 'blob-util';

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
      async downloadFile() {
        const fileId = this.seed.link.split('=')[1];
        const data = await this.$store.dispatch('dashboard/profile/getSeedFile', fileId);
        if (data.success) {
          const blob = base64StringToBlob(data.data.doc, data.data.contentType);
          saveAs(blob, data.data.filename);
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