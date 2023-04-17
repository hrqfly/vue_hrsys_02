<template>
  <div style="margin: 20px;"></div>
  <h2 style="text-align: center">完善技能证书信息</h2>
  <el-form :label-position="labelPosition" label-width="150px" :model="skills">
    <el-form-item label="技能/证书">
      <el-input v-model="skills.skill1" placeholder="技能/证书名称"></el-input>
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
      skills: {
        skill1: '',
      },
      EmployeePortraitsInf:{
        userId: 0,
        type:'Skills',
        content:'',
      }
    };
  },
  methods: {
    onSubmit() {
      this.EmployeePortraitsInf.userId = this.cookies.userId
      if(this.skills.skill1!=''){
        this.EmployeePortraitsInf.content = this.skills.skill1
        axios.post("http://localhost:8010/addEmployeePortraitsInf", this.EmployeePortraitsInf).then(res => {
          alert(res.data.msg)
        })
      }
      // axios.get('http://localhost:8010/getEmployeePortraitsInf?userId='+this.cookies.userId+'&type=Skills')
      //     .then(res => {
      //         console.log(res.data.data)
      //     })
    }
  }
}
</script>

<style scoped>

</style>