<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header-wrapped">
        <div class="header-content">
          <h2>新能源汽车产业监测</h2>
          <span class="welcome">欢迎您的登录</span>
        </div>
      </el-header>
      <el-main>
        <div class="login-wrapped">
          <el-card class="box-card">
            <el-tabs v-model="activeName" class="demo-tabs" :stretch="true">
              <el-tab-pane label="登录" name="first">
                <el-form class="login-form">
                  <el-form-item label="账号">
                    <el-input v-model="loginData.account" placeholder="请输入账号"/>
                  </el-form-item>
                  <el-form-item label="密码">
                    <el-input v-model="loginData.password" placeholder="请输入密码"/>
                  </el-form-item>
                  <div class="footer-wrapped">
                    <div class="forget-password">
                      <span class="forget-password-button">忘记密码</span>
                    </div>
                    <div class="footer-button">
                      <el-button type="primary">登录</el-button>
                    </div>
                    <div class="footer-go-register">
                      还没有账号？<span class="go-register">马上注册</span>
                    </div>
                  </div>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="注册" name="second">注册</el-tab-pane>
            </el-tabs>
          </el-card>
        </div>
      </el-main>
      <el-footer class="footer-wrapped">
        <div class="footer-content">
          <div class="title">
            <span>新华社国家重点实验室</span> |
            <span>卫星新闻实验室</span> |
            <span>北大地球科学学院</span> |
            <span>中国移动梧桐大数据</span>
          </div>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>


<script lang="ts" setup>
  import { ref, reactive } from 'vue'
  const activeName = ref('first')

  interface formData {
    account: string;
    password: string;
  }
  const loginData:formData = reactive({
    account: '',
    password: ''
  })
</script>

<style lang="scss" scoped>
  .header-wrapped {
    .header-content {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .welcome {
        font-size: 14px;
      }
    }
  }
  .el-main {
    background-image: url('@/assets/login_nev.jpg');
    height: 600px;
    background-size: 100%;
    --el-main-padding: 0;
    .login-wrapped {
      width: 1200px;
      height: 600px;
      margin: 0 auto;
      .box-card {
        width: 350px;
        height: 375px;
        float: right;
        position: relative;
        top: 14%;
        .login-form {
          .footer-wrapped {
            display: flex;
            flex-direction: column;
            .forget-password {
              display: flex;
              justify-content: flex-end;
              margin: 10px 0;
              .forget-password-button {
                font-size: 12px;
                color: #409eff;
                cursor: pointer;
              }
            }
            .footer-button {
              width: 100%;
              display: flex;
              justify-content: center;
            }
            .footer-go-register {
              font-size: 12px;
              margin: 12px 0;
              display: flex;
              justify-content: center;
              .go-register {
                font-size: 12px;
                color: #409eff;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
  .footer-wrapped {
    margin-top: 12px;
    .footer-content {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      .title {
        color: #666
      }
      span {
        color: #666;
        font-size: 12px;
      }
    }
  }
  // form
  .el-form {
    margin-top: 30px;

  }
  // tabs
  :deep(.el-tabs__item) {
    font-size: 18px;
  }
  // input block
  :deep(.el-input__inner) {
    height: 40px;
  }
  :deep(.el-form-item__label) {
    height: 40px;
    line-height: 40px;
  }
  :deep(.el-button) {
    width: 300px;
    height: 45px;
    font-size: 16px;
  }
</style>