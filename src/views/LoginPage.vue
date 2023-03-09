<template>
  <div id="container">
    <h1  id = "con">欢迎使用moose人力资源管理系统</h1>
    <el-form :model="form" label-width="120px">
      <el-form-item label="id">
        <el-input v-model="form.id" placeholder="输入用户ID" />
      </el-form-item>
      <el-form-item label="password">
        <el-input v-model="form.password" type="password" placeholder="输入密码"  show-password />
      </el-form-item>
      <el-form-item >
        <el-button type="primary" @click="onSubmit">Login</el-button>
      </el-form-item>
  </el-form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import axios from "axios";
import router from "@/router/index";

// do not use same name with ref
const form = reactive({
  id: '',
  password:'',

})

const onSubmit = () => {
  console.log(form.id)
  console.log(form.password)
  axios.post("http://localhost:8010/login",{'id':form.id,'password':form.password})
  .then(res =>{
    console.log(res)

    if(res.data.status == 200 ){
      //跳转页面
      router.push('/home')
    }else {
      alert(res.data.msg)
    }

  })
}
</script>

<style scoped>
  #container{
    width: 500px;
    margin: auto;
  }
  #button{
    margin: auto;
  }
  #con{
    text-align: center;
  }
</style>