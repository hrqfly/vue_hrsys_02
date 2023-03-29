<template>
  <div style="margin: 20px;"></div>
  <h2 style="text-align: center">发布招聘公告</h2>
  <el-form :label-position="labelPosition" label-width="150px" :model="plan">
    <el-form-item label="职位">
      <el-input v-model="plan.post" placeholder="输入职位名称"></el-input>
    </el-form-item>
    <el-form-item label="招聘人数">
      <el-input v-model="plan.num" placeholder="输入招聘人数"></el-input>
    </el-form-item>
    <el-form-item label="年龄要求">
      <el-input v-model="plan.age" placeholder="输入招聘人员年龄要求"></el-input>
    </el-form-item>
    <el-form-item label="招聘要求">
      <el-input v-model="plan.requirements" placeholder="输入招聘要求"></el-input>
    </el-form-item>
    <el-form-item label="薪资待遇">
      <el-input v-model="plan.wages" placeholder="薪资待遇"></el-input>
    </el-form-item>
    <el-form-item label="审批人工号">
      <el-input v-model="plan.approverId" placeholder="审批人工号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">发布</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      labelPosition: 'right',
      plan: {
        post: '',
        num: '',
        age: '',
        requirements: '',
        wages:'',
        approverId:'',
      }
    };
  },
  methods: {
    onSubmit() {
      console.log('submit!');
      axios.post("http://localhost:8010/addplan",this.plan)
          .then(res => {
            alert(res.data.msg)
          })
    }
  }
}
</script>

<style scoped>

</style>