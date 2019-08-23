<template>
  <v-layout wrap mb-4>
    <v-flex xs12>
      <v-layout justify-end wrap>
        <v-flex xs12 v-for="(row, index) in 3" :key="index">
          <v-layout wrap>
            <v-flex xs12 sm7 :class="{ 'pr-2': $vuetify.breakpoint.smAndUp }">
              <v-text-field
                :label="$t('common.fields.fileName')"
                v-model="files[index].title"
                type="text"
                disabled
                :rules="(files[index].id) ? rules.fieldRequired : []"
              />
            </v-flex>
            <v-flex xs12 sm5 :class="{ 'pl-2': $vuetify.breakpoint.smAndUp }">
              <span><v-btn
                class="load-document-btn"
                color="info"
                :ref="'loadIpDocBtn' + index"
                :loading="files[index] ? files[index].loading : false"
                @click="clickLoadDocument(index)"
              >{{ $t('common.btns.upload') }}</v-btn></span>
              <input
                v-show="false"
                type="file"
                :ref="'docIpInput' + index"
                :error-messages="'This is error'"
                :rules="(files[index].title) ? rules.fieldRequired : []"
                @change="loadDocument($event, index)"
              >
              <p
                class="red--text document-error"
                v-if="files[index] && files[index].fileError"
              >{{ files[index].fileError }}</p>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'IpDocuments',
    data() {
      return {
        files: [
          {
            id: '',
            title: 'Annex G/Non PRC submission form',
            loading: false,
            fileError: '',
          },
          {
            id: '',
            title: 'Annex C',
            loading: false,
            fileError: '',
          },
          {
            id: '',
            title: 'ICE',
            loading: false,
            fileError: '',
          },
        ],
        rules: {
          selectFieldRequired: [
            /* eslint-disable no-new */
            v => !!v || this.$t('common.fields.validation.field.required'),
          ],
        },
      };
    },
    computed: {
    },
    methods: {
      getIpDocuments() {
        if (this.validateData()) {
          /* eslint-disable */
          const loadedFiles = this.files.filter((item) => {
            return item.id && item.title;
          }).map((item) => {
            return {
              id: item.id,
              title: item.title,
            };
          });
          this.$emit('getIpDocuments', loadedFiles);
          return true;
        }
        return false;
      },
      async loadDocument($event, index) {
        const btnRef = `loadIpDocBtn${index}`;
        const docIpInput = `docIpInput${index}`;
        const that = this;
        const file = $event.target.files[0] || $event.dataTransfer.files[0];

        this.files[index].loading = true;
        this.$refs[btnRef][0].$el.innerText = '';

        if (!this.validateFile(file, index)) {
          return;
        }

        const fileFormData = new FormData();
        fileFormData.append('file', file);

        const data = await this.$store.dispatch('projects/uploadDocument', fileFormData);

        if (data.data.success) {
          this.files[index].loading = false;
          this.$refs[btnRef][0].$el.innerText = file.name;
          this.$refs[btnRef][0].$el.style.display = 'inherit'; // style is needed for correct display of ellipsis in load btn
          this.files[index].fileError = '';
          this.files[index].id = data.data.data.id;
        } else {
          this.$refs[docIpInput][0].value = '';
          this.files[index].fileError = data.data.data.error.message;
          setTimeout(() => {
            that.files[index].loading = false;
            that.files[index].fileError = '';
            that.$refs[btnRef][0].$el.innerText = that.$t('common.btns.upload');
          }, 3000);
        }
      },
      clickLoadDocument(index) {
        const docRef = `docIpInput${index}`;
        this.$refs[docRef][0].click();
      },
      validateData() {
        let isDataValid = true;
        this.files.forEach((item) => {
          if (item.title && !item.id) {
            isDataValid = false;
            item.fileError = this.$t('common.fields.validation.file');
          }
        });
        return isDataValid;
      },
      validateFile(file, rowIndex) {
        // check that files are pdf, doc or docx and each is not bigger than 5Mb
        const allowedExtensions = ['pdf', 'doc', 'docx'];
        const maxAllowedSize = 5;
        const btnRef = `loadIpDocBtn${rowIndex}`;
        const docIpInput = `docIpInput${rowIndex}`;
        const that = this;

        const extension = (/[.]/.exec(file.name)) ? /[^.]+$/.exec(file.name)[0] : '';

        if ((allowedExtensions.includes(extension)) && ((+file.size / 1024 / 1024) < maxAllowedSize)) {
          return true;
        }

        if (!allowedExtensions.includes(extension)) {
          this.files[rowIndex].fileError = this.$t('common.fields.validation.fileFormat');
        }
        if (!((+file.size / 1024 / 1024) < maxAllowedSize)) {
          this.files[rowIndex].fileError = this.$t('common.fields.validation.fileSize');
        }

        this.$refs[docIpInput][0].value = '';
        setTimeout(() => {
          that.files[rowIndex].loading = false;
          that.files[rowIndex].fileError = '';
          that.$refs[btnRef][0].$el.innerText = that.$t('common.btns.upload');
        }, 3000);
        return false;
      },
      clearIpDocuments() {
        this.files.forEach((item, index) => {
          item.fileError = '';
          item.id = '';
          const btnRef = `loadIpDocBtn${index}`;
          const docIpInput = `docIpInput${index}`;
          this.$refs[docIpInput][0].value = '';
          this.$refs[btnRef][0].$el.innerText = this.$t('common.btns.upload');
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
.load-document-btn {
  overflow: hidden;
  max-width: 200px;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex-basis: auto;

  @media(max-width: 400px) {
      max-width: 150px;
  }
}
.document-error {
  font-size: 12px;
  margin: 0;
}
</style>