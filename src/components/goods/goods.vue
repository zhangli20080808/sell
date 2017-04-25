<template>
  <div id="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
  <li v-for="(item,index) in goods" @click="menuClick(index,$event)" :class="index===menuCurrentIndex?'menu-item-selected':'menu-item'">          <span class="text">
            <span v-show="item.type>0" class="icon" :class="iconClassMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div >
    <div class="foods-wrapper" id="wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="item-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span class="">好评率{{food.rating}}</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.price}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
  import BScroll from 'better-scroll'
  let ERR_OK = 0;
  export default {
    name: 'goods',
    data(){
      return {
        goods: [],
        listHeight: [],
        foodsScrollY: 0,
      }
    },
    props: {
      type: Object
    },
    //1.0我们使用ready  2我们使用mounted 实例化完成后默认查询某个方法
    mounted() {
          this.iconClassMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
          this.$http.get('api/json/sell.json').then((res) => {
    //            console.log(res.data.goods)
            if (res.data.errno === ERR_OK) {
              this.goods = res.data.goods;
              // console.log(this.goods)
              // 当我们计算一些和dom相关的操作时  一定要保证dom已经渲染结束了
              this.$nextTick(()=>{
                this._initScroll();
                this._calculateHeight();
              })
            }
        });
    },
    methods:{
      _initScroll(){
          this.menuWrapper = new BScroll(this.$refs.menuWrapper,{
              click :true
          });
          this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
            click: true,
            // 获取实时滚动的位置
            probeType: 3
          })

          this.foodsScroll.on('scroll', (pos) => {
            this.foodsScrollY = Math.abs(Math.round(pos.y))
            // console.log(this.foodsScrollY);
          })
      },
      _calculateHeight(){
        // 计算foodslist高度  表示每个区间所占的高度
        let foodList = this.$refs.foodsWrapper.querySelectorAll('.food-list-hook');
        // 第一个高度
        let height = 0;
        this.listHeight.push(height);
        for (var i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      menuClick(index,event){
        // 有个属性区别  浏览器原声的点击时间是没有这个属性的 也就是在pc上的时候，我把它return掉
        // 我们自定义触发的时候  为true
        if(!event._constructed){
          return
        }
        // 通过这个index值，我们通知右侧应该滚动到哪里
        this.foodsScroll.scrollTo(0, -this.listHeight[index], 300)
      }
    },
    computed:{
      // 左侧的索引应该在哪里
      menuCurrentIndex() {
       for (let i = 0, l = this.listHeight.length; i < l; i++) {
        //  获得第一个高度
         let topHeight = this.listHeight[i]
        //  获得下一个高度
         let bottomHeight = this.listHeight[i + 1]
         if (!bottomHeight || (this.foodsScrollY >= topHeight && this.foodsScrollY < bottomHeight)) {
           return i
         }
       }
       return 0
   },
    }

  }
</script>

<style scoped lang="less">
  @import "../../assets/style/main.less";

  #goods {
    position: absolute;
    width: 100%;
    top: 174px;
    display: flex;
    bottom: 46px;
    .fs(12);
    overflow: hidden;
    .ulist {
      padding: 0 12px;
      text-align: center;
    }
    .menu-wrapper {
      flex: 0 0 80px;
      width: 80px;
      background: #f3f5f7;
      .menu-item-selected{
        background:white;
        font-weight:700;
        margin-top :-1px;
        position:relative;
        height:54px;
        line-height:54px;
        width:56px;
        padding: 0 12px;
        text-align: center;
        overflow: hidden;
      }
      .menu-item {
        /*垂直居中我们一般用table*/
        display: table;
        width: 56px;
        height: 54px;
        padding: 0 12px;
        text-align: center;
        .icon {
          display: inline-block;
          .w(16);
          .h(16);
          background-image: url("img/decrease_3@2x.png");
          background-repeat: no-repeat;
          background-size: 16px 16px;
          .mr(6);
          &.decrease {
            background-image: url("img/decrease_3@2x.png");
          }
          &.discount {
            background-image: url("img/discount_3@2x.png");
          }
          &.guarantee {
            background-image: url("img/guarantee_3@2x.png");
          }
          &.invoice {
            background-image: url("img/invoice_3@2x.png");
          }
          &.special {
            background-image: url("img/special_3@2x.png");
          }
        }
        .text {
          display: table-cell;
          width: 56px;
          .fs(12);
          vertical-align: middle;
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        }
      }
    }

    .foods-wrapper {
      flex: 1;
      .title {
        .pl(14);
        .h(26);
        .lh(26);
        .fs(12);
        border-left: 2px solid #d9dde1;
        background: #f3f5f7;
        color: rgb(147, 153, 159);
      }
      .food-item {
        display: flex;
        padding: 18px;
        border-bottom: 1px solid rgba(7, 17, 21, 0.1);
        &:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }
        .icon {
          flex: 0 0 57px;
          .mr(10);
        }
        .content {
          flex: 1;
          .name {
            margin: 2px 0 8px 0;
            .fs(14);
            .lh(14);
            .h(14);
            color: rgb(7, 17, 27);
            .ml(0);
          }
          .desc {
            .mb(8);
            .fs(10);
            color: rgb(147, 153, 159);
            .lh(12);
          }
          .extra {
            .fs(10);
            color: rgb(147, 153, 159);
            .lh(10);
            .count {
              .mr(12);
            }
          }
          .price {
            font-weight: 700;
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
  }

</style>
