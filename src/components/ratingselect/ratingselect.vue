<template>

  <div class="ratingselect">
    <!--类型-->
    <div class="rating-type">
      <span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span
        class="count">{{ratings.length}}</span></span>
      <span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span
        class="count">{{positives.length}}</span></span>
      <span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span
        class="count">{{negatives.length}}</span></span>
    </div>
    <div @click="toggleContent" class="switch" :class="{'on':onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>

</template>

<script>

  const POSITIVE = 0;
  const NAVIGATE = 1;
  const ALL = 2;

  export default {
    //我们有满意不满意 所以我们需要提取一些变量  所有 正向 负面
    props: {
      ratings: {
        type: Array
      },
      selectType: {
        //这里有三种类型
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
//        能看到所有
        default: false
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    },
    methods:{
      select(type,event){
        if(!event._constructed){
          return
        }
        // 我们子组件怎么通知父组件去发生变化 子组件是不能直接改变数据的 这里我们把type传出去 父组件监听到以后，就可以去改变这个值了
        this.$emit('select',type)
      },
      toggleContent(event){
        if(!event._constructed){
          return;
        }
        this.$emit('toggle')
      }
    },
    //    我们如何拿到 0 和  1的 值呢 通过计算属性去过滤数组
    computed:{
      positives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      negatives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === NAVIGATE;
        });
      }
    }
  }

</script>

<style scoped lang="less">
  .ratingselect {
    .rating-type {
      padding: 18px 0;
      margin: 0 18px;
      border-bottom: 1px solid #ccc;
      font-size: 0;
      .block {
        display: inline-block;
        padding: 8px 12px;
        border-radius: 2px;
        font-size: 12px;
        margin-right: 8px;
        color: rgb(77,85,93);
        &.active{
          color: #fff;
        }
        .count{
          font-size: 8px;
          margin-left: 2px;
          line-height: 16px;
        }
        &.positive{
          background: rgba(0,160,220,0.1);
          &.active{
            background: rgb(0,160,220);
          }
        }
        &.negative{
          background: rgba(77,85,93,0.2);
          &.active{
            background: rgb(77,85,93);
          }
        }

      }
    }
    .switch{
      &.on{
        .icon-check_circle{
          color: #00c850;
        }
      }
      padding:12px 18px;
      font-size: 0;
      .icon-check_circle{
        display: inline-block;
        font-size: 24px;
        margin-right: 4px;
        vertical-align: top;
        color: rgb(147,153,159);
      }
      .text{
        font-size: 24px;
        color: rgb(147,153,159);
        display: inline-block;
        vertical-align: top;
      }
    }
  }

</style>
