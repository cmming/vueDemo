<template>
  <div>
    <el-form
      :inline="true"
      :model="sshConfig"
      class="ssh-form"
    >
      <el-form-item label="ip">
        <el-input
          v-model="sshConfig.ip"
          placeholder="ip"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input
          v-model="sshConfig.username"
          placeholder="username"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model="sshConfig.password"
          placeholder="password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="createData">创建连接</el-button>
      </el-form-item>
    </el-form>
    <xterm
      @terminal="terminal"
      :sshConfig="sshConfig"
    >
    </xterm>
  </div>
</template>
<script>
import Xterm from '@/components/Xterm/index'

export default {
  data () {
    return {
      termInstance: '',
      sshConfig: { ip: '192.168.10.141', username: 'root', password: '123' }
    }
  },
  components: {
    Xterm
  },
  methods: {
    terminal (data) {
      this.termInstance = data
    },
    createData () {
      // console.log(this.termInstance)
      this.termInstance.createSsh()
    }
  }
}
</script>
