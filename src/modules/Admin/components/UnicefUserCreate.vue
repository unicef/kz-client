<template>
  <div class="container">
    <div class="ui_title">Create user</div>
    <v-form>
      <v-text-field label="Email" required></v-text-field>
      <v-text-field label="Name" required></v-text-field>
      <v-text-field label="Last Name" required></v-text-field>
      <v-select :items="jobs" label="Occupation/Job title" required></v-select>
      <v-text-field label="Telephone number" required></v-text-field>
      <v-text-field label="Mobile number" required></v-text-field>
      <v-select :items="roles" label="Role" required></v-select>
      <v-text-field label="Password" required></v-text-field>
      <v-text-field label="Confirm password" required></v-text-field>
      <v-layout>
        <v-btn color="primary">Create</v-btn>
        <v-btn color="error">Cancel</v-btn>
      </v-layout>
    </v-form>
  </div>
</template>

<script>
  export default {
    name: 'UnicefUserCreate',
    data() {
        return {
            jobs: ['Architect', 'Brick Mason', 'Construction Laborer', 'Electrician', 'Environmental Engineer', 'Glazier'],
            roles: ['Admin', 'user'],
        };
    },
  };
</script>

<style lang="scss" scoped>
</style>