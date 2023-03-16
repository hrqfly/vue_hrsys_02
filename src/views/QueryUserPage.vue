<template>
  <div>
    <h1  id = "con">员工信息查询</h1>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="员工姓名">
        <el-input v-model="formInline.name" placeholder="员工姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" @keyup.enter="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="100" />
      <el-table-column prop="age" label="Age" width="100" />
      <el-table-column prop="level" label="Level" width="100" />
      <el-table-column prop="name" label="Name" width="160" />
      <el-table-column prop="dept" label="Dept" width="160" />
      <el-table-column prop="post" label="Post" width="160" />
      <el-table-column prop="phoneNum" label="PhoneNum" width="160" />
      <el-table-column prop="email" label="Email" width="160" />
      <el-table-column
          fixed="right"
          label="操作">
        <template #default="scope">
          <el-button @click="handleEdit(scope.row)" type="primary" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title = "edit" v-model="flag" width = 80% >
      <el-form :label-position="labelPosition" label-width="80px" :model="userInf">
        <el-form-item label="Age">
          <el-input v-model="userInf.age"></el-input>
        </el-form-item>
        <el-form-item label="Level">
          <el-input v-model="userInf.level"></el-input>
        </el-form-item>
        <el-form-item label="Name">
          <el-input v-model="userInf.name"></el-input>
        </el-form-item>
        <el-form-item label="Dept">
          <el-input v-model="userInf.dept"></el-input>
        </el-form-item>
        <el-form-item label="Post">
          <el-input v-model="userInf.post"></el-input>
        </el-form-item>
        <el-form-item label="PhoneNum">
          <el-input v-model="userInf.phoneNum"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="userInf.email"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="save">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import axios from "axios";
  export default {
    data() {
      return {
        labelPosition: 'right',
        flag:false,
        formInline: {
          name: ''
        },
        userInf: {
          id:'',
          age: '',
          level: '',
          name: '',
          dept: '',
          post: '',
          phoneNum: '',
          email: '',
        },
        tableData:[]
      }
    },
    methods: {
      onSubmit() {
        console.log(this.$data.formInline.name)
        console.log('submit!');
        axios.get('http://localhost:8010/searchuser?name='+this.$data.formInline.name)
            .then(res => {
              if(res.data.status == 200){
                console.log(res.data.data)
                this.tableData = res.data.data
              }else {
                alert(res.data.msg)
              }
            })
      },
      handleEdit(row){
        //显示对话框
        this.flag = true
        this.userInf.id = row.id
        this.userInf.age = row.age
        this.userInf.level = row.level
        this.userInf.name = row.name
        this.userInf.dept = row.dept
        this.userInf.post = row.post
        this.userInf.phoneNum = row.phoneNum
        this.userInf.email = row.email
        console.log(row)
      },
      save(){
        console.log(this.userInf)
        axios.post("http://localhost:8010/updateuser",this.userInf)
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