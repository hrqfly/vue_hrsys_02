<template>
  <el-form :label-position="labelPosition" label-width="150px" :model="employeeRating" >

    <el-form-item label="员工工号">
      <el-input v-model="employeeRating.userId" placeholder="输入要评估的员工工号"></el-input>
    </el-form-item>
    <el-form-item >
      <el-button type="primary" @click="search">查询</el-button>
    </el-form-item>

    <el-table :data="tableData0" border style="margin: auto">
      <el-table-column prop="Skills" label="技能证书" />
    </el-table>
    <el-form-item label="技能评估评分">
      <el-input v-model="employeeRating.skills" placeholder="输入用户姓名"></el-input>
    </el-form-item>

    <el-table :data="tableData1" border style="margin: auto">
      <el-table-column prop="Hobbies" label="兴趣爱好" />
    </el-table>

    <el-table :data="tableData2" border style="margin: auto">
      <el-table-column prop="jobDev" label="工作发展" />
    </el-table>
    <el-form-item label="发展评分">
      <el-input v-model="employeeRating.careerDev" placeholder="发展评分"></el-input>
    </el-form-item>
    <el-form-item label="潜力评分">
      <el-input v-model="employeeRating.potential" placeholder="发展评分"></el-input>
    </el-form-item>

    <el-table :data="tableData3" border style="margin: auto">
      <el-table-column prop="personality" label="性格评价" />
    </el-table>
    <el-form-item label="人际交往评分">
      <el-input v-model="employeeRating.interpersonal" placeholder="人际交往评分"></el-input>
    </el-form-item>
    <el-form-item label="业务能力评分">
      <el-input v-model="employeeRating.professional" placeholder="业务能力评分"></el-input>
    </el-form-item>
    <el-form-item label="审批人工号">
      <el-input v-model="employeeRating.approverId" placeholder="审批人工号"></el-input>
    </el-form-item>
    <el-form-item >
      <el-button type="primary" @click="handleUpload">提交评分</el-button>
    </el-form-item>
  </el-form>
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
      userId:0,
      employeeRating:{
        userId:0,
        professional:0,
        skills:0,
        careerDev:0,
        potential:0,
        interpersonal:0,
        approverId:0,
      },
      labelPosition: 'right',
      EmployeePortraitsInf:{
        userId: 0,
        type:'',
        content:'',
      },
      tableData0:[
        // {Skills:'giao'},
      ],
      tableData1:[
        // {Skills:'giao'},
      ],
      tableData2:[
        // {Skills:'giao'},
      ],
      tableData3:[
        // {Skills:'giao'},
      ],
    };
  },
  // mounted: function () {
  //   this.loadData0();
  //   this.loadData1();
  //   this.loadData2();
  //   this.loadData3();
  // },
  methods: {
    search(){
      this.loadData0();
      this.loadData1();
      this.loadData2();
      this.loadData3();
    },
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
    loadData0(){
      axios.get('http://localhost:8010/getEmployeePortraitsInf?userId=' + this.employeeRating.userId + '&type=Skills').then(res => {
        for (let i = 0 ; i<res.data.data.length;i++){
          this.tableData0.push({Skills : res.data.data[i]})
        }
      })
    },
    loadData1(){
      axios.get('http://localhost:8010/getEmployeePortraitsInf?userId=' + this.employeeRating.userId + '&type=Hobbies').then(res => {
        for (let i = 0 ; i<res.data.data.length;i++){
          this.tableData1.push({Hobbies : res.data.data[i]})
        }
      })
    },
    loadData2(){
      axios.get('http://localhost:8010/getEmployeePortraitsInf?userId=' + this.employeeRating.userId + '&type=jobDev').then(res => {
        for (let i = 0 ; i<res.data.data.length;i++){
          this.tableData2.push({jobDev : res.data.data[i]})
        }
      })
    },
    loadData3(){
      axios.get('http://localhost:8010/getEmployeePortraitsInf?userId=' + this.employeeRating.userId + '&type=personality').then(res => {
        for (let i = 0 ; i<res.data.data.length;i++){
          this.tableData3.push({personality : res.data.data[i]})
        }
      })
    },

    handleUpload(){
      axios.post("http://localhost:8010/addEmployeeRating", this.employeeRating).then(res => {
        alert(res.data.msg)
      })
    }
  }
}
</script>

<style scoped>

</style>