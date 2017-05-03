<template>

  <span class="icon" :class="iconClassMap[iconType]"></span>

</template>

<script>
  export default {
    data(){
      return {
        iconClassMap: []
      }
    },
    props: {
      iconType: Number
    },
    mounted(){
      this.iconClassMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    }
  }

</script>

<style scoped lang="less">
  @import "../../assets/style/main.less";

  .icon {
    display: inline-block;
    .w(16);
    .h(16);
    background-image: url("img/decrease_3@2x.png");
    background-repeat: no-repeat;
    background-size: 16px 16px;
    .mr(6);
    &.decrease {
      background-image: url("img/decrease_3@2x.png");
    }
    &.discount {
      background-image: url("img/discount_3@2x.png");
    }
    &.guarantee {
      background-image: url("img/guarantee_3@2x.png");
    }
    &.invoice {
      background-image: url("img/invoice_3@2x.png");
    }
    &.special {
      background-image: url("img/special_3@2x.png");
    }
  }

</style>
