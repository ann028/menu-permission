<template>
  <div class="head flex main_space main_alignCenter" style="line-height: 60px">
    <div class="logo flex1">
      head
    </div>
    <div class="user cur-pointer">
      <section>
        <div style="display: flex; align-items: center;">
          <span style="margin-right: 10px;">{{user.userName}}</span>
          <el-avatar icon="el-icon-user-solid"></el-avatar>
        </div>
        <!-- <div class="user-info">{{user.userName}}</div> -->
        <div class="popover" style="line-height: 20px;">
          <i class="el-icon-s-tools" style="font-size: 20px;"></i>
          <span @click="doLogout" style="margin-left: 10px; font-size: 16px; cursor: pointer;">退出登录</span>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
@Component
export default class HeaderNav extends Vue {
 private userInfo: any = {}
 private get user() {
   return this.$store.state.auth.user
 }
 private doLogout() {
   this.$store.dispatch('logout')
 }
};
</script>

<style lang="less" scoped>
.head {
  height: 60px; 
  background: rgba(255, 255, 255, 1);
  padding: 0 40px;
  box-sizing: border-box;
  .logo {
    height: 60px;
    width: 190px;
  }
  .user {
    .user-info {
      // float: right;
      width: 60px;
      height: 60px;
      border-radius: 50px;
    }
    &:hover .popover {
      display: block;
    }
  }

  .popover {
    display: none;
    position: absolute;
    margin-right: 11px;
    top: 52px;
    right: 0;
    width: 178px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 6px 0px rgba(203, 203, 212, 0.6);
    border-radius: 4px 0px 0px 0px;
    border: 1px solid rgba(227, 227, 227, 1);
    z-index: 10;
    cursor: default;
    padding: 20px;
    .user-name {
      margin-left: 9px;
      height: 26px;
      font-size: 20px;
      font-family: MicrosoftYaHei;
      color: rgba(51, 51, 51, 1);
      line-height: 26px;
      margin-top: 11px;
    }
    .line {
      width: 160px;
      height: 1px;
      background: rgba(203, 203, 212, 1);
      margin-left: 9px;
      margin-top: 10px;
    }
  }
}
</style>


