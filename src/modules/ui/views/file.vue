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

    <tinymce :height="300" v-model="content" id='tinymce'></tinymce>
  </div>
</template>
<script>
import storage from '@/utils/storage'
import Xterm from './xterm'
import Tinymce from '@/components/Tinymce'
export default {
  data () {
    return {
      headers: { Authorization: 'Bearer ' + storage.get('vueDemoToken') },
      sshs: [],
      content: ''
    }
  },
  components: {
    Xterm,
    Tinymce
  },
  methods: {
    addSsh () {
      this.sshs.push(+new Date())
    }
  }
}
</script>
