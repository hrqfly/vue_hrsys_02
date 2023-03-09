<template>
  <div>
    <h1  id = "con">员工信息查询</h1>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="员工姓名">
        <el-input v-model="formInline.name" placeholder="员工姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" @keyup.enter="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="160" />
      <el-table-column prop="name" label="Name" width="160" />
      <el-table-column prop="age" label="Age" width="160" />
      <el-table-column prop="dept" label="Dept" width="160" />
      <el-table-column prop="post" label="Post" width="160" />
      <el-table-column prop="phoneNum" label="PhoneNum" width="160" />
      <el-table-column prop="email" label="Email" width="160" />
      <el-table-column prop="level" label="Level"/>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
  export default {
    data() {
      return {
        formInline: {
          name: ''
        },
        tableData:[]
      }
    },
    methods: {
      onSubmit() {
        console.log(this.$data.formInline.name)
        console.log('submit!');
        axios.get('http://localhost:8010/searchuser?name='+this.$data.formInline.name)
            .then(res => {
              if(res.data.status == 200){
                console.log(res.data.data)
                this.tableData = res.data.data
              }else {
                alert(res.data.msg)
              }
            })
      }
    }
  }
</script>

<style scoped>
  #con{
    text-align: center;
  }
</style>