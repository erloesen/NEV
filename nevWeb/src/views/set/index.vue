<template>
  <breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
  <div class="common-wrapped">
    <div class="common-content">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="账号详情" name="first">
          <div class="account-info-wrapped">
            <span>头像：</span>
            <div class="account-info-content">
              <el-upload
                  class="avatar-uploader"
                  action="http://127.0.0.1:3000/user/uploadAvatar"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
              >
                <img v-if="store.imageurl" :src="store.imageurl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>账号：</span>
            <div class="account-info-content">
              <el-input v-model="store.account" disabled></el-input>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>密码：</span>
            <div class="account-info-content">
              <el-button type="primary" @click="openChangePassword">修改密码</el-button>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>手机：</span>
            <div class="account-info-content">
              <el-input v-model="store.phone" disabled></el-input>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>邮箱：</span>
            <div class="account-info-content">
              <el-input v-model="store.email"></el-input>
            </div>
            <div class="account-save-button">
              <el-button type="primary" @click="saveEmail">保存</el-button>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>姓名：</span>
            <div class="account-info-content">
              <el-input v-model="store.name"></el-input>
            </div>
            <div class="account-save-button">
              <el-button type="primary" @click="saveName">保存</el-button>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>性别：</span>
            <div class="account-info-content">
              <el-select v-model="store.sex">
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
              </el-select>
            </div>
            <div class="account-save-button">
              <el-button type="primary" @click="saveSex">保存</el-button>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>身份：</span>
            <div class="account-info-content">
              <el-input v-model="store.role" disabled></el-input>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>公司：</span>
            <div class="account-info-content">
              <el-input v-model="store.company" disabled></el-input>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>职业：</span>
            <div class="account-info-content">
              <el-input v-model="store.job" disabled></el-input>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="项目信息" name="second">
          <div class="account-info-wrapped">
            <span>公司名称：</span>
            <div class="account-info-content">
              <el-input v-model="companyName"></el-input>
            </div>
            <div class="account-save-button">
              <el-button type="primary" @click="changeCompanyName">保存</el-button>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>公司介绍：</span>
            <div class="account-info-content">
              <el-button type="success" @click="openEditor(1)">编辑内容</el-button>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>项目介绍：</span>
            <div class="account-info-content">
              <el-button type="success" @click="openEditor(2)">编辑内容</el-button>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>数据源：</span>
            <div class="account-info-content">
              <el-button type="success" @click="openEditor(3)">编辑内容</el-button>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>全国报告：</span>
            <div class="account-info-content">
              <el-button type="success" @click="openEditor(4)">编辑内容</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="首页管理" name="third">首页管理</el-tab-pane>
        <el-tab-pane label="其他设置" name="fourth">其他设置</el-tab-pane>
      </el-tabs>
    </div>
  </div>
  <change ref="changeP"></change>
  <editor ref="editorP"></editor>
</template>

<script lang="ts" setup>
import breadCrumb from '@/components/bread_crumb.vue'
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import { useUserInfoStore } from '@/store/userinfo'
import { bindAccount } from '@/api/userinfo'
import change from './components/changepassword.vue'
import {changeName, changeEmail, changeSex} from '@/api/userinfo'
import editor from './components/editor.vue'
import {getCompanyInfo, changeCompanyInfo} from '@/api/setting'
import {bus} from "@/utils/mitt"

const store = useUserInfoStore()
const changeP = ref()
const editorP = ref()
const breadcrumb = ref()
const item = ref({
  first: '账号设置'
})

const activeName = ref('first')

// avatar image upload successfully
const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
) => {
  // imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  if (response.status == 0) {
    userStore.$patch({
      imageurl: response.url
    })
    ElMessage({
      message: 'image uploaded',
      type: 'success'
    }),
    (async () => {
      await bindAccount(store.account, response.url, response.onlyid)
    })()
  } else {
      ElMessage.error('upload image failed!')
  }
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

const openChangePassword = () => {
  changeP.value.open()
}

const saveName = async () => {
  const res = await changeName(sessionStorage.getItem('id'), store.name)
  if (res.status == 0) {
    ElMessage({
      message: 'name updated',
      type: 'success'
    })
  } else {
    ElMessage.error('name update failed!')
  }
}

const saveEmail = async () => {
  const res = await changeEmail(sessionStorage.getItem('id'), store.email)
  if (res.status == 0) {
    ElMessage({
      message: 'email updated',
      type: 'success'
    })
  } else {
    ElMessage.error('email update failed!')
  }
}

const saveSex = async () => {
  const res = await changeSex(sessionStorage.getItem('id'), store.sex)
  if (res.status == 0) {
    ElMessage({
      message: 'sex updated',
      type: 'success'
    })
  } else {
    ElMessage.error('sex update failed!')
  }
}

const companyName = ref()
const getCompanyName = async () => {
  companyName.value = await getCompanyInfo()
}
getCompanyName()

const changeCompanyName = async () => {
  const res = await changeCompanyInfo(companyName.value)
  if (res.status == 0) {
    ElMessage({
      message: 'company name updated',
      type: 'success'
    })
  } else {
    ElMessage.error('company name update failed!')
  }
}

const openEditor = async (id: number) => {
  bus.emit('editorTitle', id)
  editorP.value.open()
}

</script>

<style scoped lang="scss">
.common-wrapped {
  padding: 8px;
  background: #f5f5f5;
  // minus header and bread and padding*2
  height: calc(100vh - 101px);

  .common-content {
    padding: 0 10px;
    height: 100%;
    background: #fff;

    .account-info-wrapped {
      display: flex;
      align-items: center;
      padding-left: 50px;
      margin-bottom: 24px;
      font-size: 14px;

      span {
        width: 100px;
        text-align: center;
      }

      .account-info-content {
        margin-left: 24px;
        margin-right: 16px;
      }

      .account-save-button {
        margin-left: 16px;
      }
    }
  }
}


.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

:deep(.el-input) {
  width: 240px;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>