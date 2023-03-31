<template>
  <div>
    <h1  id = "con">考勤打卡</h1>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="handleStart">上班签到</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleEnd">下班签到</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      cookies:{
        cookies : document.cookie.split("; ")[0].split("=")[1].split("#")[0],
      },
    }
  },
  methods: {
    handleStart() {
      console.log('submit!');
      axios.get('http://localhost:8010/signStart?userId='+this.$data.cookies.cookies)
          .then(res => {
              alert(res.data.msg)
          })
    },
    handleEnd() {
      console.log('submit!');
      axios.get('http://localhost:8010/signEnd?userId='+this.$data.cookies.cookies)
          .then(res => {
            alert(res.data.msg)
          })
    },
  }
}
</script>

<style scoped>
#con{
  text-align: center;
}
</style>