<template>
  <v-layout  wrap container px-0 py-0>
    <v-flex xs12 mt-4>
      <v-toolbar class="headline justify-center" color="light-blue">{{ $t('companyDocuments.title') }}</v-toolbar>
      <v-card>
          <v-container :class='{ "pt-4": $vuetify.breakpoint.xs }'>
            <v-card-text>
              <v-layout wrap mb-4>
                <v-flex xs12 pb-2>
                  <h2 class="title mb-2 font-weight-bold">{{ companyData.name }}</h2>
                </v-flex>
                <partner-status />
                <v-flex mt-4 xs12 v-if="companyDocumentsData.length">
                  <!-- Company loaded documents -->
                  <v-layout wrap mb-2 v-for="(doc, index) in companyDocumentsData" :key="index">
                    <v-flex xs12>
                      <v-layout wrap align-content-start>
                        <v-flex xs12>
                          <v-icon class="pr-2">insert_drive_file</v-icon><a @click="downloadDocument(doc.id)">{{doc.title}}</a>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex mt-4 xs12 v-if="!companyDocumentsData.length">
                  <p class=".subheading mb-2">{{ $t('common.fields.noDataYet') }}</p>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import { saveAs } from 'file-saver';
  import { base64StringToBlob } from 'blob-util';
  import PartnerStatus from './PartnerStatus';

  export default {
    name: 'CompanyDocuments',
    components: {
      PartnerStatus,
    },
    data() {
      return {
      };
    },
    computed: {
      companyData() {
        return this.$store.getters['dashboard/users/getPartnerInfo'];
      },
      companyDocumentsData() {
        return this.$store.getters['users/getCompanyDocumentsData'];
      },
    },
    methods: {
      async downloadDocument(docId) {
        const data = await this.$store.dispatch('users/getCompanyDocument', docId);
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