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
                          <v-btn icon flat color="primary" v-on="on">
                            <v-icon>edit</v-icon>
                          </v-btn>
                        </template>
                        <span>
                          {{ $t('common.btns.edit') }}
                        </span>
                      </v-tooltip>
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-btn icon flat color="error" v-on="on">
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
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'DocsList',
  data() {
    return {
      headers: [
        { text: '', sortable: false },
        { text: '', sortable: false },
        { text: '', sortable: false },
        { text: '', sortable: false },
        { text: '', sortable: false },
      ],
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
    }),

    async choosePaginatorPage(page) {
      this.fetchDocs({ page });
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
