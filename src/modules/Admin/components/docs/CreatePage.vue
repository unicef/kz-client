<template>
  <div>
    <!-- Content -->
      <h1>Creation of page</h1>
      <div>
        To create a project you are kindly requested to fill up below fields. All fields are required to fill
      </div>

      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-layout column>
          <v-flex sm12>
            <v-text-field
              v-model="titleEN"
              :rules="rules.fieldRequired"
              label="Name page EN*"
              required
            />
          </v-flex>
          <v-flex sm12>
            <v-text-field
              v-model="titleRU"
              :rules="rules.fieldRequired"
              label="Name page EN*"
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
              :validation="validationTextEN"
              @input="onInputTextEN"
            >
              <template v-slot:title>
                Description EN*
              </template>
            </editor-field>
          </v-flex>

          <v-flex class="mb-4">
            <editor-field
              :value="textRU"
              :validation="validationTextRU"
              @input="onInputTextRU"
            >
              <template v-slot:title>
                Description RU*
              </template>
            </editor-field>
          </v-flex>

          <v-flex sm12>
            <v-checkbox
              v-model="public"
              color="primary"
              label="To publish current article"
              required
            />
          </v-flex>
          <v-flex>
            <v-btn
              color="primary"
              @click="onCreatePage"
            >
              Create
            </v-btn>
          </v-flex>
        </v-layout>
      </v-form>
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

      validationTextEN: false,
      validationTextRU: false,

      rules: {
        fieldRequired: [
          /* eslint-disable no-new */
          v => !!v.trim() || this.$t('common.fields.validation.field.required'),
        ],
        selectFieldRequired: [
          /* eslint-disable no-new */
          v => !!v || this.$t('common.fields.validation.field.required'),
        ],
      },
    };
  },
  methods: {
    ...mapActions({
      createPage: 'admin/docs/createPage',
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
        this.validationTextEN = true;
        return true;
      }

      this.validateTextEN = false;
      return false;
    },
    validateTextRU() {
      if (this.textEN.trim() === '') {
        this.validationTextRU = true;
        return true;
      }

      this.validateTextRU = false;
      return false;
    },

    async onCreatePage() {
      const validate = this.$refs.form.validate();
      const validateEN = this.validateTextEN();
      const validateRU = this.validateTextRU();

      if (!validate  || !validateEN || !validateRU) {
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

      console.log('text EN:', this.textEN);
      // const response = await this.createPage(pageObj);
      // console.log(response);
    },
  },
};
</script>

<style lang="scss" scoped>
  .content {
    overflow-x: auto;
  }
</style>
