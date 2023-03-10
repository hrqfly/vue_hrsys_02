<template>
  <div style="margin: 20px;"></div>
  <h2 style="text-align: center">添加用户</h2>
  <el-form :label-position="labelPosition" label-width="80px" :model="userInf">
    <el-form-item label="姓名">
      <el-input v-model="userInf.name" placeholder="输入用户姓名"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="userInf.password" type = "password" placeholder="输入用户密码" show-password></el-input>
    </el-form-item>
    <el-form-item label="年龄">
      <el-input v-model="userInf.age" placeholder="输入用户年龄"></el-input>
    </el-form-item>
    <el-form-item label="部门">
      <el-input v-model="userInf.dept" placeholder="输入用户部门"></el-input>
    </el-form-item>
    <el-form-item label="所属地址">
      <el-input v-model="userInf.post" placeholder="输入用户所属地址"></el-input>
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="userInf.phoneNum" placeholder="输入用户联系电话"></el-input>
    </el-form-item>
    <el-form-item label="级别">
      <el-input v-model="userInf.level" placeholder="输入用户评级"></el-input>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="userInf.email" placeholder="输入用户邮箱"></el-input>
    </el-form-item>
    <el-form-item >
      <el-button type="primary" @click="onSubmit">添加</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from "axios";
  export default {
    data() {
      return {
        labelPosition: 'right',
        userInf: {
          name: '',
          password: '',
          age: '',
          dept: '',
          post: '',
          phoneNum: '',
          level: '',
          email: '',
        }
      };
    },
    methods: {
      onSubmit() {
        console.log(this.$data.userInf.phoneNum)
        console.log('submit!');
        axios.post("http://localhost:8010/insertuser",this.userInf)
            .then(res => {
              if(res.data.status == 200){
                alert("生成的工号为"+res.data.msg+"，请认真记录下来")
              }else {
                alert(res.data.msg)
              }
            })
      }
    }
  }
</script>

<style scoped>

</style>