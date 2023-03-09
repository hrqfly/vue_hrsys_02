<template>
  <div id ="common-layout" @click = "divClick">
    <el-container id = "con">
      <el-aside width="200px">
        菜单栏
        <el-tree
            :props="props"
            :load="loadNode"
            lazy
            @node-click = "getUserByName">
        </el-tree>
      </el-aside>
      <el-container>
        <el-header>Moose通用人力资源系统</el-header>
        <el-main>
          <h2 id="ti">招聘公告</h2>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="post" label="职位" width="160" />
            <el-table-column prop="num" label="招聘人数" width="160" />
            <el-table-column prop="age" label="年龄要求" width="160" />
            <el-table-column prop="requirements" label="要求" />
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router/index";
  export default {
    data() {
      return {
        props: {
          label: 'name',
          children: 'zones',
          isLeaf: 'leaf'
        },
        tableData:[]
      };
    },
    methods: {
      //查询用户
      getUserByName(a,b){
        console.log(a)
        console.log(b)
        if(a.name=='查询员工信息'){
          router.push('/queryuser')
        }
        //发送请求去后端查询数据
        // axios.get('http://localhost:8010/findplan?post='+"coo")
        //     .then(res => {
        //         console.log(res.data.data)
        //         this.tableData = res.data.data
        //     })
      },

      divClick(){
        //发送请求去后端查询数据
        axios.get('http://localhost:8010/findplan?post='+"coo")
            .then(res => {
              console.log(res.data.data)
              this.tableData = res.data.data
            })
      },

      loadNode(node, resolve) {
        //点击的那个菜单
        if (node.level === 0) {
          return resolve([{ name: '员工管理' }]);
        }
        if (node.level > 1) return resolve([]);

        setTimeout(() => {
          const data = [{
            name: '查询员工信息',
            leaf: true
          }, {
            name: '增加员工',
            leaf: true
          }];
          resolve(data);
        }, 500);
      }
    }
  };
</script>

<style scoped>

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