<template>
  <v-layout wrap>
    <v-flex xs12 mt-4>
      <v-toolbar
        class="headline justify-center"
        color="light-blue"
      >{{ $t('transactionsList.title') }}</v-toolbar>
      <v-card class="transactions-list">
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
                    @click="searchTransactions"
                  >{{ $t('common.btns.search') }}</v-btn>
                </v-layout>
              </v-flex>
            </v-layout>
            <v-data-table
              class="table-custom transactionsList small mt-4 mb-4"
              :items="transactionsListData.transactions"
              :headers="headers"
              hide-actions
            >
              <template slot="headers" slot-scope="{ headers }">
                <tr>
                  <th class="text-xs-left">{{ $t('transactionsList.tableHeaders.id') }}</th>
                  <th class="text-xs-left">{{ $t('transactionsList.tableHeaders.type') }}</th>
                  <th class="text-xs-left">{{ $t('transactionsList.tableHeaders.transactionId') }}</th>
                  <th class="text-xs-left">{{ $t('transactionsList.tableHeaders.projectTitle') }}</th>
                  <th class="text-xs-left">{{ $t('transactionsList.tableHeaders.date') }}</th>
                  <th class="text-xs-left">{{ $t('transactionsList.tableHeaders.amount') }}</th>
                  <th class="text-xs-left">{{ $t('transactionsList.tableHeaders.status') }}</th>
                </tr>
              </template>
              <template slot="items" slot-scope="{ item }">
                <tr>
                  <td class="text-xs-left">{{ item.id }}</td>
                  <td class="text-xs-left">
                      <v-icon v-if="item.type === 'outcome'" color="error">arrow_downward</v-icon>
                      <v-icon v-if="item.type === 'income'" color="success">arrow_upward</v-icon>
                  </td>
                  <td class="text-xs-left">
                    <a
                      target="_blank"
                      :href="item.link"
                    >{{ item.txHash }}</a>
                  </td>
                  <td class="text-xs-left">{{ item.project }}</td>
                  <td class="text-xs-left">{{ item.createdAt }}</td>
                  <td class="text-xs-left">{{ item.amount }}</td>
                  <td class="text-xs-left">{{ item.status }}</td>
                </tr>
              </template>
              <template slot="no-data">
                <td colspan="8" class="no-data">
                  <div
                    class="text-xs-center"
                    :class="{
                          'pl-mobile': $vuetify.breakpoint.xsOnly,
                        }"
                  >{{ $t('transactionsList.noData') }}</div>
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
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'TransactionsList',
    components: {
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
        await this.$store.dispatch('finance/fetchTransactionsListData', { page: this.paginationPage, search: this.search });
        this.$vuetify.goTo(0, 'easeInOutCubic');
      },
    },
    computed: {
      transactionsListData() {
        return this.$store.getters['finance/getTransactionsListData'];
      },
      paginationLength() {
        return this.transactionsListData.lastPage;
      },
      paginationPage() {
        if (this.transactionsListData.currentPage === 1 && this.transactionsListData.lastPage === 1) {
          return 0;
        }
        return this.transactionsListData.currentPage;
      },
    },
    created() {
      this.$store.dispatch('finance/fetchTransactionsListData', { page: 1 });
    },
    methods: {
      async searchTransactions() {
        await this.$store.dispatch('finance/fetchTransactionsListData', { page: 1, search: this.search });
      },
      async choosePaginatorPage(page) {
        await this.$store.dispatch('finance/fetchTransactionsListData', { page, search: this.search });
        this.$vuetify.goTo(0, 'easeInOutCubic');
      },
    },
  };
</script>

<style lang="scss" scoped>
.search {
  max-width: 250px;
}
</style>