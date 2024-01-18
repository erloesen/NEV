<template>
  <breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
  <div class="home-wrapped">
    <div class="swiper-wrapped">
      <el-carousel :interval="4000" indicator-position="outside" type="card" height="320px">
        <el-carousel-item v-for="item in 6" :key="item">
          <h3 text="2xl" justify="center">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="layout-wrapped">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="information-area">
            <span>公司介绍</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="information-area">
            <span>项目介绍</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="information-area">
            <span>数据源</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="information-area">
            <span>全国报告</span>
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
</template>

<script setup>
import breadCrumb from '@/components/bread_crumb.vue'
import {ref} from "vue";

const breadcrumb = ref()
const item = ref({
  first: '首页'
})

const tableData = [

]
</script>

<style scoped lang="scss">
@mixin table-class {
  height: 240px;
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
  .layout-wrapped {
    padding: 8px;
    margin-bottom: 8px;
    background: #fff;
    .information-area {
      background: #f5f5f5;
      height: 400px;
      padding: 8px;
      cursor: pointer;
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
    height: 300px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: #fff;
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