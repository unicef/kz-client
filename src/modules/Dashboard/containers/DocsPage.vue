<template>
    <div class="container">
       <document />
    </div>
</template>


<script>
  import Document from '../components/docs/Document';
  
  export default {
    name: 'DocsPage',
    components: {
      Document,
    },
    beforeRouteEnter(to, from, next) {
      next(async (vm) => {
        const document = vm.$route.params.page;

        await vm.$store.dispatch('dashboard/docs/fetchDocumentData', document);
      });
    },
  };
</script>