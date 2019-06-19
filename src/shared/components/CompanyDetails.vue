<template>
  <v-layout wrap mb-4>
    <v-flex xs12>
      <h3 class="title mb-2">{{ $t('companyInfo.title') }}</h3>
    </v-flex>
    <v-flex xs12 sm6 :class="{ 'pr-4': $vuetify.breakpoint.smAndUp }">
      <!-- Company name Ru -->
      <v-layout row>
        <v-flex sm12>
          <v-text-field
            :label="$t('common.fields.companyNameRu') + '*'"
            id="nameRu"
            v-model="credentials.nameRu"
            type="text"
            :rules="rules.fieldRequired"
            :disabled="fieldsDisabled"
            required
          />
        </v-flex>
      </v-layout>
      <!-- Company name En -->
      <v-layout row>
        <v-flex sm12>
          <v-text-field
            :label="$t('common.fields.companyNameEn') + '*'"
            id="nameEn"
            v-model="credentials.nameEn"
            type="text"
            :rules="rules.fieldRequired"
            :disabled="fieldsDisabled"
            required
          />
        </v-flex>
      </v-layout>
      <!-- Trade name Ru -->
      <v-layout row>
        <v-flex sm12>
          <v-text-field
            :label="isAdminPath ? $t('common.fields.tradeNameRu') : $t('common.fields.tradeNameRu') + '*'"
            id="tradeNameRu"
            v-model="credentials.tradeNameRu"
            type="text"
            :rules="isAdminPath ? [] : rules.fieldRequired"
            :disabled="fieldsDisabled"
            required
          />
        </v-flex>
      </v-layout>
      <!-- Trade name En -->
      <v-layout row>
        <v-flex sm12>
          <v-text-field
            :label="isAdminPath ? $t('common.fields.tradeNameEn') : $t('common.fields.tradeNameEn') + '*'"
            id="tradeNameEn"
            v-model="credentials.tradeNameEn"
            type="text"
            :rules="isAdminPath ? [] : rules.fieldRequired"
            :disabled="fieldsDisabled"
            required
          />
        </v-flex>
      </v-layout>
      <!-- License -->
      <v-layout row>
        <v-flex sm12>
          <v-text-field
            :label="isAdminPath ? $t('common.fields.license') : $t('common.fields.license') + '*'"
            id="license"
            v-model="credentials.license"
            type="text"
            :rules="isAdminPath ? [] : rules.fieldRequired"
            :disabled="fieldsDisabled"
            required
          />
        </v-flex>
      </v-layout>
      <!-- Country -->
      <v-layout row>
        <v-flex sm12>
          <v-select
            :items="countries"
            v-model="credentials.country"
            :label="isAdminPath ? $t('common.fields.country') : $t('common.fields.country') + '*'"
            item-text="title"
            item-value="id"
            return-object
            :rules="isAdminPath ? [] : rules.selectFieldRequired"
            :disabled="fieldsDisabled"
            required
          ></v-select>
        </v-flex>
      </v-layout>
      <!-- CEO's Name Ru -->
      <v-layout row>
        <v-flex sm12>
          <v-text-field
            :label="isAdminPath ? $t('common.fields.ceoFirstNameRu') : $t('common.fields.ceoFirstNameRu') + '*'"
            id="ceoFirstNameRu"
            v-model="credentials.ceoFirstNameRu"
            type="text"
            :rules="isAdminPath ? rules.letter : rules.letterRequired"
            :disabled="fieldsDisabled"
            required
          />
        </v-flex>
      </v-layout>
      <!-- CEO's Name En -->
      <v-layout row>
        <v-flex sm12>
          <v-text-field
            :label="isAdminPath ? $t('common.fields.ceoFirstNameEn') : $t('common.fields.ceoFirstNameEn') + '*'"
            id="ceoFirstNameEn"
            v-model="credentials.ceoFirstNameEn"
            type="text"
            :rules="isAdminPath ? rules.letter : rules.letterRequired"
            :disabled="fieldsDisabled"
            required
          />
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12 sm6 :class="{ 'pl-4': $vuetify.breakpoint.smAndUp }">
      <!-- CEO's Last Name Ru -->
      <v-layout row>
        <v-flex sm12>
          <v-text-field
            :label="isAdminPath ? $t('common.fields.ceoLastNameRu') : $t('common.fields.ceoLastNameRu') + '*'"
            id="ceoLastNameRu"
            v-model="credentials.ceoLastNameRu"
            type="text"
            :rules="isAdminPath ? rules.letter : rules.letterRequired"
            :disabled="fieldsDisabled"
            required
          />
        </v-flex>
      </v-layout>
      <!-- CEO's Last Name En -->
      <v-layout row>
        <v-flex sm12>
          <v-text-field
            :label="isAdminPath ? $t('common.fields.ceoLastNameEn') : $t('common.fields.ceoLastNameEn') + '*'"
            id="ceoLastNameEn"
            v-model="credentials.ceoLastNameEn"
            type="text"
            :rules="isAdminPath ? rules.letter : rules.letterRequired"
            :disabled="fieldsDisabled"
            required
          />
        </v-flex>
      </v-layout>
      <!-- Year established -->
      <v-layout row>
        <v-flex sm12>
          <v-text-field
            :label="isAdminPath ? $t('common.fields.companyYear') : $t('common.fields.companyYear') + '*'"
            id="establishmentYear"
            v-model="credentials.year"
            type="text"
            :rules="isAdminPath ? rules.number : rules.numberRequired"
            :disabled="fieldsDisabled"
            required
          />
        </v-flex>
      </v-layout>
      <!-- Number of employees -->
      <v-layout row>
        <v-flex sm12>
          <v-text-field
            :label="isAdminPath ? $t('common.fields.employersCount') : $t('common.fields.employersCount') + '*'"
            id="employersCount"
            v-model="credentials.employers"
            type="text"
            :rules="isAdminPath ? rules.number : rules.numberRequired"
            :disabled="fieldsDisabled"
            required
          />
        </v-flex>
      </v-layout>
      <!-- Areas of work -->
      <v-layout row>
        <v-flex sm12>
          <v-select
            :items="areasOfWork"
            v-model="credentials.areaOfWork"
            :label="isAdminPath ? $t('common.fields.areaOfWork') : $t('common.fields.areaOfWork') + '*'"
            item-text="title"
            item-value="id"
            return-object
            :rules="isAdminPath ? [] : rules.selectFieldRequired"
            :disabled="fieldsDisabled"
            required
          ></v-select>
        </v-flex>
      </v-layout>
      <!-- Сompany's Ownership -->
      <v-layout row>
        <v-flex sm12>
          <v-select
            :items="ownership"
            v-model="credentials.ownership"
            :label="isAdminPath ? $t('common.fields.ownership') : $t('common.fields.ownership') + '*'"
            item-text="title"
            item-value="id"
            return-object
            :rules="isAdminPath ? [] : rules.selectFieldRequired"
            :disabled="fieldsDisabled"
            required
          ></v-select>
        </v-flex>
      </v-layout>
      <!-- Partner type -->
      <v-layout row>
        <v-flex sm12>
          <v-select
            :items="partnerTypes"
            v-model="credentials.partnerType"
            :label="isAdminPath ? $t('common.fields.partnerType') : $t('common.fields.partnerType') + '*'"
            item-text="title"
            item-value="id"
            return-object
            :rules="isAdminPath ? [] : rules.selectFieldRequired"
            :disabled="fieldsDisabled"
            required
          ></v-select>
        </v-flex>
      </v-layout>
      <!-- CSO type -->
      <v-layout row v-if="credentials.partnerType.title === 'Civil society'">
        <v-flex sm12>
          <v-select
            :items="csoTypes"
            v-model="credentials.csoType"
            :label="isAdminPath ? $t('common.fields.csoType') : $t('common.fields.csoType') + '*'"
            item-text="title"
            item-value="id"
            return-object
            :rules="isAdminPath ? [] : rules.selectFieldRequired"
            :disabled="fieldsDisabled"
            required
          ></v-select>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12 pt-4>
      <h3 class="title mb-2">{{ $t('companyContacts.title') }}</h3>
    </v-flex>
    <v-flex xs12 sm6 :class="{ 'pr-4': $vuetify.breakpoint.smAndUp }">
      <!-- Company Telephone -->
      <v-layout row>
        <v-flex sm12>
          <v-text-field
            :label="isAdminPath ? $t('common.fields.telephone') : $t('common.fields.telephone') + '*'"
            id="companyTel"
            v-model="credentials.tel"
            type="text"
            :rules="isAdminPath ? rules.number : rules.numberRequired"
            :disabled="fieldsDisabled"
            required
          />
        </v-flex>
      </v-layout>
      <!-- Website -->
      <v-layout row>
        <v-flex sm12>
          <v-text-field :label="isAdminPath ? $t('common.fields.website') : $t('common.fields.website') + '*'" id="website" v-model="credentials.website" type="text" :disabled="fieldsDisabled" />
        </v-flex>
      </v-layout>
      <!-- City/town Ru -->
      <v-layout row>
        <v-flex sm12>
          <v-text-field
            :label="isAdminPath ? $t('common.fields.cityRu') : $t('common.fields.cityRu') + '*'"
            id="cityRu"
            v-model="credentials.cityRu"
            type="text"
            :rules="isAdminPath ? rules.letter : rules.letterRequired"
            :disabled="fieldsDisabled"
            required
          />
        </v-flex>
      </v-layout>
      <!-- City/town En -->
      <v-layout row>
        <v-flex sm12>
          <v-text-field
            :label="isAdminPath ? $t('common.fields.cityEn') : $t('common.fields.cityEn') + '*'"
            id="cityEn"
            v-model="credentials.cityEn"
            type="text"
            :rules="isAdminPath ? rules.letter : rules.letterRequired"
            :disabled="fieldsDisabled"
            required
          />
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12 sm6 :class="{ 'pl-4': $vuetify.breakpoint.smAndUp }">
      <!-- Address line Ru -->
      <v-layout row>
        <v-flex sm12>
          <v-text-field
            :label="isAdminPath ? $t('common.fields.addressRu') : $t('common.fields.addressRu') + '*'"
            id="addressRu"
            v-model="credentials.addressRu"
            type="text"
            :rules="isAdminPath ? [] : rules.fieldRequired"
            :disabled="fieldsDisabled"
            required
          />
        </v-flex>
      </v-layout>
      <!-- Address line En -->
      <v-layout row>
        <v-flex sm12>
          <v-text-field
            :label="isAdminPath ? $t('common.fields.addressEn') : $t('common.fields.addressEn') + '*'"
            id="addressEn"
            v-model="credentials.addressEn"
            type="text"
            :rules="isAdminPath ? [] : rules.fieldRequired"
            :disabled="fieldsDisabled"
            required
          />
        </v-flex>
      </v-layout>
      <!-- Postal code -->
      <v-layout row>
        <v-flex sm12>
          <v-text-field id="zip" :label="isAdminPath ? $t('common.fields.zip') : $t('common.fields.zip') + '*'" v-model="credentials.zip" type="text" :disabled="fieldsDisabled" />
        </v-flex>
      </v-layout>
    </v-flex>
    <!-- AUTHORISED PERSON BLOCK (only for client and partner role Responsible Assistant) -->
    <v-flex xs12 pt-4 v-if="isClientPath&&isResponsibleAssistant">
      <h3 class="title mb-2" v-if="isClientPath">{{ $t('apInformation.title') }}</h3>
    </v-flex>
    <v-flex xs12 sm6 :class="{ 'pr-4': $vuetify.breakpoint.smAndUp }" v-if="isClientPath&&isResponsibleAssistant">
      <!-- Authorised Person's First name Ru -->
      <v-layout row>
        <v-flex sm12>
          <v-text-field
            :label="isAdminPath ? $t('common.fields.firstNameRu') : $t('common.fields.firstNameRu') + '*'"
            id="opFirstNameRu"
            v-model="authorisedPerson.firstNameRu"
            type="text"
            :rules="rules.letterRequired"
            required
          />
        </v-flex>
      </v-layout>
      <!-- Authorised Person's First name En -->
      <v-layout row>
        <v-flex sm12>
          <v-text-field
            :label="isAdminPath ? $t('common.fields.firstNameEn') : $t('common.fields.firstNameEn') + '*'"
            id="opFirstNameEn"
            v-model="authorisedPerson.firstNameEn"
            type="text"
            :rules="rules.letterRequired"
            required
          />
        </v-flex>
      </v-layout>
      <!-- Authorised Person's Last name Ru -->
      <v-layout row>
        <v-flex sm12>
          <v-text-field
            :label="isAdminPath ? $t('common.fields.lastNameRu') : $t('common.fields.lastNameRu') + '*'"
            id="opLastNameRu"
            v-model="authorisedPerson.lastNameRu"
            type="text"
            :rules="rules.letterRequired"
            required
          />
        </v-flex>
      </v-layout>
      <!-- Authorised Person's Last name En -->
      <v-layout row>
        <v-flex sm12>
          <v-text-field
            :label="isAdminPath ? $t('common.fields.lastNameEn') : $t('common.fields.lastNameEn') + '*'"
            id="opLastNameEn"
            v-model="authorisedPerson.lastNameEn"
            type="text"
            :rules="rules.letterRequired"
            required
          />
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12 sm6 :class="{ 'pl-4': $vuetify.breakpoint.smAndUp }" v-if="isClientPath&&isResponsibleAssistant">
      <!-- Authorised Person's Occupation Ru -->
      <v-layout row>
        <v-flex sm12>
          <v-text-field
            :label="isAdminPath ? $t('common.fields.occupationRu') : $t('common.fields.occupationRu') + '*'"
            id="opOccupationRu"
            v-model="authorisedPerson.occupationRu"
            type="text"
            :rules="rules.letterRequired"
            required
          />
        </v-flex>
      </v-layout>
      <!-- Authorised Person's Occupation En -->
      <v-layout row>
        <v-flex sm12>
          <v-text-field
            :label="isAdminPath ? $t('common.fields.occupationEn') : $t('common.fields.occupationEn') + '*'"
            id="opOccupationEn"
            v-model="authorisedPerson.occupationEn"
            type="text"
            :rules="rules.letterRequired"
            required
          />
        </v-flex>
      </v-layout>
      <!-- Authorised Person's email -->
      <v-layout row>
        <v-flex sm12>
          <v-text-field
            :label="$t('common.fields.email') + '*'"
            id="opEmail"
            v-model="authorisedPerson.email"
            type="text"
            :rules="rules.email"
            :disabled="!!authorisedPersonData.email"
            required
          />
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'CompanyDetails',
    components: {
    },
    props: {
      companyData: {
        type: Object,
      },
      countries: {
        type: Array,
      },
      areasOfWork: {
        type: Array,
      },
      ownership: {
        type: Array,
      },
      partnerTypes: {
        type: Array,
      },
      csoTypes: {
        type: Array,
      },
      authorisedPersonData: {
        type: Object,
      },
    },
    watch: {
      companyData() {
        const that = this;
        Object.keys(this.companyData).forEach((key) => {
          if (key === 'employersCount') {
            that.credentials.employers = that.companyData['employersCount'] ? that.companyData['employersCount'].toString() : '';
          } else if (key === 'establishmentYear') {
            that.credentials.year = that.companyData['establishmentYear'] ? that.companyData['establishmentYear'].toString() : '';
          } else {
            that.credentials[key] = that.companyData[key];
          }
        });
      },
      authorisedPersonData() {
        const that = this;
        Object.keys(this.authorisedPersonData).forEach((key) => {
          that.authorisedPerson[key] = that.authorisedPersonData[key];
        });
      },
    },
    created() {
      const that = this;
      Object.keys(this.companyData).forEach((key) => {
        if (key === 'employersCount') {
          that.credentials.employers = that.companyData['employersCount'] ? that.companyData['employersCount'].toString() : '';
        } else if (key === 'establishmentYear') {
          that.credentials.year = that.companyData['establishmentYear'] ? that.companyData['establishmentYear'].toString() : '';
        } else {
          that.credentials[key] = that.companyData[key];
        }
      });
      if (this.authorisedPersonData) {
        Object.keys(this.authorisedPersonData).forEach((key) => {
          that.authorisedPerson[key] = that.authorisedPersonData[key];
        });
      }
    },
    data() {
      return {
        credentials: {
            id: null,
            nameRu: '',
            nameEn: '',
            tradeNameEn: '',
            tradeNameRu: '',
            license: '',
            ceoFirstNameRu: '',
            ceoFirstNameEn: '',
            ceoLastNameRu: '',
            ceoLastNameEn: '',
            country: {},
            year: '',
            employers: '',
            areaOfWork: null,
            ownership: null,
            partnerType: null,
            csoType: null,
            tel: '',
            website: '',
            cityRu: '',
            cityEn: '',
            addressRu: '',
            addressEn: '',
            zip: '',
            createdAt: '',
            assistId: null,
            status: '',
        },
        authorisedPerson: {
          firstNameRu: '',
          firstNameEn: '',
          lastNameRu: '',
          lastNameEn: '',
          occupationRu: '',
          occupationEn: '',
          email: '',
        },
        rules: {
          fieldRequired: [
            /* eslint-disable no-new */
            v => !!v.trim() || this.$t('common.fields.validation.field.required'),
          ],
          selectFieldRequired: [
            /* eslint-disable no-new */
            v => !!v || this.$t('common.fields.validation.field.required'),
          ],
          letter: [
            /* eslint-disable no-new */
            v => (/^[a-zA-Zа-яА-Я ]+$/.test(v) || v.length === 0) || this.$t('common.fields.validation.field.onlyLetters'),
          ],
          letterRequired: [
            /* eslint-disable no-new */
            v => !!v.trim() || this.$t('common.fields.validation.field.required'),
            v => /^[a-zA-Zа-яА-Я ]+$/.test(v) || this.$t('common.fields.validation.field.onlyLetters'),
          ],
          number: [
            /* eslint-disable no-new */
            v => (/^\d+$/.test(v) || v.length === 0) || this.$t('common.fields.validation.field.onlyDigits'),
          ],
          numberRequired: [
            /* eslint-disable no-new */
            v => !!v || this.$t('common.fields.validation.field.required'),
            v => /^\d+$/.test(v) || this.$t('common.fields.validation.field.onlyDigits'),
          ],
          email: [
            /* eslint-disable no-new */
            v => !!v.trim() || this.$t('common.fields.validation.email.required'),
            v => /^\w+([+.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(v) || this.$t('common.fields.validation.email.invalid'),
          ],
        },
      };
    },
    computed: {
      roles() {
        return this.$store.getters['global/getRoles'];
      },
      isAdminPath() {
        return this.$route.path.indexOf('admin') !== -1;
      },
      isClientPath() {
        return this.$route.path.indexOf('dashboard') !== -1;
      },
      isPartnerPath() {
        return this.$route.path.indexOf('partner') !== -1;
      },
      isPartnerCreationPath() {
        return this.$route.path.indexOf('partner-create') !== -1;
      },
      fieldsDisabled() {
        return this.$store.getters['users/getCompanyFieldsDisabled'];
      },
      isResponsibleAssistant() {
        return this.roles.indexOf('ra') !== -1;
      },
    },
    methods: {
      getCompanyDetails() {
        this.credentials.establishmentYear = (this.credentials.year.length) ? +this.credentials.year : null;
        this.credentials.employersCount = (this.credentials.employers.length) ? +this.credentials.employers : null;
        this.$emit('getCompanyDetails', { company: this.credentials, authorisedPerson: this.authorisedPerson });
      },
    },
  };
</script>

<style lang="scss" scoped>
.search {
  max-width: 250px;
}
</style>