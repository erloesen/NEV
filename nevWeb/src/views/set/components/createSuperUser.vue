<template>
  <el-dialog v-model="dialogTableVisible" :title="title" width="600" align-center draggable>
    <div class="dialog-content">
      <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
      >
        <el-form-item label="账号" prop="account">
          <el-input v-model="ruleForm.account" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio label="男" />
            <el-radio label="女" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="ruleForm.phone" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" />
        </el-form-item>
        <el-form-item v-if="superuser" label="权限" prop="role">
          <el-radio-group v-model="ruleForm.role">
            <el-radio label="editor" />
            <el-radio label="admin" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="公司" prop="company">
          <el-input v-model="ruleForm.company" />
        </el-form-item>
        <el-form-item label="职业" prop="job">
          <el-input v-model="ruleForm.job" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="createUser">确定</el-button>
        </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {onBeforeUnmount, reactive, ref} from 'vue'
import { bus } from '@/utils/mitt'
import { createSuperUser } from '@/api/userinfo'
import {ElMessage} from "element-plus";


bus.on('createid', (id:number) => {
  if (id == 1) {
    title.value = '新建管理员'
    superuser.value = true
  } else if (id == 2) {
    title.value = '新建用户'
    superuser.value = false
  }
})
const title = ref()
const superuser = ref()

interface ruleForm {
  account:string,
  password:string,
  name:string,
  sex:string,
  phone:string,
  email:string,
  role:string,
  company:string,
  job:string
}

const dialogTableVisible = ref(false)
const ruleForm : ruleForm = reactive({
  account:'',
  password:'',
  name:'',
  sex:'男',
  phone:'',
  email:'',
  role:'',
  company:'',
  job:''
})

const rules = reactive({
  account: [
    {required:true, message:'请输入管理员账号', trigger:'blur'}
  ],
  password: [
    {required:true, message:'请输入管理员密码', trigger:'blur'}
  ],
  name: [
    {required:true, message:'请输入姓名', trigger:'blur'}
  ],
  sex: [
    {required:true}
  ],
  phone: [
    {required:true, message:'请输入手机号', trigger:'blur'}
  ],
  email: [
    {required:true, message:'请输入邮箱', trigger:'blur'}
  ],
  role: [
    {required:true}
  ],
  company: [
    {required:true, message:'请输入所属公司', trigger:'blur'}
  ],
  job: [
    {required:true, message:'请输入职务', trigger:'blur'}
  ]
})

const open = () => {
  dialogTableVisible.value = true
}

const emit = defineEmits(['success'])
const createUser = async () => {
  const res = await createSuperUser(ruleForm)
  if (res.status == 0){
    ElMessage({
      message: 'User created',
      type: 'success'
    })
    dialogTableVisible.value = false
    emit('success')
  } else {
    ElMessage.error('User creation failed!')
  }
}

defineExpose({
  open
})

onBeforeUnmount(() => {
  bus.all.clear()
})
</script>

<style scoped lang="scss">
.dialog-content {
  display: flex;
  padding: 0 30px;
  .el-form-item {
    margin: 30px 50px;
  }
}
</style>