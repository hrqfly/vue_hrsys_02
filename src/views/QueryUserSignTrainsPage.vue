<template>
  <div>
    <h1  id = "con">查询员工参与培训信息</h1>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="输入员工工号">
        <el-input v-model="formInline.userId" placeholder="工号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery" @keyup.enter="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="培训场次" width="100px" />
      <el-table-column prop="trainer" label="培训人" width="100px" />
      <el-table-column prop="topic" label="培训主题" width="200px" />
      <el-table-column prop="place" label="培训地点" width="200px" />
      <el-table-column prop="useTime" label="培训预计用时" width="200px" />
      <el-table-column prop="time" label="培训开始时间" width="250px" />
      <el-table-column prop="content" label="培训内容" />
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      cookies:{
        cookies : document.cookie.split("; ")[0].split("=")[1],
      },
      formInline: {
        userId: ''
      },
      tableData:[]
    }
  },
  methods: {
    handleQuery() {
      axios.get('http://localhost:8010/getUserTrainInf?userId='+this.$data.formInline.userId)
          .then(res => {
            if(res.data.status == 200){
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