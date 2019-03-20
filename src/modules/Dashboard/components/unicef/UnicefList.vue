<template>
    <v-layout column class="container">
        <v-toolbar>
            <h3 class="ui_title">List of UNICEF employees</h3>
            <v-spacer></v-spacer>
            <v-text-field id="search" ref="search" color="primary" label="Search"></v-text-field>
            <v-btn color="primary">Search</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="secondary" :to="{ name: 'unicef-create' }">Create User</v-btn>

        </v-toolbar>
        <v-data-table
                :headers="headers"
                :items="users"
                class="elevation-2"

        >
            <template v-slot:items="props">
                <td>{{ props.item.id }}</td>
                <td class="text-xs-center"><router-link :to="'/user/'+props.item.id">{{ props.item.email }}</router-link></td>
                <td class="text-xs-center">{{ props.item.name }}</td>
                <td class="text-xs-center">{{ props.item.last }}</td>
                <td class="text-xs-center">{{ props.item.role }}</td>
                <td class="text-xs-center">{{ props.item.status }}</td>
            </template>
        </v-data-table>
    </v-layout>
</template>

<script>
    export default {
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
                        id: 1,
                        email: 'ziharevmihail@gmail.com',
                        name: 'Mihail',
                        last: 'Zhikharev',
                        role: 'Associate',
                        status: 'Active',
                    },
                    {
                        id: 2,
                        email: 'abdur@gmail.com',
                        name: 'Durman',
                        last: 'Vasilev',
                        role: 'Responsible officer',
                        status: 'Active',
                    },
                    {
                        id: 3,
                        email: 'abdur@gmail.com',
                        name: 'Durman',
                        last: 'Vasilev',
                        role: 'Budget owner',
                        status: 'Active',
                    },
                    {
                        id: 4,
                        email: 'ziharevmihail@gmail.com',
                        name: 'Mihail',
                        last: 'Zhikharev',
                        role: 'Associate',
                        status: 'Active',
                    },
                    {
                        id: 5,
                        email: 'abdur@gmail.com',
                        name: 'Durman',
                        last: 'Vasilev',
                        role: 'Responsible officer',
                        status: 'Active',
                    },
                    {
                        id: 6,
                        email: 'abdur@gmail.com',
                        name: 'Durman',
                        last: 'Vasilev',
                        role: 'Budget owner',
                        status: 'Active',
                    },
                    {
                        id: 7,
                        email: 'ziharevmihail@gmail.com',
                        name: 'Mihail',
                        last: 'Zhikharev',
                        role: 'Associate',
                        status: 'Active',
                    },
                    {
                        id: 8,
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
    .container {
        height: 100%;
    }
</style>