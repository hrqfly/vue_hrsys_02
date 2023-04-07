<template>
  <div class="background">
      <el-image style="width: 100%; height: 100%" :src="imgUrl" />
  </div>
  <div class="loginbody">
    <div class="login">
      <div class="mylogin" align="center">
        <div class="front" >
          <h4 >登录</h4>
          <el-form :model="form" label-width="0px">
            <el-form-item label="id" style="margin-left:30px;">
              <el-input v-model="form.id" placeholder="输入用户ID" />
            </el-form-item>
            <el-form-item label="password" style="margin-left:30px;">
              <el-input v-model="form.password" type="password" placeholder="输入密码"  show-password />
            </el-form-item>
            <el-form-item style="margin-left: 100px">
              <el-button type="primary" @click="onSubmit" >登录</el-button>
            </el-form-item>
        </el-form>
        </div>
      </div>
    </div>
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
// const url =
//     'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
const imgUrl = require('../img/login.jpg')
const onSubmit = () => {
  axios.post("http://localhost:8010/login",{'id':form.id,'password':form.password},{withCredentials: true})
  .then(res =>{
    if(res.data.status == 200 ){
      //跳转页面
      window.localStorage.setItem("token",JSON.stringify(res.data.msg))
      router.push('/welcome')
    }else {
      alert(res.data.msg)
    }

  })
}

</script>

<style scoped>
  .background{
    width:100%;
    height:100%;  /**宽高100%是为了图片铺满屏幕 */
    z-index:-1;
    position: absolute;
  }
  .front{
    width: 80%;
    z-index:1;
    position: absolute;
  }

  .loginbody {
    overflow: hidden;
    overflow-y: hidden;
    overflow-x: hidden;
  }

  .login {
    width: 100vw;
    padding: 0;
    margin: 0;
    height: 100vh;
    font-size: 16px;
  }

  .mylogin {
    width: 260px;
    height: 280px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    padding: 50px 40px 40px 40px;
    box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
    opacity: 1;
  }

</style>