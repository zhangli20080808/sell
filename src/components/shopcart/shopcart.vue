<template >
  <div id="shopcart">
    <!-- 左右两部分  -->
    <div class="content">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo">
              <i class="icon-shopping_cart"></i>
            </div>
          </div>
          <div class="price">
                40元
            </div>
          <div class="desc">
                另需配送费{{deliveryPrice}}元
            </div>
        </div>

        <div class="content-right">
            <div class="pay">
                还差{{minPrice}}元起送
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {

  props:{
    minPrice:{
      type : Number,
      default: 0
    },
    deliveryPrice:{
      type: Number,
      default : 0
    }

  }

}
</script>

<style lang="less" scoped>
@import "../../assets/style/main.less";

  #shopcart{
    position: fixed;
    width: 100%;
    .h(48);
    left: 0;
    bottom: 0;
    .content{
      display: flex;
      background: #141d27;
      .content-left{
        flex: 1;
        .logo-wrapper{
          vertical-align: top;
          display: inline-block;
          .fs(0);
          position: relative;
          top: -10px;
          margin:0 12px;
          padding: 6px;
          // 我们的宽度包含了border padding
          width: 56px;
          height: 56px;
          box-sizing: border-box;

          border-radius: 50%;
          background: #141d27;
          .logo{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: #2b343c;
            text-align: center;
            .icon-shopping_cart{
              .fs(24);
              color: #80858a;
              .lh(44);
            }
          }
        }
        .price{
            display: inline-block;
            vertical-align: top;
            .lh(24);
            font-weight: 700;
            .pr(12);
            border-right: 1px solid rgba(255,255,255,0.1);
            .fs(16);
            .mt(12);
            color:rgba(255,255,255,0.4);
            box-sizing: border-box;
          }
        .desc{
            display: inline-block;
            vertical-align: top;
            margin: 12px 0 0 12px;
            .lh(24);
            .fs(10);
            color:rgba(255,255,255,0.4);
          }
        }
      }
      .content-right{
        flex:0 0 105px;
        width: 105px;
        .pay{
          .h(48);
          .lh(48);
          .fs(12);
          color:rgba(255,255,255,0.4);
          font-weight: 700;
          text-align: center;
          background: #2b333b;
        }
      }
    }



</style>
