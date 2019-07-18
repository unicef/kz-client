<template>
  <v-layout wrap>
    <v-flex xs12 mt-4>
      <v-toolbar class="headline justify-center" color="light-blue">{{ $t('donorsList.title') }}</v-toolbar>
      <v-card class="partners-list">
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
                  <v-btn class="search-btn" color="primary" @click="searchDonors">{{ $t('common.btns.search') }}</v-btn>
                  <v-btn color="primary" :to="{ name: 'donor-create' }">{{ $t('common.btns.createDonor') }}</v-btn>
                </v-layout>
              </v-flex>
            </v-layout>
            <v-data-table
              class="table-custom partnersList small mt-4 mb-4"
              :items="donorsListData.donors"
              :headers="headers"
              hide-actions
            >
              <template slot="headers" slot-scope="{ headers }">
                <tr>
                  <th class="text-xs-left">{{ $t('donorsList.tableHeaders.id') }}</th>
                  <th class="text-xs-left">{{ $t('donorsList.tableHeaders.email') }}</th>
                  <th class="text-xs-left">{{ $t('donorsList.tableHeaders.firstName') }}</th>
                  <th class="text-xs-left">{{ $t('donorsList.tableHeaders.lastName') }}</th>
                  <th class="text-xs-left">{{ $t('donorsList.tableHeaders.status') }}</th>
                  <th class="text-xs-left">{{ $t('donorsList.tableHeaders.date') }}</th>
                  <th class="text-xs-left">{{ $t('donorsList.tableHeaders.company') }}</th>
                </tr>
              </template>
              <template slot="items" slot-scope="{ item }">
                <tr>
                  <td class="text-xs-left">{{ item.id }}</td>
                  <td
                    class="text-xs-left"
                  >
                    <router-link
                      :to="'/admin/users/donor/'+item.id"
                    >{{ item.email }}</router-link>
                  </td>
                  <td class="text-xs-left">{{ item.firstName }}</td>
                  <td class="text-xs-left">{{ item.lastName }}</td>
                  <td class="text-xs-left">{{ item.status }}</td>
                  <td class="text-xs-left">{{ item.createdAt }}</td>
                  <td class="text-xs-left">{{ item.company }}</td>
                </tr>
              </template>
              <template slot="no-data">
                <td colspan="8" class="no-data">
                  <div
                    class="text-xs-center"
                    :class="{
                          'pl-mobile': $vuetify.breakpoint.xsOnly,
                        }"
                  >{{ $t('donorsList.noData') }}</div>
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
    name: 'DonorsList',
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
        await this.$store.dispatch('admin/users/fetchDonorsListData', { page: this.paginationPage, search: this.search });
      },
    },
    computed: {
      donorsListData() {
        return this.$store.getters['admin/users/getDonorsListData'];
      },
      paginationLength() {
        return this.donorsListData.lastPage;
      },
      paginationPage() {
        if (this.donorsListData.currentPage === 1 && this.donorsListData.lastPage === 1) {
          return 0;
        }
        return this.donorsListData.currentPage;
      },
    },
    created() {
      this.$store.dispatch('admin/users/fetchDonorsListData', { page: 1 });
    },
    methods: {
      async searchDonors() {
        await this.$store.dispatch('admin/users/fetchDonorsListData', { page: 1, search: this.search });
      },
      async choosePaginatorPage(page) {
        await this.$store.dispatch('admin/users/fetchDonorsListData', { page, search: this.search });
      },
    },
  };
</script>

<style lang="scss" scoped>
.search {
  max-width: 250px;
}
</style>