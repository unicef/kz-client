<template>                    
  <transition name="slide-y-transition">
    <div class="captcha-error mt-1">
      {{ $t('common.fields.validation.captcha') }}
    </div>
  </transition>
</template>

<script>
  export default {

  };
</script>

<style lang="scss" scoped>
  .captcha-error {
    color: #e7695d;
    font-size: 13px;
  }
</style>

