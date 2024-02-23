<template>
  <el-dialog v-model="dialogTableVisible" :title="title" width="30%" center>
    <span>确认删除吗？删除管理员并不会删除该用户，而是将其降级为普通用户，可以在用户设置中进行彻底删除</span>
    <template #footer>
        <span class="dialog-footer">
          <el-button :disabled="checkBtn.disabled" type="danger" @click="deleteUser">确认删除 {{checkBtn.countdownText}}</el-button>
        </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {onBeforeUnmount, reactive, ref} from 'vue'
import { bus } from '@/utils/mitt'
import { SuperUser2User } from '@/api/userinfo'
import { ElMessage } from "element-plus";

const userid = ref()
const dialogTableVisible = ref(false)
const title = ref()
const checkBtn = reactive({
  countdownText: '',
  disabled: true,
  duration: 5,
  timer: 0
})
const emit = defineEmits(['success'])

bus.on('deleteUserid', (id:number) => {
  userid.value = id
})
bus.on('deleteRole', (role:string) => {
  if (role != 'user') {
    title.value = '删除管理员'
  } else {
    title.value = '删除用户'
  }
})

const deleteUser = async () => {
  const res = await SuperUser2User(userid.value)
  if (res.status == 0){
    ElMessage({
      message: 'Super User downgraded',
      type: 'success'
    })
    dialogTableVisible.value = false
    emit('success')
  } else {
    ElMessage.error('Downgrade failed!')
  }
}
const open = () => {
  dialogTableVisible.value = true
  checkBtn.countdownText = `(${checkBtn.duration})`
  checkBtn.disabled = true
  checkBtn.timer && clearInterval(checkBtn.timer)
  checkBtn.timer = setInterval(() => {
    const tmp = checkBtn.duration--
    checkBtn.countdownText = `(${tmp})`
    if (tmp <= 0) {
      clearInterval(checkBtn.timer)
      checkBtn.duration = 5
      checkBtn.countdownText = ''
      checkBtn.disabled = false
    }
  }, 1000)

}

defineExpose({
  open
})

onBeforeUnmount(() => {
  bus.all.clear()
})
</script>

<style scoped lang="scss">
</style>