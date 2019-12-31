<template>
  <div>
    <el-card>
      <c-upload :headers="headers" :chunkEnabled=true></c-upload>
    </el-card>

    <el-card class="m-top-sm">
      <div slot="header" class="clearfix">
        <span>远程连接</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="addSsh">新建ssh</el-button>
      </div>
      <div v-for="ssh in sshs" :key="ssh">
        <xterm></xterm>
      </div>
    </el-card>
  </div>
</template>
<script>
import storage from '@/utils/storage'
import Xterm from './xterm'
export default {
  data () {
    return {
      headers: { Authorization: 'Bearer ' + storage.get('vueDemoToken') },
      sshs: []
    }
  },
  components: {
    Xterm
  },
  methods: {
    addSsh () {
      this.sshs.push(+new Date())
    }
  }
}
</script>
