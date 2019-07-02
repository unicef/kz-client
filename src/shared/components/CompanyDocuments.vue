<template>
  <v-layout wrap mb-4>
    <v-flex xs12 sm6 :class="{ 'pr-4': $vuetify.breakpoint.smAndUp }">
      <h3 class="title mb-2">{{ $t('documents.title') }}</h3>
    </v-flex>
    <v-flex xs12 sm6 :class="{ 'pl-4': $vuetify.breakpoint.smAndUp }">
      <v-alert
        value="true"
        type="info"
      >{{ $t('companyDocuments.info') }}</v-alert>
    </v-flex>
    <v-flex mt-4 xs12 v-if="companyDocumentsData.length">
      <!-- Company already loaded documents -->
      <v-layout wrap mb-2 v-for="(doc, index) in companyDocumentsData" :key="index">
        <v-flex xs12 sm6 md6>{{ doc.title }}</v-flex>
        <v-flex xs12 sm6 md6>
          <v-layout wrap align-content-start>
            <v-flex xs9>
              <a @click="downloadDocument(doc.id)">{{doc.title}}</a>
            </v-flex>
            <v-flex xs3>
              <v-btn class="my-0" flat icon @click="deleteDocument(doc.id)">
                <svgicon class="svg-icon" width="10" height="10" color="red" name="close"/>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12>
      <v-layout justify-end wrap>
        <v-flex xs12 v-for="(row, index) in docsInputRows" :key="index">
          <v-layout wrap>
            <v-flex xs12 sm6 :class="{ 'pr-4': $vuetify.breakpoint.smAndUp }">
              <v-text-field
                :label="$t('common.fields.fileName')"
                :id="'fileName' + index"
                v-model="credentials.files[index].title"
                :ref="'fileName' + index"
                type="text"
                :disabled="credentials.files[index].title==='Partner Declaration Profile and due Diligence Verification Form'"
                @input="checkFileInputError(index)"
                :rules="(credentials.files[index].id) ? rules.fieldRequired : []"
              />
            </v-flex>
            <v-flex xs12 sm6 :class="{ 'pl-4': $vuetify.breakpoint.smAndUp }">
              <span><v-btn
                class="load-document-btn"
                color="info"
                :ref="'loadDocBtn' + index"
                :loading="credentials.files[index] ? credentials.files[index].loading : false"
                @click="clickLoadDocument(index)"
              >{{ $t('common.btns.upload') }}</v-btn></span>
              <v-btn
                class="my-0"
                flat
                icon
                v-if="credentials.files[index] && credentials.files[index].id"
                @click="deleteTempDocument(index)"
              >
                <svgicon class="svg-icon" width="10" height="10" color="red" name="close"/>
              </v-btn>
              <input
                v-show="false"
                type="file"
                :ref="'docInput' + index"
                :error-messages="'This is error'"
                :rules="(credentials.files[index].title) ? rules.fieldRequired : []"
                @change="loadDocument($event, index)"
              >
              <p
                class="red--text document-error"
                v-if="credentials.files[index] && credentials.files[index].fileError"
              >{{ credentials.files[index].fileError }}</p>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-btn color="info" @click="addRow">{{ $t('common.btns.addFile') }}</v-btn>
      </v-layout>
    </v-flex>
    <delete-document-dialog/>
  </v-layout>
</template>

<script>
  import { saveAs } from 'file-saver';
  import { base64StringToBlob } from 'blob-util';
  import '@/../static/icons/compiled-svg/close';
  import DeleteDocumentDialog from '@/shared/components/DeleteDocumentDialog';

  export default {
    name: 'CompanyDocuments',
    components: {
      DeleteDocumentDialog,
    },
    props: {
      companyDocumentsData: {
        type: Array,
      },
    },
    watch: {
      companyDocumentsData() {
        this.clearCompanyDocuments();
        this.addRowForAnexgUploading();
      },
    },
    data() {
      return {
        docsInputRows: 0,
        credentials: {
            files: [],
        },
        rules: {
          fieldRequired: [
            /* eslint-disable no-new */
            v => !!v.trim() || this.$t('common.fields.validation.field.required'),
          ],
        },
      };
    },
    computed: {
      isAdminPath() {
        return this.$route.path.indexOf('admin') !== -1;
      },
      isPartnerPath() {
        return this.$route.path.indexOf('partner') !== -1;
      },
      isClientPath() {
        return this.$route.path.indexOf('dashboard') !== -1;
      },
      isPartnerCreationPath() {
        return this.$route.path.indexOf('partner-create') !== -1;
      },
    },
    created() {
      this.addRowForAnexgUploading();
    },
    methods: {
      getCompanyDocuments() {
        if (this.validateData()) {
          /* eslint-disable */
          const loadedFiles = this.credentials.files.filter((item) => {
            return item.id && item.title;
          }).map((item) => {
            return {
              id: item.id,
              title: item.title,
            };
          });
          this.$emit('getCompanyDocuments', loadedFiles);
          return true;
        }
        return false;
      },
      clearCompanyDocuments() {
        this.credentials.files = [];
        this.docsInputRows = 0;
      },
      addRowForAnexgUploading() {
        // add a required load doc row if Anexg not loaded (for client side)
        /* eslint-disable */
        const isAnexgLoaded = !!this.companyDocumentsData.filter((item) => {
          return item.title === 'Partner Declaration Profile and due Diligence Verification Form';
        }).length;
        const isRowForAnexgLoaded = !!this.credentials.files.filter((item) => {
          return item.title === 'Partner Declaration Profile and due Diligence Verification Form';
        }).length;

        if (!isAnexgLoaded && !isRowForAnexgLoaded && this.isClientPath) {
          const fileObj = {
            id: '',
            title: 'Partner Declaration Profile and due Diligence Verification Form',
            loading: false,
            fileError: '',
          };
          this.docsInputRows++;
          this.credentials.files.push(fileObj);
        }
      },
      async downloadDocument(docId) {
        const data = await this.$store.dispatch('users/getCompanyDocument', docId);
        if (data.success) {
          const blob = base64StringToBlob(data.data.doc, data.data.contentType);
          saveAs(blob, data.data.filename);
        }
      },
      deleteDocument(id) {
        console.log('delete document with id: ', id);
        this.$store.commit('users/setDeleteDocumentId', id);
        this.$store.commit('users/toggleDeleteDocumentDialogState', true);
      },
      deleteTempDocument(index) {
        const btnRef = `loadDocBtn${index}`;
        const docInput = `docInput${index}`;

        this.credentials.files[index].id = '';
        this.$refs[docInput][0].value = '';
        this.$refs[btnRef][0].$el.innerText = this.$t('common.btns.upload');
        if (this.credentials.files[index].title) {
          this.credentials.files[index].fileError = this.$t('common.fields.validation.file');
        }
      },
      async loadDocument($event, index) {
        const btnRef = `loadDocBtn${index}`;
        const docInput = `docInput${index}`;
        const that = this;
        const file = $event.target.files[0] || $event.dataTransfer.files[0];

        this.credentials.files[index].loading = true;
        this.$refs[btnRef][0].$el.innerText = '';

        if (!this.validateFile(file, index)) {
          return;
        }

        const fileFormData = new FormData();
        fileFormData.append('file', file);

        const data = await this.$store.dispatch('users/uploadDocument', fileFormData);

        if (data.data.success) {
          this.credentials.files[index].loading = false;
          this.$refs[btnRef][0].$el.innerText = file.name;
          this.$refs[btnRef][0].$el.style.display = 'inherit'; // style is needed for correct display of ellipsis in load btn
          this.credentials.files[index].fileError = '';
          this.credentials.files[index].id = data.data.data.id;
        } else {
          this.$refs[docInput][0].value = '';
          this.credentials.files[index].fileError = data.data.data.error.message;
          setTimeout(() => {
            that.credentials.files[index].loading = false;
            that.credentials.files[index].fileError = '';
            that.$refs[btnRef][0].$el.innerText = that.$t('common.btns.upload');
          }, 3000);
        }
      },
      clickLoadDocument(index) {
        const docRef = `docInput${index}`;
        this.$refs[docRef][0].click();
      },
      addRow() {
        const fileObj = {
          id: '',
          title: '',
          loading: false,
          fileError: '',
        };
        this.docsInputRows++;
        this.credentials.files.push(fileObj);
      },
      validateData() {
        let isDataValid = true;
        this.credentials.files.forEach((item) => {
          if (item.title && !item.id) {
            isDataValid = false;
            item.fileError = this.$t('common.fields.validation.file');
          }
        });
        return isDataValid;
      },
      checkFileInputError(index) {
        if (!this.credentials.files[index].title) {
          this.credentials.files[index].fileError = '';
        }
      },
      validateFile(file, rowIndex) {
        // check that files are pdf, doc or docx and each is not bigger than 5Mb
        const allowedExtensions = ['pdf', 'doc', 'docx'];
        const maxAllowedSize = 5;
        const btnRef = `loadDocBtn${rowIndex}`;
        const docInput = `docInput${rowIndex}`;
        const that = this;

        const extension = (/[.]/.exec(file.name)) ? /[^.]+$/.exec(file.name)[0] : '';

        if ((allowedExtensions.includes(extension)) && ((+file.size / 1024 / 1024) < maxAllowedSize)) {
          return true;
        }

        if (!allowedExtensions.includes(extension)) {
          this.credentials.files[rowIndex].fileError = this.$t('common.fields.validation.fileFormat');
        }
        if (!((+file.size / 1024 / 1024) < maxAllowedSize)) {
          this.credentials.files[rowIndex].fileError = this.$t('common.fields.validation.fileSize');
        }

        this.$refs[docInput][0].value = '';
        setTimeout(() => {
          that.credentials.files[rowIndex].loading = false;
          that.credentials.files[rowIndex].fileError = '';
          that.$refs[btnRef][0].$el.innerText = that.$t('common.btns.upload');
        }, 3000);
        return false;
      },
    },
  };
</script>

<style lang="scss" scoped>
.load-document-btn {
  overflow: hidden;
  max-width: 210px;
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