<template>
  <div class="create-page">
    <!-- Content -->
    <v-toolbar class="headline justify-center" color="light-blue">
      <div>
        {{ $t('docs.createPageTitle') }}
      </div>
    </v-toolbar>

    <v-card>
      <v-container :class="{ 'pt-4': $vuetify.breakpoint.xs }">
        <div>
          {{ $t('docs.createPageSubheading') }}
        </div>

        <!-- Form -->
        <v-form
          class="form"
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-layout column>
            <v-flex sm12>
              <v-text-field
                v-model="titleEN"
                :rules="rules.fieldRequired"
                :label='$t("common.fields.namePageEn") + "*"'
                required
              />
            </v-flex>
            <v-flex sm12>
              <v-text-field
                v-model="titleRU"
                :rules="rules.fieldRequired"
                :label='$t("common.fields.namePageRu") + "*"'
                required
              />
            </v-flex>
            <v-flex sm12 class="mb-3">
              <v-text-field
                v-model="URL"
                :rules="rules.fieldRequired"
                label="URL*"
                required
              />
            </v-flex>
            <!-- Editors -->
            <v-flex class="mb-4">
              <editor-field
                :value="textEN"
                :validation="errorTextEN"
                @input="onInputTextEN"
              >
                <template v-slot:title>
                  {{ $t('common.fields.descriptionEn') }}*
                </template>
              </editor-field>
            </v-flex>

            <v-flex class="mb-2">
              <editor-field
                :value="textRU"
                :validation="errorTextRU"
                @input="onInputTextRU"
              >
                <template v-slot:title>
                  {{ $t('common.fields.descriptionRu') }}*
                </template>
              </editor-field>
            </v-flex>

            <v-flex class="mb3" sm12>
              <v-checkbox
                v-model="public"
                color="primary"
                :label='$t("common.fields.publicPage")'
                required
              />
            </v-flex>

            <!-- Alerts -->
            <v-flex class="mb-3">
              <v-alert
                :value="successAlert.state"
                type="success"
              >
                {{ successAlert.msg }}
              </v-alert>
              <v-alert
                :value="errorAlert.state"
                type="error"
              >
                {{ errorAlert.msg }}
              </v-alert>
            </v-flex>

            <v-flex>
              <v-btn
                :disabled="isCreate"
                color="primary"
                @click="onCreatePage"
              >
                {{ $t('common.btns.create') }}
              </v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import EditorField from '@/shared/components/EditorField';

export default {
  name: 'CreatePage',
  components: {
    EditorField,
  },
  data() {
    return {
      valid: true,

      titleEN: '',
      titleRU: '',
      URL: '',
      textEN: '',
      textRU: '',
      public: true,

      errorTextEN: false,
      errorTextRU: false,

      isCreate: false,
      successAlert: {
        state: false,
        msg: '',
      },
      errorAlert: {
        state: false,
        msg: '',
      },

      rules: {
        fieldRequired: [
          /* eslint-disable no-new */
          v => !!v.trim() || this.$t('common.fields.validation.field.required'),
        ],
      },
    };
  },
  methods: {
    ...mapActions({
      createDoc: 'admin/docs/createDoc',
    }),

    /* eslint-disable */
    onInputTextEN(value) {
      this.textEN = value;
    },
    onInputTextRU(value) {
      this.textRU = value;
    },
    validateTextEN() {
      if (this.textEN.trim() === '') {
        this.errorTextEN = true;
        return;
      }

      this.errorTextEN = false;
    },
    validateTextRU() {
      if (this.textEN.trim() === '') {
        this.errorTextRU = true;
        return;
      }

      this.errorTextRU = false;
    },

    async onCreatePage() {
      const validate = this.$refs.form.validate();
      this.validateTextEN();
      this.validateTextRU();

      if (!validate  || this.errorTextEN || this.errorTextRU) {
        return;
      }

      const pageObj = {
        key: this.URL,
        titleEn: this.titleEN,
        titleRu: this.titleRU,
        textEn: this.textEN,
        textRu: this.textRU,
        isPublic: this.public,
      };

      this.isCreate = true;
      this.errorAlert.state = false;
      this.errorAlert.msg = '';

      const { success, data, error } = await this.createDoc(pageObj);

      if (!success) {
        this.errorAlert.state = true;
        this.errorAlert.msg = error.message;
        this.isCreate = false;
        return;
      }

      this.successAlert.state = true;
      this.successAlert.msg = data.message;
      this.isCreate = false;

      setTimeout(() => {
        this.$router.push({ name: 'docs-list' });
      }, 3000);
    },
  },
};
</script>

<style lang="scss" scoped>
  .content {
    overflow-x: auto;
  }

  .create-page {
    max-width: 880px;
    width: 100%;
    margin: 0 auto;
  }
</style>
