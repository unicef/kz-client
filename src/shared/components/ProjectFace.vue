<template>
  <v-layout wrap mt-4 mb-4>
    <v-flex xs12 mb-2 :class="{ 'pr-4': $vuetify.breakpoint.smAndUp }">
      <h3 class="title mb-3">{{ $t('projectFaces.title') }}</h3>
      {{ (projectFaces.length) ? '' : $t('projectFaces.noData') }}
      <v-layout v-if="projectFaces.length">
        <v-layout wrap v-for="(face, index) in projectFaces" :key="index">
          <v-flex xs12 md6 :class="{ 'pr-4': $vuetify.breakpoint.mdAndUp }">
            <v-layout wrap v-if="face.requestId">
              <v-flex xs6>{{ face.requestDate }}</v-flex>
              <v-flex xs6>
                <a
                  :href="`/dashboard/projects/project/${$route.params.id}/face-request/${face.requestId}`"
                >{{ $t('projectFaces.faceRequest') }} {{face.num}}</a>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 md6>
            <v-layout wrap v-if="face.reportId">
              <v-flex xs6>{{ face.requestDate }}</v-flex>
              <v-flex xs6>
                <a
                  :href="`/dashboard/projects/project/${$route.params.id}/face-report/${face.reportId}`"
                >{{ $t('projectFaces.faceReport') }} {{face.num}}</a>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'ProjectFaces',
    data() {
      return {
      };
    },
    computed: {
      projectFaces() {
        return this.$store.getters['projects/getProjectFaces'];
      },
    },
    async created() {
      if (this.$route.params.id) {
        await this.$store.dispatch('projects/getProjectFaces', this.$route.params.id);
      }
    },
  };
</script>

<style lang="scss" scoped>
</style>