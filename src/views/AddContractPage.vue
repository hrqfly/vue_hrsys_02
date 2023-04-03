<template>
  <div style="margin: 20px;"></div>
  <h2 style="text-align: center">录入合同信息</h2>
  <el-form :label-position="labelPosition" label-width="80px" :model="userInf">
    <el-form-item label="工号">
      <el-input v-model="contractInf.name" placeholder="输入工号"></el-input>
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model="contractInf.userName" placeholder="输入姓名"></el-input>
    </el-form-item>
    <el-form-item label="证件号">
      <el-input v-model="contractInf.idNum" placeholder="输入证件号"></el-input>
    </el-form-item>
    <el-form-item label="岗位">
      <el-input v-model="contractInf.post" placeholder="输入合同岗位"></el-input>
    </el-form-item>
    <el-form-item label="薪资">
      <el-input v-model="contractInf.wage" placeholder="输入合同用户薪资"></el-input>
    </el-form-item>
    <el-form-item label="联系人">
      <el-input v-model="contractInf.contact" placeholder="输入合同联系人"></el-input>
    </el-form-item>
    <el-form-item label="联系电话">
      <el-input v-model="contractInf.phoneNum" placeholder="输入联系电话"></el-input>
    </el-form-item>
    <el-form-item label="联系人邮箱">
      <el-input v-model="contractInf.email" placeholder="输入联系人邮箱"></el-input>
    </el-form-item>
    <el-form-item label="入职时间">
      <el-input v-model="contractInf.dateEntry" placeholder="输入入职时间"></el-input>
    </el-form-item>
    <el-form-item label="签署时间">
      <el-input v-model="contractInf.dateSign" placeholder="输入签署时间"></el-input>
    </el-form-item>
    <el-form-item >
      <el-button type="primary" @click="onSubmit">添加</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      labelPosition: 'right',
      contractInf: {
        userId:'',
        userName: '',
        idNum: '',
        post: '',
        wage: '',
        contact: '',
        phoneNum: '',
        email: '',
        dateEntry: '',
        dateSign: '',
      }
    };
  },
  methods: {
    onSubmit() {
      console.log(this.$data.contractInf.phoneNum)
      console.log('submit!');
      axios.post("http://localhost:8010/addContract",this.contractInf)
          .then(res => {
            if(res.data.status == 200){
              alert("合同录入成功")
            }else {
              alert(res.data.msg)
            }
          })
    }
  }
}
</script>

<style scoped>

</style>