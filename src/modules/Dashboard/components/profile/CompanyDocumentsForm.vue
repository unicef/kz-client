<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-toolbar class="headline justify-center mt-4" color="light-blue">Company Documents</v-toolbar>
      <v-form ref="companyDocumentsForm" lazy-validation>
        <v-card class="company-documents">
          <v-container :class="{ 'pt-4': $vuetify.breakpoint.xs }">
            <v-card-text>
              <v-container
                grid-list-md
                class="px-0 pb-0"
                :class="{ 'px-0': $vuetify.breakpoint.xs }"
              >
                <!-- Company documents -->
                <company-documents
                  ref="companyDocuments"
                  :companyDocumentsData="companyDocumentsData"
                  @getCompanyDocuments="getCompanyDocuments"
                />

                <!-- Alert -->
                <v-layout row v-if="errorAlert.state">
                  <v-flex sm12>
                    <v-alert :value="errorAlert.state" type="error">{{ errorAlert.msg }}</v-alert>
                  </v-flex>
                </v-layout>
                <!-- Success -->
                <v-layout row v-if="successAlert.state">
                  <v-flex sm12>
                    <v-alert :value="successAlert.state" type="success">{{ successAlert.msg }}</v-alert>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-layout align-center class="btns-wrapper">
                <v-btn type="button" @click="saveUser" color="info mb-2 mt-2" depressed>Save</v-btn>
                <v-btn type="button" color="error mb-2 mt-2" depressed>Cancel</v-btn>
              </v-layout>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
  import store from '@/store';
  import CompanyDocuments from '@/shared/components/CompanyDocuments';

  export default {
    name: 'CompanyDocumentsForm',
    components: {
      CompanyDocuments,
    },
    beforeRouteEnter(to, from, next) {
      if (store.getters['global/getRoles'].indexOf('ra') !== -1 || store.getters['global/getRoles'].indexOf('ap') !== -1) {
        next();
      } else {
        next('/dashboard/profile');
      }
    },
    data() {
      return {
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
      companyDocumentsData() {
        return this.$store.getters['users/getCompanyDocumentsData'];
      },
    },
    created() {
      console.log('created form');
    },
    methods: {
      async saveUser() {
        if (this.$refs.companyDocumentsForm.validate()) {
          this.$refs.companyDocuments.getCompanyDocuments();
        }
      },
      getCompanyDocuments(companyDocumetsData) {
        console.log('in parent company docs: ', companyDocumetsData);
      },
    },
  };
</script>

<style lang="scss" scoped>
</style>