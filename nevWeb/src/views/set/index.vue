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
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>账号：</span>
            <div class="account-info-content">
              <el-input v-model="account" disabled></el-input>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>密码：</span>
            <div class="account-info-content">
              <el-input v-model="account" disabled></el-input>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>邮箱：</span>
            <div class="account-info-content">
              <el-input v-model="account" disabled></el-input>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>姓名：</span>
            <div class="account-info-content">
              <el-input v-model="account" disabled></el-input>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>性别：</span>
            <div class="account-info-content">
              <el-input v-model="account" disabled></el-input>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>身份：</span>
            <div class="account-info-content">
              <el-input v-model="role" disabled></el-input>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>公司：</span>
            <div class="account-info-content">
              <el-input v-model="company" disabled></el-input>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>职业：</span>
            <div class="account-info-content">
              <el-input v-model="job" disabled></el-input>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">公司信息</el-tab-pane>
        <el-tab-pane label="首页管理" name="third">首页管理</el-tab-pane>
        <el-tab-pane label="其他设置" name="fourth">其他设置</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import breadCrumb from '@/components/bread_crumb.vue'
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import type { TabsPaneContext } from 'element-plus'

const breadcrumb = ref()
const item = ref({
  first: '账号设置'
})

const activeName = ref('first')

const imageUrl = ref('')

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
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

// other account info var
const AccountDetailData = reactive({
  account:'',
  role:'',
  company:'',
  job:''
});


</script>

<style scoped lang="scss">
.common-wrapped {
  padding: 8px;
  background: #f5f5f5;
  // minus header and bread
  height: calc(100vh - 85px);

  .common-content {
    padding: 0 10px;
    height: 100%;
    background: #fff;

    .account-info-wrapped {
      display: flex;
      align-items: center;
      padding-left: 50px;
      margin-bottom: 24px;

      .account-info-content {
        margin-left: 24px;
        margin-right: 16px;
      }
    ;
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