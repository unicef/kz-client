<template>
  <v-layout wrap mb-4>
    <v-flex xs12>
      <!-- Periods -->
      <h3>{{ $t('common.fields.forPeriod') }}:</h3>
      <v-layout wrap>
        <v-menu
          ref="menuDateFrom"
          :close-on-content-click="false"
          v-model="menuDateFrom"
          :return-value.sync="credentials.dateFrom"
          lazy
          width="260"
          class="pr-4"
          transition="scale-transition"
        >
          <v-text-field
            slot="activator"
            v-model="credentials.dateFrom"
            :label="$t('common.fields.dateFrom') + '*'"
            append-icon="event"
            :rules="rules.fieldRequired"
            readonly
          ></v-text-field>
          <v-date-picker
            v-model="credentials.dateFrom"
            color="primary lighten-1"
            :min="new Date().toISOString().substr(0, 10)"
            :max="projectInfo.deadline"
            :allowed-dates="allowedDatesFrom"
            :locale="$i18n.locale"
            :disabled="!(isMyStage && (faceRequestStatus === 'reject' || faceRequestStatus === 'waiting'))"
            width="260"
            @input="$refs.menuDateFrom.save(credentials.dateFrom)"
          ></v-date-picker>
        </v-menu>
        <v-menu
          ref="menuDateTo"
          :close-on-content-click="false"
          v-model="menuDateTo"
          :return-value.sync="credentials.dateTo"
          lazy
          width="260"
          class="pr-4"
          transition="scale-transition"
        >
          <v-text-field
            slot="activator"
            v-model="credentials.dateTo"
            :label="$t('common.fields.dateTo') + '*'"
            append-icon="event"
            :rules="rules.fieldRequired"
            readonly
          ></v-text-field>
          <v-date-picker
            v-model="credentials.dateTo"
            color="primary lighten-1"
            :min="new Date().toISOString().substr(0, 10)"
            :max="projectInfo.deadline"
            :allowed-dates="allowedDatesTo"
            :locale="$i18n.locale"
            :disabled="!(isMyStage && (faceRequestStatus === 'reject' || faceRequestStatus === 'waiting'))"
            width="260"
            @input="$refs.menuDateTo.save(credentials.dateTo)"
          ></v-date-picker>
        </v-menu>
      </v-layout>
      <!-- Type of request -->
      <h3 class="mb-2">{{ $t('common.fields.typeOfRequest') }}:</h3>
      <v-layout wrap>
        <v-radio-group
          class="mt-0"
          :rules="rules.radioRequired"
          required
          disabled
          v-model="credentials.type"
        >
          <v-layout wrap>
            <v-flex mt-2 mb-2 v-for="type in requestTypes" :key="type.id">
              <v-radio :label="type.title" :value="type.id" color="primary"></v-radio>
            </v-flex>
          </v-layout>
        </v-radio-group>
      </v-layout>
      <v-layout row></v-layout>
    </v-flex>
    <v-flex xs12>
      <!-- Activities -->
      <v-layout justify-end wrap>
        <!-- Activities header (hidden at mobile) -->
        <v-flex v-if="$vuetify.breakpoint.smAndUp">
          <v-layout wrap>
            <!-- Description header -->
            <v-flex d-flex xs12 sm4 md4 :class="{ 'pr-2': $vuetify.breakpoint.smAndUp }">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <span v-on="on">{{ $t('common.fields.activityDescription') }}</span>
                </template>
                <span>{{ $t('common.fields.activityDescription') }}</span>
              </v-tooltip>
            </v-flex>
            <!-- Coding header -->
            <v-flex
              d-flex
              xs12
              sm2
              md1
              :class="{ 'pl-2': $vuetify.breakpoint.smAndUp, 'pr-2': $vuetify.breakpoint.smAndUp }"
            >
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <span v-on="on">{{ $t('common.fields.codingShort') }}</span>
                </template>
                <span>{{ $t('common.fields.coding') }}</span>
              </v-tooltip>
            </v-flex>
            <!-- Amount E header -->
            <v-flex
              d-flex
              xs12
              sm2
              md3
              :class="{ 'pl-2': $vuetify.breakpoint.smAndUp, 'pr-2': $vuetify.breakpoint.smAndUp }"
            >
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <span v-on="on">{{ $t('common.fields.newAmount') }}</span>
                </template>
                <span>{{ $t('common.fields.newAmount') }}</span>
              </v-tooltip>
            </v-flex>
            <!-- Amount F header -->
            <v-flex
              d-flex
              xs12
              sm2
              :class="{ 'pl-2': $vuetify.breakpoint.smAndUp, 'pr-2': $vuetify.breakpoint.smAndUp }"
            >
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <span
                    v-on="on"
                  >{{ ($vuetify.breakpoint.mdAndUp) ? $t('common.fields.authorisedAmount') : $t('common.fields.authorisedAmountShort') }}</span>
                </template>
                <span>{{ $t('common.fields.authorisedAmount') }}</span>
              </v-tooltip>
            </v-flex>
            <!-- Amount G header -->
            <v-flex d-flex xs12 sm2 :class="{ 'pl-2': $vuetify.breakpoint.smAndUp }">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <span
                    v-on="on"
                  >{{ ($vuetify.breakpoint.mdAndUp) ? $t('common.fields.outstandingAmount') : $t('common.fields.outstandingAmountShort') }}</span>
                </template>
                <span>{{ $t('common.fields.outstandingAmount') }}</span>
              </v-tooltip>
            </v-flex>
          </v-layout>
        </v-flex>
        <!-- Activities rows -->
        <v-flex
          xs12
          :class="{ 'mb-4 mt-4': $vuetify.breakpoint.xsOnly }"
          v-for="(row, index) in activities.length"
          :key="index"
        >
          <v-layout wrap>
            <!-- Description -->
            <v-flex d-flex xs12 sm4 md4 :class="{ 'pr-2': $vuetify.breakpoint.smAndUp }">
              <v-layout column class="mb-2" :class="{ 'pr-2': $vuetify.breakpoint.smAndUp }">
                <v-layout
                  v-if="$vuetify.breakpoint.xsOnly"
                  class="caption"
                  :class="{ 'grey--text': !(isMyStage && (faceRequestStatus === 'reject' || faceRequestStatus === 'waiting')) }"
                >{{ $t('common.fields.activityDescription') }}</v-layout>
                <v-layout>
                  <v-text-field
                    class="pt-0"
                    :placeholder="$t('common.fields.typeActivity')"
                    v-model="activities[index].title"
                    :ref="'activityDescription' + index"
                    type="text"
                    :disabled="!(isMyStage && (faceRequestStatus === 'reject' || faceRequestStatus === 'waiting'))"
                    :rules="(activities[index].id || activities[index].amountE || (index===0 && !activitiesToSubmit.length)) ? rules.activityDescriptionRequired : []"
                  />
                </v-layout>
              </v-layout>
            </v-flex>
            <!-- Coding -->
            <v-flex
              d-flex
              xs12
              sm2
              md1
              :class="{ 'pl-2': $vuetify.breakpoint.smAndUp, 'pr-2': $vuetify.breakpoint.smAndUp }"
            >
              <v-layout
                class="mb-2"
                :class="{ 'pl-2': $vuetify.breakpoint.smAndUp, 'pr-2': $vuetify.breakpoint.smAndUp }"
                column
              >
                <v-layout
                  v-if="$vuetify.breakpoint.xsOnly"
                  class="caption grey--text"
                >{{ $t('common.fields.coding') }}</v-layout>
                <v-layout>
                  <v-text-field class="pt-0" placeholder=" " disabled type="text" />
                </v-layout>
              </v-layout>
            </v-flex>
            <!-- Amount E -->
            <v-flex
              d-flex
              xs12
              sm2
              md3
              :class="{ 'pl-2': $vuetify.breakpoint.smAndUp, 'pr-2': $vuetify.breakpoint.smAndUp }"
            >
              <v-layout
                class="mb-2"
                :class="{ 'pl-2': $vuetify.breakpoint.smAndUp, 'pr-2': $vuetify.breakpoint.smAndUp }"
                column
              >
                <v-layout
                  v-if="$vuetify.breakpoint.xsOnly"
                  class="caption"
                  :class="{ 'grey--text': !(isMyStage && (faceRequestStatus === 'reject' || faceRequestStatus === 'waiting')) }"
                >{{ $t('common.fields.newAmount') }}</v-layout>
                <v-layout>
                  <v-text-field
                    class="pt-0"
                    v-model="activities[index].amountE"
                    :placeholder="$t('common.fields.typeAmount')"
                    :ref="'activityAmountE' + index"
                    type="text"
                    @input="changeAmountE(index)"
                    :rules="(activities[index].id || activities[index].title || (index===0 && !activitiesToSubmit.length)) ? rules.numberRequired : rules.onlyDigitsOrEmpty"
                    :disabled="!(isMyStage && (faceRequestStatus === 'reject' || faceRequestStatus === 'waiting'))"
                  />
                  <v-btn
                    class="my-0 approve-btn"
                    flat
                    icon
                    v-show="!($vuetify.breakpoint.smOnly || $vuetify.breakpoint.mdOnly)"
                    v-if="isMyStage && !isResponsibleAssistant  && !activities[index].isRejected && !activities[index].isApproved"
                    @click="approveActivity(index)"
                  >
                    <v-icon color="success">check</v-icon>
                  </v-btn>
                  <v-btn
                    class="my-0 reject-btn"
                    flat
                    icon
                    v-show="!($vuetify.breakpoint.smOnly || $vuetify.breakpoint.mdOnly)"
                    v-if="isMyStage && !isResponsibleAssistant && !activities[index].isRejected && !activities[index].isApproved"
                    @click="rejectActivity(index)"
                  >
                    <svgicon class="svg-icon" width="10" height="10" color="red" name="close" />
                  </v-btn>

                  <v-icon
                    v-show="activities[index].isApproved"
                    color="success"
                    :ref="'activityAmountEApproveIcon' + index"
                  >done_outline</v-icon>
                  <v-icon
                    v-show="activities[index].isRejected"
                    color="error"
                    :ref="'activityAmountERejectIcon' + index"
                  >clear</v-icon>
                </v-layout>
                <v-layout justify-end v-show="$vuetify.breakpoint.smOnly || $vuetify.breakpoint.mdOnly">
                  <v-btn
                    class="my-0 approve-btn mb-4"
                    flat
                    icon
                    v-if="isMyStage && !isResponsibleAssistant  && !activities[index].isRejected && !activities[index].isApproved"
                    @click="approveActivity(index)"
                  >
                    <v-icon color="success">check</v-icon>
                  </v-btn>
                  <v-btn
                    class="my-0 reject-btn mb-4"
                    flat
                    icon
                    v-if="isMyStage && !isResponsibleAssistant && !activities[index].isRejected && !activities[index].isApproved"
                    @click="rejectActivity(index)"
                  >
                    <svgicon class="svg-icon" width="10" height="10" color="red" name="close" />
                  </v-btn>
                </v-layout>
                <v-layout>
                  <p
                    class="red--text approval-error mb-4"
                    v-if="(activities[index] && activities[index].approvalError)"
                  >{{ $t('common.fields.approvalError') }}</p>
                </v-layout>

                <v-layout
                  v-if="(isMyStage && activities[index].isRejected) || (!isMyStage && faceRequestStatus === 'reject' && activities[index].isRejected)"
                >
                  <v-text-field
                    :label="$t('common.fields.rejectReason')"
                    v-model="activities[index].rejectReason"
                    :placeholder="$t('common.fields.rejectReason')"
                    :disabled="!isMyStage || (isMyStage && activities[index].isRejected)"
                    :ref="'rejectReason' + index"
                    :rules="rules.fieldRequired"
                    type="text"
                  />
                </v-layout>
              </v-layout>
            </v-flex>
            <!-- Amount F -->
            <v-flex
              d-flex
              xs12
              sm2
              :class="{ 'pl-2': $vuetify.breakpoint.smAndUp, 'pr-2': $vuetify.breakpoint.smAndUp }"
            >
              <v-layout
                class="mb-2"
                :class="{ 'pl-2': $vuetify.breakpoint.smAndUp, 'pr-2': $vuetify.breakpoint.smAndUp }"
                column
              >
                <v-layout
                  v-if="$vuetify.breakpoint.xsOnly"
                  class="caption grey--text"
                >{{ $t('common.fields.authorisedAmount') }}</v-layout>
                <v-layout>
                  <v-text-field
                    v-model="activities[index].amountF"
                    :ref="'activityAmountF' + index"
                    placeholder=" "
                    disabled
                    class="pt-0"
                    type="text"
                  />
                </v-layout>
              </v-layout>
            </v-flex>
            <!-- Amount G -->
            <v-flex d-flex xs12 sm2 :class="{ 'pl-2': $vuetify.breakpoint.smAndUp }">
              <v-layout class="mb-2" :class="{ 'pl-2': $vuetify.breakpoint.smAndUp }" column>
                <v-layout
                  v-if="$vuetify.breakpoint.xsOnly"
                  class="caption grey--text"
                >{{ $t('common.fields.outstandingAmount') }}</v-layout>
                <v-layout>
                  <v-text-field
                    v-model="activities[index].amountG"
                    :ref="'activityAmountG' + index"
                    placeholder=" "
                    class="pt-0"
                    disabled
                    type="text"
                  />
                </v-layout>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
        <!-- Total row -->
        <v-flex xs12>
          <v-layout wrap>
            <!-- Add activity btn -->
            <v-flex mb-4 d-flex xs12 sm4 md4 :class="{ 'pr-2': $vuetify.breakpoint.smAndUp }">
              <v-btn
                color="info"
                v-if="(isMyStage && (faceRequestStatus === 'reject' || faceRequestStatus === 'waiting'))"
                @click="addActivity"
              >{{ $t('common.btns.addActivity') }}</v-btn>
            </v-flex>
            <!-- Total -->
            <v-flex
              d-flex
              xs12
              sm2
              md1
              class="font-weight-bold"
              :class="{ 'pl-2': $vuetify.breakpoint.smAndUp, 'pr-2': $vuetify.breakpoint.smAndUp }"
            >
              <v-layout
                class="mb-4"
                :class="{ 'pl-2': $vuetify.breakpoint.smAndUp, 'pr-2': $vuetify.breakpoint.smAndUp }"
                column
              >
                <v-layout>{{ $t('common.fields.total') }}:</v-layout>
              </v-layout>
            </v-flex>
            <!-- Total E -->
            <v-flex
              d-flex
              xs12
              sm2
              md3
              :class="{ 'pl-2': $vuetify.breakpoint.smAndUp, 'pr-2': $vuetify.breakpoint.smAndUp }"
            >
              <v-layout
                class="mb-2"
                :class="{ 'pl-2': $vuetify.breakpoint.smAndUp, 'pr-2': $vuetify.breakpoint.smAndUp }"
                column
              >
                <v-layout
                  v-if="$vuetify.breakpoint.xsOnly"
                  class="caption grey--text"
                >{{ $t('common.fields.newAmount') }}</v-layout>
                <v-layout>
                  <v-text-field v-model="total.totalE" type="text" disabled class="pt-0" />
                </v-layout>
              </v-layout>
            </v-flex>
            <!-- Total F -->
            <v-flex
              d-flex
              xs12
              sm2
              :class="{ 'pl-2': $vuetify.breakpoint.smAndUp, 'pr-2': $vuetify.breakpoint.smAndUp }"
            >
              <v-layout
                class="mb-2"
                :class="{ 'pl-2': $vuetify.breakpoint.smAndUp, 'pr-2': $vuetify.breakpoint.smAndUp }"
                column
              >
                <v-layout
                  v-if="$vuetify.breakpoint.xsOnly"
                  class="caption grey--text"
                >{{ $t('common.fields.authorisedAmount') }}</v-layout>
                <v-layout>
                  <v-text-field v-model="total.totalF" disabled type="text" class="pt-0" />
                </v-layout>
              </v-layout>
            </v-flex>
            <!-- Total G -->
            <v-flex d-flex xs12 sm2 :class="{ 'pl-2': $vuetify.breakpoint.smAndUp }">
              <v-layout
                class="mb-2"
                :class="{ 'pl-2': $vuetify.breakpoint.smAndUp }"
                column
              >
                <v-layout
                  v-if="$vuetify.breakpoint.xsOnly"
                  class="caption grey--text"
                >{{ $t('common.fields.outstandingAmount') }}</v-layout>
                <v-layout>
                  <v-text-field
                    v-model="total.totalG"
                    disabled
                    type="text"
                    class="pt-0"
                  />
                </v-layout>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>
    <!-- Certification block (for assistant) -->
    <v-flex xs12 class="mt-4">
      <h3>
        <span class="red--text mr-2">{{ $t('common.fields.certification') }}!</span>
        <span class>{{ $t('common.fields.certificationText') }}:</span>
      </h3>

      <v-checkbox
        class="pb-2 mt-2"
        color="info"
        v-model="credentials.isCertify"
        :rules="rules.radioRequired"
        :disabled="!(isMyStage && (faceRequestStatus ==='waiting' || faceRequestStatus ==='reject'))"
        :label="$t('common.fields.certificationCheckboxText')"
        required
      ></v-checkbox>
    </v-flex>
    <v-flex xs12 v-if="faceRequestData.isValid">
      <!-- Validation block (by authorised person) -->
      <h3>{{ $t('common.fields.validationText') }}</h3>
      <div class="mt-2">
        <v-icon color="success">done_outline</v-icon>
        <span class="subheading green--text ml-2">{{ $t('common.fields.approvedCheckboxText') }}</span>
      </div>
    </v-flex>
    <v-flex xs12 class="mt-4" v-if="faceRequestData.isAuthorised">
      <!-- Authorization block (by UNICEF) -->
      <h3>{{ $t('common.fields.authorizationText') }}</h3>
      <div class="mt-2">
        <v-icon color="success">done_outline</v-icon>
        <span class="subheading green--text ml-2">{{ $t('common.fields.approvedCheckboxText') }}</span>
      </div>
      <v-layout justify-end class="mt-4" v-if="faceRequestData.successedAt">
        {{ $t('common.fields.date') }}: {{ faceRequestData.successedAt }}
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'FaceRequestDetails',
    components: {
    },
    props: {
      faceRequestData: {
        type: Object,
      },
      faceRequestActivities: {
        type: Object,
      },
    },
    data() {
      return {
        credentials: {
          id: null,
          createdAt: '',
          approvedAt: '',
          statusId: '',
          dateFrom: '',
          dateTo: '',
          type: 1,
          successedAt: '',
          isCertify: false,
          isValid: false,
          isAuthorised: false,
          num: null,
          projectId: this.$route.params.id,
        },
        total: {},
        activities: [],
        menuDateFrom: false,
        menuDateTo: false,
        rules: {
          fieldRequired: [
            /* eslint-disable no-new */
            v => (v && !!v.trim()) || this.$t('common.fields.validation.field.required'),
          ],
          radioRequired: [
            /* eslint-disable no-new */
            v => (!!v) || this.$root.$t('common.fields.validation.field.required'),
          ],
          numberRequired: [
            /* eslint-disable no-new */
            v => (v && !!v.trim()) || this.$t('common.fields.validation.field.required'),
            v => /^\d*\.?\d{1,2}$/.test(v) || this.$t('common.fields.validation.field.onlyDigits'),
          ],
          onlyDigitsOrEmpty: [
            /* eslint-disable no-new */
            v => /^(\d*\.?\d{1,2})?$/.test(v) || this.$t('common.fields.validation.field.onlyDigits'),
          ],
          activityDescriptionRequired: [
            v => (v && !!v.trim()) || this.$t('common.fields.validation.field.required'),
            v => v.length < 101 || `${this.$t('common.fields.validation.maxLetters')} - 100`,
          ],
        },
      };
    },
    computed: {
      projectInfo() {
        return this.$store.getters['projects/getProjectInfo'];
      },
      faceRequestStatus() {
        return (this.$store.getters['projects/getProjectInfo'].stage) ? this.$store.getters['projects/getProjectInfo'].stage.status : '';
      },
      requestTypes() {
        return this.$store.getters['projects/getFaceRequestProperties'].type;
      },
      isFaceRequestCreationPath() {
        return this.$route.path.indexOf('create-face-request') !== -1;
      },
      isFaceRequestPath() {
        return this.$route.path.indexOf('/face-request/') !== -1;
      },
      isMyStage() {
        return this.$store.getters['projects/getMyRequestStageState'];
      },
      roles() {
        return this.$store.getters['global/getRoles'];
      },
      isResponsibleAssistant() {
        return this.roles.indexOf('ra') !== -1;
      },
      activitiesToSubmit() {
        /* eslint-disable */
        const activities = this.activities.filter((item) => {
            return item.title && item.amountE;
          }).map((item) => {
            return {
              id: item.id,
              title: item.title,
              amountE: item.amountE,
              amountF: item.amountF,
              amountG: item.amountG,
              isRejected: item.isRejected,
              rejectReason: item.rejectReason,
            };
          });
        /* eslint-disable */
        return activities;
      },
    },
    watch: {
      faceRequestData() {
        const that = this;
        Object.keys(this.faceRequestData).forEach((key) => {
          that.credentials[key] = that.faceRequestData[key];
        });
      },
      faceRequestActivities() {
        const that = this;
        Object.keys(this.faceRequestActivities.total).forEach((key) => {
          that.total[key] = that.faceRequestActivities.total[key];
        });
        this.faceRequestActivities.activities.forEach((item, index) => {
          const activityObj = {
            id: null,
            title: '',
            amountE: '',
            amountF: '',
            amountG: '',
            isRejected: false,
            rejectReason: '',
            isApproved: false,
            approvalError: '',
          };
          Object.keys(item).forEach((key) => {
            activityObj[key] = that.faceRequestActivities.activities[index][key];
          });
          this.activities.push(activityObj);
        });
      },
    },
    created() {
      const that = this;
      Object.keys(this.faceRequestData).forEach((key) => {
        that.credentials[key] = that.faceRequestData[key];
      });
      Object.keys(this.faceRequestActivities.total).forEach((key) => {
        that.total[key] = that.faceRequestActivities.total[key];
      });
      this.faceRequestActivities.activities.forEach((item, index) => {
        const activityObj = {
          id: null,
          title: '',
          amountE: '',
          amountF: '',
          amountG: '',
          isRejected: false,
          rejectReason: '',
          isApproved: false,
          approvalError: '',
        };
        Object.keys(item).forEach((key) => {
          activityObj[key] = that.faceRequestActivities.activities[index][key];
        });
        this.activities.push(activityObj);
      });
      if (!this.faceRequestActivities.activities.length && this.isFaceRequestCreationPath) {
          // add 5 rows for activities if create face request
          for (let i = 0; i < 5; i++) {
            const activityObj = {
              id: null,
              title: '',
              amountE: '',
              amountF: '',
              amountG: '',
              isRejected: false,
              rejectReason: '',
              isApproved: false,
              approvalError: '',
            };
            that.activities.push(activityObj);
          }
      }
    },
    methods: {
      getFaceRequestDetails() {
        if (this.checkApproval()) {
          const dataToSubmit = {};
          Object.keys(this.credentials).forEach((key) => {
            dataToSubmit[key] = this.credentials[key];
          });
          dataToSubmit.activities = this.activitiesToSubmit;
          dataToSubmit.total = this.total;
          this.$emit('getFaceRequestDetails', dataToSubmit);
          return true;
        }
        return false;
      },
      allowedDatesFrom(date) {
        if (this.credentials.dateTo) {
          return new Date(date).getTime() < new Date(this.credentials.dateTo).getTime();
        }
        return true;
      },
      allowedDatesTo(date) {
        if (this.credentials.dateFrom) {
          return new Date(date).getTime() > new Date(this.credentials.dateFrom).getTime();
        }
        return true;
      },
      approveActivity(index) {
        this.activities[index].isApproved = !this.activities[index].isApproved;
        this.activities[index].approvalError = '';
      },
      rejectActivity(index) {
        this.activities[index].isRejected = !this.activities[index].isRejected;
        this.activities[index].approvalError = '';
      },
      addActivity() {
        const activityObj = {
          id: null,
          title: '',
          amountE: '',
          amountF: '',
          amountG: '',
          isRejected: false,
          rejectReason: '',
          isApproved: false,
        };
        this.activities.push(activityObj);
      },
      changeAmountE() {
        this.total.totalE = this.getTotalAmountE();
      },
      getTotalAmountE() {
        /* eslint-disable */
        const validAmountFieldsArr = this.activities.filter((activity) => {
                return (/^\d*\.?\d{1,2}$/.test(activity.amountE)) && activity.amountE;
              });
        const totalAmountE = validAmountFieldsArr.reduce(function (acc, val) {
              return acc + (+val.amountE);
            }, 0);
        return totalAmountE;
        /* eslint-disable */
      },
      checkApproval() {
        let isDataValid = true;
        if (this.faceRequestStatus === 'confirm' ||
            this.faceRequestStatus === 'validate' ||
            this.faceRequestStatus === 'certify' ||
            this.faceRequestStatus === 'approve' ||
            this.faceRequestStatus === 'verify') {
            this.activities.forEach((item) => {
              if (!item.isApproved && !item.isRejected) {
                isDataValid = false;
                item.approvalError = this.$t('common.fields.approvalError');
              }
            });
        }
        return isDataValid;
      },
    },
  };
</script>

<style lang="scss" scoped>
.approve-btn,
.reject-btn {
  width: 36px;
  min-width: 36px;
}
.approval-error {
  font-size: 12px;
}
</style>