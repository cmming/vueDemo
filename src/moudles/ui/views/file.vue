<template>
  <div>
    <el-card>
      <c-upload :headers="headers" :chunkEnabled=false :postAction="postAction"></c-upload>
    </el-card>
  </div>
</template>
<script>
import storage from "@/utils/storage"
export default {
  data(){
    return {
      headers:{Authorization:'Bearer '+storage.get('vueDemoToken')},
      postAction:'/api/file/uploadCompanyImg'
    }
  }
};
</script>

