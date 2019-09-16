<template>
  <div>
    <!-- Content -->
      <h1>Creation of page</h1>
      <div>To create a project you are kindly requested to fill up below fields. All fields are required to fill</div>

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
          <v-flex sm12>
            <v-text-field
              v-model="URL"
              :rules="rules.fieldRequired"
              label="URL*"
              required
            />
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

export default {
  name: 'CreatePage',
  data() {
    return {
      valid: true,

      titleEN: '',
      titleRU: '',
      URL: '',
      textEN: 'text EN test',
      textRU: 'text RU test',
      public: true,

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
  methods: {
    ...mapActions({
      createPage: 'admin/docs/createPage',
    }),

    /* eslint-disable */
    async onCreatePage() {
      const validate = this.$refs.form.validate();

      if (!validate) {
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

      const response = await this.createPage(pageObj);
    },
  },
};
</script>

<style lang="scss" scoped>
  .content {
    overflow-x: auto;
  }
</style>
