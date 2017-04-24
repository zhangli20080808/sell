<template>
  <div id="star" :class="starType">
    <span class="star-item" v-for="itemClass in itemClasses" :class="itemClass"></span>
  </div>
</template>

<script>

  //首先我们定义几个类
  const LENGTH = 5;
  const CLS_on = "on";
  const CLS_half = "half";
  const CLS_off = "off";

  export default {
    //star 不同尺寸 大小 外部传入的 类型  分数

    data(){
      return {}
    },
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType(){
        return 'star-' + this.size;
      },
      itemClasses(){
        let result = [];
        //小技巧
        let score = Math.floor(this.score * 2) / 2;
        //判断有没有小数
        let hasDecimal = score % 1 !==0;
        //定义整数
        let integer = Math.floor(score);
        for(let i =0;i<integer;i++){
            //有多少个全星
            result.push(CLS_on)
        }
        if(hasDecimal){
            result.push(CLS_half)
        }
        while(result.length<LENGTH){
            result.push(CLS_off)
        }
        return result
      }
    }
  }

</script>

<style scoped lang="less">
  @import "../../assets/style/main.less";

  #star {
    .star-item {
      background-repeat: no-repeat;
      display: inline-block;
    }
    &.star-48 {
      .star-item {
        width: 20px;
        height: 20px;
        .mr(22);
        background-size: 20px 20px;
        /*三种状态  半星 全星 没有*/
        /*星星的最后一个没有margin－right*/
        &:last-child {
          .mr(0);
        }
        &.on {
          background-image: url("img/star48_on@2x.png");
        }
        &.half {
          background-image: url("img/star48_half@2x.png");
        }
        &.off {
          background-image: url("img/star48_off@2x.png");
        }
      }
    }
    &.star-36 {
      .star-item {
        width: 15px;
        height: 15px;
        .mr(22);
        background-size: 15px 15px;
        /*三种状态  半星 全星 没有*/
        /*星星的最后一个没有margin－right*/
        &:last-child {
          .mr(0);
        }
        &.on {
          background-image: url("img/star36_on@2x.png");
        }
        &.half {
          background-image: url("img/star36_half@2x.png");
        }
        &.off {
          background-image: url("img/star36_off@2x.png");
        }
      }
    }
    &.star-24 {
      .star-item {
        width: 10px;
        height: 10px;
        .mr(22);
        background-size: 10px 10px;
        /*三种状态  半星 全星 没有*/
        /*星星的最后一个没有margin－right*/
        &:last-child {
          .mr(0);
        }
        &.on {
          background-image: url("img/star24_on@2x.png");
        }
        &.half {
          background-image: url("img/star24_half@2x.png");
        }
        &.off {
          background-image: url("img/star24_off@2x.png");
        }
      }
    }
  }

</style>
