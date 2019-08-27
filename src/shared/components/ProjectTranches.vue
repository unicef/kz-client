<template>
  <v-layout wrap mt-4 mb-4>
    <v-flex xs12 mb-2 :class="{ 'pr-4': $vuetify.breakpoint.smAndUp }">
      <h3 class="title mb-3">{{ $t('tranches.title') }}</h3>
      <v-data-table
        class="table-custom projectTranches small mt-4 mb-4"
        :items="projectTranches"
        :headers="headers"
        hide-actions
      >
        <template slot="headers" slot-scope="{ headers }">
          <tr>
            <th class="text-xs-left">{{ $t('projectTranches.tableHeaders.dateFrom') }}</th>
            <th class="text-xs-left">{{ $t('projectTranches.tableHeaders.dateTo') }}</th>
            <th class="text-xs-left">{{ $t('projectTranches.tableHeaders.trancheNumber') }}</th>
            <th class="text-xs-left">{{ $t('projectTranches.tableHeaders.amountKZT') }}</th>
          </tr>
        </template>
        <template slot="items" slot-scope="{ item }">
          <tr>
            <td class="text-xs-left">{{ item.from }}</td>
            <td class="text-xs-left">{{ item.to }}</td>
            <td class="text-xs-left">{{ item.num }}</td>
            <td class="text-xs-left">{{ item.amount }}</td>
          </tr>
        </template>
        <template slot="no-data">
          <td colspan="8" class="no-data">
            <div
              class="text-xs-center"
              :class="{
                          'pl-mobile': $vuetify.breakpoint.xsOnly,
                        }"
            >{{ $t('projectTranches.noData') }}</div>
          </td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'ProjectTranches',
    data() {
      return {
        headers: [
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
        if(this.$route.params.id) {
          await this.$store.dispatch('projects/getProjectTranches', this.$route.params.id);
        }
      },
    },
    computed: {
      projectTranches() {
        return this.$store.getters['projects/getProjectTranches'];
      },
    },
    async created() {
      if(this.$route.params.id) {
        await this.$store.dispatch('projects/getProjectTranches', this.$route.params.id);
      }
    },
  };
</script>

<style lang="scss" scoped>
</style>