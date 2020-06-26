<template>
  <div>
    <el-button type="info" @click="LogoutForm">退出</el-button>
  </div>
</template>
<script>
export default {
  data: function() {
    return {}
  },
  methods: {
    LogoutForm: function() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>
<style scope>
</style>