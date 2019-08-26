<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-card class="projects-list">
        <v-container :class="{ 'pt-4': $vuetify.breakpoint.xs }">
          <v-card-text>
            <v-layout wrap>
              <v-flex xs12 align-left>
                <v-layout wrap justify-end>
                  <v-text-field
                    class="search"
                    ref="search"
                    v-model="search"
                    color="primary"
                    :label="$t('common.fields.search')"
                  ></v-text-field>
                  <v-btn
                    class="search-btn"
                    color="primary"
                    @click="searchProject"
                  >{{ $t('common.btns.search') }}</v-btn>
                </v-layout>
              </v-flex>
            </v-layout>
            <v-data-table
              class="table-custom projectsList small mt-4 mb-4"
              :items="projectsListData.projects"
              :headers="headers"
              hide-actions
            >
              <template slot="headers" slot-scope="{ headers }">
                <tr>
                  <th class="text-xs-left">{{ $t('projectsList.tableHeaders.title') }}</th>
                  <th class="text-xs-left">{{ $t('projectsList.tableHeaders.created') }}</th>
                  <th class="text-xs-left">{{ $t('projectsList.tableHeaders.deadline') }}</th>
                  <th class="text-xs-left">{{ $t('projectsList.tableHeaders.code') }}</th>
                  <th class="text-xs-left">{{ $t('projectsList.tableHeaders.partner') }}</th>
                  <th class="text-xs-left">{{ $t('projectsList.tableHeaders.officer') }}</th>
                  <th class="text-xs-left">{{ $t('projectsList.tableHeaders.status') }}</th>
                  <th class="text-xs-left">{{ $t('projectsList.tableHeaders.actions') }}</th>
                </tr>
              </template>
              <template slot="items" slot-scope="{ item }">
                <tr>
                  <td class="text-xs-left">
                    <a
                      class="project-title"
                      @click="viewProjectInfo(item.id)"
                    >{{ item.title }}</a>
                  </td>
                  <td class="text-xs-left">{{ item.createdAt }}</td>
                  <td class="text-xs-left">{{ item.deadline }}</td>
                  <td class="text-xs-left">{{ item.programmeCode }}</td>
                  <td class="text-xs-left">{{ item.partnerName }}</td>
                  <td class="text-xs-left">{{ item.assistName }}</td>
                  <td class="text-xs-left">{{ item.status }}</td>
                  <td class="text-xs-left">
                    <router-link :to="'/dashboard/projects/project/'+item.id">
                      <v-btn small color="primary">{{ $t('common.btns.view') }}</v-btn>
                    </router-link>
                  </td>
                </tr>
              </template>
              <template slot="no-data">
                <td colspan="8" class="no-data">
                  <div
                    class="text-xs-center"
                    :class="{
                          'pl-mobile': $vuetify.breakpoint.xsOnly,
                        }"
                  >{{ $t('projectsList.noData') }}</div>
                </td>
              </template>
            </v-data-table>
            <div v-if="paginationPage" class="text-xs-center">
              <v-pagination
                :value="paginationPage"
                :length="paginationLength"
                @input="choosePaginatorPage($event)"
              ></v-pagination>
            </div>
          </v-card-text>
        </v-container>
      </v-card>
      <project-info-dialog />
    </v-flex>
  </v-layout>
</template>

<script>
  import ProjectInfoDialog from '@/shared/components/ProjectInfoDialog';

  export default {
    name: 'ProjectsTable',
    components: {
      ProjectInfoDialog,
    },
    data() {
      return {
        search: '',
        headers: [
            { text: '', sortable: false },
            { text: '', sortable: false },
            { text: '', sortable: false },
            { text: '', sortable: false },
            { text: '', sortable: false },
            { text: '', sortable: false },
            { text: '', sortable: false },
        ],
      };
    },
    watch: {
      /* eslint-disable */
      '$i18n.locale': async function() {
        await this.$store.dispatch('projects/fetchProjectsListData', {
          page: this.paginationPage,
          search: this.search,
          type: this.searchProjectsType,
          companyId: this.companyId
        });
      },
    },
    computed: {
      projectsListData() {
        return this.$store.getters['projects/getProjectsListData'];
      },
      paginationLength() {
        return this.projectsListData.lastPage;
      },
      paginationPage() {
        if (this.projectsListData.currentPage === 1 && this.projectsListData.lastPage === 1) {
          return 0;
        }
        return this.projectsListData.currentPage;
      },
      isAllProjectsPath() {
        return this.$route.path.indexOf('all-projects') !== -1;
      },
      isMyProjectsPath() {
        return this.$route.path.indexOf('my-projects') !== -1;
      },
      isCompanyProjectsPath() {
        return this.$route.path.indexOf('company-projects') !== -1;
      },
      searchProjectsType() {
        if (this.isAllProjectsPath) {
            return 'all';
        }
        if (this.isMyProjectsPath) {
            return 'my';
        }
        if (this.isCompanyProjectsPath) {
            return 'company';
        }
        return 'all';
      },
      companyId() {
        return (this.$route.params.partnerId) ? this.$route.params.partnerId : '';
      },
    },
    created() {
      this.$store.dispatch('projects/fetchProjectsListData', {
        page: 1,
        type: this.searchProjectsType,
        companyId: this.companyId
      });
    },
    methods: {
      async searchProject() {
        await this.$store.dispatch('projects/fetchProjectsListData', {
            page: 1,
            search: this.search,
            type: this.searchProjectsType,
            companyId: this.companyId
        });
      },
      async choosePaginatorPage(page) {
        await this.$store.dispatch('projects/fetchProjectsListData', {
            page,
            search: this.search,
            type: this.searchProjectsType,
            companyId: this.companyId
        });
      },
      async viewProjectInfo(id) {
        await this.$store.dispatch('projects/getProjectShortInfo', id);
        this.$store.commit('projects/toggleProjectInfoDialogState', true);
      },
    },
  };
</script>

<style lang="scss" scoped>
.search {
  max-width: 250px;
}
.project-title {
  text-decoration: underline;
}
</style>