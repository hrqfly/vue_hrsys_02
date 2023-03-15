<template>
  <div>
    <h1  id = "con">签到信息查询</h1>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="培训场次id">
        <el-input v-model="formInline.trainId" placeholder="培训场次id"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" @keyup.enter="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="userId" label="工号" width="160" />
      <el-table-column prop="userName" label="员工姓名" width="160" />
      <el-table-column prop="date" label="签到时间" />
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      formInline: {
        trainId: ''
      },
      tableData:[]
    }
  },
  methods: {
    onSubmit() {
      console.log(this.$data.formInline.name)
      console.log('submit!');
      axios.get('http://localhost:8010/getSignInf?trainId='+this.$data.formInline.trainId)
          .then(res => {
            if(res.data.status == 200){
              console.log(res.data.data)
              this.tableData = res.data.data
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