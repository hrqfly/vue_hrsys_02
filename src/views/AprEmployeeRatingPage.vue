<template>
  <el-form :label-position="labelPosition" label-width="150px" :model="employeeRating" >

    <h1  id = "con">待你审批的员工评估信息</h1>

    <el-table :data="tableData5" border style="margin: auto">
      <el-table-column prop="userId" label="评估员工工号" />
      <el-table-column prop="professional" label="业务能力评分" />
      <el-table-column prop="skills" label="技能评估评分" />
      <el-table-column prop="careerDev" label="工作发展评分" />
      <el-table-column prop="potential" label="潜力评分" />
      <el-table-column prop="interpersonal" label="人际交往评分" />
      <el-table-column prop="updateTime" label="提交时间" />
      <el-table-column
          fixed="right"
          label="操作"
          width="100">
        <template #default="scope">
          <el-button @click="handleApr(scope.row)" type="text" size="small">审批</el-button>
        </template>
      </el-table-column>
    </el-table>

    <h1 >当前审批员工的基本信息</h1>

    <el-table :data="tableData0" border style="margin: auto">
      <el-table-column prop="Skills" label="技能证书" />
    </el-table>

    <el-table :data="tableData1" border style="margin: auto">
      <el-table-column prop="Hobbies" label="兴趣爱好" />
    </el-table>

    <el-table :data="tableData2" border style="margin: auto">
      <el-table-column prop="jobDev" label="工作发展" />
    </el-table>

    <el-table :data="tableData3" border style="margin: auto">
      <el-table-column prop="personality" label="性格评价" />
    </el-table>

    <el-table :data="tableData4" border style="margin: auto">
      <el-table-column prop="userId" label="评估员工工号" />
      <el-table-column prop="professional" label="业务能力评分" />
      <el-table-column prop="skills" label="技能评估评分" />
      <el-table-column prop="careerDev" label="工作发展评分" />
      <el-table-column prop="potential" label="潜力评分" />
      <el-table-column prop="interpersonal" label="人际交往评分" />
    </el-table>

    <el-form-item >
      <el-button type="primary" @click="handleUpload">审核通过</el-button>
      <el-button type="primary">审核不通过</el-button>
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
      tableData4:[

      ],
      tableData5:[

      ],
    };
  },
  mounted: function () {
    // this.loadData0();
    // this.loadData1();
    // this.loadData2();
    // this.loadData3();
    this.loadData5()
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
    loadData4(){
      axios.get('http://localhost:8010/searchUnApprovalEmployeeRating?userId=' + this.employeeRating.userId).then(res => {
        if(res.data.status == 200){
          this.tableData4.push(res.data.data)
        }else {
          alert(res.data.msg)
        }
      })
    },
    loadData5(){
      axios.get('http://localhost:8010/searchUnApprovalEmployeeRatingByAprId?aprId=' + this.cookies.userId).then(res => {
        if(res.data.status == 200){
          for (let i = 0 ;i<res.data.data.length;i++)
          this.tableData5.push(res.data.data[i])
        }else {
          alert(res.data.msg)
        }
      })
    },

    handleUpload(){
      axios.post("http://localhost:8010/approvalEmployeeRating", this.tableData4[0]).then(res => {
        alert(res.data.msg)
      })
    },

    handleApr(row){
      this.employeeRating.userId = row.userId
      this.loadData0();
      this.loadData1();
      this.loadData2();
      this.loadData3();
      this.loadData4();
      // axios.post("http://localhost:8010/trainsignin",this.$data.signInInf)
      //     .then(res => {
      //       if(res.data.status == 200){
      //         alert(res.data.msg)
      //       }else {
      //         alert(res.data.msg)
      //       }
      //     })
      // console.log(this.signInInf)
    }
  }
}
</script>

<style scoped>

</style>