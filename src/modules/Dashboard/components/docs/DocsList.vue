<template>
  <v-layout wrap justify-center>
    <v-flex xs12 md8 mt-4>
      <v-toolbar class="headline justify-center" color="light-blue">
        {{ $t('docs.allPages') }}
      </v-toolbar>

      <v-card>
        <v-container :class="{ 'pt-4': $vuetify.breakpoint.xs }">
          <div
            v-for="doc in documents"
            :key="doc.id"
            class="mb-2"
          >
            <router-link :to="'/dashboard/docs/' + doc.key">
              <div v-if="$i18n.locale === 'en'">
                {{ doc.titleEn }}
              </div>
              <div v-if="$i18n.locale === 'ru'">
                {{ doc.titleRu }}
              </div>
            </router-link>
          </div>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
/* eslint-disable */
export default {
  name: 'DocumentList',
  data() {
    return {
        documents: [
          {
              "id": 21,
              "key": "dkdkkddkk",
              "titleEn": "ldlkfkdlfsd99",
              "titleRu": "9ddf9d9fd9",
              "isPublic": true,
              "createdAt": "2019-09-17 12:19"
          },
          {
              "id": 19,
              "key": "f9d9df9",
              "titleEn": "dlklfkds ",
              "titleRu": "kdfd f9d9",
              "isPublic": false,
              "createdAt": "2019-09-17 12:18"
          },
          {
              "id": 16,
              "key": "d9g9fdg9f",
              "titleEn": "ldfgdf9g9df9",
              "titleRu": "9g9fg9fg9",
              "isPublic": true,
              "createdAt": "2019-09-17 07:23"
          },
          {
              "id": 11,
              "key": "dlkfdljkfdjkl",
              "titleEn": "klsdfljkdsjl",
              "titleRu": "kldflkjdfjkl",
              "isPublic": true,
              "createdAt": "2019-09-17 06:27"
          },
          {
              "id": 10,
              "key": "dklfdjlkfj",
              "titleEn": "slfsdlflkj",
              "titleRu": "dlkfkljdjl",
              "isPublic": true,
              "createdAt": "2019-09-17 06:26"
          },
          {
              "id": 8,
              "key": "test1",
              "titleEn": "test1",
              "titleRu": "тест1",
              "isPublic": true,
              "createdAt": "2019-09-17 06:24"
          },
          {
              "id": 7,
              "key": "testpage1",
              "titleEn": "Test page",
              "titleRu": "Тестовая страница",
              "isPublic": true,
              "createdAt": "2019-09-17 06:04"
          },
          {
              "id": 2,
              "key": "agreements",
              "titleEn": "Agreements",
              "titleRu": "Соглашения",
              "isPublic": true,
              "createdAt": "2019-09-16 03:05"
          },
          {
              "id": 1,
              "key": "terms",
              "titleEn": "Terms and conditions",
              "titleRu": "Условия и положения",
              "isPublic": true,
              "createdAt": "2019-09-16 02:44"
          }
      ],
    };
  },
  // computed: {
  //   document() {
  //     return this.$store.getters['dashboard/docs/getDocument'];
  //   },
  //   currentPage() {
  //       return this.$store.getters['dashboard/docs/getCurrentPage'];
  //   },
  //   alert() {
  //     return this.$store.getters['dashboard/docs/getErrorAlert'];
  //   },
  // },
};
</script>

<style lang="scss" scoped>
  .content {
    overflow-x: auto;
  }
</style>
