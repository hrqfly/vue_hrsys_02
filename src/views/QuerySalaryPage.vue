<template>
  <div>
    <h1  id = "con">薪资信息查询</h1>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="员工工号">
        <el-input v-model="formInline.uid" placeholder="员工工号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" @keyup.enter="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="工号" width="160" />
      <el-table-column prop="userName" label="姓名" width="160" />
      <el-table-column prop="wage" label="工资" width="160" />
      <el-table-column prop="level" label="员工级别" width="160" />
      <el-table-column prop="date" label="时间" />
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      formInline: {
        uid: ''
      },
      tableData:[]
    }
  },
  methods: {
    onSubmit() {
      console.log(this.$data.formInline.uid)
      console.log('submit!');
      axios.get('http://localhost:8010/getsalary?userId='+this.$data.formInline.uid)
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