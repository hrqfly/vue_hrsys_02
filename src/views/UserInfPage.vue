<template>
  <h1 style="text-align: center">用户数据</h1>
  <div style="text-align: center">
    <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    />
    <button @click="handlerLogout" style="float: right">
      <h3>登出</h3>
    </button>
  </div>
  <div class="userInf">
    工号：{{userInf.id}}
    <br>
    姓名：{{userInf.name}}
    <br>
    部门：{{userInf.dept}}/ 评级：{{userInf.level}}
    <br>
    办公地址：{{userInf.post}}
    <br>
    邮箱：{{userInf.email}}
    <br>
    电话：{{userInf.phoneNum}}
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router/index";
export default {

  data() {
    return {
      cookies:{
        cookies : document.cookie.split("; ")[0].split("=")[1],
      },
      userInf: {
        id:'',
        age: '',
        level: '',
        name: '',
        dept: '',
        post: '',
        phoneNum: '',
        email: '',
      },
    };
  },
  mounted:function (){

    this.created();

  },
  methods: {
    created(){
      axios.get('http://localhost:8010/findbyid?userId='+this.cookies.cookies.split("#")[0])
          .then(res => {
            if(res.data.status == 200){
              console.log(res.data.data)
              this.userInf = res.data.data
            }else {
              alert(res.data.msg)
            }
          })
    },
    handlerLogout(){
      window.localStorage.removeItem("token")
      window.localStorage.removeItem("superToken")
      axios.post('http://localhost:8010/logout')
          .then(res => {
              alert(res.data.msg)
              // 退出登录则跳转回首页
              router.push('/welcome')
          })
    },
  }
}
</script>

<style scoped>
  .userInf{
    border: 2px solid #000;
    width: 80%;
    margin: auto;
    line-height: 150%;
  }
</style>