<template>
  <el-dialog v-model="state.dialogFormVisible" :title="title" width="600px" destroy-on-close>
    <div style="border: 1px solid #ccc">
      <!-- wangEditor结构 -->
      <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
               :mode="mode" />
      <Editor style="height: 500px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig"
              :mode="mode" @onCreated="handleCreated" />
    </div>
    <template #footer>
			<span class="dialog-footer">
				<el-button @click="cancel">取消</el-button>
				<el-button type="primary" @click="yes">
					确认
				</el-button>
			</span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {
  onBeforeUnmount, ref, shallowRef,
  reactive
} from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { bus } from "@/utils/mitt.js"
import {
  ElMessage
} from "element-plus"

// changecompanyintro
import { getInfo, changeInfo } from '@/api/setting'
const title = ref()
const set_name = ref()

bus.on("editorTitle", async (id : number) => {
  if (id == 1) {
    title.value = '编辑公司介绍'
    set_name.value = 'introduction'
    valueHtml.value = await getInfo('introduction')
  }
  if (id == 2) {
    title.value = '编辑项目介绍'
    set_name.value = 'project'
    valueHtml.value = await getInfo('project')
  }
  if (id == 3) {
    title.value = '编辑数据源'
    set_name.value = 'datasource'
    valueHtml.value = await getInfo('datasource')
  }
  if (id == 4) {
    title.value = '编辑全国报告'
    set_name.value = 'report'
    valueHtml.value = await getInfo('report')
  }
})
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
// mode
const mode = ref('default')
// 内容 HTML
const valueHtml = ref()
const toolbarConfig = {
  excludeKeys: []
}
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      //上传图片配置
      server: 'http://127.0.0.1:3007/set/uploadCompanyPicture', //上传接口地址
      fieldName: 'file', //上传文件名
      methods: 'post',
      metaWithUrl: true, // 参数拼接到 url 上
      // 单个文件上传成功之后
      // onSuccess(file, res) {
      // },
      // 自定义插入图片
      customInsert(res, insertFn) {
        insertFn(res.url)
      },
    },
  }
}
// 上传图片，修改 uploadImage 菜单配置
// 需要注意的是，如何去修改参数？
toolbarConfig.excludeKeys = [
  'blockquote',
  'bgColor',
  'color',
  'group-more-style',
  // 'fontFamily',
  'bulletedList',
  'numberedList',
  'lineHeight',
  'todo',
  'emotion',
  'insertLink',
  'group-video',
  'insertTable',
  'codeBlock',
  'divider',
  'fullScreen',
  // 'group-image',
  // 排除菜单组，写菜单组 key 的值即可
]
// 点击确认 修改文案
const yes = async () => {
  // 去除 编辑两个字
  console.log(title.value.slice(-4))
  // 两个参数 set_text set_name
  const res = await changeInfo(set_name.value, valueHtml.value)
  console.log(res)
  if (res.status == 0) {
    ElMessage({
      message: 'modify successfylly',
      type: 'success',
    })
    state.dialogFormVisible = false
  } else {
    state.dialogFormVisible = false
    ElMessage.error('modify failed!')
  }
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
  bus.all.clear()
})

const handleCreated = (editor : any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
const state = reactive({
  dialogFormVisible: false,
});

// 取消删除
const cancel = () => {
  ElMessage.error("取消赋权！");
  state.dialogFormVisible = false;
};

// 暴露open方法
const open = () => {
  state.dialogFormVisible = true;
};
defineExpose({
  open,
});
</script>

<style scoped lang="scss">

</style>