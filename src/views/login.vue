<template>
  <div>
    <div class="wrapper">
      <h1>UNI-ADMIN</h1>
      <el-form
        :model="form"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-input
          type="text"
          v-model="form.username"
          autocomplete="off"
          placeholder="请输入用户名"
        ></el-input>
        <el-input
          type="password"
          v-model="form.password"
          autocomplete="off"
          placeholder="请输入密码"
        ></el-input>
        <el-button type="primary" @click="submitForm" class="btn_sub"
          >立即登录</el-button
        >
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    //  登录
    submitForm() {
      this.$axios
        .post("http://ceshi5.dishait.cn/admin/login", {
          username: this.form.username,
          password: this.form.password,
        })
        .then((res) => {
          console.log(res);
          //   登录成功后保存token
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("time", new Date().getTime());
          this.$router.push("/background");
          this.$message({
            message: "登录成功，欢迎使用本系统",
            type: "success",
          });
        })
        .catch(() => {
          this.$message.error("账号或密码错误");
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  width: 500px;
  height: 300px;
  border: 1px solid gray;
  margin: 100px auto;
  padding: 0 20px;
  box-sizing: border-box;
  h1 {
    border-bottom: 1px solid gray;
  }
  .el-input {
    line-height: 70px;
  }
  .btn_sub {
    width: 100%;
    line-height: 20px;
    background-color: #027677;
  }
}
</style>