<template>
  <v-layout wrap mb-4>
    <v-flex xs12>
      <v-layout justify-end wrap>
        <v-flex mb-4 xs12 v-for="(row, index) in tranches" :key="index">
          <v-layout wrap>
            <v-flex xs12>
              {{ $t('common.fields.tranche') }} # {{index+1}}
              <v-btn class="my-0" flat icon @click="removeRow(index)" v-if="(index !== 0) && (index === tranches.length - 1)">
                <svgicon class="svg-icon" width="10" height="10" color="red" name="close" />
              </v-btn>
            </v-flex>
            <v-flex xs12 sm4 :class="{ 'pr-3': $vuetify.breakpoint.smAndUp }">
              <!-- From -->
              <v-layout row>
                <v-menu
                  :ref="'tranchMenuFrom' + index"
                  :close-on-content-click="false"
                  v-model="tranches[index].menuFrom"
                  :return-value.sync="tranches[index].dateFrom"
                  lazy
                  width="260"
                  transition="scale-transition"
                >
                  <v-text-field
                    slot="activator"
                    v-model="tranches[index].dateFrom"
                    :label="$t('common.fields.from') + '*'"
                    append-icon="event"
                    :rules="rules.fieldRequired"
                    readonly
                    required
                  ></v-text-field>
                  <v-date-picker
                    v-model="tranches[index].dateFrom"
                    color="primary lighten-1"
                    :locale="$i18n.locale"
                    :min="new Date().toISOString().substr(0, 10)"
                    :max="new Date(projectData.deadline).toISOString().substr(0, 10)"
                    :disabled="index !== tranches.length - 1"
                    :allowed-dates="allowedDatesFrom"
                    width="260"
                    @input="pickDateFrom(index)"
                  ></v-date-picker>
                </v-menu>
              </v-layout>
            </v-flex>
            <v-flex
              xs12
              sm4
              :class="{ 'pl-3': $vuetify.breakpoint.smAndUp, 'pr-3': $vuetify.breakpoint.smAndUp }"
            >
              <!-- To -->
              <v-layout row>
                <v-menu
                  :ref="'tranchMenuTo' + index"
                  :close-on-content-click="false"
                  v-model="tranches[index].menuTo"
                  :return-value.sync="tranches[index].dateTo"
                  lazy
                  width="260"
                  transition="scale-transition"
                >
                  <v-text-field
                    slot="activator"
                    v-model="tranches[index].dateTo"
                    :label="$t('common.fields.to') + '*'"
                    append-icon="event"
                    :rules="rules.fieldRequired"
                    readonly
                    required
                  ></v-text-field>
                  <v-date-picker
                    v-model="tranches[index].dateTo"
                    color="primary lighten-1"
                    :locale="$i18n.locale"
                    width="260"
                    :min="new Date().toISOString().substr(0, 10)"
                    :max="new Date(projectData.deadline).toISOString().substr(0, 10)"
                    :disabled="index !== tranches.length - 1"
                    :allowed-dates="allowedDatesTo"
                    @input="pickDateTo(index)"
                  ></v-date-picker>
                </v-menu>
              </v-layout>
            </v-flex>
            <v-flex xs12 sm4 :class="{ 'pl-3': $vuetify.breakpoint.smAndUp }">
              <!-- Amount -->
              <v-text-field
                :label="$t('common.fields.amountKZT')"
                v-model="tranches[index].amount"
                :ref="'tranchAmount' + index"
                type="text"
                :rules="rules.numberRequired"
              />
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex error--text mb-4 xs12 v-if="totalAmountError">{{ totalAmountError }}</v-flex>
        <v-btn color="info " :disabled="!canAddRow" @click="addRow">{{ $t('common.btns.addTranch') }}</v-btn>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'IpTranches',
    data() {
      return {
        tranches: [
          {
            dateFrom: '',
            dateTo: '',
            menuFrom: false,
            menuTo: false,
            amount: '',
          },
        ],
        rules: {
          fieldRequired: [
            /* eslint-disable no-new */
            v => !!v.trim() || this.$t('common.fields.validation.field.required'),
          ],
          selectFieldRequired: [
            /* eslint-disable no-new */
            v => !!v || this.$t('common.fields.validation.field.required'),
          ],
          numberRequired: [
            /* eslint-disable no-new */
            v => !!v || this.$t('common.fields.validation.field.required'),
            v => /^\d*\.?\d{1,2}$/.test(v) || this.$t('common.fields.validation.field.onlyDigits'),
          ],
        },
      };
    },
    computed: {
      canAddRow() {
        return this.tranches[this.tranches.length - 1].dateFrom &&
               this.tranches[this.tranches.length - 1].dateTo &&
               this.tranches[this.tranches.length - 1].amount;
      },
      projectData() {
        return this.$store.getters['projects/getProjectData'];
      },
      totalAmountError() {
        const notValidAmountFieldsArr = this.tranches.filter(amount => {
                return (!/^\d*\.?\d{1,2}$/.test(amount.amount)) && amount.amount;
              });
        const validAmountFieldsArr = this.tranches.filter(amount => {
                return (/^\d*\.?\d{1,2}$/.test(amount.amount)) && amount.amount;
              });
        // show no total amount error if any of tranches's amount fields is not valid
        if (notValidAmountFieldsArr.lenght) {
          return '';
        }

        // show total amount error if all tranche amount fields are valid && summ of all > this.projectData.ice
        const allTranchesAmount = validAmountFieldsArr.reduce(function(acc, val) {
            return acc + (+val.amount);
            }, 0);
        if (!notValidAmountFieldsArr.lenght && allTranchesAmount > +this.projectData.ice) {
          return this.$t('common.fields.validation.totalAmountKZT');
        }

        return '';
      },
    },
    methods: {
      getIpTranches() {
        if (!this.totalAmountError) {
          /* eslint-disable */
          const allTranches = this.tranches.map((item) => {
            return {
              from: item.dateFrom,
              to: item.dateTo,
              amount: +item.amount,
            };
          });
          this.$emit('getIpTranches', allTranches);
          return true;
        }
        return false;
      },
      addRow() {
        const tranchObj = {
          dateFrom: '',
          dateTo: '',
          menuFrom: false,
          menuTo: false,
          amount: '',
        };
        this.tranches.push(tranchObj);
      },
      removeRow(rowIndex) {
        this.tranches.splice(rowIndex, 1);
      },
      pickDateFrom(index) {
        const menuFrom = `tranchMenuFrom${index}`;
        this.$refs[menuFrom][0].save(this.tranches[index].dateFrom);
      },
      pickDateTo(index) {
        const menuTo = `tranchMenuTo${index}`;
        this.$refs[menuTo][0].save(this.tranches[index].dateTo);
      },
      allowedDatesFrom(date) {
        const lastRowIndex = this.tranches.length - 1;
        const lastRowDateTo = this.tranches[lastRowIndex].dateTo;

        // if not first tranche && !dateTo
        if (lastRowIndex && !lastRowDateTo) {
          // date should be >= this.tranches[lastRowIndex-1].dateTo
          return new Date(date).getTime() > new Date(this.tranches[lastRowIndex - 1].dateTo).getTime();
        }

        // if not first tranche && dateTo
        if (lastRowIndex && lastRowDateTo) {
          // date should be <= dateTo && >= this.tranches[lastRowIndex-1].dateTo
          return new Date(date).getTime() <= new Date(lastRowDateTo).getTime() &&
                 new Date(date).getTime() > new Date(this.tranches[lastRowIndex - 1].dateTo).getTime();
        }

        // if first tranche && dateTo
        if (!lastRowIndex && lastRowDateTo) {
          // date should be <= dateTo
          return new Date(date).getTime() <= new Date(lastRowDateTo).getTime();
        }

        // if first tranche && !dateTo
        return true;
      },
      allowedDatesTo(date) {
        const lastRowIndex = this.tranches.length - 1;
        const lastRowDateFrom = this.tranches[lastRowIndex].dateFrom;

        // if not first tranche && !dateFrom
        if (lastRowIndex && !lastRowDateFrom) {
          // date should be >= this.tranches[lastRowIndex-1].dateTo
          return new Date(date).getTime() > new Date(this.tranches[lastRowIndex - 1].dateTo).getTime();
        }

        // if not first tranche && dateFrom
        if (lastRowIndex && lastRowDateFrom) {
          // date should be >= dateFrom
          return new Date(date).getTime() >= new Date(lastRowDateFrom).getTime();
        }

        // if first tranche && dateFrom
        if (!lastRowIndex && lastRowDateFrom) {
          // date should be >= dateFrom
          return new Date(date).getTime() >= new Date(lastRowDateFrom).getTime();
        }

        // if first tranche && !dateFrom
        return true;
      },
      clearTranches() {
        this.tranches = [
          {
            dateFrom: '',
            dateTo: '',
            menuFrom: false,
            menuTo: false,
            amount: '',
          },
        ];
      },
    },
  };
</script>

<style lang="scss" scoped>
</style>