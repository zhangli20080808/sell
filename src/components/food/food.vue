<template>

  <transition name="move">
    <div id="food" v-show="showFlag" ref="food">

      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="" height="425" width="100%">
        </div>
        <div class="back" @click="hide"><i class="icon-arrow_lift"></i></div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="extra">
            <span class="count">月售{{food.sellCount}}份</span><span class="">好评率{{food.rating}}</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span><span class="old"
                                                          v-show="food.oldPrice">￥{{food.price}}</span>
          </div>
        </div>
      </div>
    </div>
  </transition>


</template>

<script>
  // 我们希望页面可以滚动不出现滚动条
  import BScroll from 'better-scroll'

  export default {
    data(){
      return {
        showFlag: false
      }
    },
    props: {
      food: Object
    },
    methods: {
      show(){
        this.showFlag = true;
        this.$nextTick(()=>{
            if(!this.scroll){
                this.scroll = new BScroll(this.$refs.food,{
                    click:true
                })
            }else {
                this.scroll.refresh()
            }

        })
      },
      hide(){
        this.showFlag = false
      }
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
      .content{
        padding:18px;
        .title{
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
      }
    }
  }
</style>
