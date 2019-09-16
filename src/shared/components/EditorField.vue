<template>
  <div>
    <div class="subheading mb-2">
      <slot name="title"></slot>
    </div>
    <ckeditor
      :value="value"
      tag-name="textarea"
      :editor="editor"
      :config="config"
      @input="onEditorInput"
    />

    <!-- Validation -->
    <transition name="slide-y-transition">
      <div
        v-show="validation"
        class="v-messages error--text mt-2 pl-2"
      >
        {{ $t('common.fields.validation.field.required') }}
      </div>
    </transition>
  </div>
</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  components: {
    ckeditor: CKEditor.component,
  },
  props: {
    value: {
      type: String,
    },
    config: {
      type: Object,
      default() {
        return {};
      },
    },
    validation: {
      type: Boolean,
    },
  },
  data() {
    return {
      editor: ClassicEditor,
    };
  },
  methods: {
    onEditorInput(value) {
      this.$emit('input', value);
    },
  },
};
</script>