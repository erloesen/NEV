<template class="total">
  <div class="common-layout">
    <el-container>
      <el-header class="header-wrapped">
        <div class="header-content">
          <h1>新能源汽车产业活跃度监测</h1>
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
                      <span class="forget-password-button" @click="openForget">忘记密码</span>
                    </div>
                    <div class="footer-button">
                      <el-button type="primary" @click="Login">登录</el-button>
                    </div>
                    <div class="footer-go-register">
                      还没有账号？<span class="go-register">马上注册</span>
                    </div>
                  </div>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="注册" name="second">
                <el-form class="login-form">
                  <el-form-item label="账号">
                    <el-input v-model="registerData.account" placeholder="英文数字组合，6到20位"/>
                  </el-form-item>
                  <el-form-item label="密码">
                    <el-input v-model="registerData.password" placeholder="至少8位，大写字母、小写字母和数字"/>
                  </el-form-item>
                  <el-form-item label="确认密码">
                    <el-input v-model="registerData.repassword" placeholder="请再次输入密码"/>
                  </el-form-item>
                  <el-form-item label="手机">
                    <el-input v-model="registerData.phone"/>
                  </el-form-item>
                  <el-form-item label="邮箱">
                    <el-input v-model="registerData.email"/>
                  </el-form-item>
                  <el-form-item label="职位">
                    <el-input v-model="registerData.job"/>
                  </el-form-item>
                  <el-form-item label="公司">
                    <el-input v-model="registerData.company"/>
                  </el-form-item>
                  <div class="footer-button">
                    <el-button type="primary" @click="Register">注册</el-button>
                  </div>
                </el-form>
              </el-tab-pane>
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
  <forget ref="forgetP"></forget>
</template>


<script lang="ts" setup>
import { ref, reactive } from 'vue'
import forget from './components/forgetpassword.vue'
import { ElMessage } from "element-plus";
import { login, register} from '@/api/login'
import { useRouter } from "vue-router";

const activeName = ref('first')
const router = useRouter()
interface formData {
  account: string;
  password: string;
  repassword ?: string;
  phone ?: string;
  email ?: string;
  job ?: string;
  company ?: string;
}
const loginData:formData = reactive({
  account: '',
  password: ''
})
const registerData:formData = reactive({
  account: '',
  password: '',
  repassword: '',
  phone: '',
  email: '',
  job: '',
  company: ''
})
// register
const Register = async () => {
  if (registerData.password == registerData.repassword) {
    const res = await register(registerData)
    if (res.data.message == 'register successfully') {
      ElMessage({
        message: '注册成功',
        type: 'success'
      })
      activeName.value = 'first'
    } else {
      ElMessage.error('注册失败')
    }
  } else {
    ElMessage.error('两次密码不一致')
  }
}

// login
const Login = async () => {
  const res = await login(loginData)
  const {token} = res.data
  const {name} = res.data.results.account
  console.log(res)
  if (res.data.message == 'login successfully') {
    ElMessage({
      message: '登录成功',
      type: 'success'
    })
    localStorage.setItem('token', token)
    localStorage.setItem('username', name)
    router.push('/home')
  } else {
    ElMessage.error('登陆失败')
  }
}


// open forget password dialog
const forgetP = ref()
const openForget = () => {
  forgetP.value.open()
}
</script>

<style lang="scss" scoped>
  .header-wrapped {
    height: 100px;
    .header-content {
      font-size: 20px;
      width: 1200px;
      margin: 5px auto;
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
    height: 800px;
    background-size: 100%;
    --el-main-padding: 0;
    .login-wrapped {
      width: 1200px;
      height: 800px;
      margin: 0 auto;
      .box-card {
        width: 350px;
        float: right;
        position: relative;
        top: 20%;
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
          .footer-button {
            width: 100%;
            display: flex;
            justify-content: center;
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

  //.common-layout {
  //  height: 100vh;
  //  background-color: #0b308e;
  //}
</style>