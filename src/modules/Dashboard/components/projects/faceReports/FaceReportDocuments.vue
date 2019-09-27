<template>
  <v-layout wrap mb-4>
    <v-flex xs12>
      <v-layout justify-end wrap>
        <v-flex xs12 v-for="(row, index) in docAmount" :key="index">
          <v-layout wrap>
            <v-flex xs12 sm5 md4 :class="{ 'pr-2': $vuetify.breakpoint.smAndUp }">
              <v-text-field
                :label="$t('common.fields.fileName')"
                v-model="docTitles[index].title"
                type="text"
                disabled
              />
            </v-flex>
            <v-flex
              xs12
              sm7
              md8
              v-if="isMyStage && (faceReportStatus === 'waiting' || (faceReportStatus === 'reject' && !faceReportData[files[index].key]))"
              :class="{ 'pl-2': $vuetify.breakpoint.smAndUp }"
            >
              <span>
                <v-btn
                  class="load-document-btn"
                  color="info"
                  :ref="'loadFaceReportDocBtn' + index"
                  :loading="files[index] ? files[index].loading : false"
                  @click="clickLoadDocument(index)"
                >{{ $t('common.btns.upload') }}</v-btn>
              </span>
              <input
                v-show="false"
                type="file"
                :ref="'docFaceReportInput' + index"
                :error-messages="'This is error'"
                :rules="(files[index].title) ? rules.fieldRequired : []"
                @change="loadDocument($event, index)"
              />
              <p
                class="red--text document-error"
                v-if="files[index] && files[index].fileError"
              >{{ files[index].fileError }}</p>
            </v-flex>
            <v-flex
              xs12
              sm7
              md8
              v-if="!(isMyStage && (faceReportStatus === 'waiting' || (faceReportStatus === 'reject' && !faceReportData[files[index].key])))"
              :class="{ 'pl-2': $vuetify.breakpoint.smAndUp }"
            >
              <v-flex xs12 pt-4>
                <v-icon class="pr-2">insert_drive_file</v-icon>
                <a :class="{ 'not-clickable': !files[index].id }" @click="downloadDocument(files[index].id)">{{docTitles[index].title}}</a>
                <v-btn
                  class="my-0"
                  flat
                  icon
                  v-if="isMyStage && (faceReportStatus === 'reject' && files[index].id)"
                  @click="deleteDocument(files[index].id, files[index], index)"
                >
                  <svgicon class="svg-icon" width="10" height="10" color="red" name="close" />
                </v-btn>
              </v-flex>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  import { saveAs } from 'file-saver';
  import { base64StringToBlob } from 'blob-util';

  export default {
    name: 'FaceReportDocuments',
    data() {
      return {
        files: [
          {
            id: null,
            key: 'analyticalDocId',
            title: this.$t('common.fields.analyticalReport'),
            loading: false,
            fileError: '',
          },
          {
            id: null,
            key: 'financialDocId',
            title: this.$t('common.fields.financialReport'),
            loading: false,
            fileError: '',
          },
          {
            id: null,
            key: 'justificationDocId',
            title: this.$t('common.fields.justificationReport'),
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
      faceReportData() {
        return this.$store.getters['projects/getFaceReportData'];
      },
      docAmount() {
        return (this.$store.getters['projects/getFaceReportJustificationDocRequiredState']) ? 3 : 2;
      },
      faceReportStatus() {
        return (this.$store.getters['projects/getProjectInfo'].stage) ? this.$store.getters['projects/getProjectInfo'].stage.status : '';
      },
      isMyStage() {
        return this.$store.getters['projects/getMyReportStageState'];
      },
      docTitles() {
        const titles = [
          {
            key: 'analyticalDocId',
            title: this.$t('common.fields.analyticalReport'),
          },
          {
            key: 'financialDocId',
            title: this.$t('common.fields.financialReport'),
          },
          {
            key: 'justificationDocId',
            title: this.$t('common.fields.justificationReport'),
          },
        ];
        return titles;
      },
    },
    watch: {
      faceReportData() {
        this.updateFilesIds();
      },
      docAmount() {
        const that = this;
        if (this.docAmount !== 3) {
          this.files.forEach((item, index) => {
            if (item.key === 'justificationDocId') {
              that.files[index].id = null;
            }
          });
          this.$store.commit('projects/setFaceReportDataField', { fieldKey: 'justificationDocId', fieldValue: null });
        }
      },
    },
    created() {
      this.updateFilesIds();
    },
    methods: {
      getFaceReportDocuments() {
        if (this.validateData()) {
          /* eslint-disable */
          const loadedFiles = this.files.filter((item) => {
            return item.id && item.title;
          }).map((item) => {
            return {
              id: item.id,
              key: item.key,
            };
          });
          this.$emit('getFaceReportDocuments', loadedFiles);
          return true;
        }
        return false;
      },
      updateFilesIds() {
        const that = this;
        this.files.forEach((item, index) => {
          if (item.key === 'analyticalDocId') {
            that.files[index].id = that.faceReportData.analyticalDocId;
          }
          if (item.key === 'financialDocId') {
            that.files[index].id = that.faceReportData.financialDocId;
          }
          if (item.key === 'justificationDocId') {
            that.files[index].id = that.faceReportData.justificationDocId;
          }
        });
      },
      async loadDocument($event, index) {
        const btnRef = `loadFaceReportDocBtn${index}`;
        const docFaceReportInput = `docFaceReportInput${index}`;
        const that = this;
        const file = $event.target.files[0] || $event.dataTransfer.files[0];

        this.files[index].loading = true;
        this.$refs[btnRef][0].$el.innerText = '';

        if (!this.validateFile(file, index)) {
          return;
        }

        const fileFormData = new FormData();
        fileFormData.append('file', file);

        const data = await this.$store.dispatch('projects/uploadFaceReportDocument', fileFormData);

        if (data.data.success) {
          this.files[index].loading = false;
          this.$refs[btnRef][0].$el.innerText = file.name;
          this.$refs[btnRef][0].$el.style.display = 'inherit'; // style is needed for correct display of ellipsis in load btn
          this.files[index].fileError = '';
          this.files[index].id = data.data.data.id;
        } else {
          this.$refs[docFaceReportInput][0].value = '';
          this.files[index].fileError = data.data.data.error.message;
          setTimeout(() => {
            that.files[index].loading = false;
            that.files[index].fileError = '';
            that.$refs[btnRef][0].$el.innerText = that.$t('common.btns.upload');
          }, 3000);
        }
      },
      clickLoadDocument(index) {
        const docRef = `docFaceReportInput${index}`;
        this.$refs[docRef][0].click();
      },
      validateData() {
        let isDataValid = true;
        this.files.forEach((item, index) => {
          if ((this.docAmount >= index+1) && item.title && !item.id) {
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
        const btnRef = `loadFaceReportDocBtn${rowIndex}`;
        const docFaceReportInput = `docFaceReportInput${rowIndex}`;
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

        this.$refs[docFaceReportInput][0].value = '';
        setTimeout(() => {
          that.files[rowIndex].loading = false;
          that.files[rowIndex].fileError = '';
          that.$refs[btnRef][0].$el.innerText = that.$t('common.btns.upload');
        }, 3000);
        return false;
      },
      async downloadDocument(docId) {
        const data = await this.$store.dispatch('projects/getFaceReportDocument', docId);
        if (data.success) {
          const blob = base64StringToBlob(data.data.doc, data.data.contentType);
          saveAs(blob, data.data.filename);
        }
      },
      async deleteDocument(docId, item, index) {
        const { data } = await this.$store.dispatch('projects/deleteFaceReportDocument', { id: docId, reportId: this.faceReportData.id });

        if (data && data.success) {
           this.$store.commit('projects/setFaceReportDataField', { fieldKey: item.key, fieldValue: null });
           this.files[index].id = null;
        }
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

  @media (max-width: 400px) {
    max-width: 150px;
  }
}
.document-error {
  font-size: 12px;
  margin: 0;
}
.not-clickable {
  pointer-events: none;
}
</style>