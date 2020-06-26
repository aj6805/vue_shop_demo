<template>
  <div class="login_contain">
    <div class="login_box">
      <div class="login">
        <div class="avatar">
          <img src="../assets/logo.png" alt />
        </div>
        <!-- 表单区域 -->
        <el-form ref="loginFormRef" :model="loginForm" label-width="0px" :rules="loginFormRules">
          <el-form-item class="username" prop="username">
            <el-input prefix-icon="el-icon-user-solid" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock" v-model="loginForm.password" show-password></el-input>
          </el-form-item>
          <el-row>
            <el-button type="info" @click="resetLoginForm">重置</el-button>
            <el-button type="primary" class="btn-login" @click="login">登录</el-button>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm: function() {
      this.$refs.loginFormRef.resetFields()
    },
    login: function() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return false
        var { data: res } = await this.$http.post('login', this.loginForm)
        if (res.meta.status !== 200) return this.$message.error('登陆失败')
        // this.$message.success('登陆成功')
        // 存储token,记录用户的登录状态
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    }
  }
}
</script>
<style scoped>
.login_contain {
  height: 100%;
}
.login_box {
  width: 500px;
  height: 400px;
  background-color: #2b4b6b;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.login {
  position: relative;
  width: 400px;
  height: 300px;
  background-color: #fff;
  border-radius: 3%;
  margin-top: 74px;
  margin-left: 48px;
}
.avatar {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background-color: #fff;
}
.avatar img {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  padding: 5px;
}
.el-form {
  padding: 10px;
}
.el-input {
  width: 100%;
}
.username {
  margin-top: 100px;
}
.el-button {
  float: right;
}
.btn-login {
  margin-right: 10px;
}
</style>
