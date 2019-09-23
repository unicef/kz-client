<template>
  <v-layout wrap>
    <v-flex xs12 sm9>
      <h3 class="mb-2">{{ $t('common.fields.projectTitle') }}: {{ projectInfo.title }}</h3>
    </v-flex>
    <v-flex xs12 sm3 mb-2>
      <v-layout align-center justify-end v-if="projectInfo.stage">
        <v-chip
          disabled
          color="warning"
          text-color="white"
          class="text-capitalize"
        >{{ $t('common.fields.request') }} {{ requestNum }}</v-chip>
      </v-layout>
    </v-flex>
    <v-flex d-flex xs12 md5 :class="{ 'pr-2': $vuetify.breakpoint.smAndUp }">
      <!-- PROJECT INFO -->
      <v-card class="mb-4 project-details-info">
        <v-list dense>
          <v-list-tile v-if="projectInfo.createdAt">
            <v-list-tile-content>{{ $t('common.fields.projectCreationDate') }}:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ projectInfo.createdAt }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="projectInfo.deadline">
            <v-list-tile-content>{{ $t('common.fields.deadline') }}:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ projectInfo.deadline }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="projectInfo.programme && projectInfo.programme.title">
            <v-list-tile-content>{{ $t('common.fields.programmeTitle') }}:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ projectInfo.programme.title }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="projectInfo.programme && projectInfo.programme.code">
            <v-list-tile-content>{{ $t('common.fields.programmeCode') }}:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ projectInfo.programme.code }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="projectInfo.projectCode">
            <v-list-tile-content>{{ $t('common.fields.projectCode') }}:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ projectInfo.projectCode }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>{{ $t('common.fields.currency') }}:</v-list-tile-content>
            <v-list-tile-content class="align-end">Kazakhstani tenge (KZT)</v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
    <v-flex
      d-flex
      xs12
      md5
      :class="{ 'pr-2': $vuetify.breakpoint.smAndUp, 'pl-2': $vuetify.breakpoint.smAndUp }"
    >
      <!-- PROJECT INFO -->
      <v-card class="mb-4 project-details-info">
        <v-list dense>
          <v-list-tile v-if="projectInfo.statusId">
            <v-list-tile-content>{{ $t('common.fields.status') }}:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ projectInfo.statusId }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="projectInfo.officerName">
            <v-list-tile-content>{{ $t('common.fields.responsibleOfficer') }}:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ projectInfo.officerName }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="projectInfo.partnerName">
            <v-list-tile-content>{{ $t('common.fields.implementingPartner') }}:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ projectInfo.partnerName }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="projectInfo.assistantName">
            <v-list-tile-content>{{ $t('common.fields.responsibleAssistant') }}:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ projectInfo.assistantName }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="faceRequestData.createdAt">
            <v-list-tile-content>{{ $t('common.fields.appliedAt') }}:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ faceRequestData.createdAt }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="faceRequestData.approvedAt">
            <v-list-tile-content>{{ $t('common.fields.submittedAt') }}:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ faceRequestData.approvedAt }}</v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
    <v-flex xs12 md2 :class="{ 'pl-2': $vuetify.breakpoint.smAndUp }">
      <v-layout
        v-for="(item, key) in faceApprovalStages"
        :key="key"
        v-if="(faceRequestData.statusId) && (faceRequestData.statusId !== 'waiting' && faceRequestData.statusId !== 'confirm' && faceRequestData.statusId !== 'reject')"
      >
        <v-chip
          class="face-approval-stage"
          disabled
          :color="getColor(item.key)"
          text-color="white"
        >{{ item.title }}</v-chip>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'FaceRequestInfo',
    computed: {
      projectInfo() {
        return this.$store.getters['projects/getProjectInfo'];
      },
      faceRequestData() {
        return this.$store.getters['projects/getFaceRequestData'];
      },
      isFaceRequestCreationPath() {
        return this.$route.path.indexOf('create-face-request') !== -1;
      },
      requestNum() {
        return (this.isFaceRequestCreationPath) ? this.projectInfo.stage.num : this.faceRequestData.num;
      },
      faceApprovalStages() {
        const stages = [
          {
            key: 'validate',
            title: this.$t('common.fields.validate'),
          },
          {
            key: 'certify',
            title: this.$t('common.fields.certify'),
          },
          {
            key: 'approve',
            title: this.$t('common.fields.approve'),
          },
          {
            key: 'verify',
            title: this.$t('common.fields.verity'),
          },

        ];
        return stages;
      },
    },
    methods: {
      getColor(stageKey) {
        let color = 'disable';
        switch (stageKey) {
          case 'validate':
            if (this.faceRequestData.statusId === 'validate') {
              color = 'info';
            } else {
              color = 'success';
            }
            break;
          case 'certify':
            if (this.faceRequestData.statusId === 'certify') {
              color = 'info';
            }
            if (this.faceRequestData.statusId === 'approve' ||
                this.faceRequestData.statusId === 'verify' ||
                this.faceRequestData.statusId === 'success') {
              color = 'success';
            }
            break;
          case 'approve':
            if (this.faceRequestData.statusId === 'approve') {
              color = 'info';
            }
            if (this.faceRequestData.statusId === 'verify' ||
                this.faceRequestData.statusId === 'success') {
              color = 'success';
            }
            break;
          case 'verify':
            if (this.faceRequestData.statusId === 'verify') {
              color = 'info';
            }
            if (this.faceRequestData.statusId === 'success') {
              color = 'success';
            }
            break;
          default:
            break;
        }
        return color;
      },
    },
  };
</script>

<style lang="scss" scoped>
</style>