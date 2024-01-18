<template>
  <el-dialog v-model="state.changePasswordDialog" title="重设密码" width="500px">
    <el-form class="login-form" :label-position="labelPosition" :model="passwordData" :rules="rules">
      <el-form-item label="旧密码" prop="oldpassword">
        <el-input v-model="passwordData.oldpassword" placeholder="请输入旧密码" show-password/>
      </el-form-item>
      <el-form-item label="新密码" prop="newpassword">
        <el-input v-model="passwordData.newpassword" placeholder="请输入新密码" show-password/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.changePasswordDialog=false">取消</el-button>
        <el-button type="primary" @click="changeUserPassword">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue';
import {changePassword} from '@/api/userinfo';
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";

const router = useRouter()
const labelPosition = ref('top')
interface passwordData {
  oldpassword: string;
  newpassword: string;
}

const passwordData: passwordData = reactive({
  oldpassword: '',
  newpassword: ''
})
// dialog default close
const state = reactive({
  changePasswordDialog: false
})

const changeUserPassword = async () => {
  if (passwordData.oldpassword && passwordData.newpassword) {
    const res = await changePassword(sessionStorage.getItem('id'), passwordData.oldpassword, passwordData.newpassword);
    if (res.data.status == 0) {
      ElMessage({
        message: 'updated',
        type: 'success'
      })
      state.changePasswordDialog = false
      router.push('/login')
    } else {
      ElMessage.error('update failed!')
    }
  } else {
    ElMessage.error('please check input password!')
  }
}

const rules = reactive({
  oldpassword: [
    {required: true, message:'旧密码不能为空', trigger: 'blur'}
  ],
  newpassword: [
    {required: true, message:'新密码不能为空', trigger: 'blur'}
  ]
})

const open = () => {
  state.changePasswordDialog = true
}

defineExpose({
  open
})
</script>

<style scoped lang="scss">

</style>