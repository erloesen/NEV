<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            router
        >
          <div class="title">新能源汽车<br/>产业活跃度监测系统</div>
          <el-menu-item index="home">
            <el-icon><HomeFilled /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon><Histogram /></el-icon>
            <span>全国</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon><Menu /></el-icon>
            <span>省级</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><Grid /></el-icon>
            <span>市级</span>
          </el-menu-item>
          <el-sub-menu index="5">
            <template #title>
              <el-icon><Aim /></el-icon>
              <span>工厂级</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="5-1">数据融合</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="5-2">卫星遥感</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item index="set">
            <el-icon><Tools /></el-icon>
            <span>系统设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class="header-left-content">今天是 {{currentDate}}，尊敬的 {{store.account}} 欢迎登录系统</span>
          <div class="header-right-content">
            <el-icon :size="20"><Message /></el-icon>
            <el-avatar :size="24" :src="store.imageurl" />
            <el-dropdown>
              <span class="el-dropdown-link">
                操作
              </span>
              <template #dropdown>
                <el-dropdown-menu class="dropdownPop">
                  <el-dropdown-item>详情</el-dropdown-item>
                  <el-dropdown-item @click="returnLogin">退出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <router-view>

          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import {
  Menu as IconMenu, Message,
} from '@element-plus/icons-vue'
import {ref, onMounted, reactive, toRefs} from 'vue'
import { useRouter } from "vue-router";
import { useUserInfoStore } from '@/store/userinfo'

const currentDate = ref<string>('');

const router = useRouter();
const store = useUserInfoStore()

const getCurrentDate = () => {
  const today = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
  currentDate.value = today.toLocaleDateString('zh-CN', options);
};

onMounted(() => {
  getCurrentDate();
});

const returnLogin = () => {
  router.push('/login')
}

</script>

<style lang="scss" scoped>
.el-aside {
  height: 100vh;
  background: #0b308e;
  text-align: center;
  width: 210px;

  .title {
    padding: 20px;
    display: flex;
    justify-content: center;
    color: #fff;
    background: #0b308e;
  }

  .el-menu {
    background: #0b308e;
    width: 210px;
    height: 100vh;
    border-right: 0px;
    color: #fff
  }

  .el-menu-item {
    color: #fff
  }
}

.el-header {
  display: flex;
  height: 55px;
  background: #0b308e;
  color: #fff;
  align-items: center;
  justify-content: space-between;
  .header-left-content {
    font-size: 14px;
  }
  .header-right-content {
    width: 160px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .el-dropdown {
      color: #fff
    }
  }
}

.el-main {
  --el-main-padding: 0px;
  background-color: #f3f4fa;
}

.el-menu-item:hover {
  background: #409eff;
}

.dropdownPop {
  background-color: #0b308e;
}

:deep(.el-sub-menu__title:hover) {
  background: #409eff;
}
:deep(.el-sub-menu__title) {
  color: #fff
}
:deep(.el-menu--inline) {
  background: #0b308e;
}
:deep(.el-dropdown-menu__item) {
  color: #fff
}
:deep(.el-dropdown-menu__item:hover) {
  color: #fff;
  background: #409eff;
}


</style>