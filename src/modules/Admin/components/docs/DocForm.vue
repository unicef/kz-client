<template>
  <!-- Form -->
  <v-form
    class="form"
    ref="form"
    lazy-validation
  >
    <v-layout column>
      <!-- Titles -->
      <v-flex sm12>
        <v-text-field
          :value="titleEN"
          :disabled="URL === 'terms'"
          required
          :rules="nameRules"
          :label='$t("common.fields.namePageEn") + "*"'
          @input="onInputTitleEN"
        />
      </v-flex>
      <v-flex sm12>
        <v-text-field
          :value="titleRU"
          :disabled="URL === 'terms'"
          required
          :rules="nameRules"
          :label='$t("common.fields.namePageRu") + "*"'
          @input="onInputTitleRU"
        />
      </v-flex>

      <!-- URL -->
      <v-flex sm12 class="mb-3">
        <v-text-field
          :value="URL"
          :disabled="URL === 'terms'"
          required
          label="URL*"
          :rules="urlRules"
          @input="onInputURL"
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
          v-model="isPublic"
          color="primary"
          required
          :label='$t("common.fields.publicPage")'
        />
      </v-flex>

      <v-flex>
        <v-btn
          color="primary"
          @click="onSubmit"
        >
          <span v-if="buttonName === 'edit'">
            {{ $t('common.btns.save') }}
          </span>
          <span v-if="buttonName === 'create'">
            {{ $t('common.btns.create') }}
          </span>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  import EditorField from '@/shared/components/EditorField';

  export default {
    name: 'DocForm',
    components: {
      EditorField,
    },
    props: {
      buttonName: {
        type: String,
      },
    },
    data() {
      return {
        errorTextEN: false,
        errorTextRU: false,

        urlRules: [
          v => !!v.trim() || this.$t('common.fields.validation.field.required'),
          v => /^[A-Za-z\d-]{3,}$/.test(v) || this.$root.$t('common.fields.validation.url'),
        ],
        nameRules: [
          v => !!v.trim() || this.$t('common.fields.validation.field.required'),
          v => v.length < 51 || `${this.$t('common.fields.validation.maxLetters')} - 50`,
        ],
      };
    },
    computed: {
      ...mapGetters({
        titleEN: 'admin/docs/getTitleEN',
        titleRU: 'admin/docs/getTitleRU',
        URL: 'admin/docs/getURL',
        textEN: 'admin/docs/getTextEN',
        textRU: 'admin/docs/getTextRU',
      }),

      isPublic: {
        get() {
          return this.$store.state.admin.docs.public;
        },
        set(value) {
          this.setPublic(Boolean(value));
        },
      },
    },
    methods: {
      ...mapMutations({
        setTitleEN: 'admin/docs/setTitleEN',
        setTitleRU: 'admin/docs/setTitleRU',
        setURL: 'admin/docs/setURL',
        setTextEN: 'admin/docs/setTextEN',
        setTextRU: 'admin/docs/setTextRU',
        setPublic: 'admin/docs/setPublic',
      }),

      onInputTitleEN(value) {
        this.setTitleEN(value);
      },
      onInputTitleRU(value) {
        this.setTitleRU(value);
      },
      onInputURL(value) {
        this.setURL(value);
      },
      onInputTextEN(value) {
        this.setTextEN(value);
        this.validateTextEN();
      },
      onInputTextRU(value) {
        this.setTextRU(value);
        this.validateTextRU();
      },
      validateTextEN() {
        if (this.textEN.trim() === '') {
          this.errorTextEN = true;
          return;
        }

        this.errorTextEN = false;
      },
      validateTextRU() {
        if (this.textRU.trim() === '') {
          this.errorTextRU = true;
          return;
        }

        this.errorTextRU = false;
      },
      async onSubmit() {
        const validate = this.$refs.form.validate();
        this.validateTextEN();
        this.validateTextRU();

        if (!validate || this.errorTextEN || this.errorTextRU) {
          return;
        }

        this.$emit('submit');
      },
    },
  };
</script>
