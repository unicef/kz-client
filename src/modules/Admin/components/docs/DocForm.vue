<template>
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
</template>