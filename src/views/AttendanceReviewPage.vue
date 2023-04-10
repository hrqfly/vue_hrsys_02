<template>
  <div>
    <h1  id = "con">考勤审核</h1>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="考勤查询开始时间点">
        <el-date-picker
            v-model="formInline.start"
            type="datetime"
            placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="考勤查询结束时间点">
        <el-date-picker
            v-model="formInline.end"
            type="datetime"
            placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="员工工号">
        <el-input v-model="formInline.userId" placeholder="员工工号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQueryAttendance">查询考勤记录</el-button>
      </el-form-item>

      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="userId" label="工号" style="width: 10%" />
        <el-table-column prop="signInDate" label="签到日期" style="width: 25%" />
        <el-table-column prop="start" label="上班签到" style="width: 25%" />
        <el-table-column prop="end" label="下班签到" style="width: 25%" />
        <el-table-column prop="duration" label="出勤时长" style="width: 15%"/>
      </el-table>

      <el-form-item >
        <el-form-item label="审核本月出勤天数">
          <el-input v-model="reviewWorkDayNum" placeholder="出勤天数"></el-input>
        </el-form-item>
        <span>本月应当出勤天数:{{workDayNum}}--</span>
        <span>本月出勤时长:{{workHours}}</span>
        <span>本月应当出勤时长:{{workDayNum*8}}</span>
        <el-button type="primary" @click="review">审核提交</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      cookies:{
        cookies : document.cookie.split("; ")[0].split("=")[1].split("#")[0],
      },
      formInline:{
        start:new Date(),
        end:new Date(),
        userId:''
      },
      tableData:[],
      workDayNum:0,
      workHours:0,
      reviewWorkDayNum:'',
    }
  },
  methods: {
    handleQueryAttendance(){
      console.log('query!');
      console.log(this.formInline.start);
      console.log(this.formInline.end);
      axios.post('http://localhost:8010/findAttendanceByDate', this.formInline).then(res => {
        if(res.data.status == 200){
          this.tableData = res.data.data
          for (let i = 0;i<this.tableData.length;i++){
            this.workHours+=parseFloat(this.tableData[i].duration)
          }
        }else {
          alert(res.data.msg)
        }
      })

      console.log(this.workHours)
      axios.post('http://localhost:8010/getWorkDayNum', this.formInline).then(res => {
        if(res.data.status == 200){
          this.workDayNum = res.data.data
        }else {
          alert(res.data.msg)
        }
      })
    },
    review(){
      axios.get('http://localhost:8010/generateSalary?userId=' + this.formInline.userId+'&rate='+parseFloat(this.reviewWorkDayNum/this.workDayNum))
          .then(res => {
              alert(res.data.msg)
          })

    }
  }
}
</script>

<style scoped>
#con{
  text-align: center;
}
</style>