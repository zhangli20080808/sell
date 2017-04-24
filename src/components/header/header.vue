<template>
  <div id="header">
    <!--内容-->

    <div class="content-wrapper">
      <!--商家图片-->
      <div class="avatar">
        <img :src="seller.avatar" width="66" height="66" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <!--描述-->
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}





        </div>
        <!--活动-->
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="iconClassMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports" @click="show()">
        <span class="count">{{seller.supports.length + '个'}}</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <!--公告-->
    <div class="notice-wrapper" @click="show()">
      <span class="notice-title"></span><span class="notice-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <!--背景-->
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%" alt="">
    </div>
    <!--遮罩-->
    <div class="detail" v-show="detailShow">
      <!--内容-->
      <!--关闭按钮-->
      <div class="detail_wrapper clearfix">
        <div class="detail-main">
          <h2 class="name">{{seller.name}}</h2>
          <div class="star">
            <star :size="48" :score="seller.score"></star>
          </div>
          <title_line></title_line>
        </div>
      </div>

      <div class="detail-close ta-c">
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import star from '@/components/star/star'
  import title_line from '@/components/title/title'
  export default {
    name: 'header',
    data(){
      return {
        detailShow: false
      }
    },
    props: {
      seller: {
        type: Object
      }
    },
    mounted(){
      this.iconClassMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    methods: {
      show(){
        this.detailShow = true;
      }
    },
    components: {
      star,
      title_line
    }

  }
</script>

<style scoped lang="less">

  @import "../../assets/style/main.less";

  #header {
    position: relative;
    color: #fff;
    background: rgba(7, 17, 27, 0.5);
    .content-wrapper {
      position: relative;
      font-size: 0;
      padding: 24px 14px 18px 24px;
      .avatar {
        display: inline-block;
        border-radius: 4px;
        img {
          border-radius: 4px;
        }
      }
      .content {
        display: inline-block;
        .fs(14);
        .ml(16);
        vertical-align: middle;
        .brand {
          display: inline-block;
          vertical-align: top;
          .w(30);
          .h(18);
          background-image: url("img/brand@2x.png");
          background-repeat: no-repeat;
          background-size: 26px 16px;
        }
        .name {
          .fs(16);
          font-weight: bold;
          .lh(18);
        }
      }
      .description {
        .fs(12);
        font-weight: bold;
        .lh(12);
        margin: 8px 0 10px 0;
      }
      .support {
        .fs(12);
        font-weight: bold;
        .lh(12);
        .icon {
          display: inline-block;
          .w(12);
          .h(12);
          background-image: url("img/decrease_1@2x.png");
          background-repeat: no-repeat;
          background-size: 12px 12px;
          .mr(4);
          &.decrease {
            background-image: url("img/decrease_1@2x.png");
          }
          &.discount {
            background-image: url("img/discount_1@2x.png");
          }
          &.guarantee {
            background-image: url("img/guarantee_1@2x.png");
          }
          &.invoice {
            background-image: url("img/invoice_1@2x.png");
          }
          &.special {
            background-image: url("img/special_1@2x.png");
          }
        }
        .text {
          .fs(10);
          font-weight: bold;
          .lh(12);
        }
      }
      .support-count {
        position: absolute;
        right: 12px;
        bottom: 14px;
        padding: 0 8px;
        .h(24);
        .lh(24);
        border-radius: 14px;
        background-color: rgba(0, 0, 0, 0.3);
        text-align: center;
        .count {
          font-size: 10px;
          font-weight: 200;
          line-height: 22px;
          .ml(2);
        }
        .icon-keyboard_arrow_right {
          font-size: 10px;
          .ml(2);
        }
      }
    }
    .notice-wrapper {
      background: rgba(7, 17, 27, 0.2);
      position: relative;
      .h(28);
      .lh(28);
      padding: 0 22px 0 12px;
      /*经常使用的一个组合属性*/
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .fs(10);
      .notice-title {
        display: inline-block;
        vertical-align: middle;
        width: 22px;
        height: 12px;
        background-image: url("img/bulletin@2x.png");
        background-size: 22px 12px;
        background-repeat: no-repeat;
      }
      .notice-text {
        font-weight: 200;
        margin: 0 4px 0 4px;
      }
      .icon-keyboard_arrow_right {
        position: absolute;
        right: 6px;
        top: 7px;
        font-size: 12px;
      }
    }
    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      /*模糊效果*/
      filter: blur(10px);
    }
    .detail {
      text-align: center;
      position: fixed;
      width: 100%;
      height: 100%;
      z-index: 100;
      top: 0;
      left: 0;
      background: rgba(7, 17, 27, 0.8);
      overflow: auto;
      .detail_wrapper {
        width: 100%;
        min-height: 100%;
        .detail-main {
          .mt(64);
          .pb(64);
          .name {
            .lh(16);
            .fs(16);
            font-weight: 700;
          }
        ;
          .star {
            margin-top: 18px;
            padding: 2px 0;
          }
        }
        .detail-close {
          position: relative;
          width: 32px;
          height: 32px;
          margin-top: -64px;
          clear: both;
          .fs(32);
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }
  }

</style>
