<template>
  <div class="bread-crumb">
    <SvgIcon icon-name="location" class="bread-crumb-icon"></SvgIcon>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>{{props.item.first}}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="props.item.second">{{props.item.second}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup>
import SvgIcon from "@/components/SvgIcon.vue";

const props = defineProps(['item']);
</script>

<style scoped lang="scss">
  .bread-crumb {
    height: 30px;
    padding: 0 20px;
    display: flex;
    align-items: center;
  }

  .bread-crumb-icon {
    margin-right: 5px;
    margin-top: 2px;
    fill: #fff;
  }

  :deep(.el-breadcrumb__item) {
    height: 30px;
    font-size: 14px;
    line-height: 30px;
  }
  :deep(.el-breadcrumb__inner) {
    font-weight: 500;
    color: #fff;
  }
  :deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner) {
    color: #fff;
  }
</style>