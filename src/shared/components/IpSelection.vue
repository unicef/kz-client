<template>
  <v-layout wrap mb-4>
    <v-flex xs12>
      <!-- IP -->
      <v-layout row>
        <v-flex sm12>
          <v-select
            :items="partners"
            v-model="partner"
            :label="$t('common.fields.ip') + '*'"
            item-text="name"
            item-value="id"
            return-object
            :rules="rules.selectFieldRequired"
            required
            max-width="280"
          ></v-select>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'IpSelection',
    data() {
      return {
        partner: null,
        rules: {
          selectFieldRequired: [
            /* eslint-disable no-new */
            v => !!v || this.$t('common.fields.validation.field.required'),
          ],
        },
      };
    },
    computed: {
      partners() {
        return this.$store.getters['projects/getAvailablePartners'];
      },
    },
    methods: {
      getIp() {
        this.$emit('getIp', this.partner);
      },
    },
  };
</script>

<style lang="scss" scoped>
.search {
  max-width: 250px;
}
</style>