<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-toolbar class="headline justify-center mt-4" color="light-blue">Manage translations</v-toolbar>
      <v-form ref="form" lazy-validation>
        <v-card class="translation-form">
          <v-container :class='{ "pt-4": $vuetify.breakpoint.xs }'>
            <v-card-text>
              <v-container
                grid-list-md
                class="px-0 pb-0"
                :class='{ "px-0": $vuetify.breakpoint.xs }'
              >
                <v-layout row>
                    <p class="title">Key of the phrase:</p>
                </v-layout>
                <v-layout row>
                  <v-flex sm12>
                    <v-text-field
                      name="phraseKey"
                      label="Key of the phrase"
                      outline
                      id="phraseKey"
                      v-model="credentials.key"
                      type="text"
                      :rules="rules.key"
                      @blur="getTranslations"
                      required
                    />
                  </v-flex>
                </v-layout>
                <v-layout row>
                    <p class="title">Translations:</p>
                </v-layout>
                <v-layout v-for="language of languages" :key="language.code" row v-if="language.code === 'ru' || language.code === 'en'">
                  <v-flex sm12>
                    <v-text-field
                      :name="language.code"
                      :label="language.code"
                      outline
                      :ref="language.code"
                      :value="keyTranslations[language.code]"
                      @change="changeKeyTranslation(language.code)"
                      type="text"
                      :rules="rules.lang"
                      required
                    />
                  </v-flex>
                </v-layout>

                <!-- Alert -->
                <v-layout row v-if="errorAlert.state">
                  <v-flex sm12>
                    <v-alert :value="errorAlert.state" type="error">{{ errorAlert.msg }}</v-alert>
                  </v-flex>
                </v-layout>
                <!-- Success -->
                <v-layout row v-if="successAlert.state">
                  <v-flex sm12>
                    <v-alert :value="successAlert.state" type="success">{{ successAlert.msg }}</v-alert>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-layout align-center class="btns-wrapper">
                <v-btn type="button" @click="saveTranslations" color="info mb-2 mt-2" depressed>Save</v-btn>
              </v-layout>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'Localization',
    data() {
      return {
        credentials: {
          key: '',
        },
        rules: {
          key: [
            /* eslint-disable no-new */
            v => !!v || 'Field is required',
          ],
          lang: [
            /* eslint-disable no-new */
            v => !!v || 'Field is required',
          ],
        },
        errorAlert: {
          state: false,
          msg: '',
        },
        successAlert: {
          state: false,
          msg: '',
        },
      };
    },
    computed: {
      languages() {
        return this.$store.getters['global/getLanguages'];
      },
      keyTranslations() {
        return this.$store.getters['admin/settings/getKeyTranslationsState'];
      },
    },
    destroyed() {
        this.$store.commit('admin/settings/clearKeyTranslations');
    },
    methods: {
      async saveTranslations() {
        if (this.$refs.form.validate()) {
          const that = this;
          Object.keys(this.keyTranslations).forEach((key) => {
            that.credentials[key] = that.keyTranslations[key];
          });
          const data = await this.$store.dispatch('admin/settings/saveTranslations', this.credentials);
          if (data.data.success) {
              this.$refs.form.reset();
              this.$store.commit('admin/settings/clearKeyTranslations');
              this.errorAlert.state = false;
              this.errorAlert.msg = '';
              this.successAlert.state = true;
              this.successAlert.msg = data.data.message;
              setTimeout(() => {
                this.successAlert.state = false;
                this.successAlert.msg = '';
              }, 3000);
          } else {
            this.errorAlert.state = true;
            this.errorAlert.msg = data.data.error.message;
          }
        }
      },
      async getTranslations() {
        if (!this.credentials.key) {
            return;
        }
        const data = await this.$store.dispatch('admin/settings/getTranslations', this.credentials.key);
        const that = this;
        if (data.data.sucess && data.data.data) {
          Object.keys(data.data).forEach((key) => {
            that.$store.commit('admin/settings/setKeyTranslation', { key, value: data.data[key].value });
          });
        }
      },
      changeKeyTranslation(code) {
        this.$store.commit('admin/settings/setKeyTranslation', { key: code, value: this.$refs[code][0].$refs.input.value });
      },
    },
  };
</script>

<style lang="scss" scoped>
.translation-form {
    .title {
        padding: 0 8px;
    }

    .btns-wrapper {
        padding: 8px;
    }
}
</style>