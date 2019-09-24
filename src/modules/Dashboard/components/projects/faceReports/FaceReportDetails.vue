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
            disabled
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
            disabled
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
      <v-layout justify-end wrap >
        <!-- Activities header (hidden at mobile) -->
        <v-flex v-if="$vuetify.breakpoint.smAndUp">
          <v-layout wrap>
            <!-- Description header -->
            <v-flex d-flex xs12 sm2 md2 :class="{ 'pr-2': $vuetify.breakpoint.smAndUp }">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <span v-on="on">{{ ($vuetify.breakpoint.mdAndUp) ? $t('common.fields.activityDescription') : $t('common.fields.activityDescriptionShort') }}</span>
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
            <!-- Amount A header -->
            <v-flex d-flex xs12 sm2 :class="{ 'pl-2': $vuetify.breakpoint.smAndUp, 'pr-2': $vuetify.breakpoint.smAndUp }">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <span
                    v-on="on"
                  >{{ ($vuetify.breakpoint.mdAndUp) ? $t('common.fields.reportAuthorisedAmount') : $t('common.fields.reportAuthorisedAmountShort') }}</span>
                </template>
                <span>{{ $t('common.fields.reportAuthorisedAmount') }}</span>
              </v-tooltip>
            </v-flex>
            <!-- Amount B header -->
            <v-flex
              d-flex
              xs12
              sm2
              :class="{ 'pl-2': $vuetify.breakpoint.smAndUp, 'pr-2': $vuetify.breakpoint.smAndUp, 'md3': !isUnicefStage }"
            >
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <span v-on="on">{{ ($vuetify.breakpoint.mdAndUp) ? $t('common.fields.reportExpenditureAmount') : $t('common.fields.reportExpenditureAmountShort') }}</span>
                </template>
                <span>{{ $t('common.fields.reportExpenditureAmount') }}</span>
              </v-tooltip>
            </v-flex>
            <!-- Amount C header -->
            <v-flex
              d-flex
              xs12
              sm2
              :class="{ 'pl-2': $vuetify.breakpoint.smAndUp, 'pr-2': $vuetify.breakpoint.smAndUp, 'md3': isUnicefStage }"
            >
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <span
                    v-on="on"
                  >{{ ($vuetify.breakpoint.mdAndUp) ? $t('common.fields.reportExpenditureAcceptedAmount') : $t('common.fields.reportExpenditureAcceptedAmountShort') }}</span>
                </template>
                <span>{{ $t('common.fields.reportExpenditureAcceptedAmount') }}</span>
              </v-tooltip>
            </v-flex>
            <!-- Amount D header -->
            <v-flex d-flex xs12 sm2 :class="{ 'pl-2': $vuetify.breakpoint.smAndUp }">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <span
                    v-on="on"
                  >{{ ($vuetify.breakpoint.mdAndUp) ? $t('common.fields.balanceAmount') : $t('common.fields.balanceAmountShort') }}</span>
                </template>
                <span>{{ $t('common.fields.balanceAmount') }}</span>
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
            <v-flex d-flex xs12 sm2 md2 :class="{ 'pr-2': $vuetify.breakpoint.smAndUp }">
              <v-layout column class="mb-2" :class="{ 'pr-2': $vuetify.breakpoint.smAndUp }">
                <v-layout
                  v-if="$vuetify.breakpoint.xsOnly"
                  class="caption grey--text"
                >{{ $t('common.fields.activityDescription') }}</v-layout>
                <v-layout>
                  <v-textarea
                    auto-grow
                    outlined
                    rows="1"
                    class="pt-0"
                    :placeholder="$t('common.fields.typeActivity')"
                    v-model="activities[index].title"
                    :ref="'activityDescription' + index"
                    type="text"
                    disabled
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
            <!-- Amount A -->
            <v-flex d-flex xs12 sm2 :class="{ 'pl-2': $vuetify.breakpoint.smAndUp, 'pr-2': $vuetify.breakpoint.smAndUp }">
              <v-layout class="mb-2" :class="{ 'pl-2': $vuetify.breakpoint.smAndUp, 'pr-2': $vuetify.breakpoint.smAndUp }" column>
                <v-layout
                  v-if="$vuetify.breakpoint.xsOnly"
                  class="caption grey--text"
                >{{ $t('common.fields.reportAuthorisedAmount') }}</v-layout>
                <v-layout>
                  <v-text-field
                    v-model="activities[index].amountA"
                    :ref="'activityAmountA' + index"
                    placeholder=" "
                    class="pt-0"
                    disabled
                    type="text"
                  />
                </v-layout>
              </v-layout>
            </v-flex>
            <!-- Amount B -->
            <v-flex
              d-flex
              xs12
              sm2
              :class="{ 'pl-2': $vuetify.breakpoint.smAndUp, 'pr-2': $vuetify.breakpoint.smAndUp, 'md3': !isUnicefStage }"
            >
              <v-layout
                class="mb-2"
                :class="{ 'pl-2': $vuetify.breakpoint.smAndUp, 'pr-2': $vuetify.breakpoint.smAndUp }"
                column
              >
                <v-layout
                  v-if="$vuetify.breakpoint.xsOnly"
                  class="caption"
                  :class="{ 'grey--text': !(isMyStage && (faceReportStatus === 'reject' || faceReportStatus === 'waiting')) }"
                >{{ $t('common.fields.reportExpenditureAmount') }}</v-layout>
                <v-layout>
                  <v-text-field
                    class="pt-0"
                    v-model="activities[index].amountB"
                    :placeholder="$t('common.fields.typeAmount')"
                    :ref="'activityAmountB' + index"
                    type="text"
                    @input="changeAmountB(index)"
                    :rules="rules.numberRequired"
                    :disabled="!(isMyStage && (faceReportStatus === 'reject' || faceReportStatus === 'waiting'))"
                  />
                  <v-btn
                    class="my-0 approve-btn"
                    flat
                    icon
                    v-show="!($vuetify.breakpoint.smOnly || $vuetify.breakpoint.mdOnly)"
                    v-if="isAuthorizedPersonStage && !activities[index].isRejected && !activities[index].isApproved"
                    @click="approveActivity(index)"
                  >
                    <v-icon color="success">check</v-icon>
                  </v-btn>
                  <v-btn
                    class="my-0 reject-btn"
                    flat
                    icon
                    v-show="!($vuetify.breakpoint.smOnly || $vuetify.breakpoint.mdOnly)"
                    v-if="isAuthorizedPersonStage && !activities[index].isRejected && !activities[index].isApproved"
                    @click="rejectActivity(index)"
                  >
                    <svgicon class="svg-icon" width="10" height="10" color="red" name="close" />
                  </v-btn>

                  <v-icon
                    v-if="isAuthorizedPersonStage"
                    v-show="activities[index].isApproved"
                    color="success"
                    :ref="'activityAmountEApproveIcon' + index"
                  >done_outline</v-icon>
                  <v-icon
                    v-if="!isUnicefStage"
                    v-show="activities[index].isRejected"
                    color="error"
                    :ref="'activityAmountERejectIcon' + index"
                  >clear</v-icon>
                </v-layout>
                <v-layout
                  justify-end
                  v-if="isAuthorizedPersonStage"
                  v-show="$vuetify.breakpoint.smOnly || $vuetify.breakpoint.mdOnly"
                >
                  <v-btn
                    class="my-0 approve-btn mb-4"
                    flat
                    icon
                    v-if="isAuthorizedPersonStage &&  !activities[index].isRejected && !activities[index].isApproved"
                    @click="approveActivity(index)"
                  >
                    <v-icon color="success">check</v-icon>
                  </v-btn>
                  <v-btn
                    class="my-0 reject-btn mb-4"
                    flat
                    icon
                    v-if="isAuthorizedPersonStage && !activities[index].isRejected && !activities[index].isApproved"
                    @click="rejectActivity(index)"
                  >
                    <svgicon class="svg-icon" width="10" height="10" color="red" name="close" />
                  </v-btn>
                </v-layout>
                <v-layout v-if="isAuthorizedPersonStage">
                  <p
                    class="red--text approval-error mb-4"
                    v-if="(activities[index] && activities[index].approvalError)"
                  >{{ $t('common.fields.approvalError') }}</p>
                </v-layout>

                <v-layout
                  v-if="(isMyStage && !isUnicefStage && activities[index].isRejected) || (!isMyStage && faceReportStatus === 'reject' && activities[index].isRejected)"
                >
                  <v-textarea
                    auto-grow
                    rows="1"
                    :label="$t('common.fields.rejectReason')"
                    v-model="activities[index].rejectReason"
                    :placeholder="$t('common.fields.rejectReason')"
                    :disabled="!isMyStage || (isMyStage && (faceReportStatus === 'waiting' || faceReportStatus === 'reject'))"
                    :ref="'rejectReason' + index"
                    :rules="rules.rejectReasonRequired"
                    type="text"
                  />
                </v-layout>
              </v-layout>
            </v-flex>
            <!-- Amount C -->
            <v-flex
              d-flex
              xs12
              sm2
              :class="{ 'pl-2': $vuetify.breakpoint.smAndUp, 'pr-2': $vuetify.breakpoint.smAndUp, 'md3': isUnicefStage }"
            >
              <v-layout
                class="mb-2"
                :class="{ 'pl-2': $vuetify.breakpoint.smAndUp, 'pr-2': $vuetify.breakpoint.smAndUp }"
                column
              >
                <v-layout
                  v-if="$vuetify.breakpoint.xsOnly"
                  class="caption grey--text"
                >{{ $t('common.fields.reportExpenditureAcceptedAmount') }}</v-layout>
                <v-layout>
                  <v-text-field
                    v-model="activities[index].amountC"
                    :ref="'activityAmountC' + index"
                    placeholder=" "
                    disabled
                    class="pt-0"
                    type="text"
                  />
                  <v-btn
                    class="my-0 approve-btn"
                    flat
                    icon
                    v-show="!($vuetify.breakpoint.smOnly || $vuetify.breakpoint.mdOnly)"
                    v-if="isUnicefStage && !activities[index].isRejected && !activities[index].isApproved"
                    @click="approveActivity(index)"
                  >
                    <v-icon color="success">check</v-icon>
                  </v-btn>
                  <v-btn
                    class="my-0 reject-btn"
                    flat
                    icon
                    v-show="!($vuetify.breakpoint.smOnly || $vuetify.breakpoint.mdOnly)"
                    v-if="isUnicefStage && !activities[index].isRejected && !activities[index].isApproved"
                    @click="rejectActivity(index)"
                  >
                    <svgicon class="svg-icon" width="10" height="10" color="red" name="close" />
                  </v-btn>

                  <v-icon
                    v-if="isUnicefStage"
                    v-show="activities[index].isApproved"
                    color="success"
                    :ref="'activityAmountEApproveIcon' + index"
                  >done_outline</v-icon>
                  <v-icon
                    v-if="isUnicefStage"
                    v-show="activities[index].isRejected"
                    color="error"
                    :ref="'activityAmountERejectIcon' + index"
                  >clear</v-icon>
                </v-layout>
                <v-layout
                  justify-end
                  v-if="isUnicefStage"
                  v-show="$vuetify.breakpoint.smOnly || $vuetify.breakpoint.mdOnly"
                >
                  <v-btn
                    class="my-0 approve-btn mb-4"
                    flat
                    icon
                    v-if="isUnicefStage &&  !activities[index].isRejected && !activities[index].isApproved"
                    @click="approveActivity(index)"
                  >
                    <v-icon color="success">check</v-icon>
                  </v-btn>
                  <v-btn
                    class="my-0 reject-btn mb-4"
                    flat
                    icon
                    v-if="isUnicefStage && !activities[index].isRejected && !activities[index].isApproved"
                    @click="rejectActivity(index)"
                  >
                    <svgicon class="svg-icon" width="10" height="10" color="red" name="close" />
                  </v-btn>
                </v-layout>
                <v-layout v-if="isUnicefStage">
                  <p
                    class="red--text approval-error mb-4"
                    v-if="(activities[index] && activities[index].approvalError)"
                  >{{ $t('common.fields.approvalError') }}</p>
                </v-layout>
                <v-layout v-if="(isUnicefStage && activities[index].isRejected)">
                  <v-textarea
                    auto-grow
                    rows="1"
                    :label="$t('common.fields.rejectReason')"
                    v-model="activities[index].rejectReason"
                    :placeholder="$t('common.fields.rejectReason')"
                    :disabled="!isMyStage || (isMyStage && (faceReportStatus === 'waiting' || faceReportStatus === 'reject'))"
                    :ref="'rejectReason' + index"
                    :rules="rules.rejectReasonRequired"
                    type="text"
                  />
                </v-layout>
              </v-layout>
            </v-flex>
            <!-- Amount D -->
            <v-flex d-flex xs12 sm2 :class="{ 'pl-2': $vuetify.breakpoint.smAndUp }">
              <v-layout class="mb-2" :class="{ 'pl-2': $vuetify.breakpoint.smAndUp }" column>
                <v-layout
                  v-if="$vuetify.breakpoint.xsOnly"
                  class="caption grey--text"
                >{{ $t('common.fields.balanceAmount') }}</v-layout>
                <v-layout>
                  <v-text-field
                    v-model="activities[index].amountD"
                    :ref="'activityAmountD' + index"
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
            <!-- Total -->
            <v-flex
              d-flex
              xs12
              sm2
              md1
              offset-xs0
              offset-sm2
              offset-md2
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
            <!-- Total A -->
            <v-flex d-flex xs12 sm2 :class="{ 'pl-2': $vuetify.breakpoint.smAndUp, 'pr-2': $vuetify.breakpoint.smAndUp }">
              <v-layout class="mb-2" :class="{ 'pl-2': $vuetify.breakpoint.smAndUp, 'pr-2': $vuetify.breakpoint.smAndUp }" column>
                <v-layout
                  v-if="$vuetify.breakpoint.xsOnly"
                  class="caption grey--text"
                >{{ $t('common.fields.reportAuthorisedAmount') }}</v-layout>
                <v-layout>
                  <v-text-field v-model="total.totalA" disabled type="text" class="pt-0" />
                </v-layout>
              </v-layout>
            </v-flex>
            <!-- Total B -->
            <v-flex
              d-flex
              xs12
              sm2
              :class="{ 'pl-2': $vuetify.breakpoint.smAndUp, 'pr-2': $vuetify.breakpoint.smAndUp, 'md3': !isUnicefStage }"
            >
              <v-layout
                class="mb-2"
                :class="{ 'pl-2': $vuetify.breakpoint.smAndUp, 'pr-2': $vuetify.breakpoint.smAndUp }"
                column
              >
                <v-layout
                  v-if="$vuetify.breakpoint.xsOnly"
                  class="caption grey--text"
                >{{ $t('common.fields.reportExpenditureAmount') }}</v-layout>
                <v-layout>
                  <v-text-field v-model="total.totalB" type="text" disabled class="pt-0" />
                </v-layout>
              </v-layout>
            </v-flex>
            <!-- Total C -->
            <v-flex
              d-flex
              xs12
              sm2
              :class="{ 'pl-2': $vuetify.breakpoint.smAndUp, 'pr-2': $vuetify.breakpoint.smAndUp, 'md3': isUnicefStage }"
            >
              <v-layout
                class="mb-2"
                :class="{ 'pl-2': $vuetify.breakpoint.smAndUp, 'pr-2': $vuetify.breakpoint.smAndUp }"
                column
              >
                <v-layout
                  v-if="$vuetify.breakpoint.xsOnly"
                  class="caption grey--text"
                >{{ $t('common.fields.reportExpenditureAcceptedAmount') }}</v-layout>
                <v-layout>
                  <v-text-field v-model="total.totalC" disabled type="text" class="pt-0" />
                </v-layout>
              </v-layout>
            </v-flex>
            <!-- Total D -->
            <v-flex d-flex xs12 sm2 :class="{ 'pl-2': $vuetify.breakpoint.smAndUp }">
              <v-layout class="mb-2" :class="{ 'pl-2': $vuetify.breakpoint.smAndUp }" column>
                <v-layout
                  v-if="$vuetify.breakpoint.xsOnly"
                  class="caption grey--text"
                >{{ $t('common.fields.balanceAmount') }}</v-layout>
                <v-layout>
                  <v-text-field v-model="total.totalD" disabled type="text" class="pt-0" />
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
        :disabled="!(isMyStage && (faceReportStatus ==='waiting' || faceReportStatus ==='reject'))"
        :label="$t('common.fields.reportCertificationCheckboxText')"
        required
      ></v-checkbox>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'FaceReportDetails',
    components: {
    },
    props: {
      faceReportData: {
        type: Object,
      },
      faceReportActivities: {
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
          analyticalDocId: null,
          financialDocId: null,
          justificationDocId: null,
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
          rejectReasonRequired: [
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
      faceReportStatus() {
        return (this.$store.getters['projects/getProjectInfo'].stage) ? this.$store.getters['projects/getProjectInfo'].stage.status : '';
      },
      isLastReport() {
        return (this.$store.getters['projects/getProjectInfo'].stage) ? this.$store.getters['projects/getProjectInfo'].stage.isLast : false;
      },
      faceReportProperties() {
        return this.$store.getters['projects/getFaceReportProperties'];
      },
      requestTypes() {
        return this.$store.getters['projects/getFaceReportProperties'].type;
      },
      isFaceReportCreationPath() {
        return this.$route.path.indexOf('create-face-report') !== -1;
      },
      isFaceReportPath() {
        return this.$route.path.indexOf('/face-report/') !== -1;
      },
      isMyStage() {
        return this.$store.getters['projects/getMyReportStageState'];
      },
      roles() {
        return this.$store.getters['global/getRoles'];
      },
      isResponsibleAssistant() {
        return this.roles.indexOf('ra') !== -1;
      },
      isAuthorizedPersonStage() {
        return this.isMyStage &&
               this.faceReportStatus === 'confirm';
      },
      isUnicefStage() {
        return this.isMyStage &&
               (this.faceReportStatus === 'validate' ||
               this.faceReportStatus === 'certify' ||
               this.faceReportStatus === 'approve' ||
               this.faceReportStatus === 'verify');
      },
      activitiesToSubmit() {
        /* eslint-disable */
        const activities = this.activities.map((item) => {
            return {
              id: item.id,
              title: item.title,
              amountA: item.amountA,
              amountB: item.amountB,
              amountC: item.amountC,
              amountD: item.amountD,
              isRejected: item.isRejected,
              rejectReason: item.rejectReason,
            };
          });
        /* eslint-disable */
        return activities;
      },
    },
    watch: {
      faceReportData() {
        const that = this;
        Object.keys(this.faceReportData).forEach((key) => {
          that.credentials[key] = that.faceReportData[key];
        });
      },
      faceReportProperties() {
        this.credentials.dateFrom = this.faceReportProperties.dateFrom;
        this.credentials.dateTo = this.faceReportProperties.dateTo;
        this.credentials.type = this.faceReportProperties.typeId;
      },
      faceReportActivities() {
        const that = this;
        Object.keys(this.faceReportActivities.total).forEach((key) => {
          that.total[key] = that.faceReportActivities.total[key];
        });
        this.changeJustificationDocRequiredState();
        this.faceReportActivities.activities.forEach((item, index) => {
          const activityObj = {
            id: null,
            title: '',
            amountA: '',
            amountB: '',
            amountC: '',
            amountD: '',
            isRejected: false,
            rejectReason: '',
            isApproved: false,
            approvalError: '',
          };
          Object.keys(item).forEach((key) => {
            activityObj[key] = that.faceReportActivities.activities[index][key];
          });
          this.activities.push(activityObj);
        });
      },
    },
    created() {
      const that = this;
      Object.keys(this.faceReportData).forEach((key) => {
        that.credentials[key] = that.faceReportData[key];
      });

      Object.keys(this.faceReportActivities.total).forEach((key) => {
        that.total[key] = that.faceReportActivities.total[key];
      });
      this.changeJustificationDocRequiredState();
      this.faceReportActivities.activities.forEach((item, index) => {
        const activityObj = {
          id: null,
          title: '',
          amountA: '',
          amountB: '',
          amountC: '',
          amountD: '',
          isRejected: false,
          rejectReason: '',
          isApproved: false,
          approvalError: '',
        };
        Object.keys(item).forEach((key) => {
          activityObj[key] = that.faceReportActivities.activities[index][key];
        });
        this.activities.push(activityObj);
      });
    },
    methods: {
      getFaceReportDetails() {
        if (this.checkApproval()) {
          const dataToSubmit = {};
          Object.keys(this.credentials).forEach((key) => {
            dataToSubmit[key] = this.credentials[key];
          });
          dataToSubmit.activities = this.activitiesToSubmit;
          dataToSubmit.total = this.total;
          this.$emit('getFaceReportDetails', dataToSubmit);
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
      changeAmountB() {
        this.total.totalB = this.getTotalAmountB();
        this.changeJustificationDocRequiredState();
      },
      getTotalAmountB() {
        /* eslint-disable */
        const validAmountFieldsArr = this.activities.filter((activity) => {
                return (/^\d*\.?\d{1,2}$/.test(activity.amountB)) && activity.amountB;
              });
        const totalAmountB = validAmountFieldsArr.reduce(function (acc, val) {
              return acc + (+val.amountB);
            }, 0);
        return totalAmountB;
        /* eslint-disable */
      },
      changeJustificationDocRequiredState() {
        // if totalB 20% more than totalA and not last report make justification doc required
        if (((((+this.total.totalB / +this.total.totalA) * 100) - 100) >= 20) && !this.isLastReport) {
          this.$store.commit('projects/setFaceReportJustificationDocRequiredState', true);
        } else {
          this.$store.commit('projects/setFaceReportJustificationDocRequiredState', false);
        }
      },
      checkApproval() {
        let isDataValid = true;
        if (this.faceReportStatus === 'confirm' ||
            this.faceReportStatus === 'validate' ||
            this.faceReportStatus === 'certify' ||
            this.faceReportStatus === 'approve' ||
            this.faceReportStatus === 'verify') {
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