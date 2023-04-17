<template>
  <div style="margin: 20px;"></div>
  <h2 style="text-align: center">完善兴趣爱好信息</h2>
  <el-form :label-position="labelPosition" label-width="150px" :model="hobbies">
    <el-form-item label="兴趣爱好1">
      <el-input v-model="hobbies.hobby1" placeholder="兴趣爱好1"></el-input>
    </el-form-item>
    <el-form-item label="兴趣爱好2">
      <el-input v-model="hobbies.hobby2" placeholder="兴趣爱好1"></el-input>
    </el-form-item>
    <el-form-item label="兴趣爱好3">
      <el-input v-model="hobbies.hobby3" placeholder="兴趣爱好3"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">添加</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      cookies:{
        userId : document.cookie.split("; ")[0].split("=")[1].split("#")[0],
      },
      labelPosition: 'right',
      hobbies: {
        hobby1: '',
        hobby2: '',
        hobby3: '',
      },
      EmployeePortraitsInf:{
        userId: 0,
        type:'Hobbies',
        content:'',
      }
    };
  },
  methods: {
    onSubmit() {
      this.EmployeePortraitsInf.content = this.hobbies.hobby1+','+this.hobbies.hobby2+','+this.hobbies.hobby3
      this.EmployeePortraitsInf.userId = this.cookies.userId,
      axios.post("http://localhost:8010/addEmployeePortraitsInf", this.EmployeePortraitsInf).then(res => {
            alert(res.data.msg)
      })
      // axios.get('http://localhost:8010/getEmployeePortraitsInf?userId='+this.cookies.userId+'&type=Hobbies')
      //     .then(res => {
      //         console.log(res.data.data)
      //     })
    }
  }
}
</script>

<style scoped>

</style>