<template>
  <v-layout wrap mb-4>
    <v-flex xs12>
      <h3 class="title mb-2" v-if="isAdminPath || isUserFormPath">{{ $t('userDetails.title') }}</h3>
    </v-flex>
    <v-flex xs12 sm6 :class="{ 'pr-4': $vuetify.breakpoint.smAndUp }">
      <!-- FIELDS FOR ALL USERS -->
      <!-- Email -->
      <v-layout row>
        <v-flex sm12>
          <v-text-field
            :label="$t('common.fields.email') + '*'"
            id="email"
            v-model="credentials.email"
            type="email"
            :rules="rules.email"
            required
            :disabled="!!userData.email"
          />
        </v-flex>
      </v-layout>
      <!-- First name Ru -->
      <v-layout row>
        <v-flex sm12>
          <v-text-field
            :label="isAdminPath ? $t('common.fields.firstNameRu') : $t('common.fields.firstNameRu') + '*'"
            id="firstNameRu"
            v-model="credentials.firstNameRu"
            type="text"
            :rules="isAdminPath ? rules.name : rules.nameRequired"
            required
          />
        </v-flex>
      </v-layout>
      <!-- First name En -->
      <v-layout row>
        <v-flex sm12>
          <v-text-field
            :label="isAdminPath ? $t('common.fields.firstNameEn') : $t('common.fields.firstNameEn') + '*'"
            id="firstNameEn"
            v-model="credentials.firstNameEn"
            type="text"
            :rules="isAdminPath ? rules.name : rules.nameRequired"
            required
          />
        </v-flex>
      </v-layout>
      <!-- Last name Ru -->
      <v-layout row>
        <v-flex sm12>
          <v-text-field
            :label="isAdminPath ? $t('common.fields.lastNameRu') : $t('common.fields.lastNameRu') + '*'"
            id="lastNameRu"
            v-model="credentials.lastNameRu"
            type="text"
            :rules="isAdminPath ? rules.name : rules.nameRequired"
            required
          />
        </v-flex>
      </v-layout>
      <!-- Last name En -->
      <v-layout row>
        <v-flex sm12>
          <v-text-field
            :label="isAdminPath ? $t('common.fields.lastNameEn') : $t('common.fields.lastNameEn') + '*'"
            id="lastNameEn"
            v-model="credentials.lastNameEn"
            type="text"
            :rules="isAdminPath ? rules.name : rules.nameRequired"
            required
          />
        </v-flex>
      </v-layout>
      <!-- Occupation Ru -->
      <v-layout row>
        <v-flex sm12>
          <v-text-field
            :label="isAdminPath ? $t('common.fields.occupationRu') : $t('common.fields.occupationRu') + '*'"
            id="occupationRu"
            v-model="credentials.occupationRu"
            type="text"
            :rules="isAdminPath ? rules.occupation : rules.occupationRequired"
            required
          />
        </v-flex>
      </v-layout>
      <!-- Occupation En -->
      <v-layout row>
        <v-flex sm12>
          <v-text-field
            :label="isAdminPath ? $t('common.fields.occupationEn') : $t('common.fields.occupationEn') + '*'"
            id="occupationEn"
            v-model="credentials.occupationEn"
            type="text"
            :rules="isAdminPath ? rules.occupation : rules.occupationRequired"
            required
          />
        </v-flex>
      </v-layout>
      <!-- Telephone -->
      <v-layout row>
        <v-flex sm12>
          <v-text-field
            :label="isAdminPath ? $t('common.fields.telephone') : $t('common.fields.telephone') + '*'"
            id="tel"
            v-model="credentials.tel"
            type="text"
            :rules="isAdminPath ? rules.tel : rules.telRequired"
            required
          />
        </v-flex>
      </v-layout>
      <!-- Mobile number -->
      <v-layout row>
        <v-flex sm12>
          <v-text-field
            :label="isAdminPath ? $t('common.fields.mobile') : $t('common.fields.mobile') + '*'"
            id="mobile"
            v-model="credentials.mobile"
            type="text"
            :rules="isAdminPath ? rules.tel : rules.telRequired"
            required
          />
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12 sm6 :class="{ 'pl-4': $vuetify.breakpoint.smAndUp }">
      <!-- USER INFO -->
      <v-card v-if="userData.id" class="mb-4">
        <v-list dense>
          <v-list-tile>
            <v-list-tile-content>{{ $t('common.fields.systemId') }}:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ userData.id }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="userData.createdAt">
            <v-list-tile-content>{{ $t('common.fields.registrationDate') }}:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ userData.createdAt }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="userData.lastLogin">
            <v-list-tile-content>{{ $t('common.fields.lastLogin') }}:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ userData.lastLogin }}</v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
      <!-- FIELDS FOR ADMIN -->
      <!-- Partner roles -->
      <v-layout row v-if="isAdminPath && isPartnerPath">
        <v-flex sm12>
          <v-select
            :items="partnerRoles"
            v-model="credentials.role"
            :label="$t('common.fields.role') + '*'"
            item-text="title"
            item-value="id"
            return-object
            :rules="rules.role"
            @change="setRole"
            required
            :disabled="userData.roles && !!userData.roles[0].title"
          ></v-select>
        </v-flex>
      </v-layout>
      <!-- Companies (shown only for Partner creation page when Authorized Person role is choosen) -->
      <v-layout
        row
        v-if="isAdminPath && isPartnerCreationPath && credentials.role.title === 'Authorised person'"
      >
        <v-flex sm12>
          <v-select
            :items="companies"
            v-model="credentials.company"
            :label="$t('common.fields.company') + '*'"
            item-text="title"
            item-value="id"
            @change="setCompany"
            return-object
          ></v-select>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'UserDetails',
    components: {
    },
    props: {
      userData: {
        type: Object,
      },
      partnerRoles: {
          type: Array,
      },
      companies: {
          type: Array,
      },
    },
    watch: {
      userData() {
        const that = this;
        Object.keys(this.userData).forEach((key) => {
          if (key === 'roles') {
            that.credentials.role = that.userData.roles[0];
          } else {
            that.credentials[key] = that.userData[key];
          }
        });
      },
    },
    created() {
      const that = this;
        Object.keys(this.userData).forEach((key) => {
          if (key === 'roles') {
            that.credentials.role = that.userData.roles[0];
          } else {
            that.credentials[key] = that.userData[key];
          }
        });
    },
    data() {
      return {
        credentials: {
            email: '',
            id: null,
            firstNameRu: '',
            firstNameEn: '',
            lastNameRu: '',
            lastNameEn: '',
            occupationRu: '',
            occupationEn: '',
            role: {},
            tel: '',
            mobile: '',
            company: {},
            createdAt: '',
            lastLogin: '',
            status: '',
        },
        rules: {
          email: [
            /* eslint-disable no-new */
            v => !!v.trim() || this.$t('common.fields.validation.field.required'),
            v => /^\w+([+.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(v) || this.$t('common.fields.validation.email'),
          ],
          name: [
            /* eslint-disable no-new */
            v => (/^[a-zA-Zа-яА-Я ]+$/.test(v) || v.length === 0) || this.$t('common.fields.validation.field.onlyLetters'),
          ],
          nameRequired: [
            /* eslint-disable no-new */
            v => !!v.trim() || this.$t('common.fields.validation.field.required'),
            v => /^[a-zA-Zа-яА-Я ]+$/.test(v) || this.$t('common.fields.validation.field.onlyLetters'),
          ],
          occupation: [
            /* eslint-disable no-new */
            v => (/^[a-zA-Zа-яА-Я ]+$/.test(v) || v.length === 0) || this.$t('common.fields.validation.field.onlyLetters'),
          ],
          occupationRequired: [
            /* eslint-disable no-new */
            v => !!v.trim() || this.$t('common.fields.validation.field.required'),
            v => /^[a-zA-Zа-яА-Я ]+$/.test(v) || this.$t('common.fields.validation.field.onlyLetters'),
          ],
          tel: [
            /* eslint-disable no-new */
            v => (/^\d+$/.test(v) || v.length === 0) || this.$t('common.fields.validation.field.onlyDigits'),
          ],
          telRequired: [
            /* eslint-disable no-new */
            v => !!v.trim() || this.$t('common.fields.validation.field.required'),
            v => /^\d+$/.test(v) || this.$t('common.fields.validation.field.onlyDigits'),
          ],
          role: [
            /* eslint-disable no-new */
            v => !!v.title || this.$t('common.fields.validation.field.required'),
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
      isPartnerPath() {
        return this.$route.path.indexOf('partner') !== -1;
      },
      isPartnerCreationPath() {
        return this.$route.path.indexOf('partner-create') !== -1;
      },
      isUserFormPath() {
        return this.$route.path.indexOf('user-form') !== -1;
      },
    },
    methods: {
      getUserDetails() {
        this.$emit('getUserDetails', this.credentials);
      },
      setRole() {
        if (this.credentials.role.title === 'Authorised person') {
          this.$store.commit('users/toggleCompanyFieldsDisabled', true);
        } else {
          this.$store.commit('users/toggleCompanyFieldsDisabled', false);
          this.credentials.company = {};
          this.$store.commit('users/setCompanyData', null);
        }
      },
      setCompany() {
        this.$store.dispatch('users/getCompanyInfo', this.credentials.company.id);
        this.$store.commit('users/toggleCompanyFieldsDisabled', false);
      },
    },
  };
</script>

<style lang="scss" scoped>
.search {
  max-width: 250px;
}
</style>