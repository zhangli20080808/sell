<template >
  <div id="shopcart">
    <!-- 左右两部分  -->
    <div class="content">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount>0}">
              <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">
              {{totalCount}}
            </div>
          </div>
          <div class="price" :class="{'highlight':totalPrice>0}">
                {{totalPrice}}元
            </div>
          <div class="desc">
                另需配送费{{deliveryPrice}}元
            </div>
        </div>

        <div class="content-right">
            <div class="pay" :class="payClass">
              {{payDesc}}
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {

  props:{
    // 选择商品的数组 如果选中一个商品 有差价 如果达到了起送价 我们改变他的样式
    // 都可以通过selectfood去变化
    selectFoods :{
      type : Array,
      default: []
    },
    minPrice:{
      type : Number,
      default: 0
    },
    deliveryPrice:{
      type: Number,
      default : 0
    }
  },
  computed:{
    // 总价格
    totalPrice(){
      let total = 0;
      this.selectFoods.forEach((food)=>{
        total += food.price*food.count;
      });
      return total;
    },
    // 总数量
    totalCount(){
      let count = 0;
      this.selectFoods.forEach((food)=>{
        count += food.count;
      });
      return count;
    },
    // 去结算部分
    payDesc(){
      if(this.totalPrice === 0){
        // 我们使用$符传入
        return `¥${this.minPrice}元起送`
      }else if(this.totalPrice < this.minPrice){
        var diff = this.minPrice-this.totalPrice;
        return `还差${diff}元起送`
      }else {
        return '去结算';
      }
    },
    payClass(){
      if(this.totalPrice < this.minPrice){
        return 'not-enough';
      }else {
        return 'enough';
      }
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
            &.highlight{
              background: rgb(0,160,220);
            }
            .icon-shopping_cart{
              .fs(24);
              color: #80858a;
              .lh(44);
              &.highlight{
                color:#fff
              }
            }
          }
          .num{
            position: absolute;
            top: 0;
            right: 0;
            width: 24px;
            height: 16px;
            line-height: 16px;
            .fs(9);
            border-radius: 14px;
            font-weight: 700;
            color: #fff;
            background: rgb(240,20,20);
            text-align: center;
            box-shadow: 0 4px 8px rgba(0,0,0,0.4)
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
            &.highlight{
              color:#fff
            }
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
          &.not-enough{
            background: #2b333b;
          }
          &.enough{
            background: #00b43c;
            color: #fff;
          }
        }
      }
    }



</style>
