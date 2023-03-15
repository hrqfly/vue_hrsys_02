<template>
  <div>
    <h1  id = "con">培训信息查询</h1>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="查询该时间之后的培训">
        <el-date-picker
            v-model="formInline.time"
            type="datetime"
            placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" @keyup.enter="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="trainer" label="培训人" width="200px" />
      <el-table-column prop="topic" label="培训主题" width="200px" />
      <el-table-column prop="place" label="培训地点" width="200px" />
      <el-table-column prop="time" label="培训开始时间" width="200px" />
      <el-table-column prop="useTime" label="培训预计用时" width="200px" />
      <el-table-column prop="content" label="培训内容" />

      <el-table-column
          fixed="right"
          label="操作"
          width="100">
        <template #default="scope">
<!--          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
          <el-button @click="handleSignIn(scope.row)" type="text" size="small">签到</el-button>
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
      formInline: {
        time: ''
      },
      tableData:[],
      signInInf:{
        id:'',
        date:'',
        userId:'',
        userName:''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log(this.$data.formInline.name)
      console.log('submit!');
      axios.post("http://localhost:8010/findtrain",this.$data.formInline.time)
          .then(res => {
            if(res.data.status == 200){
              console.log(res.data.data)
              this.tableData = res.data.data
            }else {
              alert(res.data.msg)
            }
          })
    },
    // handleClick(row){
    //     console.log(row.id)
    // },
    handleSignIn(row){
        this.$data.signInInf.id = row.id
        this.$data.signInInf.date = row.time
        this.$data.signInInf.userId = 3
        this.$data.signInInf.userName = 'fly'
        axios.post("http://localhost:8010/trainsignin",this.$data.signInInf)
            .then(res => {
              if(res.data.status == 200){
                alert(res.data.msg)
              }else {
                alert(res.data.msg)
              }
            })
        console.log(this.signInInf)
    }
  }
}
</script>

<style scoped>
#con{
  text-align: center;
}
</style>