<template>
  <div id="rating">
    <div class="rating-content">
      <div class="info">
        <div class="mark">
          <div class="num">{{seller.score}}</div>
          <div class="text">综合评分</div>
          <div class="contrast">高于周边商家{{seller.rankRate}} %</div>
        </div>
        <div class="mark-right">
          <div class="serviceScore">
            <span class="text">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="num">{{seller.serviceScore}}</span>
          </div>
          <div class="foodScore">
            <span class="text">服务态度</span>
            <star :size="36" :score="seller.foodScore" class="star"></star>
            <span class="num">{{seller.foodScore}}</span>
          </div>
          <div class="deliverTime">
            <span class="text">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
    </div>

  </div>
</template>

<script>
  import star from  '@/components/star/star'
  import split from '@/components/split/split'
  export default{
    name: 'rating',
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      star,
      split
    }
  }

</script>

<style scoped lang="less">
  @import "../../assets/style/main.less";

  #rating {
    position: absolute;
    width: 100%;
    top: 187px;
    bottom: 0;
    .fs(12);
    overflow: hidden;
    .rating-content {
      .info {
        display: flex;
        .mark {
          margin: 18px 0;
          flex: 0 0 137px;
          width: 137px;
          .h(100);
          text-align: center;
          border-right: 1px solid #ccc;
          .num {
            .lh(28);
            .fs(24);
            color: rgb(255, 153, 0);
          }
          .text {
            .fs(12);
            .lh(12);
            color: black;
            padding: 6px 0 8px 0;
          }
          .contrast {
            .fs(10);
            .mb(8);
          }
          @media screen and (max-width: 320px){
            flex: 0 0 100px;
            width: 100px;
          }
        }
        .mark-right {
          padding: 18px 24px;
          @media screen and (max-width: 320px){
            padding: 18px 20px;
          }
          .serviceScore, .foodScore, .deliverTime {
            display: flex;
            margin-bottom: 10px;
            .fs(0);
            .num {
              .fs(12);
              color: rgb(7, 17, 27);
              .pl(12);
              .lh(18);
            }
            .text {
              .fs(12);
              color: rgb(7, 17, 27);
              .lh(18);
              .mr(12);
            }
          }
          .deliverTime {
            .mb(0);
            .time {
              .fs(12);
              color: rgb(147, 153, 159);
              .lh(18);
            }
          }

        }
      }
    }
  }
</style>
