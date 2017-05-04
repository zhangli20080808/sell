<template>
  <div id="seller" ref="sellerWrapper">
    <div class="seller-content">
      <div class="info">
        <div class="title">
          <div class="text">{{seller.name}}</div>
          <div class="star-wrapper">
            <star :size="36" :score="seller.score"></star>
            <span class="rate-count">({{seller.ratingCount}})</span>
            <span class="sell-count">月售{{seller.sellCount}}单</span>
          </div>

          <!--收藏我们要和商家有一个id去关联 我们保存在localstorage中一个变量 -->
          <div class="collect">
            <span class="icon-favorite" @click="toggleFavorite" :class="{'active':collectflag}"></span>
            <span class="text">{{favoriteText}}</span>
          </div>

        </div>
        <div class="remark">
          <div class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="num">{{seller.minPrice}}</span>元





            </div>
          </div>
          <div class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="num">{{seller.deliveryPrice}}</span>元





            </div>
          </div>
          <div class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="num">{{seller.deliveryTime}}</span>分钟



            </div>
          </div>
        </div>

      </div>

      <split></split>
      <!--活动公告-->
      <div class="activities">
        <div class="bulletin">
          <h1>公告与活动</h1>
          <div class="content">
            {{seller.bulletin}}



          </div>
        </div>
      </div>
      <!--内容-->
      <div class="supports">
        <ul>
          <li class="item" v-for="item in seller.supports">
            <iconClassMap :iconType="item.type"></iconClassMap>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <!--商家实景-->
      <div class="seller-imgs">
        <h1>商家实景</h1>
        <div class="img-wrapper" ref="picsWrapper">
          <div ref="picList">
            <img :src="pic" alt="" v-for="pic in seller.pics" width="120" height="90">
          </div>
        </div>
      </div>
      <split></split>
      <!--商家信息-->
      <div class="seller-info">
        <h1>商家信息</h1>
        <ul class="info-list">
          <li class="info" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>


  </div>
</template>

<script>
  import star from '@/components/star/star'
  import split from '@/components/split/split'
  import iconClassMap from '@/components/iconClassMap/iconClassMap'
  import BScroll from 'better-scroll'
  import {saveToLocal} from './../../assets/js/save'
  let ERR_OK = 0;
  export default {
    data(){
      return {
        collectflag: false
      }
    },
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      star,
      split,
      iconClassMap
    },
    computed: {
      favoriteText(){
        return this.collectflag ? '已收藏' : '收藏'
      }
    },
    watch: {
      'seller'() {
        this.$nextTick(() => {
          this._init();
        });
      }
    },
    mounted(){
        this.$nextTick(()=>{
          this._init();
//          this._initPicScroll();
        })
    },
    methods: {
      _init(){
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.sellerWrapper, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      },
      _initPicScroll() {
        if (this.picsScroll) {
          return
        }
        const PIC_WIDTH = 120;
        const MARGIN = 6;
        let picLen = this.seller.pics.length;
        this.$refs.picList.style.width = PIC_WIDTH * picLen + MARGIN * (picLen - 1) + 'px';
        this.picsScroll = new BScroll(this.$refs.picsWrapper, {
          scrollX: true
        })
      },
      toggleFavorite(event){
        if (!event._constructed) {
          return
        }
        this.collectflag = !this.collectflag;
        saveToLocal(this.seller.id, 'collectflag', this.collectflag)
      }
    }
  }

</script>

<style lang="less" scoped>
  @import "../../assets/style/main.less";

  #seller {
    position: absolute;
    width: 100%;
    top: 179px;
    bottom: 0;
    .fs(12);
    overflow: hidden;
    .seller-content {
      .info {
        padding: 18px 0;
        margin: 0 18px;
        .title {
          .pb(18);
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);
          .text {
            .fs(14);
            color: rgb(7, 17, 27);
            .lh(14);
          }
          .star-wrapper {
            .pt(8);
            .fs(0);
            .rate-count {
              .fs(10);
              .pl(10);
              .mr(10);
            }
            .sell-count {
              .fs(10);
              .lh(18);
              color: rgb(77, 85, 93);
            }
          }
          .collect {
            position: absolute;
            top: 34px;
            right: 16px;
            text-align: center;
            width: 74px;
            display: block;
            .icon-favorite {
              .fs(18);
              .lh(24);
              color: #d4d6d9;
              &.active {
                color: rgb(240, 20, 20);
              }
            }
            .text {
              .lh(24);
              vertical-align: top;
            }
          }
        }
        .remark {
          display: flex;
          .block {
            flex: 1;
            .mt(18);
            border-right: 1px solid rgba(7, 17, 27, 0.1);
            text-align: center;
            &:last-child {
              border: none;
            }
            h2 {
              .lh(10);
              .fs(10);
              .mb(6);
            }
            .content {
              .fs(10);
              padding-top: 8px;
              .lh(24);
              font-weight: 400;
              .num {
                .fs(24);
              }
            }
          }
        }
      }
      .activities {
        padding: 18px 0;
        .bulletin {
          margin: 0 18px;
          h1 {
            .fs(14);
            color: #07111b;
            .lh(14);
          }
          .content {
            padding: 8px 12px 16px 12px;
            .fs(12);
            font-weight: 200;
            color: rgb(240, 20, 20);
            line-height: 24px;
          }
        }
      }
      .supports {
        margin: 0 18px;
        .item {
          padding: 16px;
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);
          .fs(0);
          .icon {
            width: 16px;
            height: 16px;
            vertical-align: top;
            margin-right: 6px;
          }
          .text {
            .fs(12);
            font-weight: 200;
            color: rgb(7, 17, 27);
            .lh(16);
          }

        }
      }
      .seller-imgs {
        margin: 18px;
        white-space: nowrap;
        overflow: hidden;
        h1 {
          .fs(12);
          .lh(12);
          .mb(12);
        }
        .img-wrapper {

          img {
            margin-right: 6px;
          }
        }
      }
      .seller-info {
        h1 {
          margin: 0 18px;
          padding: 18px 0 12px 0;
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        }
        .info-list {
          .info {
            .fs(12);
            padding: 16px 12px;
            .lh(16);
            color: rgb(7, 17, 27);
            font-weight: 200;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            &:last-child {
              border: none;
            }
          }
        }
      }
    }
  }
</style>

