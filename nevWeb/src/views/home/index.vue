<template>
  <breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
  <div class="home-wrapped">
    <div class="swiper-wrapped">
      <el-carousel :interval="4000" indicator-position="outside" type="card" height="320px">
        <el-carousel-item v-for="(item, index) in swipersUrl" :key="index">
          <img :src="item" class="stretch_image"/>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="layout-wrapped">
      <el-row :gutter="20">
        <el-col :span="6" v-for="(item, index) in Introduction" :key="index" @click="showIntro(index)">
          <div class="information-area">
            <span>{{item.zh_name}}</span>
            <div v-html="item.set_value" class="introduce"></div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="two-table-wrapped">
      <div class="vehicle-news">
        <span>新能源汽车产业新闻</span>
        <el-table :data="tableData" style="width: 100%" :show-header="false">
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" />
        </el-table>
      </div>
      <div class="system-message">
        <span>系统消息</span>
        <el-table :data="tableData" style="width: 100%" :show-header="false">
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" />
        </el-table>
      </div>
    </div>
  </div>
  <introduce ref="introP"></introduce>
</template>

<script setup>
import breadCrumb from '@/components/bread_crumb.vue'
import {onMounted, ref} from "vue";
import {getSwipers, getAllInfo} from "@/api/setting.js"
import { bus } from "@/utils/mitt.js"
import introduce from "./components/introduce.vue"

const breadcrumb = ref()
const item = ref({
  first: '首页'
})
const introP = ref()
const tableData = [
]

const swipersUrl = ref([])
const getAllSwipers = async () => {
  swipersUrl.value = await getSwipers()
}
getAllSwipers()

const Introduction = ref([]);
const getAllIntroduction = async () => {
  const res = await getAllInfo()
  const [name, ...intro] = res
  Introduction.value = intro
}
getAllIntroduction()

const showIntro = (id) => {
  bus.emit("introduce", id)
  introP.value.open()
}

</script>

<style scoped lang="scss">
@mixin table-class {
  height: 360px;
  width:48%;
  display: flex;
  flex-direction: column;
  span {
    border-bottom: 2px solid #ea0709;
    margin-bottom: 5px;
    font-size: 14px;
  }
}

.home-wrapped {
  padding: 8px;
  height: calc(100vh - 101px);
  background: #f5f5f5;
  display: flex;
  flex-direction: column;

  .swiper-wrapped {
    padding: 0 20px;
    background: #fff;
    margin-bottom: 8px;
  }
  .stretch_image {
    width: 100%;
    height: 100%;
  }
  .layout-wrapped {
    padding: 8px;
    margin-bottom: 8px;
    background: #fff;
    .information-area {
      background: #f5f5f5;
      height: 400px;
      padding: 8px;
      cursor: pointer;
      .introduce {
        font-size: 14px;
        text-indent: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 20;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        padding: 0 6px;
      }
      span {
        border-bottom: 2px solid #409eff;
        font-size: 14px;
      }
    }
    .information-area:hover {
      background-color: #eef5ff;
      cursor: pointer;
    }
  }
  .two-table-wrapped {
    height: 360px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: #fff;
    padding-top: 10px;
    .vehicle-news {
      @include table-class
    }
    .system-message {
      @include table-class
    }
  }
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>