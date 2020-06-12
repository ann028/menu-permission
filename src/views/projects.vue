<template>
  <div>
    <div> 项目管理</div>
    <div @click="toAdd">add</div>
  </div>
 
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
@Component
export default class projects extends Vue{
  private toAdd() {
    this.$router.push({
      name: 'addProject',
    })
  }
}
</script>