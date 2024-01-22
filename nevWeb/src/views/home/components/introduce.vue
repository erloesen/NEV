<template>
  <el-dialog v-model="state.dialogFormVisible" :title="title" width="800px" destroy-on-close center>
    <el-container>
      <el-main>
        <div class="content" v-html="valueHtml"></div>
      </el-main>
    </el-container>
  </el-dialog>
</template>

<script lang="ts" setup>
import {
  onBeforeUnmount, ref, shallowRef,
  reactive
} from 'vue'
import { bus } from "@/utils/mitt.js"
import { getInfo } from '@/api/setting'

const title = ref()
const valueHtml = ref()

bus.on("introduce", async (id : number) => {
  if (id == 0) {
    title.value = '项目介绍'
    valueHtml.value = await getInfo('project')
  }
  if (id == 1) {
    title.value = '数据源'
    valueHtml.value = await getInfo('datasource')
  }
  if (id == 2) {
    title.value = '系列报告'
    valueHtml.value = await getInfo('report')
  }
  if (id == 3) {
    title.value = '编辑全国报告'
    valueHtml.value = await getInfo('introduction')
  }
})
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const state = reactive({
  dialogFormVisible: false,
});

onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
  bus.all.clear()
})
const open = () => {
  state.dialogFormVisible = true;
};
defineExpose({
  open,
});
</script>

<style scoped lang="scss">
.content {
  text-align: center;
}

:deep(.el-main) {
  min-height: 500px;
}
</style>