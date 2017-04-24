<template>
  <div id="title_line">
    <div class="line"></div>
    <div class="text">优惠信息</div>
    <div class="line"></div>
  </div>
</template>

<script>

</script>

<style scoped lang="less">
  @import "../../assets/style/main.less";

  #title_line{
    display: flex;
    width: 80%;
    margin: 30px auto 24px auto;
    .line{
      flex: 1;
      position: relative;
      top: -6px;
      border-bottom: 1px solid rgba(255,255,255,0.2);
    }
    .text{
      padding: 0 12px;
      font-size: 14px;
    }
  }

</style>
