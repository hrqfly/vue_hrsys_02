<template>
  <div style="margin: 20px;"></div>
  <h2 style="text-align: center">完善工作发展信息</h2>
  <el-form :label-position="labelPosition" label-width="150px" :model="devInf">
    <el-form-item label="项目经历">
      <el-input v-model="devInf.project" placeholder="项目名称或技术"></el-input>
    </el-form-item>
    <el-form-item label="工作经历">
      <el-input v-model="devInf.jobExp" placeholder="工作经历"></el-input>
    </el-form-item>
    <el-form-item label="求学经历">
      <el-input v-model="devInf.stuExp" placeholder="求学经历"></el-input>
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
      devInf: {
        project: '',
        jobExp: '',
        stuExp: '',
      },
      EmployeePortraitsInf:{
        userId: 0,
        type:'jobDev',
        content:'',
      }
    };
  },
  methods: {
    onSubmit() {
      this.EmployeePortraitsInf.content = this.devInf.project+','+this.devInf.jobExp+','+this.devInf.stuExp
      this.EmployeePortraitsInf.userId = this.cookies.userId
      if(this.EmployeePortraitsInf.content!=''){
        axios.post("http://localhost:8010/addEmployeePortraitsInf", this.EmployeePortraitsInf).then(res => {
          alert(res.data.msg)
        })
      }
      axios.get('http://localhost:8010/getEmployeePortraitsInf?userId=' + this.cookies.userId + '&type=jobDev')
          .then(res => {
            console.log(res.data.data)
          })
    }
  }
}
</script>

<style scoped>

</style>