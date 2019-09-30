<template>
  <v-layout wrap>
    <v-flex xs12 mt-4>
      <v-toolbar class="headline justify-center" color="light-blue">{{ $t('partnersList.title') }}</v-toolbar>
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
                  <v-btn class="search-btn" color="primary" @click="searchPartners">{{ $t('common.btns.search') }}</v-btn>
                  <v-btn color="primary" :to="{ name: 'partner-create' }">{{ $t('common.btns.createPartner') }}</v-btn>
                </v-layout>
              </v-flex>
            </v-layout>
            <v-data-table
              class="table-custom partnersList small mt-4 mb-4"
              :items="partnersListData.partners"
              :headers="headers"
              hide-actions
            >
              <template slot="headers" slot-scope="{ headers }">
                <tr>
                  <th class="text-xs-left">{{ $t('partnersList.tableHeaders.id') }}</th>
                  <th class="text-xs-left">{{ $t('partnersList.tableHeaders.email') }}</th>
                  <th class="text-xs-left">{{ $t('partnersList.tableHeaders.firstName') }}</th>
                  <th class="text-xs-left">{{ $t('partnersList.tableHeaders.lastName') }}</th>
                  <th class="text-xs-left">{{ $t('partnersList.tableHeaders.role') }}</th>
                  <th class="text-xs-left">{{ $t('partnersList.tableHeaders.status') }}</th>
                  <th class="text-xs-left">{{ $t('partnersList.tableHeaders.created') }}</th>
                  <th class="text-xs-left">{{ $t('partnersList.tableHeaders.company') }}</th>
                  <th class="text-xs-left">{{ $t('partnersList.tableHeaders.companyStatus') }}</th>
                </tr>
              </template>
              <template slot="items" slot-scope="{ item }">
                <tr>
                  <td class="text-xs-left">{{ item.id }}</td>
                  <td
                    class="text-xs-left"
                  >
                    <router-link
                      :to="'/admin/users/partner/'+item.id"
                    >{{ item.email }}</router-link>
                  </td>
                  <td class="text-xs-left">{{ item.firstName }}</td>
                  <td class="text-xs-left">{{ item.lastName }}</td>
                  <td class="text-xs-left">{{ item.role }}</td>
                  <td class="text-xs-left">{{ item.userStatus }}</td>
                  <td class="text-xs-left">{{ item.createdAt }}</td>
                  <td class="text-xs-left">{{ item.company }}</td>
                  <td class="text-xs-left">{{ item.companyStatus }}</td>
                </tr>
              </template>
              <template slot="no-data">
                <td colspan="8" class="no-data">
                  <div
                    class="text-xs-center"
                    :class="{
                          'pl-mobile': $vuetify.breakpoint.xsOnly,
                        }"
                  >{{ $t('partnersList.noData') }}</div>
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
    name: 'PartnersList',
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
            { text: '', sortable: false },
            { text: '', sortable: false },
        ],
      };
    },
    watch: {
      /* eslint-disable */
      '$i18n.locale': async function() {
        await this.$store.dispatch('admin/users/fetchPartnersListData', { page: this.paginationPage, search: this.search });
        this.$vuetify.goTo(0, 'easeInOutCubic');
      },
    },
    computed: {
      partnersListData() {
        return this.$store.getters['admin/users/getPartnersListData'];
      },
      paginationLength() {
        return this.partnersListData.lastPage;
      },
      paginationPage() {
        if (this.partnersListData.currentPage === 1 && this.partnersListData.lastPage === 1) {
          return 0;
        }
        return this.partnersListData.currentPage;
      },
    },
    created() {
      this.$store.dispatch('admin/users/fetchPartnersListData', { page: 1 });
    },
    methods: {
      async searchPartners() {
        await this.$store.dispatch('admin/users/fetchPartnersListData', { page: 1, search: this.search });
      },
      async choosePaginatorPage(page) {
        await this.$store.dispatch('admin/users/fetchPartnersListData', { page, search: this.search });
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