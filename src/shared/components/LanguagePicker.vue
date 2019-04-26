<template>
  <v-menu left :nudge-bottom='40' :min-width='132' :lazy='true'>
    <v-layout tag='button' align-center class='picker-btn' flat slot="activator">
      <span v-if="languages[locale]" class="pl-2">{{ languages[locale].code }}</span>
      <svgicon class='svg-icon ml-1' width="7" height="6" name="arrow-white-down" color="#ffffff" />
    </v-layout>
    <v-list class="language-list">
      <v-list-tile 
        @click="locale = item.code"
        class="language-list-item"
        v-for="(item, index) in languages" :key="index">
        <v-list-tile-title>
          <v-list-tile-content>
            <v-flex class='language d-flex' align-center>
              <span class="pl-2">{{item.title}}</span>
            </v-flex>
          </v-list-tile-content>
        </v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
  import { setLanguage } from '@/i18n';
  import '@/../static/icons/compiled-svg/arrow-white-down';

  export default {
    name: 'LanguagePicker',
    data() {
      return {
        locale: localStorage.getItem('language') || 'en',
        serverUrl: process.env.ROOT_API,
      };
    },
    watch: {
      async locale(language) {
        await setLanguage(language);
      },
    },
    computed: {
      languages() {
        return this.$store.getters['global/getLanguages'];
      },
    },
  };
</script>

<style lang="scss" scoped>
  .picker-btn {
    font-size: 14px;
    text-transform: uppercase;
    color: #ffffff;
    outline: none;
  }
  .language {
    font-size: 12px;
  }
</style>
