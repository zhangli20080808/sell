<template>
  <div id="app">
    <!--头部组件-->
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/rating">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import header from './components/header/header.vue'
  const ERR_OK = 0;
  export default {
    name: 'app',
    data() {
      return {
          seller:{}
      }
    },
    mounted(){
        this.$http.get('api/json/sell.json').then((res)=>{
//            console.log(res)
//            console.log(res.data.errno)
//            console.log(res.data.goods)
         if(res.data.errno === ERR_OK){
             this.seller = res.data.seller;
//           console.log(this.seller)
         }
        })
    },
    components: {
      'v-header': header
    }
  }
</script>

<style lang="less" scoped>

  @import "assets/style/main.less";

  #app {
    .tab {
      display: flex;
      width: 100%;
      .h(40);
      .lh(40);
      border-bottom: 1px solid rgba(7, 17, 27, .1);
      .tab-item {
        flex: 1;
        text-align: center;
        /*& 表示他的父元素 这里指tab-item*/
        & > a {
          /*自动充满了盒子*/
          display: block;
          .fs(14);

          color: rgb(77, 85, 93);
          &.router-link-active {
            color: rgb(240, 20, 20);
          }
        }
      }
    }
  }

</style>
