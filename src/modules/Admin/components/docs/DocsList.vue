<template>
  <v-layout wrap>
    <v-flex xs12 mt-4>
      <v-toolbar class="headline justify-center" color="light-blue">
        {{ $t('docs.allPages') }}
      </v-toolbar>

      <!-- Table -->
      <v-card>
        <v-container :class="{ 'pt-4': $vuetify.breakpoint.xs }">
          <v-layout column>
            <v-flex>
              <v-layout wrap justify-end>
                <v-btn color="primary" :to="{ name: 'create-page' }">
                  {{ $t('common.btns.createPage') }}
                </v-btn>
              </v-layout>

              <!-- Alerts -->
              <v-layout class="my-3" justify-center>
                <v-flex sm12 md5>
                  <v-alert
                    :value="successAlert.state"
                    type="success"
                  >
                    {{ successAlert.msg }}
                  </v-alert>
                  <v-alert
                    :value="errorAlert.state"
                    type="error"
                  >
                    {{ errorAlert.msg }}
                  </v-alert>
                </v-flex>
              </v-layout>

              <v-data-table
                class="table-custom small mt-4 mb-4"
                :items="docs.pages"
                :headers="headers"
                hide-actions
              >
                <!-- Headers -->
                <template slot="headers" slot-scope="{ headers }">
                  <tr>
                    <th class="text-xs-left">{{ $t('projectsList.tableHeaders.id') }}</th>
                    <th class="text-xs-left">{{ $t('projectsList.tableHeaders.title') }}</th>
                    <th class="text-xs-left">{{ $t('projectsList.tableHeaders.created') }}</th>
                    <th class="text-xs-left">URL</th>
                    <th class="text-xs-left">{{ $t('projectsList.tableHeaders.actions') }}</th>
                  </tr>
                </template>
                <!-- Content -->
                <template slot="items" slot-scope="{ item }">
                  <tr>
                    <td class="text-xs-left">{{ item.id }}</td>
                    <td class="text-xs-left">
                      <div v-if="$i18n.locale === 'en'">
                        {{ item.titleEn }}
                      </div>
                      <div v-if="$i18n.locale === 'ru'">
                        {{ item.titleRu }}
                      </div>
                    </td>
                    <td class="text-xs-left">{{ item.createdAt }}</td>
                    <td class="text-xs-left">/{{ item.key }}</td>
                    <td class="text-xs-left table-actions">
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            icon
                            flat
                            color="primary"
                            :to="'/admin/docs/edit/'+item.id"
                            @on="on"
                          >
                            <v-icon>edit</v-icon>
                          </v-btn>
                        </template>
                        <span>
                          {{ $t('common.btns.edit') }}
                        </span>
                      </v-tooltip>
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-btn 
                            icon
                            flat
                            color="error"
                            @on="on"
                            @click="onDeleteDoc(item.id)"
                          >
                            <v-icon>delete</v-icon>
                          </v-btn>
                        </template>
                        <span>
                          {{ $t('common.btns.delete') }}
                        </span>
                      </v-tooltip>
                    </td>
                  </tr>
                </template>
                <!-- No data -->
                <template slot="no-data">
                <td colspan="8" class="no-data">
                  <div
                    class="text-xs-center"
                    :class="{
                          'pl-mobile': $vuetify.breakpoint.xsOnly,
                        }"
                  >
                    {{ $t('donorsList.noData') }}
                  </div>
                </td>
              </template>
              </v-data-table>

              <!-- Pagination -->
              <div v-if="paginationPage" class="text-xs-center">
                <v-pagination
                  :value="paginationPage"
                  :length="paginationLength"
                  @input="choosePaginatorPage($event)"
                ></v-pagination>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>

    <!-- Delete dialog -->
    <docs-delete-dialog
      :display="deleteDialog"
      @delete='onDelete'
      @close='onClose'
    />
  </v-layout>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import DocsDeleteDialog from './DocsDeleteDialog';

  export default {
    name: 'DocsList',
    components: {
      DocsDeleteDialog,
    },
    data() {
      return {
        deleteDialog: false,
        docId: null,
        headers: [
          { text: '', sortable: false },
          { text: '', sortable: false },
          { text: '', sortable: false },
          { text: '', sortable: false },
          { text: '', sortable: false },
        ],

        successAlert: {
          state: false,
          msg: '',
        },
        errorAlert: {
          state: false,
          msg: '',
        },
      };
    },
    computed: {
      ...mapGetters({
        docs: 'admin/docs/getDocs',
      }),

      paginationLength() {
        return this.docs.lastPage;
      },
      paginationPage() {
        if (this.docs.currentPage === 1 && this.docs.lastPage === 1) {
          return 0;
        }

        return this.docs.currentPage;
      },
    },
    async created() {
      await this.fetchDocs({ page: 1 });
    },
    methods: {
      ...mapActions({
        fetchDocs: 'admin/docs/fetchDocs',
        deleteDoc: 'admin/docs/deleteDoc',
      }),

      async choosePaginatorPage(page) {
        await this.fetchDocs({ page });
        this.$vuetify.goTo(0, 'easeInOutCubic');
      },
      onDeleteDoc(id) {
        this.docId = id;
        this.deleteDialog = true;
      },
      async onDelete() {
        this.deleteDialog = false;
        this.errorAlert.state = false;
        this.errorAlert.msg = '';

        const { data, success, error } = await this.deleteDoc({ id: this.docId });

        if (!success) {
          this.errorAlert.state = true;
          this.errorAlert.msg = error.message;
          this.$vuetify.goTo(0, 'easeInOutCubic');
          return;
        }

        this.successAlert.state = true;
        this.successAlert.msg = data.message;
        this.$vuetify.goTo(0, 'easeInOutCubic');

        await this.fetchDocs({ page: 1 });
      },
      onClose() {
        this.deleteDialog = false;
        this.docId = null;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .content {
    overflow-x: auto;
  }

  .table-actions {
    min-width: 164px;
  }
</style>
