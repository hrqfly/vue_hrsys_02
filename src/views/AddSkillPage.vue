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

  <h2 style="text-align: center">编辑技能证书信息</h2>
  <el-table :data="tableData" border style="width: 50%;margin: auto">
    <el-table-column prop="Skills" label="爱好" />
    <el-table-column
        fixed="right"
        label="操作">
      <template #default="scope">
        <el-button @click="handleEdit(scope.row)" type="primary" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import axios from "axios";
import router from "@/router/index";
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
      },
      tableData:[
        // {Skills:'giao'},
      ],
    };
  },
  mounted: function () {
    this.loadData();
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
      router.go(0)
    },
    handleEdit(row){
      this.EmployeePortraitsInf.content = row.Skills
      this.EmployeePortraitsInf.userId = this.cookies.userId
      axios.post("http://localhost:8010/deleteEmployeePortraitsInf", this.EmployeePortraitsInf).then(res => {
        alert(res.data.msg)
      })
      console.log(this.EmployeePortraitsInf)
      this.tableData = []
      this.loadData()
    },
    loadData(){
      axios.get('http://localhost:8010/getEmployeePortraitsInf?userId=' + this.cookies.userId + '&type=Skills').then(res => {
        for (let i = 0 ; i<res.data.data.length;i++){
          this.tableData.push({Skills : res.data.data[i]})
        }
      })
    }
  }
}
</script>

<style scoped>

</style>