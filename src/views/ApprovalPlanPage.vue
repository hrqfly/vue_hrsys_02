<template>
  <div>
    <h1  id = "con">待您审批的招聘计划</h1>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="onSubmit" @keyup.enter="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="计划号" width="160" />
      <el-table-column prop="post" label="职位" width="160" />
      <el-table-column prop="num" label="招聘人数" width="160" />
      <el-table-column prop="age" label="年龄要求" width="160" />
      <el-table-column prop="wages" label="薪资"  width="160"/>
      <el-table-column prop="requirements" label="要求" width="160"/>
      <el-table-column
          fixed="right"
          label="操作">
        <template #default="scope">
          <el-button @click="handleApproval(scope.row)" type="text" size="small">批准</el-button>
          <el-button type="text" size="small">不批准</el-button>
        </template>
      </el-table-column>

    </el-table>
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
      planInf: {
        id: '',
        post: '',
        num: '',
        age: '',
        wages: '',
        requirements: '',
      },
      user:{
        uid:''
      },
      tableData:[]
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
      axios.get('http://localhost:8010/findUnApprovalPlan?approverId='+this.$data.cookies.cookies)
          .then(res => {
            if(res.data.status == 200){
              console.log(res.data.data)
              this.tableData = res.data.data
            }else {
              alert(res.data.msg)
            }
          })
    },
    handleApproval(row) {
      this.planInf.id = row.id
      this.planInf.post = row.post
      this.planInf.num = row.num
      this.planInf.age = row.age
      this.planInf.wages = row.wages
      this.planInf.requirements = row.requirements
      axios.post("http://localhost:8010/approvalPlan",this.$data.planInf)
          .then(res => {
            if(res.data.status == 200){
              alert("审批通过")
              this.onSubmit()
            }else {
              alert(res.data.msg)
            }
          })
      console.log(this.planInf)

    }
  }
}
</script>

<style scoped>
#con{
  text-align: center;
}
</style>