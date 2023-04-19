<template>
  <div>
    <h4  id = "con">员工信息查询</h4>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="onSubmit1">查询我的组织架构</el-button>
      </el-form-item>
    </el-form>
    <h3 >我的领导</h3>
    <el-table :data="leaderTableData" border style="width: 100%">
      <el-table-column prop="id" label="工号" width="100" />
      <el-table-column prop="age" label="年龄" width="100" />
      <el-table-column prop="level" label="级别" width="100" />
      <el-table-column prop="name" label="姓名" width="160" />
      <el-table-column prop="dept" label="部门" width="160" />
      <el-table-column prop="post" label="办公地点" width="160" />
      <el-table-column prop="phoneNum" label="电话" width="160" />
      <el-table-column prop="email" label="邮箱" width="160" />
      <el-table-column
          fixed="right"
          label="操作">
        <template #default="scope">
          <el-button @click="handleEdit(scope.row)" type="primary" size="small">完善对其评价信息</el-button>
        </template>
      </el-table-column>
    </el-table>
    <h3 >我的同事</h3>
    <el-table :data="colleagueTableData" border style="width: 100%">
      <el-table-column prop="id" label="工号" width="100" />
      <el-table-column prop="age" label="年龄" width="100" />
      <el-table-column prop="level" label="级别" width="100" />
      <el-table-column prop="name" label="姓名" width="160" />
      <el-table-column prop="dept" label="部门" width="160" />
      <el-table-column prop="post" label="办公地点" width="160" />
      <el-table-column prop="phoneNum" label="电话" width="160" />
      <el-table-column prop="email" label="邮箱" width="160" />
      <el-table-column
          fixed="right"
          label="操作">
        <template #default="scope">
          <el-button @click="handleEdit(scope.row)" type="primary" size="small">完善对其评价信息</el-button>
        </template>
      </el-table-column>
    </el-table>
    <h3 >我的下属</h3>
    <el-table :data="underlingTableData" border style="width: 100%">
      <el-table-column prop="id" label="工号" width="100" />
      <el-table-column prop="age" label="年龄" width="100" />
      <el-table-column prop="level" label="级别" width="100" />
      <el-table-column prop="name" label="姓名" width="160" />
      <el-table-column prop="dept" label="部门" width="160" />
      <el-table-column prop="post" label="办公地点" width="160" />
      <el-table-column prop="phoneNum" label="电话" width="160" />
      <el-table-column prop="email" label="邮箱" width="160" />
      <el-table-column
          fixed="right"
          label="操作">
        <template #default="scope">
          <el-button @click="handleEdit(scope.row)" type="primary" size="small">完善对其评价信息</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title = "完善性格信息评价" v-model="flag" width = 80% >
      <div style="margin: 20px;"></div>
      <el-form :label-position="labelPosition" label-width="150px" :model="personalityInf">
        <el-form-item label="性格特点1">
          <el-input v-model="personalityInf.inf1" placeholder="性格特点1"></el-input>
        </el-form-item>
        <el-form-item label="性格特点2">
          <el-input v-model="personalityInf.inf2" placeholder="性格特点2"></el-input>
        </el-form-item>
        <el-form-item label="性格特点3">
          <el-input v-model="personalityInf.inf3" placeholder="性格特点3"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script >
import axios from "axios";
export default {
  data() {
    return {
      userId:0,
      labelPosition: 'right',
      flag:false,
      leaderTableData:[],
      colleagueTableData:[],
      underlingTableData:[],
      cookies:{
        userId : document.cookie.split("; ")[0].split("=")[1].split("#")[0],
      },
      personalityInf: {
        inf1: '',
        inf2: '',
        inf3: '',
      },
      EmployeePortraitsInf:{
        userId: 0,
        type:'personality',
        content:'',
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
        salt:'',
        type:'',
        leaderId:'',
        underlingId:'',
      },
    }
  },

  methods: {
    onSubmit() {
      this.EmployeePortraitsInf.content = this.personalityInf.inf1+','+this.personalityInf.inf2+','+this.personalityInf.inf3
      this.EmployeePortraitsInf.userId = this.userId
      if(this.EmployeePortraitsInf.content!=''){
        axios.post("http://localhost:8010/addEmployeePortraitsInf", this.EmployeePortraitsInf).then(res => {
          alert(res.data.msg)
        })
      }
      axios.get('http://localhost:8010/getEmployeePortraitsInf?userId=' + this.userId + '&type=personality').then(res => {
            console.log(res.data.data)
      })
    },

    handleEdit(row){
      //显示对话框
      this.flag = true
      this.userId = row.id
      console.log(row)
      console.log(this.userId)
    },

    onSubmit1(){
      axios.get('http://localhost:8010/getOrgStructure?userId=' + this.cookies.userId).then(res => {
        this.leaderTableData = res.data.data.leader
        this.colleagueTableData = res.data.data.colleagues
        this.underlingTableData = res.data.data.underlings
        console.log(res.data.data)
        if (res.data.code == 400){
          alert(res.data.msg)
        }

      })
    },
  }
}
</script>

<style scoped>
#con{
  text-align: center;
}
</style>