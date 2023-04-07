<template>
  <div id ="common-layout" @click = "divClick">
    <el-container id = "con">
      <el-aside width="200px">
        菜单栏
        <el-tree
            :props="props"
            :load="loadNode0"
            lazy
            @node-click = "Attendance">
        </el-tree>
        <el-tree
            :props="props"
            :load="loadNode"
            lazy
            @node-click = "getUserByName">
        </el-tree>
        <el-tree
            :props="props"
            :load="loadNode1"
            lazy
            @node-click = "getRecruitmentPlan">
        </el-tree>
        <el-tree
            :props="props"
            :load="loadNode2"
            lazy
            @node-click = "getTrain">
        </el-tree>
        <el-tree
            :props="props"
            :load="loadNode3"
            lazy
            @node-click = "getSalary">
        </el-tree>
        <el-tree
            :props="props"
            :load="loadNode4"
            lazy
            @node-click = "getContract">
        </el-tree>
      </el-aside>
      <el-container>
        <el-header>
          Moose通用人力资源系统
          <div style = "float:right">
            <el-icon><User @click = "handleUser" /></el-icon>
          </div>
        </el-header>
        <el-main>
<!--          <h2 id="ti">招聘公告</h2>-->
<!--          <el-table :data="tableData" border style="width: 100%">-->
<!--            <el-table-column prop="post" label="职位" width="160" />-->
<!--            <el-table-column prop="num" label="招聘人数" width="160" />-->
<!--            <el-table-column prop="age" label="年龄要求" width="160" />-->
<!--            <el-table-column prop="wages" label="薪资" width="160" />-->
<!--            <el-table-column prop="requirements" label="要求" />-->
<!--          </el-table>-->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import axios from "axios";
import router from "@/router/index";

export default {
  data() {
    return {
      cookies:{
        cookies : document.cookie
      },
      props: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      },
      tableData:[]
    };
  },
  methods: {
    //考勤
    Attendance(a,b){
      console.log(b)
      if(a.name=="考勤"){
        router.push('/attendance')
      }
    },
    //合同查询
    handleUser(){
      //路由到用户界面
      console.log(this.cookies.cookies)
      console.log("----------------")
      if (this.cookies.cookies==""){
        router.push('/login')
      } else {
        // 跳转到用户信息
        router.push('/userinf')
      }
    },
    getContract(a,b){
      console.log(a)
      console.log(b)
      if(a.name=='合同查询'){
        router.push('/querycontract')
      }
      if(a.name=='合同录入'){
        router.push('/addContract')
      }
    },
    //查询用户
    getUserByName(a,b){
      console.log(a)
      console.log(b)
      if(a.name=='员工信息查询与编辑'){
        router.push('/queryuser')
      }
      if (a.name=='增加员工账号'){
        router.push('/adduser')
      }
    },
    // 查询招聘计划表
    getRecruitmentPlan(a,b){
      console.log(a)
      console.log(b)
      if(a.name=='查询招聘信息'){
        router.push('/queryplan')
      }
      if (a.name=='招聘信息发布'){
        router.push('/addplan')
      }
    },
    getTrain(a,b){
      console.log(a)
      console.log(b)
      if(a.name=='查询培训信息与签到'){
        router.push('/querytrain')
      }
      if (a.name=='培训信息发布'){
        router.push('/addtrain')
      }
      if(a.name=='培训签到查询'){
        router.push('/querytrainusers')
      }
      if(a.name=='用户签到查询'){
        router.push('/queryUserSignTrains')
      }
    },
    getSalary(a,b){
      console.log(a)
      console.log(b)
      if(a.name=='薪资记录查询'){
        router.push('/querysalary')
      }
    },
    // divClick(){
    //   //发送请求去后端查询数据
    //   axios.get('http://localhost:8010/findplan?post='+"coo")
    //       .then(res => {
    //         console.log(res.data.data)
    //         this.tableData = res.data.data
    //       })
    // },
    loadNode0(node, resolve) {
      //点击的那个菜单
      if (node.level === 0) {
        return resolve([{ name: '员工考勤' }]);
      }
      if (node.level > 1) return resolve([]);

      setTimeout(() => {
        const data = [{
          name: '考勤',
          leaf: true
        }];
        resolve(data);
      }, 200);
    },

    loadNode(node, resolve) {
      //点击的那个菜单
      if (node.level === 0) {
        return resolve([{ name: '员工管理' }]);
      }
      if (node.level > 1) return resolve([]);

      setTimeout(() => {
        const data = [{
          name: '员工信息查询与编辑',
          leaf: true
        }, {
          name: '增加员工账号',
          leaf: true
        }];
        resolve(data);
      }, 200);
    },

    loadNode1(node, resolve) {
      //点击的那个菜单
      if (node.level === 0) {
        return resolve([{ name: '招聘管理' }]);
      }
      if (node.level > 1) return resolve([]);

      setTimeout(() => {
        const data = [{
          name: '查询招聘信息',
          leaf: true
        }, {
          name: '招聘信息发布',
          leaf: true
        }];
        resolve(data);
      }, 200);
    },

    loadNode2(node, resolve) {
      //点击的那个菜单
      if (node.level === 0) {
        return resolve([{ name: '培训管理' }]);
      }
      if (node.level > 1) return resolve([]);

      setTimeout(() => {
        const data = [{
          name: '查询培训信息与签到',
          leaf: true
        }, {
          name: '培训信息发布',
          leaf: true
        }, {
          name:'培训签到查询',
          leaf: true
        }, {
          name:'用户签到查询',
          leaf: true
        }];
        resolve(data);
      }, 200);
    },
    loadNode3(node, resolve) {
      //点击的那个菜单
      if (node.level === 0) {
        return resolve([{ name: '薪资管理' }]);
      }
      if (node.level > 1) return resolve([]);

      setTimeout(() => {
        const data = [{
          name: '薪资记录查询',
          leaf: true
        }];
        resolve(data);
      }, 200);
    },
    loadNode4(node, resolve) {
      //点击的那个菜单
      if (node.level === 0) {
        return resolve([{ name: '合同管理' }]);
      }
      if (node.level > 1) return resolve([]);

      setTimeout(() => {
        const data = [{
          name: '合同查询',
          leaf: true
        }, {
          name: '合同录入',
          leaf: true
        }];
        resolve(data);
      }, 200);
    }
  }
};
</script>

<style>

  html,body{
    margin: 0;
    padding: 0;
    height: 100%;
  }

  #app{
    height: 100%;
  }
  #ti{
    height: 80px;
  }

  #common-layout{
    height: 100%;
  }

  #con{
    height: 100%;
  }



  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    height: 100%;
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
