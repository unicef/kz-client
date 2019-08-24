<template>
  <v-layout wrap mb-4>
    <v-flex xs12 sm6 :class="{ 'pr-4': $vuetify.breakpoint.smAndUp }">
      <!-- Project title Ru -->
      <v-layout row>
        <v-flex sm12>
          <v-text-field
            :label="$t('common.fields.projectTitleRu') + '*'"
            id="projectTitleRu"
            v-model="credentials.titleRu"
            type="text"
            :rules="rules.fieldRequired"
            required
            :disabled="areFieldsDisabled"
          />
        </v-flex>
      </v-layout>
      <!-- Project title En -->
      <v-layout row>
        <v-flex sm12>
          <v-text-field
            :label="$t('common.fields.projectTitleEn') + '*'"
            id="projectTitleEn"
            v-model="credentials.titleEn"
            type="text"
            :rules="rules.fieldRequired"
            required
            :disabled="areFieldsDisabled"
          />
        </v-flex>
      </v-layout>
      <!-- Programme title & code block -->
      <v-layout row>
        <v-flex xs10>
          <v-layout row>
            <v-flex
              xs12
              :class="programmeFieldError ? 'error--text' : ''"
            >{{$t('common.fields.projectProgramme') + '*'}}</v-flex>
          </v-layout>
          <v-layout row v-if="credentials.programme.id">
            <v-flex xs12>{{ credentials.programme.code }} - {{ credentials.programme.title }}</v-flex>
          </v-layout>
        </v-flex>
        <v-flex sm2>
          <v-btn
            class="mx-2"
            fab
            dark
            color="info"
            v-show="!areFieldsDisabled"
            @click="showProgrammeExtantionPanels=!showProgrammeExtantionPanels"
          >
            <v-icon dark>edit</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-layout row v-if="programmeFieldError">
        <v-flex xs12 class="error--text">{{programmeFieldError}}</v-flex>
      </v-layout>
      <v-layout row v-if="showProgrammeExtantionPanels">
        <v-expansion-panel>
          <v-expansion-panel-content
            v-for="fieldLevel1 in projectProperties.programmes"
            :key="fieldLevel1.id"
            :readonly="!fieldLevel1.hasChildren"
            :class="{'no-children': !fieldLevel1.hasChildren}"
          >
            <div slot="header">
              <v-checkbox
                color="primary"
                :label="`${fieldLevel1.code} - ${fieldLevel1.title}`"
                @click.stop="chooseProgrammeField(fieldLevel1)"
                :input-value="credentials.programme.id === fieldLevel1.id"
              ></v-checkbox>
            </div>
            <v-card>
              <v-card-text>
                <v-expansion-panel>
                  <v-expansion-panel-content
                    v-for="fieldLevel2 in fieldLevel1.children"
                    :key="fieldLevel2.id"
                    :readonly="!fieldLevel2.hasChildren"
                    :class="{'no-children': !fieldLevel2.hasChildren}"
                  >
                    <div slot="header">
                      <v-checkbox
                        color="primary"
                        :label="`${fieldLevel2.code} - ${fieldLevel2.title}`"
                        @click.stop="chooseProgrammeField(fieldLevel2)"
                        :input-value="credentials.programme.id === fieldLevel2.id"
                      ></v-checkbox>
                    </div>
                    <v-card>
                      <v-card-text>
                        <v-expansion-panel>
                          <v-expansion-panel-content
                            v-for="fieldLevel3 in fieldLevel2.children"
                            :key="fieldLevel3.id"
                            :readonly="!fieldLevel3.hasChildren"
                            :class="{'no-children': !fieldLevel3.hasChildren}"
                          >
                            <div slot="header">
                              <v-checkbox
                                color="primary"
                                :label="`${fieldLevel3.code} - ${fieldLevel3.title}`"
                                @click.stop="chooseProgrammeField(fieldLevel3)"
                                :input-value="credentials.programme.id === fieldLevel3.id"
                              ></v-checkbox>
                            </div>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-layout>
      <!-- ICE KZT -->
      <v-layout row align-center>
        <v-flex xs10>
          <v-text-field
            :label="$t('common.fields.ice') + '*'"
            id="projectIce"
            ref="projectIce"
            v-model="credentials.ice"
            type="text"
            :rules="rules.numberRequired"
            required
            :disabled="areFieldsDisabled"
          />
        </v-flex>
        <v-flex xs2>KZT</v-flex>
      </v-layout>
      <!-- ICE $ -->
      <v-layout row my-2 align-center>
        <v-flex xs10>{{ iceInUsd }}</v-flex>
        <v-flex xs2>$</v-flex>
      </v-layout>
      <!-- Deadline -->
      <v-layout row>
        <v-menu
          ref="menuDeadline"
          :close-on-content-click="false"
          v-model="menuDeadline"
          :return-value.sync="credentials.deadline"
          lazy
          width="260"
          transition="scale-transition"
        >
          <v-text-field
            slot="activator"
            v-model="credentials.deadline"
            :label="$t('common.fields.deadline') + '*'"
            append-icon="event"
            :rules="rules.fieldRequired"
            readonly
          ></v-text-field>
          <v-date-picker
            v-model="credentials.deadline"
            color="primary lighten-1"
            :min="new Date().toISOString().substr(0, 10)"
            :locale="$i18n.locale"
            width="260"
            :disabled="areFieldsDisabled"
            @input="$refs.menuDeadline.save(credentials.deadline)"
          ></v-date-picker>
        </v-menu>
      </v-layout>
      <!-- Project description Ru -->
      <v-layout row>
        <v-flex sm12>
          <v-textarea
            :label="$t('common.fields.descriptionRu') + '*'"
            id="projectDescriptionRu"
            v-model="credentials.descriptionRu"
            type="text"
            :rules="rules.fieldRequired"
            required
            :disabled="areFieldsDisabled"
          />
        </v-flex>
      </v-layout>
      <!-- Project description En -->
      <v-layout row>
        <v-flex sm12>
          <v-textarea
            :label="$t('common.fields.descriptionEn') + '*'"
            id="projectDescriptionEn"
            v-model="credentials.descriptionEn"
            type="text"
            :rules="rules.fieldRequired"
            required
            :disabled="areFieldsDisabled"
          />
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12 sm6 :class="{ 'pl-4': $vuetify.breakpoint.smAndUp }">
      <!-- PROJECT INFO -->
      <v-card v-if="projectData.id" class="mb-4">
        <v-list dense>
          <v-list-tile v-if="projectData.projectCode">
            <v-list-tile-content>{{ $t('common.fields.projectCode') }}:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ projectData.projectCode }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="projectData.createdAt">
            <v-list-tile-content>{{ $t('common.fields.creationDate') }}:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ projectData.createdAt }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="projectData.status">
            <v-list-tile-content>{{ $t('common.fields.projectStatus') }}:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ projectData.status }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="projectData.partnerName">
            <v-list-tile-content>{{ $t('common.fields.ip') }}:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ projectData.partnerName }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="projectData.assistantName">
            <v-list-tile-content>{{ $t('common.fields.assistant') }}:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ projectData.assistantName }}</v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
      <!-- Responsible officer -->
      <v-layout row>
        <v-flex sm12>
          <v-select
            :items="officers"
            v-model="credentials.officer"
            :label="$t('common.fields.officer') + '*'"
            item-text="name"
            item-value="id"
            return-object
            :rules="rules.selectFieldRequired"
            :disabled="areFieldsDisabled"
            required
          ></v-select>
        </v-flex>
      </v-layout>
      <!-- Section -->
      <v-layout row>
        <v-flex sm12>
          <v-select
            :items="sections"
            v-model="credentials.section"
            :label="$t('common.fields.section') + '*'"
            item-text="title"
            item-value="id"
            return-object
            :rules="rules.selectFieldRequired"
            :disabled="areFieldsDisabled"
            required
          ></v-select>
        </v-flex>
      </v-layout>
      <!-- Set IP btn  (show only when project status is created) -->
      <v-layout row v-if="isProjectCreated">
        <v-flex sm12>
          <v-btn
            block
            type="button"
            @click="setIP"
            color="info mb-2 mt-2"
            depressed
            :loading="!isProjectDataSaved"
          >{{ $t('common.btns.setIP') }}</v-btn>
        </v-flex>
      </v-layout>
      <v-layout row v-if="isProjectCreated">
        <v-flex sm12>{{ $t('setIP.warning') }}</v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  import { findNestedObj } from '@/shared/helpers/findNestedObj';

  export default {
    name: 'ProjectDetails',
    components: {
    },
    props: {
      projectData: {
        type: Object,
      },
      isProjectDataSaved: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        credentials: {
          id: null,
          titleRu: '',
          titleEn: '',
          deadline: '',
          ice: null,
          usdRate: null,
          officer: null,
          section: null,
          descriptionRu: '',
          descriptionEn: '',
          createdAt: '',
          status: '',
          programme: {},
        },
        menuDeadline: false,
        programmeFieldError: '',
        showProgrammeExtantionPanels: false,
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
    computed: {
      projectProperties() {
        return this.$store.getters['projects/getProjectProperties'];
      },
      isProjectInProgress() {
        return this.projectData.status === 'In progress';
      },
      isProjectTerminated() {
        return this.projectData.status === 'Project termination';
      },
      isProjectCreated() {
        return this.projectData.status === 'Created';
      },
      isProjectCompleted() {
        return this.projectData.status === 'Completed';
      },
      roles() {
        return this.$store.getters['global/getRoles'];
      },
      isPartner() {
        return this.roles.indexOf('ra') !== -1 || this.roles.indexOf('ap') !== -1;
      },
      isDonor() {
        return this.roles.indexOf('d') !== -1;
      },
      areFieldsDisabled() {
          return this.isPartner ||
                 this.isDonor ||
                 this.isProjectInProgress ||
                 this.isProjectTerminated ||
                 this.isProjectCompleted;
      },
      officers() {
        return this.$store.getters['projects/getProjectProperties'].officers;
      },
      sections() {
        return this.$store.getters['projects/getProjectProperties'].sections;
      },
      iceInUsd() {
        // if entered ice value is not valid or usd rate is not loaded yet show ice in usd = 0.00
        if (!(/^\d*\.?\d{1,2}$/.test(this.credentials.ice)) || (!this.projectProperties.usdRate && !this.projectData.usdRate)) {
          return (0).toFixed(2);
        }
        // when changing ice value or set ice for the first time show ice in usd taking into account current usd to kzt rate
        if (+this.projectData.ice !== +this.credentials.ice || !this.projectData.id) {
          this.credentials.usdRate = this.projectProperties.usdRate;
          return (+this.credentials.ice / this.projectProperties.usdRate).toFixed(2);
        }

        // show ice in usd taking into account usd to kzt rate for the moment of project creation
        return (+this.credentials.ice / this.projectData.usdRate).toFixed(2);
      },
    },
    watch: {
      projectData() {
        const that = this;
        Object.keys(this.projectData).forEach((key) => {
          that.credentials[key] = that.projectData[key];
        });
      },
      projectProperties() {
        if (this.credentials.programme.id) {
          const updatedProgramme = findNestedObj(this.projectProperties.programmes, 'id', this.credentials.programme.id);
          const selectedProgramme = {
              id: updatedProgramme.id,
              title: updatedProgramme.title,
              code: updatedProgramme.code,
          };
          this.credentials.programme = selectedProgramme;
        }
      },
    },
    created() {
      const that = this;
      Object.keys(this.projectData).forEach((key) => {
        that.credentials[key] = that.projectData[key];
      });
    },
    methods: {
      getProjectDetails() {
        this.$emit('getProjectDetails', this.credentials);
      },
      setIP() {
        this.$emit('setIP');
      },
      chooseProgrammeField(field) {
        this.programmeFieldError = '';
        this.showProgrammeExtantionPanels = false;
        const selectedProgramme = {
            id: field.id,
            title: field.title,
            code: field.code,
        };
        this.credentials.programme = selectedProgramme;
      },
      validateProjectProgrammeField() {
        if (!this.credentials.programme.id) {
            this.programmeFieldError = this.$t('common.fields.validation.field.required');
        } else {
            this.programmeFieldError = '';
        }

        return !!this.credentials.programme.id;
      },
    },
  };
</script>

<style lang="scss" scoped>
.search {
  max-width: 250px;
}
</style>