<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }"><slot name='a'></slot></el-breadcrumb-item>
  <el-breadcrumb-item><slot name='b'></slot></el-breadcrumb-item>
  <el-breadcrumb-item><slot name=c></slot></el-breadcrumb-item>
</el-breadcrumb>
</template>



<script>
export default {
    name:'Bread'
    
}
</script>