<template>
  <el-card>
    <c-form :model="base"></c-form>
    <ul>
      <li v-for="file in files">{{file.name}} - Error: {{file.error}}, Success: {{file.success}}</li>
    </ul>
    <file-upload
      ref="upload"
      v-model="files"
      post-action="/post.method"
      put-action="/put.method"
      @input-file="inputFile"
      @input-filter="inputFilter"
    >
      上传文件
    </file-upload>
  </el-card>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["base"])
  },
  data(){
    return {
      files: []
    }
  }
};
</script>

