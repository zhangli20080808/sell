<template>
  <div id="rating" ref="ratingsWrapper">
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
      <div class="evaluation">
        <div class="classify">
          <span v-for="(item,index) in classifyArr" class="item"
                :class="{'active':item.active,'bad':index==2,'badActive':item.active&&index==2}"
                @click="filterEvel(item)">
            {{item.name}}<span class="count">{{item.count}}</span>
          </span>
        </div>
        <div class="switch" @click="evelflag=!evelflag">
          <span class="icon-check_circle" :class="{'on':evelflag}"></span>
          <span class="text">只看有内容的评价</span>
        </div>

        <div class="evel-list">
          <ul>
            <li class="evel" v-for="evel in evelArr">
              <div class="avatar">
                <img :src="evel.avatar" width="28" height="28">
              </div>
              <div class="content">
                <div class="user">
                  <span class="name">{{evel.username}}</span>
                  <span class="rateTime">{{evel.rateTime | time}}</span>
                </div>
                <div class="star-wrapper">
                  <star :size="24" :score="evel.score"></star>
                  <span class="deliveryTime">{{evel.deliveryTime}}分钟送达</span>
                </div>
                <div class="text">
                  {{evel.text}}
                </div>
                <div class="recommend">
                  <span class="icon icon-thumb_up" v-show="evel.recommend.length"></span>
                  <span class="dish" v-for="dish in evel.recommend">{{dish}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import star from  '@/components/star/star'
  import split from '@/components/split/split'
  import BScroll from 'better-scroll'


  var ERR_OK = 0;
  export default{
    name: 'rating',
    data(){
      return {
        ratings: [],
        seller: {},
        classifyArr: [{
          name: '全部',
          count: 0,
          active: true
        }, {
          name: '推荐',
          count: 0,
          active: false
        }, {
          name: '吐槽',
          count: 0,
          active: false
        }],
        evelflag: true
      }
    },
    props: {
      food: Object
    },
    computed: {
      evelArr() {
        let selectIndex = 0;
        this.classifyArr.forEach((data, index) => {
          if (data.active) {
            selectIndex = index
          }
        });
        if (this.scroll) {
          this.$nextTick(() => {
            this.scroll.refresh()
          })
        }
        return selectIndex ? this.ratings.filter((data) =>
          this.evelflag ? data.rateType === selectIndex - 1 && data.text : data.rateType === selectIndex - 1)
          : this.ratings.filter((data) => this.evelflag ? data.text : true)
      }
    },
    components: {
      star,
      split
    },
    mounted(){
      this._init();
    },
    methods: {
      _init(){
        this.$http.get('api/json/sell.json').then((res) => {
          //            console.log(res.data.goods)
          if (res.data.errno === ERR_OK) {
            this.ratings = res.data.ratings;
            this.seller = res.data.seller;
//             console.log(this.ratings);
            this._initClassifyArr();
            // 当我们计算一些和dom相关的操作时  一定要保证dom已经渲染结束了
            this.$nextTick(() => {
              this.scroll = new BScroll(this.$refs.ratingsWrapper, {
                click: true
              })
            })
          }
        });
      },
      _initClassifyArr(){
        this.classifyArr.forEach((data, index) => {
          if (index) {
            data.count = this.ratings.filter((temp) =>
            temp.rateType === index - 1).length
          } else {
            data.count = this.ratings.length;
          }
        })
      },
      filterEvel(item){
        this.classifyArr.forEach((data) => {
          data.active = false
        });
        item.active = true;
      }
    }
  }


</script>

<style scoped lang="less">
  @import "../../assets/style/main.less";

  #rating {
    position: absolute;
    width: 100%;
    top: 179px;
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
          @media screen and (max-width: 320px) {
            flex: 0 0 100px;
            width: 100px;
          }
        }
        .mark-right {
          padding: 18px 24px;
          @media screen and (max-width: 320px) {
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
      .evaluation {
        .classify {
          padding: 18px 0;
          margin: 0 18px;
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);
          .item {
            display: inline-block;
            padding: 8px 12px;
            border-radius: 2px;
            font-size: 12px;
            margin-right: 8px;
            color: rgb(77, 85, 93);
            .count {
              font-size: 8px;
              margin-left: 2px;
              line-height: 16px;
            }
            &.active {
              color: white;
              background: rgb(0, 169, 220);
            }
            &.bad {
              background: rgba(77, 85, 93, 0.2)
            }
            &.badActive {
              background: #4d555d
            }
          }
        }
        .switch {
          .icon-check_circle {
            display: inline-block;
            font-size: 24px;
            margin-right: 4px;
            vertical-align: top;
            color: rgb(147, 153, 159);
            &.on {
              color: #00c850;
            }
          }
          padding: 12px 18px;
          font-size: 0;
          .text {
            font-size: 24px;
            color: rgb(147, 153, 159);
            display: inline-block;
            vertical-align: top;
          }
        }
        .evel-list {
          .evel {
            display: flex;
            padding: 18px 0;
            margin: 0 18px;
            .avatar {
              flex :0 0 28px;
              width: 28px;
              margin-right: 12px;
              img{
                border-radius: 50%;
              }
            }
            .content {
              flex :1;
              .user {
                .fs(10);
                .lh(12);
                .name{}
                .rateTime{
                  position: absolute;
                  right: 18px;
                }
              }
              .star-wrapper {
                .pt(6);
                .mb(8);
                .fs(0);
                .star{
                  display: inline-block;
                }
                .deliveryTime{
                  .fs(10);
                  .pl(20);
                  font-weight: 200;
                }
              }
              .text {
                .fs(12);
                .lh(18);
              }
              .recommend{
                .pt(12);
                .fs(12);
                .lh(18);
                .icon{
                  .lh(12);
                  color: rgb(0,160,220) ;
                  .fs(10)
                }
                .dish{
                  color: rgb(147,153,159);
                  .fs(9);
                  .lh(16);
                  border: 1px solid rgba(7,17,27,0.11);
                  padding: 2px 6px;
                  margin-top: 4px;
                  margin-right: 6px;
                  white-space: normal;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
