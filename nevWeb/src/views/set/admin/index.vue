<template>
  <breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
  <div class="table-wrapped">
    <div class="table-top">
      <div class="table-header">
        <div class="search-wrapped">
          <el-input
              v-model="searchAccount"
              class="w-50 m-2"
              size="large"
              placeholder="输入用户名"
              :suffix-icon="Search"
              @change="searchSU(searchAccount, 1)"
          />
        </div>
        <div class="button-wrapped">
          <el-button type="primary" @click="openCreate(1)">添加管理员</el-button>
        </div>
      </div>
      <div class="table-content">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index" width="50" />
          <el-table-column prop="account" label="账号" />
          <el-table-column prop="name" label="姓名" />
          <el-table-column prop="sex" label="性别" />
          <el-table-column prop="phone" label="手机" />
          <el-table-column prop="email" label="邮箱" />
          <el-table-column prop="company" label="公司" />
          <el-table-column prop="job" label="职业" />
          <el-table-column prop="role" label="权限" />
          <el-table-column prop="status" label="状态" />
          <el-table-column prop="createdate" :formatter="formatDate" label="创建时间" />
          <el-table-column label="操作" >
            <template #default="{row}">
              <div class="edit-btn">
                <el-button type="success" @click="openEdit(row.id)">编辑</el-button>
                <el-button type="danger" @click="openDelete(row.id, row.role)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="table-footer">
      <el-pagination
          :page-size="20"
          :pager-count="11"
          layout="prev, pager, next"
          :total="1000"
          :hide-on-single-page=true
      />
    </div>
  </div>
  <createSuperUser ref="Create" @success="getSUlist(1)"></createSuperUser>
  <editSuperUser ref="Edit" @success="getSUlist(1)"></editSuperUser>
  <deleteSuperUser ref="Delete" @success="getSUlist(1)"></deleteSuperUser>
</template>

<script lang="ts" setup>
import breadCrumb from '@/components/bread_crumb.vue'
import {onBeforeUnmount, ref} from "vue";
import { Search } from '@element-plus/icons-vue'
import createSuperUser from '../components/createSuperUser.vue'
import editSuperUser from '../components/editSuperUser.vue'
import deleteSuperUser from '../components/deleteSuperUser.vue'
import { bus } from '@/utils/mitt'
import { getSuperUserList, searchUser } from '@/api/userinfo'

const breadcrumb = ref()
const item = ref({
  first: '管理',
  second: '管理员设置'
})
const searchAccount = ref()
const tableData = ref([])
const getSUlist = async (admin) => {
  tableData.value = await getSuperUserList(admin)
}
getSUlist(1)

const searchSU = async (account, admin) => {
  tableData.value = await searchUser(account, admin)
}
const Create = ref()
const Edit = ref()
const Delete = ref()
const openCreate = (id:number) => {
  bus.emit('createid', id)
  Create.value.open()
}
const openEdit = (id:number) => {
  bus.emit('editUserid', id)
  Edit.value.open()
}

const openDelete = (id:number, role:string) => {
  bus.emit('deleteUserid', id)
  bus.emit('deleteRole', role)
  Delete.value.open()
}

const formatDate = (row, column, cellValue) => {
  const parts = cellValue.split('T')
  return parts[0]
}
onBeforeUnmount(() => {
  bus.all.clear()
})
</script>

<style scoped lang="scss">
</style>