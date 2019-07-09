<template>
  <v-layout wrap>
    <v-flex xs12 mt-4>
      <v-toolbar class="headline justify-center" color="light-blue">{{ $t('unicefUsersList.title') }}</v-toolbar>
      <v-card class="unicef-users-list">
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
                  <v-btn class="search-btn" color="primary" @click="searchUnicefUsers">{{ $t('common.btns.search') }}</v-btn>
                  <v-btn color="primary" :to="{ name: 'unicef-user-create' }">{{ $t('common.btns.createUser') }}</v-btn>
                </v-layout>
              </v-flex>
            </v-layout>
            <v-data-table
              class="table-custom unicefUsersList small mt-4 mb-4"
              :items="unicefUsersListData.users"
              :headers="headers"
              hide-actions
            >
              <template slot="headers" slot-scope="{ headers }">
                <tr>
                  <th class="text-xs-left">{{ $t('unicefUsersList.tableHeaders.id') }}</th>
                  <th class="text-xs-left">{{ $t('unicefUsersList.tableHeaders.email') }}</th>
                  <th class="text-xs-left">{{ $t('unicefUsersList.tableHeaders.firstName') }}</th>
                  <th class="text-xs-left">{{ $t('unicefUsersList.tableHeaders.lastName') }}</th>
                  <th class="text-xs-left">{{ $t('unicefUsersList.tableHeaders.role') }}</th>
                  <th class="text-xs-left">{{ $t('unicefUsersList.tableHeaders.status') }}</th>
                  <th class="text-xs-left">{{ $t('unicefUsersList.tableHeaders.created') }}</th>
                </tr>
              </template>
              <template slot="items" slot-scope="{ item }">
                <tr>
                  <td class="text-xs-left">{{ item.id }}</td>
                  <td
                    class="text-xs-left"
                  >
                    <router-link
                      :to="'/admin/users/unicef-user/'+item.id"
                    >{{ item.email }}</router-link>
                  </td>
                  <td class="text-xs-left">{{ item.firstName }}</td>
                  <td class="text-xs-left">{{ item.lastName }}</td>
                  <td class="text-xs-left">{{ item.role }}</td>
                  <td class="text-xs-left">{{ item.userStatus }}</td>
                  <td class="text-xs-left">{{ item.createdAt }}</td>
                </tr>
              </template>
              <template slot="no-data">
                <td colspan="8" class="no-data">
                  <div
                    class="text-xs-center"
                    :class="{
                          'pl-mobile': $vuetify.breakpoint.xsOnly,
                        }"
                  >{{ $t('unicefUsersList.noData') }}</div>
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
    name: 'UnicefUsersList',
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
    computed: {
      unicefUsersListData() {
        return this.$store.getters['admin/users/getUnicefUsersListData'];
      },
      paginationLength() {
        return this.unicefUsersListData.lastPage;
      },
      paginationPage() {
        if (this.unicefUsersListData.currentPage === 1 && this.unicefUsersListData.lastPage === 1) {
          return 0;
        }
        return this.unicefUsersListData.currentPage;
      },
    },
    created() {
      this.$store.dispatch('admin/users/fetchUnicefUsersListData', { page: 1 });
    },
    methods: {
      async searchUnicefUsers() {
        await this.$store.dispatch('admin/users/fetchUnicefUsersListData', { page: 1, search: this.search });
      },
      async choosePaginatorPage(page) {
        await this.$store.dispatch('admin/users/fetchUnicefUsersListData', { page, search: this.search });
      },
    },
  };
</script>

<style lang="scss" scoped>
.search {
  max-width: 250px;
}
</style>