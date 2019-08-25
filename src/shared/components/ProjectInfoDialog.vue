<template>
  <v-layout row justify-center>
    <v-dialog
      transition="slide-y-transition"
      v-model="projectInfoDialog"
      @keydown.esc="close"
      persistent
      max-width="550"
    >
      <v-card class="project-info-dialog px-4 py-4">
        <v-layout row justify-end>
          <v-btn flat icon @click="close" class="dialog-close">
            <svgicon class="svg-icon" width="12" height="12" name="close" />
          </v-btn>
        </v-layout>
        <v-card-title class="headline">{{projectInfo ? projectInfo.title : ''}}</v-card-title>
        <v-card-text>
          <v-list dense v-if="projectInfo.id">
            <v-list-tile v-if="projectInfo.createdAt">
              <v-list-tile-content>{{ $t('common.fields.creationDate') }}:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ projectInfo.createdAt }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="projectInfo.deadline">
              <v-list-tile-content>{{ $t('common.fields.deadline') }}:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ projectInfo.deadline }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="projectInfo.projectCode">
              <v-list-tile-content>{{ $t('common.fields.projectCode') }}:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ projectInfo.projectCode }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="projectInfo.programme.title">
              <v-list-tile-content>{{ $t('common.fields.programmeTitle') }}:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ projectInfo.programme.title }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="projectInfo.programme.code">
              <v-list-tile-content>{{ $t('common.fields.programmeCode') }}:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ projectInfo.programme.code }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="projectInfo.ice">
              <v-list-tile-content>{{ $t('common.fields.ice') }}:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ projectInfo.ice }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="projectInfo.description">
              <v-list-tile-content>{{ $t('common.fields.description') }}:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ projectInfo.description }}</v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    name: 'ProjectInfoDialog',
    computed: {
      projectInfoDialog: {
        get() {
          return this.$store.getters['projects/getProjectInfoDialogState'];
        },
        set(value) {
          if (!value) {
            this.close();
          }
        },
      },
      projectInfo() {
        return this.$store.getters['projects/getProjectInfo'];
      },
    },
    methods: {
      close() {
        this.$store.commit('projects/toggleProjectInfoDialogState', false);
        this.$store.commit('projects/setProjectInfo', {});
      },
    },
  };
</script>

<style lang="scss" scoped>
</style>