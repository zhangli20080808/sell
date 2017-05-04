<template >
  <div id="cartcontrol">
    <!--当我们的count>0时才会显示  -->
      <transition name="move">
        <div class="cart-decrease "  v-show="food.count>0" @click.stop.prvevent="decrease">
            <span class="inner icon-remove_circle_outline"></span>
        </div>
      </transition>

    <div class="cart-count" v-show="food.count>0">
        {{food.count}}
    </div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="add">
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  props:{
    // 我们的增加减少都是要和food关联的
    food:{
      type: Object
    }
  },
  mounted(){
    // console.log(this.food);
  },
  methods:{
    // 这里点击不行是因为我们使用了better-scroll所以我们需要将click职位true
    //这个地方我们判断 如果不是我们自己派生的点击时间 我们让他执行一次
    // 当我们给观测对象添加一个不存在的对象的时候， 直接赋值是不行的 所以在add del 时候我们需要一个接口 set
    add(event){

      if(!event._constructed){
        return;
      }
      if(!this.food.count){
        // this.food.count = 1;  我们设置一个count属性 1 最终就能通知到这个dom繁盛变化
        Vue.set(this.food,'count',1)
      }else {
        this.food.count ++;
      }
    },
    decrease(event){
       if(!event._constructed){
         return;
       }
       if(this.food.count){
         this.food.count --;
     }
  }
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/style/main.less";

 #cartcontrol{
   .cart-decrease{
     display: inline-block;
     padding:6px;
     color: rgb(0,160,220);
     transition: all 0.4s linear;
     .inner{
       display: inline-block;
       transition:all 0.4s linear;
       .fs(24);
       .lh(24);
     }
     &.move-enter-active, &.move-leave-active{
       opacity: 1;
       transform: translate3d(0,0,0);
       .inner{
         transform: rotate(0);
       }
     }
     &.move-enter,&.move-leave-active{
       opacity: 0;
       transform: translate3d(24px,0,0);
       .inner{
         transform: rotate(180deg);
       }
     }
   }
   .cart-add{
     display: inline-block;
     padding:6px;
     color: rgb(0,160,220);
     .fs(24);
     .lh(24);
   }
   .cart-count{
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    .lh(24);
    text-align: center;
    .fs(10);
   }
 }


</style>
