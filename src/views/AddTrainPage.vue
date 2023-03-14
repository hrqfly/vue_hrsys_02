<template>
  <div class="block">
    <h2 style="text-align: center">发布培训公告</h2>
    <el-form :label-position="labelPosition" label-width="160px" :model="plan">
      <el-form-item label="培训人">
        <el-input v-model="plan.trainer" placeholder="输入培训人"></el-input>
      </el-form-item>
      <el-form-item label="培训主题">
        <el-input v-model="plan.topic" placeholder="输入培训主题"></el-input>
      </el-form-item>
      <el-form-item label="培训主要内容">
        <el-input v-model="plan.content" placeholder="输入培训主要内容"></el-input>
      </el-form-item>
      <el-form-item label="培训开设地点">
        <el-input v-model="plan.place" placeholder="培训开设地点"></el-input>
      </el-form-item>
      <el-form-item label="设定培训开始时间">
        <el-date-picker
            v-model="plan.time"
            type="datetime"
            placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="培训时长">
        <el-input v-model="plan.useTime" placeholder="培训持续时长"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">发布</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      plan: {
        trainer: '',
        topic: '',
        content: '',
        place: '',
        useTime:'',
        time: ''
      },
    };
  },
  methods:{
    onSubmit() {
      console.log(this.$data.value1);
      //axios.post("http://localhost:8010/login",{'id':form.id,'password':form.password})
      axios.post("http://localhost:8010/addtrain",this.$data.plan)
          .then(res => {
            alert(res.data.msg)
          })
    }
  }
};
</script>

<style scoped>

</style>