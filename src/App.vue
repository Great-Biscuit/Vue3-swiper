<template>
  <div id="app">
    <div class="header-wrapper">
      <div :class="[groupName === 'groupOne' ?  'content selected-content' : 'content']" @click="clickTag('groupOne')">现状一张图</div>
      <div style="display:none" :class="[groupName === 'groupTwo' ?  'content selected-content' : 'content']" @click="clickTag('groupTwo')">预测一张图</div>
      <div :class="[groupName === 'groupThree' ?  'content selected-content' : 'content']" @click="clickTag('groupThree')">全省宏观图</div>
    </div>
    <div class="content-wrapper">
      <div class="item-wrapper">
        <div :class="[activeItemIndex === index ? 'item selected-item' : 'item']" v-for="(item, index) of groupItems[groupName]" :key="index" @click="clickItem(index)">{{item.title}}</div>
      </div>
      <swiper
        class="swiper"
        :modules="modules"
        :slides-per-view="1"
        navigation
        activeIndex="2"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        ref="mySwiper"
      >
        <swiper-slide v-for="(item, index) of groupItems[groupName]" :key="index">
          <div class="image-wrapper">
            <viewer class="image-viewer" :images="item.path">
              <img class="image" :src="item.path">
            </viewer>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue.js';

import 'swiper/swiper.min.css'; 
import 'swiper/modules/navigation/navigation.min.css'; 
import 'swiper/modules/pagination/pagination.min.css'; 
import 'swiper/modules/scrollbar/scrollbar.min.css'; 

export default {
  name: 'App',
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const groupItems = reactive({
      groupOne: [
        {
          title: '煤炭',
          path: 'https://greatbiscuit.gitee.io/logistics/images/1-1.png'
        },
        {
          title: '粮食',
          path: 'https://greatbiscuit.gitee.io/logistics/images/1-2.png'
        },
        {
          title: '工程机械',
          path: 'https://greatbiscuit.gitee.io/logistics/images/1-3.png'
        },
        {
          title: '汽车',
          path: 'https://greatbiscuit.gitee.io/logistics/images/1-4.png'
        },
        {
          title: '钢材',
          path: 'https://greatbiscuit.gitee.io/logistics/images/1-5.png'
        },
        {
          title: '有色金属',
          path: 'https://greatbiscuit.gitee.io/logistics/images/1-6.png'
        },
        {
          title: '金属矿石',
          path: 'https://greatbiscuit.gitee.io/logistics/images/1-7.png'
        },
        {
          title: '集装箱',
          path: 'https://greatbiscuit.gitee.io/logistics/images/1-8.png'
        },
        {
          title: '矿建材料',
          path: 'https://greatbiscuit.gitee.io/logistics/images/1-9.png'
        }
      ],
      groupTwo: [
        {
          title: '汽车',
          path: 'https://lkdxka.oss-cn-shenzhen.aliyuncs.com/zip/%E4%BA%86%E8%A7%A3%E6%88%91%E4%BB%AC%E7%9A%84%E6%95%85%E4%BA%8B%EF%BC%88%E5%8E%8B%E7%BC%A9%E5%90%8E%EF%BC%89%E6%96%B0.jpg'
        },
        {
          title: '煤炭',
          path: 'https://lkdxka.oss-cn-shenzhen.aliyuncs.com/home/%E5%95%86%E5%8A%A1%E5%90%88%E4%BD%9C.jpg'
        },
        {
          title: '钢材',
          path: 'https://lkdxka.oss-cn-shenzhen.aliyuncs.com/zip/%E5%B0%8F%E5%8F%AF%E7%88%B1%E8%A1%A8%E6%83%85%E5%8C%85%EF%BC%88%E5%8E%8B%E7%BC%A9%E5%90%8E%EF%BC%89.jpg'
        },
        {
          title: '工程机械',
          path: 'https://lkdxka.oss-cn-shenzhen.aliyuncs.com/zip/%E4%BA%86%E8%A7%A3%E6%88%91%E4%BB%AC%E7%9A%84%E6%95%85%E4%BA%8B%EF%BC%88%E5%8E%8B%E7%BC%A9%E5%90%8E%EF%BC%89%E6%96%B0.jpg'
        },
        {
          title: '金属矿石与有色金属',
          path: 'https://lkdxka.oss-cn-shenzhen.aliyuncs.com/home/%E5%95%86%E5%8A%A1%E5%90%88%E4%BD%9C.jpg'
        },
        {
          title: '木材',
          path: 'https://lkdxka.oss-cn-shenzhen.aliyuncs.com/zip/%E5%B0%8F%E5%8F%AF%E7%88%B1%E8%A1%A8%E6%83%85%E5%8C%85%EF%BC%88%E5%8E%8B%E7%BC%A9%E5%90%8E%EF%BC%89.jpg'
        },
        {
          title: '材料',
          path: 'https://lkdxka.oss-cn-shenzhen.aliyuncs.com/zip/%E4%BA%86%E8%A7%A3%E6%88%91%E4%BB%AC%E7%9A%84%E6%95%85%E4%BA%8B%EF%BC%88%E5%8E%8B%E7%BC%A9%E5%90%8E%EF%BC%89%E6%96%B0.jpg'
        },
        {
          title: '集装箱',
          path: 'https://lkdxka.oss-cn-shenzhen.aliyuncs.com/home/%E5%95%86%E5%8A%A1%E5%90%88%E4%BD%9C.jpg'
        },
        {
          title: '矿建材料',
          path: 'https://lkdxka.oss-cn-shenzhen.aliyuncs.com/zip/%E5%B0%8F%E5%8F%AF%E7%88%B1%E8%A1%A8%E6%83%85%E5%8C%85%EF%BC%88%E5%8E%8B%E7%BC%A9%E5%90%8E%EF%BC%89.jpg'
        },
      ],
       groupThree: [
        {
          title: '宏观图',
          path: 'https://greatbiscuit.gitee.io/logistics/images/3-1.png'
        }
       ]
    })
    const groupName = ref("groupOne");
    const mySwiper = ref(null);
    const onSwiper = () => {
      console.log("swiper");
    };
    const onSlideChange = (swiper) => {
      activeItemIndex.value = swiper.activeIndex
    };
    const clickTag = (name) => {
      groupName.value = name;
      mySwiper.value.$el.swiper.slideTo(0)
      activeItemIndex.value = 0
    }
    const activeItemIndex = ref(0)
    const clickItem = (index) => {
      mySwiper.value.$el.swiper.slideTo(index)
      activeItemIndex.value = index
    }
    return {
      groupItems,
      groupName,
      mySwiper,
      clickTag,
      clickItem,
      activeItemIndex,
      onSwiper,
      onSlideChange,
      modules: [Navigation, Pagination, Scrollbar, A11y],
    };
  },
}
</script>

<style lang="stylus" scoped>
  .header-wrapper
    position: fixed
    top: 0
    left: 0
    right: 0
    height: 40px
    line-height: 40px
    display: flex
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    .content
      flex: 1
      color: #409eff
      font-size: 18px
      text-align: center
      cursor pointer
      border-right: 1px solid rgba(0, 0, 0, 0.1)
    .selected-content
      border-bottom: 2px solid #1989fa
      color: #1989fa
  .content-wrapper
    position: fixed
    top: 60px
    left: 0
    right: 0
    bottom: 0
    .item-wrapper
      height: 30px
      margin-bottom: 20px
      display: flex
      flex-direction: row
      justify-content: space-around
      align-items: center
      .item
        height: 40px
        padding: 0 20px
        line-height: 40px
        text-align: center
        border: 1px solid rgba(0, 0, 0, 0.3)
        border-radius: 10px
        cursor: pointer
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      .item:hover
        border: 1px solid #409eff
      .selected-item
        color: #409eff
        border: 1px solid #409eff
    .swiper
      width: 90%
      height: calc(100% - 70px)
      .image-wrapper
        width: 80%
        height: 100%
        text-align: center
        margin:0 auto
        .image-viewer
          height: 100%
          cursor pointer
          .image
            height: 100%
</style>


