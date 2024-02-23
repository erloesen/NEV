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
          <el-input v-model="ruleForm.account" disabled/>
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
          <el-button type="primary" @click="editUser">确定</el-button>
        </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {onBeforeUnmount, reactive, ref} from 'vue'
import { bus } from '@/utils/mitt'
import { getUserInfo, modifySuperUser } from '@/api/userinfo'
import {ElMessage} from "element-plus";

bus.on('editUserid', async (id:number) => {
  const res = await getUserInfo(id)
  if (res.role != 'user') {
    title.value = '编辑管理员'
    superuser.value = true
  } else {
    title.value = '编辑用户'
    superuser.value = false
  }
  ruleForm.id = res.id
  ruleForm.account = res.account
  ruleForm.name = res.name
  ruleForm.sex = res.sex
  ruleForm.phone = res.phone
  ruleForm.email = res.email
  ruleForm.role = res.role
  ruleForm.company = res.company
  ruleForm.job = res.job
})
const title = ref()
const superuser = ref()

interface ruleForm {
  id?:number,
  account:string,
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
  id:null,
  account:'',
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

const emit = defineEmits(['success'])
const editUser = async () => {
  const res = await modifySuperUser(ruleForm)
  if (res.status == 0){
    ElMessage({
      message: 'User modified',
      type: 'success'
    })
    dialogTableVisible.value = false
    emit('success')
  } else {
    ElMessage.error('User modification failed!')
  }
}

const open = () => {
  dialogTableVisible.value = true
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