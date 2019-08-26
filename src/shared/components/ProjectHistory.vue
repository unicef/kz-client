<template>
  <v-layout wrap mt-4 mb-4>
    <v-flex xs12 mb-2 :class="{ 'pr-4': $vuetify.breakpoint.smAndUp }">
      <h3 class="title mb-3">{{ $t('history.title') }}</h3>
      <v-data-table
        class="table-custom projectsHistory small mt-4 mb-4"
        :items="projectHistory"
        :headers="headers"
        hide-actions
      >
        <template slot="headers" slot-scope="{ headers }">
          <tr>
            <th class="text-xs-left">{{ $t('projectsHistory.tableHeaders.date') }}</th>
            <th class="text-xs-left">{{ $t('projectsHistory.tableHeaders.name') }}</th>
            <th class="text-xs-left">{{ $t('projectsHistory.tableHeaders.description') }}</th>
          </tr>
        </template>
        <template slot="items" slot-scope="{ item }">
          <tr>
            <td class="text-xs-left">{{ item.date }}</td>
            <td class="text-xs-left">{{ item.user }}</td>
            <td class="text-xs-left">{{ item.action }}</td>
          </tr>
        </template>
        <template slot="no-data">
          <td colspan="8" class="no-data">
            <div
              class="text-xs-center"
              :class="{
                          'pl-mobile': $vuetify.breakpoint.xsOnly,
                        }"
            >{{ $t('projectsHistory.noData') }}</div>
          </td>
        </template>
      </v-data-table>
      <v-layout wrap justify-end v-if="projectHistory.length">
        <v-btn color="info mb-2 mt-2" depressed :loading="disabledBtn" @click="downloadProjectHistoryDocument()">
          <v-icon class="pr-2">insert_drive_file</v-icon>
          {{ $t('projectHistory.downloadHistory') }}
        </v-btn>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  import { saveAs } from 'file-saver';
  import { base64StringToBlob } from 'blob-util';

  export default {
    name: 'ProjectHistory',
    data() {
      return {
        disabledBtn: false,
        headers: [
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
          await this.$store.dispatch('projects/getProjectHistory', this.$route.params.id);
        }
      },
    },
    computed: {
      projectHistory() {
        return this.$store.getters['projects/getProjectHistory'];
      },
    },
    async created() {
      if(this.$route.params.id) {
        await this.$store.dispatch('projects/getProjectHistory', this.$route.params.id);
      }
    },
    methods: {
      async downloadProjectHistoryDocument() {
        this.disabledBtn = true;
        const data = await this.$store.dispatch('projects/getProjectHistoryDocument', this.$route.params.id);
        if (data.success) {
          const blob = base64StringToBlob(data.data.doc, data.data.contentType);
          saveAs(blob, data.data.filename);
        }
        this.disabledBtn = false;
      },
    },
  };
</script>

<style lang="scss" scoped>
</style>