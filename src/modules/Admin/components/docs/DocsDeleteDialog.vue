<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="display"
      persistent
      max-width="320"
      @keydown.esc='onClose'
    >
      <v-card class="px-2 py-2">
        <v-card-title class="headline">Delete</v-card-title>
        <v-card-text>Do you really want to delete this article?</v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="onDelete">Yes</v-btn>
          <v-btn color="primary" @click="onClose">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    name: 'BlockUserDialog',
    props: {
      display: {
        type: Boolean,
      },
    },
    methods: {
      onDelete() {
        this.$emit('delete');
      },
      onClose() {
        this.$emit('close');
      },
    },
  };
</script>
