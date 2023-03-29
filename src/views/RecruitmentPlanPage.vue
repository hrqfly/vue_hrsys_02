<template>
  <div>
    <h1  id = "con">招聘公告</h1>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="职位">
        <el-input v-model="formInline.post" placeholder="职位"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" @keyup.enter="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleApproval">审批招聘计划</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="post" label="职位" width="160" />
      <el-table-column prop="num" label="招聘人数" width="160" />
      <el-table-column prop="age" label="年龄要求" width="160" />
      <el-table-column prop="wages" label="薪资"  width="160"/>
      <el-table-column prop="requirements" label="要求" />

    </el-table>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router/index";
export default {
  data() {
    return {
      formInline: {
        post: ''
      },
      tableData:[]
    }
  },
  methods: {
    onSubmit() {
      console.log(this.$data.formInline.post)
      console.log('submit!');
      axios.get('http://localhost:8010/findplan?post='+this.$data.formInline.post)
          .then(res => {
            if(res.data.status == 200){
              console.log(res.data.data)
              this.tableData = res.data.data
            }else {
              alert(res.data.msg)
            }
          })
    },
    handleApproval(){
      router.push("/approvalPlan")
    }
  }
}
</script>

<style scoped>
#con{
  text-align: center;
}
</style>