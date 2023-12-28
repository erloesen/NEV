<template>
<!--  forget password-->
  <el-dialog v-model="state.forgetPasswordDialog" title="忘记密码" width="500px">
    <el-form class="login-form" :label-position="labelPosition" :rules="rules">
      <el-form-item label="账号" prop="account">
        <el-input v-model="forgetData.account" placeholder="输入您的注册账号"/>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="forgetData.password" placeholder="输入您的注册邮箱"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.forgetPasswordDialog=false">取消</el-button>
        <el-button type="primary" @click="openChangePassword">
          下一步
        </el-button>
      </span>
    </template>
  </el-dialog>
<!--  reset password-->
  <el-dialog v-model="state.changePasswordDialog" title="重设密码" width="500px">
    <el-form class="login-form" :label-position="labelPosition" :rules="rules">
      <el-form-item label="输入新密码" prop="password">
        <el-input v-model="forgetData.password" placeholder="情设置一个新密码"/>
      </el-form-item>
      <el-form-item label="确认新密码" prop="repassword">
        <el-input v-model="forgetData.repassword" placeholder="请再次输入"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.changePasswordDialog=false">取消</el-button>
        <el-button type="primary" @click="state.changePasswordDialog=false">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'

const labelPosition = ref('top')
interface forgetData {
  account: string;
  email: string;
  password: string;
  repassword: string;
}

const forgetData: forgetData = reactive({
  account: '',
  email: '',
  password: '',
  repassword: ''
})
// dialog default close
const state = reactive({
  forgetPasswordDialog: false,
  changePasswordDialog: false
})
const openChangePassword = () => {
  state.changePasswordDialog = true;
  state.forgetPasswordDialog = false;
}
const rules = reactive({
  account: [
    {required: true, message:'账号不能为空', trigger: 'blur'}
  ],
  email: [
    {required: true, message:'邮箱不能为空', trigger: 'blur'}
  ],
  password: [
    {required: true, message:'新密码不能为空', trigger: 'blur'}
  ],
  repassword: [
    {required: true, message:'请确认密码', trigger: 'blur'}
  ]
})

const open = () => {
  state.forgetPasswordDialog = true
}

defineExpose({
  open
})
</script>

<style lang="scss" scoped>

</style>