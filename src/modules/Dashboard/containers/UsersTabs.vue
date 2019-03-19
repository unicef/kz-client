<template>
    <v-tabs
            v-model="active"
            color="grey"
            dark
            slider-color="light-grey">

        <v-tab  v-for="(tab, key) in profileTabs"
                :key="key">
            {{ tab }}

        </v-tab>
        <v-tab-item>
            <v-card flat>
                <UnicefList></UnicefList>
            </v-card>
        </v-tab-item>
        <v-tab-item>
            <v-card flat>
                empty
            </v-card>
        </v-tab-item>
        <v-tab-item>
            <v-card flat>
                empty
            </v-card>
        </v-tab-item>
    </v-tabs>
</template>

<script>
    import UnicefList from '../components/unicef/UnicefList'

    export default {
        components: {
            UnicefList,
        },
    };
</script>