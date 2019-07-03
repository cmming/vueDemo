<template>
  <div class="upload">
    <file-list :files="files" :fileUploadObj="$refs.upload"></file-list>

    <file-upload
      class="table-upload m-rigth-sm"
      post-action="/api/file/upload"
      :extensions="extensions"
      :accept="accept"
      :multiple="true"
      :size="size"
      :thread="thread < 1 ? 1 : (thread > 5 ? 5 : thread)"
      v-model="files"
      @input-filter="inputFilter"
      @input-file="inputFile"
      :chunk-enabled="chunkEnabled"
      :chunk="{
            action: '/api/file/chunk',
            minSize: chunkMinSize * 1048576,
            maxActive: chunkMaxActive,
            maxRetries: chunkMaxRetries
          }"
      ref="upload"
    >
      <el-button type="primary">
        <svg-icon icon-class="add" />选择文件
      </el-button>
    </file-upload>

    <el-button
      class="vertical-middle"
      type="success"
      v-if="!$refs.upload || !$refs.upload.active"
      @click.prevent="$refs.upload.active = true"
    >
      <svg-icon icon-class="start" />开始
    </el-button>
    <el-button type="danger" v-else @click.prevent="$refs.upload.active = false">
      <svg-icon icon-class="stop" />暂停
    </el-button>
  </div>
</template>
<script>
import FileUpload from "vue-upload-component";
import FileList from "./components/uploadList"
export default {
  name: "CUpload",
  components: {
    FileUpload,
    FileList
  },
  props: {
    //   并发数量
    thread: {
      type: Number,
      default: 3
    },
    // 是否为文件夹上传
    directory: {
      type: Boolean,
      default: false
    },
    // 文件后缀限制
    extensions: {
      type: String,
      default: undefined
    },
    // 文件 MIME type
    accept: {
      type: String,
      default: "*"
    },
    // 文件大小限制 0 不限制
    size: {
      type: Number,
      default: 0
    },
    chunkEnabled: {
      type: Boolean,
      default: true
    },
    chunkMinSize: {
      type: Number,
      default: 1
    },
    chunkMaxActive: {
      type: Number,
      default: 3
    },
    chunkMaxRetries: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      files: []
    };
  },
  methods: {
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // Before adding a file
        // 添加文件前
        // Filter system files or hide files
        // 过滤系统文件 和隐藏文件
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
          return prevent();
        }
        // Filter php html js file
        // 过滤 php html js 文件
        if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
          return prevent();
        }
      }
    },
    inputFile(newFile, oldFile) {
      if (newFile && !oldFile) {
        // add
        // console.log("add", newFile);
      }
      if (newFile && oldFile) {
        // update
        // console.log("update", newFile);
      }
      if (!newFile && oldFile) {
        // remove
        // console.log("remove", oldFile);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.table-upload {
  vertical-align: middle;
}
.vertical-middle {
  vertical-align: middle;
}
</style>


