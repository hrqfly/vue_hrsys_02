<template>
  <div>
    <h1  id = "con">考勤打卡</h1>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="handleStart">上班签到</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleEnd">下班签到</el-button>
      </el-form-item>

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
      tableData:[]
    }
  },
  methods: {
    handleStart() {
      console.log('submit!');
      axios.get('http://localhost:8010/signStart?userId='+this.$data.cookies.cookies)
          .then(res => {
              alert(res.data.msg)
          })
    },
    handleEnd() {
      console.log('submit!');
      axios.get('http://localhost:8010/signEnd?userId='+this.$data.cookies.cookies)
          .then(res => {
            alert(res.data.msg)
          })
    },
    handleQueryAttendance(){
      console.log('query!');
      console.log(this.formInline.start);
      console.log(this.formInline.end);
      this.formInline.userId = this.cookies.cookies
      axios.post('http://localhost:8010/findAttendanceByDate', this.formInline).then(res => {
            if(res.data.status == 200){
              this.tableData = res.data.data
              console.log(this.tableData)
            }else {
              alert(res.data.msg)
            }
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