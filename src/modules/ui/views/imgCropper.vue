<template>
  <el-card style="min-height:500px">
    <img-cropper></img-cropper>

    <input
      type="file"
      name=""
      id=""
      @change="choseFile"
      ref="fileContainer"
      style="display:none"
    >
    <vueCropper
      style="height:300px"
      ref="cropper"
      :img="option.img"
      :outputSize="option.size"
      :outputType="option.outputType"
      :info="true"
      :full="option.full"
      :canMove="option.canMove"
      :canMoveBox="option.canMoveBox"
      :fixedBox="option.fixedBox"
      :original="option.original"
      :autoCrop="option.autoCrop"
      :autoCropWidth="option.autoCropWidth"
      :autoCropHeight="option.autoCropHeight"
      :centerBox="option.centerBox"
      :high="option.high"
      :infoTrue="option.infoTrue"
      :maxImgSize="option.maxImageSize"
      @imgLoad="imgLoad"
      :enlarge="option.enlarge"
      :mode="option.mode"
    ></vueCropper>

    <img
      v-show="model"
      :src="modelSrc"
      alt=""
      width="100px"
      height="100px"
    >
    <el-button
      type="primary"
      @click.native="clickChoseFile"
    >选中文件</el-button>
    <el-button
      type="primary"
      @click="finish"
    >finish</el-button>
    <el-button
      type="primary"
      @click="upload"
    >upload</el-button>
  </el-card>
</template>
<script>
import ImgCropper from '@/components/imgCropper/index.vue'
import { VueCropper } from 'vue-cropper'
// eslint-disable-next-line
import request from "@/api/request";
import axios from 'axios'
import storage from '@/utils/storage'
export default {
  components: {
    ImgCropper,
    VueCropper
  },
  data () {
    return {
      model: false,
      modelSrc: '',
      blob: '',
      option: {
        img: 'https://avatars2.githubusercontent.com/u/15681693?s=460&v=4',
        size: 1,
        full: false,
        outputType: 'png',
        canMove: true,
        fixedBox: true,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 200,
        autoCropHeight: 150,
        centerBox: false,
        high: false,
        cropData: {},
        enlarge: 1,
        mode: 'contain',
        maxImgSize: 2000,
        fileName: 'default.png'
      }
    }
  },
  methods: {
    clickChoseFile () {
      this.$refs.fileContainer.click()
    },
    choseFile () {
      // 将file 转化为 blob显示在img 中
      this.option.img = window.URL.createObjectURL(
        this.$refs.fileContainer.files[0]
      )
      this.option.fileName = this.$refs.fileContainer.files[0].name
    },
    imgLoad (msg) {
      // eslint-disable-next-line
      console.log(msg);
    },
    finish () {
      this.$refs.cropper.getCropBlob(data => {
        var img = window.URL.createObjectURL(data)
        this.model = true
        this.modelSrc = img
        this.blob = data
      })
    },
    upload () {
      this.$refs.cropper.getCropBlob(data => {
        this.blob = data
        const formData = new FormData()
        formData.append('file', this.blob, this.option.fileName)
        // console.log(formData, request);

        let config = {
          // 添加请求头
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + storage.get('vueDemoToken')
          }
          // 添加上传进度监听事件
          // onUploadProgress: e => {
          // var completeProgress = (((e.loaded / e.total) * 100) | 0) + "%";
          // console.log(completeProgress);
          // }
        }
        axios
          .post('/api/file/uploadCompanyImg', formData, config)
          // .then(function(response) {
          //   console.log(response);
          // })
          // .catch(function(error) {
          //   console.log(error);
          // });
      })

      // request({
      //   url: "/file/uploadCompanyImg",
      //   method: "post",
      //   params: formData,
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //     Authorization: "Bearer " + storage.get("vueDemoToken")
      //   }
      // });
    }
  }
}
</script>
