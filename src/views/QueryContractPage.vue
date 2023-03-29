<template>
  <div>
    <h1 style="text-align: center">合同查询</h1>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="员工姓名">
        <el-input v-model="formInline.name" placeholder="员工姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" @keyup.enter="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="合同号" width="100" />
      <el-table-column prop="userId" label="工号" width="100" />
      <el-table-column prop="post" label="岗位" width="200" />
      <el-table-column prop="userName" label="签约人" width="200" />
      <el-table-column prop="wage" label="薪资" width="200" />
      <el-table-column prop="contact" label="签约负责人" width="200" />
      <el-table-column
          fixed="right"
          label="操作">
        <template #default="scope">
          <el-button @click="handleShowInf(scope.row)" type="primary" size="small">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="flag" width = 80% >
      <h1 class="text">Moose集团合同</h1>
      <div class="border">
        亲爱的：<b>{{userInf.userName}}</b>同学(证件号码：<b>{{userInf.idNum}}</b>)，欢迎加入Moose,
        <br>
        非常感谢您对Moose集团的关注！经过全面的评估，我们很高兴地邀请您加入Moose集团。
        <br>
        具体聘用事宜如下：
        <br>
        <br>
        <h3>一.职位信息</h3>
        <p>我们将聘用您入职Moose集团<b>{{userInf.post}}</b>，工作报到日期为<b>{{userInf.dateEntry}}</b></p>
        <h3>二.薪酬</h3>
        <p>您的税前工资为：人民币<b>{{userInf.wage}}</b>/月。</p>
        <h3>三.津贴</h3>
        <p>您将享受以下津贴项目，津贴项目随工资一并发放。
          <br>
          出勤津贴：根据您的实际出勤情况，您可享有 20 元/工作日的出勤津贴。</p>
        <h3>四.合同生效条件</h3>
        <p>本合同的生效以您向Moose提供全面且真实的信息为前提。您确认所提供的教育经历、实习/项目经历等
          <br>信息真实可信。若否，则本录用函自始无效，Moose有权立即与您解除聘用关系。</p>
        <h3>五.合同确认</h3>
        <p>如您接受此合同，请在收到合同一周内，在下方接受合同签名处签署此信。否则，此合同
          将失效。</p>
        <br>
        <b>* 本合同内容属于公司商业秘密信息，未经公司书面同意，任何人不得以任何形式向任何第三方泄露；
          否则公司有权随时撤销合同和相关人员录用资格。</b>
        <br>
        如果您对本录用函有任何问题，请及时联系您的HR：
        <br>
        姓名：{{userInf.contact}}
        <br>
        电话：{{userInf.phoneNum}}
        <br>
        邮箱：{{userInf.email}}
        <br>
        我们期待您的加入！
        <br>
        <br>
        <br>
        <br>
        本人接受此录用函列出的以上所有内容。
        <br>
        <br>
        <br>
        <br>
        签名：<b>{{formInline.name}}</b>
        <br>
        日期：<b>{{ userInf.dateSign }}</b>
        <br>
        <br>
        <br>

      </div>

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
      tableData:[],
      userInf: {
        id:'',
        userId:'',
        userName:'',
        idNum:'',
        post:'',
        wage:'',
        content: '',
        contact: '',
        phoneNum: '',
        email: '',
        dateEntry: '',
        dateSign: '',
      }
    }
  },
  methods: {
    onSubmit() {
      console.log(this.$data.formInline.name)
      console.log('submit!');
      axios.get('http://localhost:8010/findcontract?userName=' + this.$data.formInline.name)
          .then(res => {
            if (res.data.status == 200) {
              console.log(res.data.data)
              this.tableData = res.data.data
            } else {
              alert(res.data.msg)
            }
          })
    },
    handleShowInf(row){
      //显示对话框
      this.flag = true
      this.userInf.id = row.id
      this.userInf.userId = row.userId
      this.userInf.userName = row.userName
      this.userInf.idNum = row.idNum
      this.userInf.wage = row.wage
      this.userInf.post = row.post
      this.userInf.contact = row.contact
      this.userInf.content = row.content
      this.userInf.phoneNum = row.phoneNum
      this.userInf.email = row.email
      this.userInf.dateEntry = row.dateEntry
      this.userInf.dateSign = row.dateSign
      console.log(row.id)
      console.log(this.userInf.id)
    },

  }
}
</script>

<style scoped>

  .border{
    border: 2px solid #000;
    width: 80%;
    margin: auto;
    line-height: 150%;
  }
  .text{
    text-align: center;
  }
</style>