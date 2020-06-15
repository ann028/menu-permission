<template>
  <div>
    <div>角色管理</div>
    <button @click="toAdd">add</button>
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
@Component
export default class AddRole extends Vue{
  private toAdd() {
    console.log(111)
    this.$router.push({
      name: 'addRole',
    })
  }
}
</script>