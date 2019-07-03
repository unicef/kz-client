<template>
  <v-layout wrap>
    <v-flex xs12 mt-4>
      <v-toolbar class="headline justify-center" color="light-blue">List of UNICEF employees</v-toolbar>
      <v-card class="partners-list">
        <v-container :class="{ 'pt-4': $vuetify.breakpoint.xs }">
          <v-card-text>
            <v-layout wrap>
              <v-flex xs12 align-left>
                <v-layout wrap justify-end>
                  <v-text-field class="search" ref="search" color="primary" label="Search"></v-text-field>
                  <v-btn class="search-btn" color="primary">Search</v-btn>
                  <v-btn color="primary" :to="{ name: 'unicef-user-create' }">Create User</v-btn>
                </v-layout>
              </v-flex>
            </v-layout>
            <v-data-table :headers="headers" :items="users">
              <template v-slot:items="props">
                <td>{{ props.item.id }}</td>
                <td class="text-xs-center">
                  <router-link
                    :to="'/admin/users/unicef-user/'+props.item.id"
                  >{{ props.item.email }}</router-link>
                </td>
                <td class="text-xs-center">{{ props.item.name }}</td>
                <td class="text-xs-center">{{ props.item.last }}</td>
                <td class="text-xs-center">{{ props.item.role }}</td>
                <td class="text-xs-center">{{ props.item.status }}</td>
              </template>
            </v-data-table>
          </v-card-text>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'UnicefUsersList',
    data() {
      return {
        headers: [
            {
                text: 'id',
                align: 'center',
                value: 'id',
            },
            { text: 'email', value: 'email' },
            { text: 'First Name', value: 'name' },
            { text: 'Last Name', value: 'last' },
            { text: 'Role', value: 'role' },
            { text: 'Status', value: 'status' },
        ],
        users: [
            {
                id: 14,
                email: 'ziharevmihail@gmail.com',
                name: 'Mihail',
                last: 'Zhikharev',
                role: 'Associate',
                status: 'Active',
            },
            {
                id: 15,
                email: 'abdur@gmail.com',
                name: 'Durman',
                last: 'Vasilev',
                role: 'Responsible officer',
                status: 'Active',
            },
            {
                id: 110,
                email: 'abdur@gmail.com',
                name: 'Durman',
                last: 'Vasilev',
                role: 'Budget owner',
                status: 'Active',
            },
            {
                id: 112,
                email: 'ziharevmihail@gmail.com',
                name: 'Mihail',
                last: 'Zhikharev',
                role: 'Associate',
                status: 'Active',
            },
            {
                id: 120,
                email: 'abdur@gmail.com',
                name: 'Durman',
                last: 'Vasilev',
                role: 'Responsible officer',
                status: 'Active',
            },
            {
                id: 121,
                email: 'abdur@gmail.com',
                name: 'Durman',
                last: 'Vasilev',
                role: 'Budget owner',
                status: 'Active',
            },
            {
                id: 17,
                email: 'ziharevmihail@gmail.com',
                name: 'Mihail',
                last: 'Zhikharev',
                role: 'Associate',
                status: 'Active',
            },
            {
                id: 16,
                email: 'abdur@gmail.com',
                name: 'Durman',
                last: 'Vasilev',
                role: 'Responsible officer',
                status: 'Active',
            },
        ],
      };
    },
  };
</script>

<style lang="scss" scoped>
.search {
  max-width: 250px;
}
</style>