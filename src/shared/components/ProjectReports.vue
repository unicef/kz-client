<template>
  <v-layout wrap mt-4 mb-4>
    <v-flex xs12 mb-2 :class="{ 'pr-4': $vuetify.breakpoint.smAndUp }">
      <h3 class="title mb-3">{{ $t('projectReports.title') }}</h3>
      {{ (projectReports.length) ? '' : $t('projectFaces.noData') }}
      
        <v-layout wrap v-if="projectReports.length" v-for="(report, index) in projectReports" :key="index">
          <v-flex xs12 v-if="report.analyticalDocId">
            <a
              @click="downloadDocument(report.analyticalDocId)"
            >{{ $t('common.fields.analyticalReport') }} FACE {{report.num}}</a>
          </v-flex>
          <v-flex xs12 v-if="report.financialDocId">
            <a
              @click="downloadDocument(report.financialDocId)"
            >{{ $t('common.fields.financialReport') }} FACE {{report.num}}</a>
          </v-flex>
          <v-flex xs12 v-if="report.justificationDocId">
            <a
              @click="downloadDocument(report.justificationDocId)"
            >{{ $t('common.fields.justificationReport') }} FACE {{report.num}}</a>
          </v-flex>
        </v-layout>
      
    </v-flex>
  </v-layout>
</template>

<script>
  import { saveAs } from 'file-saver';
  import { base64StringToBlob } from 'blob-util';

  export default {
    name: 'ProjectReports',
    data() {
      return {
      };
    },
    computed: {
      projectReports() {
        return this.$store.getters['projects/getProjectReports'];
      },
    },
    async created() {
      if (this.$route.params.id) {
        await this.$store.dispatch('projects/getProjectReports', this.$route.params.id);
      }
    },
    methods: {
      async downloadDocument(docId) {
        const data = await this.$store.dispatch('projects/getFaceReportDocument', docId);
        if (data.success) {
          const blob = base64StringToBlob(data.data.doc, data.data.contentType);
          saveAs(blob, data.data.filename);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
</style>