<template lang="html">
  <transition name="fade-backdrop">
    <div class="backdrop" v-show="isShow"></div>
  </transition>
</template>


<script>
  export default {
    props: {
      isShow: Boolean
    }
  }

</script>

<style scoped lang="less">
  @import "../../assets/style/main.less";


  .backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(7, 17, 27, 0.6);
    z-index: 40;

  &.fade-backdrop-enter-active,

  &.fade-backdrop-leave-active {
    transition: opacity 0.4s;
  }
  &.fade-backdrop-enter-active,&.fade-backdrop-leave-active {
    opacity: 0;
  }
  }
</style>
