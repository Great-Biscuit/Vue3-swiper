<template>
  <div class="app">
    <div ref="menuRef" class="menu-wrapper" v-show="isShowMenu">
      <div class="menu-header">
        <div class="menu-title">目录</div>
        <div class="menu-button" @click="handleCloseMenu">×</div>
      </div>
      <el-scrollbar :height="menuHeight">
        <el-row class="menu-content">
          <el-col :span="12">
            <el-menu
              :default-active="activePath"
              class="menu-content"
              :unique-opened="true"
              @open="handleOpen"
              @select="handleSelect"
            >
              <el-sub-menu v-for="subMenuItem of subMenuItems" :key="subMenuItem.index" :index="subMenuItem.index">
                <template #title>
                  <span :title="subMenuItem.title">{{subMenuItem.title}}</span>
                </template>
                <el-menu-item v-for="item of subMenuItem.item" :key="item.index" :index="item.index">
                  <span :title="item.title">{{item.title}}</span>
                </el-menu-item>
              </el-sub-menu>
            </el-menu>
          </el-col>
        </el-row>
      </el-scrollbar>
    </div>
    <div class="open-menu" v-show="!isShowMenu" @click="handleCloseMenu">+</div>
    <div class="content-wrapper" v-show="(isMobile && isShowMenu) ? false : true" ref="contentRef">
      <div class="content-title">{{imageTitle}}</div>
      <div class="swiper-wrapper">
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
          <swiper-slide v-for="item of subMenuItems[activeSubMenuIndex-1].item" :key="item.index">
            <div class="image-wrapper">
              <viewer class="image-viewer" :images="[item.path]">
                <img  class="image" :src="item.path">
              </viewer>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, watch, onMounted } from 'vue'
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
    const subMenuItems = reactive([
      {
        title: '一、各市州物流基础设施与货运量情况分析',
        index: '1',
        item: [
          {
            title: '1.1 各市州物流强度热力图',
            index: '1-1',
            path: 'https://greatbiscuit.gitee.io/logistics/images/1-1.png'
          }
        ]
      },
      {
        title: '二、湖南省产业现状与分布情况',
        index: '2',
        item: [
          {
            title: '2.1 湖南省农业产业分布图',
            index: '2-1',
            path: 'https://greatbiscuit.gitee.io/logistics/images/2-1.png'
          },
          {
            title: '2.2 湖南省工业产业分布图',
            index: '2-2',
            path: 'https://greatbiscuit.gitee.io/logistics/images/2-2.png'
          }
        ]
      },
      {
        title: '三、湖南省大宗货物品类、流量与流向现状',
        index: '3',
        item: [
          {
            title: '3.1 湖南省主要汽车产业分布图',
            index: '3-1',
            path: 'https://greatbiscuit.gitee.io/logistics/images/3-1.png'
          },
          {
            title: '3.2 湖南省汽车流量流向图',
            index: '3-2',
            path: 'https://greatbiscuit.gitee.io/logistics/images/3-2.png'
          },
          {
            title: '3.3 湖南省主要用煤企业分布图',
            index: '3-3',
            path: 'https://greatbiscuit.gitee.io/logistics/images/3-3.png'
          },
          {
            title: '3.4 煤炭流量流向图',
            index: '3-4',
            path: 'https://greatbiscuit.gitee.io/logistics/images/3-4.png'
          },
          {
            title: '3.5 湖南省主要钢材企业分布图',
            index: '3-5',
            path: 'https://greatbiscuit.gitee.io/logistics/images/3-5.png'
          },
          {
            title: '3.6 钢材流量流向图',
            index: '3-6',
            path: 'https://greatbiscuit.gitee.io/logistics/images/3-6.png'
          },
          {
            title: '3.7 湖南省工程机械主要企业分布图',
            index: '3-7',
            path: 'https://greatbiscuit.gitee.io/logistics/images/3-7.png'
          },
          {
            title: '3.8 湖南省工程机械流量流向图',
            index: '3-8',
            path: 'https://greatbiscuit.gitee.io/logistics/images/3-8.png'
          },
          {
            title: '3.9 湖南省主要粮食企业分布图',
            index: '3-9',
            path: 'https://greatbiscuit.gitee.io/logistics/images/3-9.png'
          },
          {
            title: '3.10 湖南省粮食流量流向图',
            index: '3-10',
            path: 'https://greatbiscuit.gitee.io/logistics/images/3-10.png'
          },
          {
            title: '3.11 湖南省金属矿石主要企业分布图',
            index: '3-11',
            path: 'https://greatbiscuit.gitee.io/logistics/images/3-11.png'
          },
          {
            title: '3.12 湖南省金属矿石进出省流量流向',
            index: '3-12',
            path: 'https://greatbiscuit.gitee.io/logistics/images/3-12.png'
          },
          {
            title: '3.13 湖南省主要有色金属企业分布图',
            index: '3-13',
            path: 'https://greatbiscuit.gitee.io/logistics/images/3-13.png'
          },
          {
            title: '3.14 湖南省有色金属流量流向图',
            index: '3-14',
            path: 'https://greatbiscuit.gitee.io/logistics/images/3-14.png'
          },
          {
            title: '3.15 湖南省主要矿建材料企业分布图',
            index: '3-15',
            path: 'https://greatbiscuit.gitee.io/logistics/images/3-15.png'
          },
          {
            title: '3.16 湖南省矿建材料流量流向图',
            index: '3-16',
            path: 'https://greatbiscuit.gitee.io/logistics/images/3-16.png'
          }
        ]
      },
      {
        title: '四、各种运输方式货物品类、流量与流向现状',
        index: '4',
        item: [
          {
            title: '4.1 中欧班列流品流量',
            index: '4-1',
            path: 'https://greatbiscuit.gitee.io/logistics/images/4-1.png'
          },
          {
            title: '4.2 国际货运航空流品流量图',
            index: '4-2',
            path: 'https://greatbiscuit.gitee.io/logistics/images/4-2.png'
          },
          {
            title: '4.3 国际水运流品流量图',
            index: '4-3',
            path: 'https://greatbiscuit.gitee.io/logistics/images/4-3.png'
          },
          {
            title: '4.4 湖南省集装箱流量流向图',
            index: '4-4',
            path: 'https://greatbiscuit.gitee.io/logistics/images/4-4.png'
          },
          {
            title: '4.5 2020年湖南省铁路流品、流量、流向图',
            index: '4-5',
            path: 'https://greatbiscuit.gitee.io/logistics/images/4-5.png'
          },
          {
            title: '4.6 2020年湖南省水运货品流向图',
            index: '4-6',
            path: 'https://greatbiscuit.gitee.io/logistics/images/4-6.png'
          },
          {
            title: '4.7 湖南省宏观流量流向图',
            index: '4-7',
            path: 'https://greatbiscuit.gitee.io/logistics/images/4-7.png'
          }
        ]
      },
      {
        title: '五、全省物流货运发展预测分析',
        index: '5',
        item: [
          {
            title: '5.1 各市州物流强度热力预测图',
            index: '5-1',
            path: 'https://greatbiscuit.gitee.io/logistics/images/5-1.png'
          }
        ]
      }//,
      // {
      //   title: '六、全省大宗货物流量预测分析',
      //   index: '6',
      //   item: [
          
      //   ]
      // }
    ])
    const isMobile = ref(false);
    const isShowMenu = ref(true);
    const contentRef = ref(null);
    const menuRef = ref(null);
    const mySwiper = ref(null);
    const activeSubMenuIndex = ref(1);  // 索引从 1 开始
    const activePath = ref('1-1')   // 索引从 1-1开始
    const imageTitle = ref(subMenuItems[0].item[0].title);

    const menuHeight = ref(document.documentElement.clientHeight - 43);

    const handleCloseMenu = () => {
      if (isShowMenu.value) {
        isShowMenu.value = false;
        contentRef.value.style.width = '100%';
      } else {
        isShowMenu.value = true;
        if (isMobile.value) {
          const width = `${document.documentElement.clientWidth}px`;
          _changeMenuWidth(width);
        } else {
          contentRef.value.style.width = `${screen.width - 400}px`;
        }
      }
    }

    const _changeMenuWidth = (width) => {
      menuRef.value.style.setProperty('width', width);
      menuRef.value.getElementsByClassName('menu-content')[0].style.setProperty('width', width);
      menuRef.value.getElementsByClassName('menu-content')[1].style.setProperty('width', width);
    }
    
    const onSwiper = () => {
      console.log("swiper");
    };
    const onSlideChange = (swiper) => {
      activePath.value = `${activeSubMenuIndex.value}-${swiper.activeIndex+1}`
    };
    
    const handleOpen = (index) => {
      if (activeSubMenuIndex.value === index) {
        return;
      }
      activeSubMenuIndex.value = index;
      activePath.value = `${activeSubMenuIndex.value}-1`
    }
    const handleSelect = (index) => {
      activePath.value = index;
      mySwiper.value.$el.swiper.slideTo(parseInt(index.split("-")[1]) - 1)
      if (isMobile.value) {
        isShowMenu.value = false;
      }
    }

    watch(activePath, () => {
      const index = activeSubMenuIndex.value;
      const item = subMenuItems[index - 1]['item'];
      const len = item.length;
      for (let i = 0; i < len; i++) {
        if (item[i]['index'] === activePath.value) {
          imageTitle.value = item[i].title;
          break;
        } 
      }
    })

    watch(activeSubMenuIndex, () => {
      mySwiper.value.$el.swiper.slideTo(0)
    })

    watch(isMobile, () => {
      if(isMobile.value) {
        isShowMenu.value = false;
      } else {
        isShowMenu.value = true;
      }
    })

    onMounted(() => {
      if (document.body.clientWidth < 600) {
        isMobile.value = true;
      } else {
        isMobile.value = false;
      }
      window.onresize= () => {
        return (() => {
          if (document.body.clientWidth < 600) {
            isMobile.value = true;
          } else {
            isMobile.value = false;
            _changeMenuWidth('400px');
          }
        })();
      }
    })

    return {
      subMenuItems,
      isMobile,
      isShowMenu,
      contentRef,
      menuRef,
      mySwiper,
      activeSubMenuIndex,
      activePath,
      imageTitle,
      menuHeight,
      handleCloseMenu,
      onSwiper,
      onSlideChange,
      handleOpen,
      handleSelect,
      modules: [Navigation, Pagination, Scrollbar, A11y],
    };
  }
}
</script>

<style lang="stylus" scoped>
  .app
    display: flex
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    .menu-wrapper
      width: 400px
      border-right: 2px solid #e6e6e6
      user-select: none
      .menu-header
        display: flex
        padding: 15px 15px 0 15px
        justify-content: space-between
        font-weight: 500
        .menu-title
          font-size: 20px
        .menu-button
          padding: 6px 8px
          box-shadow: 1px
          border-radius: 7px
          background-color: rgba(64, 158, 255, 0.3)
          color: #fff
          cursor pointer
          transition: background 0.3s ease-in-out;
        .menu-button:hover
          background-color: rgba(64, 158, 255, 1)
      .menu-content
        width: 390px
        ul
          border: none
          /deep/ .el-sub-menu__title, .el-menu-item 
            font-size: 16px
            span
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
          @media (max-width: 600px)
            /deep/ .el-sub-menu__title, .el-menu-item 
              font-size: 18px
    .open-menu
      position: fixed
      top: 0
      left: 0
      width: 70px
      height: 70px
      line-height: 60px
      background-color: rgba(64, 158, 255, 0.3)
      color: #fff
      font-size: 30px
      border-radius: 0 0 100% 0;
      cursor pointer
      text-align: center
      transition: background 0.3s ease-in-out;
    @media (max-width: 600px)
      .open-menu
        width: 40px
        height: 40px
        line-height: 40px
        font-size: 20px
    .open-menu:hover
      background-color: rgba(64, 158, 255, 1)
    .content-wrapper
      flex: 1
      width: calc(100% - 400px)
      height: 100%
      .content-title
        width: 100%
        height: 80px
        line-height: 80px
        text-align: center
        font-size: 25px
        border-bottom: 2px solid #e6e6e6
        user-select: none
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      @media (max-width: 600px)
        .content-title
          height: 60px
          line-height: 60px
          font-size: 19px
      .swiper-wrapper
        width: 100%
        height: calc(100% - 100px)
        .swiper
          width: 100%
          margin: 10px
          @media (max-width: 600px)
            /deep/ .swiper-button-prev:after
              font-size: 20px
            /deep/ .swiper-button-next:after
              font-size: 20px
            .image-wrapper
              position relative
              width: 100%
              height: 100%
              text-align: center
              margin:0 auto
              .image-viewer
                width: 100%
                position: absolute
                top: 50%
                transform: translateY(-50%)
                .image
                  width: 100%
                  cursor pointer
          @media (min-width: 600px)
            .image-wrapper
              width: 100%
              height: 100%
              text-align: center
              margin:0 auto
              .image-viewer
                height: 100%
                .image
                  height: 100%
                  cursor pointer
</style>
