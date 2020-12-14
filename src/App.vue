<template>
  <div id="app">
    <el-container>
      <!-- 头部导航栏 -->
      <el-header v-show="showhead">
        <h1>UNI-ADMIN</h1>
        <div id="right">
          <el-menu
            :default-active="'/home'"
            class="el-menu-demo"
            mode="horizontal"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
          >
            <el-menu-item index="/background">首页</el-menu-item>
            <el-menu-item index="/list">商品</el-menu-item>
            <el-menu-item index="/orders">订单</el-menu-item>
            <el-menu-item index="/viplist">会员</el-menu-item>
            <el-menu-item index="/basics">设置</el-menu-item>
          </el-menu>
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar>
          <span>admin</span>
          <el-button type="primary" @click="exit">退出登录</el-button>
        </div>
      </el-header>
      <router-view />
    </el-container>
  </div>
</template>
<script>
export default {
  // 监听当前路由对象
  watch: {
    $route: {
      handler(newval) {
        console.log(newval);
        if (newval.path == "/login") {
          this.showhead = false;
        } else {
          this.showhead = true;
        }
      },
    },
  },
  data() {
    return {
      showhead: true,
    };
  },
  methods: {
    // 退出登录
    exit() {
      localStorage.removeItem("token");
      localStorage.removeItem("time");
      this.$router.push("/login");
    },
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-header {
  padding: 0 !important;
  display: flex;
  background-color: #545c64;
  justify-content: space-between;
  align-items: center;
  h1 {
    color: white;
  }
  #right {
    display: flex;
    align-items: center;
    span {
      color: white;
      margin: 0 10px;
    }
  }
  .el-menu.el-menu--horizontal {
    border: 0 !important;
  }
}
</style>
