<template>
  <div style="display: flex; justify-content: center; align-item: center;">
    <div style="width: 500px;">
      <el-input v-model="userInfo.username" placeholder="账号" style="margin-bottom: 20px;"></el-input>
      <el-input v-model="userInfo.password" placeholder="密码" style="margin-bottom: 20px;"></el-input>
      <el-button type="primary" @click="toLoginIn">登录</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import * as UserApi from '../api/user'

@Component
export default class Login extends Vue{
  private userInfo: any = {}

  private toLoginIn() {
    UserApi.getUserInfo().then((res: any) => {
      if (res.data.success) {
        this.$store.dispatch('getUserLogin', res.data.data)
        this.$router.push({ path: '/'})
        this.$message.success('登陆成功！')
      } else {
        this.$message.error(res.data.msg)
      }
    })
  }
}
</script>