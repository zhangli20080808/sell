<template>
  <div id="shopcart">
    <!-- 左右两部分  -->
    <div class="content">
      <div class="content-left" @click="listToggle">
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

      <div class="content-right" @click.stop.prevent="pay">
        <div class="pay" :class="payClass">
          {{payDesc}}

        </div>
      </div>
    </div>
    <!--购物车弹层-->
    <transition name="transHeight">
      <div class="cart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title f-l">购物车</h1>
          <span class="name f-r" @click="clearCart">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li v-for="food in selectFoods" class="food">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span class="">{{food.price * food.count}}</span>
              </div>
              <div class="cartControl-wrapper">
                <cartControl :food="food"></cartControl>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="fade-backdrop">
      <div class="backdrop" v-show="showBackdrop" @click="hideBackdrop"></div>
    </transition>

  </div>
</template>

<script>
  import cartControl from '@/components/cartcontrol/cartcontrol'
  import BScroll from 'better-scroll'


  export default {
    data(){
      return {
        listShow: false,
        // 我们用他表示是折叠还是展开
      }
    },
    props: {
      // 选择商品的数组 如果选中一个商品 有差价 如果达到了起送价 我们改变他的样式
      // 都可以通过selectfood去变化
      selectFoods: {
        type: Array,
        default(){
          return [];
        }
      },
      minPrice: {
        type: Number,
        default: 0
      },
      deliveryPrice: {
        type: Number,
        default: 0
      }
    },
    mounted(){
//      this.$on('cart-add')
    },
    computed: {
      // 总价格
      totalPrice(){
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      // 总数量
      totalCount(){
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      // 去结算部分
      payDesc(){
        if (this.totalPrice === 0) {
          // 我们使用$符传入
          return `¥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          var diff = this.minPrice - this.totalPrice;
          return `还差${diff}元起送`
        } else {
          return '去结算';
        }
      },
      payClass(){
        if (this.totalPrice < this.minPrice) {
          return 'not-enough';
        } else {
          return 'enough';
        }
      },
      showBackdrop() {
        if (this.listShow && this.totalPrice) {
          return true
        }
        this.listShow = false;
        return false
      }
    },
    methods: {
      listToggle() {
        if (!this.selectFoods.length) {
          return
        }
        this.listShow = !this.listShow;
        if(this.listShow){
          this.$nextTick(()=>{
              if(!this.scroll){
                this.scroll = new BScroll(this.$refs.listContent,{
                  click:true
                })
              }else {
                  this.scroll.refresh()
              }

          })
        }
      },
      hideBackdrop() {
        this.listShow = false
      },
      clearCart(){
         this.selectFoods.forEach((food)=>{
             food.count = 0;
         })
      },
      pay(){
          if(this.totalPrice<this.minPrice){
              return
          }
          window.alert(`需支付${this.totalPrice}元`)
      }
    },
    components: {
      cartControl
    }

  }
</script>

<style lang="less" scoped>
  @import "../../assets/style/main.less";

  #shopcart {
    position: fixed;
    width: 100%;
    .h(48);
    left: 0;
    bottom: 0;
    z-index: 1000;
    .content {
      display: flex;
      background: #141d27;
      .content-left {
        flex: 1;
        .logo-wrapper {
          vertical-align: top;
          display: inline-block;
          .fs(0);
          position: relative;
          top: -10px;
          margin: 0 12px;
          padding: 6px;
          // 我们的宽度包含了border padding
          width: 56px;
          height: 56px;
          box-sizing: border-box;

          border-radius: 50%;
          background: #141d27;
          .logo {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: #2b343c;
            text-align: center;
            &.highlight {
              background: rgb(0, 160, 220);
            }
            .icon-shopping_cart {
              .fs(24);
              color: #80858a;
              .lh(44);
              &.highlight {
                color: #fff
              }
            }
          }
          .num {
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
            background: rgb(240, 20, 20);
            text-align: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4)
          }
        }
        .price {
          display: inline-block;
          vertical-align: top;
          .lh(24);
          font-weight: 700;
          .pr(12);
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          .fs(16);
          .mt(12);
          color: rgba(255, 255, 255, 0.4);
          box-sizing: border-box;
          &.highlight {
            color: #fff
          }
        }
        .desc {
          display: inline-block;
          vertical-align: top;
          margin: 12px 0 0 12px;
          .lh(24);
          .fs(10);
          color: rgba(255, 255, 255, 0.4);
        }
      }
      .content-right {
        flex: 0 0 105px;
        width: 105px;
        .pay {
          .h(48);
          .lh(48);
          .fs(12);
          color: rgba(255, 255, 255, 0.4);
          font-weight: 700;
          text-align: center;
          &.not-enough {
            background: #2b333b;
          }
          &.enough {
            background: #00b43c;
            color: #fff;
          }
        }
      }
    }
    .cart-list {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      background: #fff;
      // -100%相对于当前自身的高度
      transform: translate3d(0, -100%, 0);
      &.transHeight-enter-active, &.transHeight-leave-active {
        transition: all 0.5s
      }
      &.transHeight-enter, &.transHeight-leave-active {
        transform: translate3d(0, 0, 0)
      }
      .list-header {
        .h(40);
        .lh(40);
        padding: 0 8px;
        background: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .name {
          .fs(12);
          color: rbb(0, 160, 220);
        }
      }
      .list-content {
        max-height: 217px;
        overflow: hidden;
        .food {
          position: relative;
          box-sizing: border-box;
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);
          display: flex;
          margin: 0 18px;
          .h(48);
          .name {
            flex: 1;
            .lh(48);
            .fs(14);
          }
          .price {
            .lh(48);
            color: red;
            padding: 0 12px 0 18px;
            .fs(14);
            font-weight: 700;
          }
          .cartControl-wrapper {
            .fs(14);
            .mt(6);
          }
        }
      }
    }
    .backdrop {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(7, 17, 27, 0.6);
      backdrop-filter: blur(10px);
      z-index: -2;
      &.fade-backdrop-enter-active, &.fade-backdrop-leave-active {
        transition: opacity 0.4s;
      }
      &.fade-backdrop-enter-active, &.fade-backdrop-leave-active {
        opacity: 0;
      }
    }
  }


</style>
