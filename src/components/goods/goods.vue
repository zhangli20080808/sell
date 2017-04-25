<template>
  <div id="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="item in goods" class="menu-item">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="iconClassMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul>
        <li v-for="item in goods" class="item-list">
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
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span class="">好评率{{food.rating}}</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.price}}</span>
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
  let ERR_OK = 0;
  export default {
    name: 'goods',
    data(){
      return {
        goods: []
      }
    },
    props: {
      type: Object
    },
    //创建完成之后
    mounted(){
      this.iconClassMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('api/json/sell.json').then((res) => {
//            console.log(res.data.goods)
        if (res.data.errno === ERR_OK) {
          this.goods = res.data.goods;
//           console.log(this.goods)
        }
      })
    },

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
            .lh(10);
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
            }
          }
        }
      }

    }
  }

</style>
