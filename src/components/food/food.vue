<template>

  <transition name="move">
    <div id="food" v-show="showFlag" ref="food">

      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="" height="425" width="100%">
        </div>
        <div class="back" @click="hide"><i class="icon-arrow_lift"></i></div>
        <!--商品详情-->
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="extra">
            <span class="count">月售{{food.sellCount}}份</span><span class="">好评率{{food.rating}}</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span><span class="old"
                                                          v-show="food.oldPrice">￥{{food.price}}</span>
          </div>

          <div class="cartcontrol-wrapper" v-show="food.count>0">
            <cartcontrol :food="food"></cartcontrol>
          </div>
          <div class="buy" v-show="!food.count|| food.count ===0" @click.stop.prevent="addFirst($event)">加入购物车</div>
        </div>
        <split v-show="food.info"></split>
        <!--商品信息-->
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <!--商品评价-->
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingSelect :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></ratingSelect>
        </div>

      </div>
    </div>
  </transition>


</template>

<script>
  import Vue from 'vue'
  // 我们希望页面可以滚动不出现滚动条
  import cartcontrol from '@/components/cartcontrol/cartcontrol'
  import BScroll from 'better-scroll'
  import split from '@/components/split/split'
  import ratingSelect from '@/components/ratingselect/ratingselect'

  const POSITIVE = 0;
  const NAVIGATE = 1;
  const ALL = 2;

  export default {
    data(){
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: "全部",
          positive: "推荐",
          negative: "吐槽"
        }
      }
    },
    props: {
      food: Object
    },
    methods: {
      show(){
        this.showFlag = true;
        // 我们需要初始化
        this.selectType = ALL;
        this.onlyContent = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }

        })
      },
      hide(){
        this.showFlag = false
      },
      addFirst(event){
//          防止pc多次点击
        if (!event._constructed) {
          return
        }
        Vue.set(this.food, 'count', 1)
      }
    },
    components: {
      cartcontrol,
      split,
      ratingSelect
    }
  }

</script>

<style scoped lang="less">
  @import "../../assets/style/main.less";

  #food {
    position: fixed;
    top: 0;
    bottom: 46px;
    left: 0;
    right: 0;
    width: 100%;
    background: #fff;
    z-index: 50;
    transition: all 0.2s linear;
    &.move-enter-active, &.move-leave-active {
      transform: translate3d(0, 0, 0);
    }
    &.move-enter-active, &.move-leave-active {
      transform: translate3d(100%, 0, 0);
    }
    .food-content {
      .image-header {
        position: relative;
        width: 100%;
        padding-top: 100%;
        height: 0;
        img {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      }
      .back {
        position: absolute;
        top: 10px;
        left: 5px;
        .icon-arrow_lift {
          display: block;
          padding: 16px;
          .fs(20);
          color: #fff;
        }

      }
      .content {
        position: relative;
        padding: 18px;
        .title {
          margin: 2px 0 8px 0;
          .fs(14);
          .lh(14);
          .h(14);
          color: rgb(7, 17, 27);
          font-weight: 700;
        }
        .extra {
          .fs(10);
          color: rgb(147, 153, 159);
          .lh(10);
          .count {
            .mr(12);
            .mb(18);
          }
        }
        .price {
          font-weight: 700;
          .mt(18);
          .lh(24);
          .now {
            .mr(8);
            .fs(14);
            color: rgb(240, 20, 20);

          }
          .old {
            .fs(10);
            color: rgb(147, 153, 159);
            text-decoration: line-through;
            .ml(4);
          }
        }
        .cartcontrol-wrapper {
          position: absolute;
          right: 12px;
          bottom: 12px;
        }
        .buy {
          position: absolute;
          right: 18px;
          bottom: 18px;
          .h(24);
          .lh(24);
          .fs(10);
          padding: 0 12px;
          color: #fff;
          background: rgb(0, 160, 220);
          border-radius: 12px;
          box-sizing: border-box;

        }
      }
      .info {
        padding: 18px;

        .title {
          .mb(16);
          .fs(14);
          .lh(14);
          color: #000;
        }
        .text {
          .lh(24);
          .fs(12);
          padding: 0 8px;
        }
      }
      .rating{
        .pt(18);
        .title{
          .ml(18);
          .fs(14);
          .lh(14);
          .h(14);
          color: rgb(7, 17, 27);
          font-weight: 700;
        }


      }

    }
  }
</style>
