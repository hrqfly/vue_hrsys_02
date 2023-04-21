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

  <h2 style="text-align: center">编辑兴趣爱好信息</h2>
  <el-table :data="tableData" border style="width: 50%;margin: auto">
    <el-table-column prop="Hobbies" label="爱好" />
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
      hobbies: {
        hobby1: '',
        hobby2: '',
        hobby3: '',
      },
      EmployeePortraitsInf:{
        userId: 0,
        type:'Hobbies',
        content:'',
      },
      tableData:[
          // {Hobbies:'giao'},
      ],
    };
  },
  mounted: function () {
    this.loadData();
  },
  methods: {
    onSubmit() {
      this.EmployeePortraitsInf.content = this.hobbies.hobby1+','+this.hobbies.hobby2+','+this.hobbies.hobby3
      this.EmployeePortraitsInf.userId = this.cookies.userId
      if(this.EmployeePortraitsInf.content!=''){
        axios.post("http://localhost:8010/addEmployeePortraitsInf", this.EmployeePortraitsInf).then(res => {
          alert(res.data.msg)
        })
        router.go(0)
      }
    },
    handleEdit(row){
      this.EmployeePortraitsInf.content = row.Hobbies
      this.EmployeePortraitsInf.userId = this.cookies.userId
      axios.post("http://localhost:8010/deleteEmployeePortraitsInf", this.EmployeePortraitsInf).then(res => {
        alert(res.data.msg)
      })
      console.log(this.EmployeePortraitsInf)
      this.tableData = []
      this.loadData()
    },
    loadData(){
      axios.get('http://localhost:8010/getEmployeePortraitsInf?userId=' + this.cookies.userId + '&type=Hobbies').then(res => {
            for (let i = 0 ; i<res.data.data.length;i++){
              this.tableData.push({Hobbies : res.data.data[i]})
            }
      })
    }
  }
}
</script>

<style scoped>

</style>