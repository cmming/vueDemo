<template>
  <el-table
    :data="files"
  >
    <el-table-column
      prop="size"
      :label="$t('CUpload.fileList.column.size')"
    >
      <template slot-scope="scope">{{scope.row.size|formatSize}}</template>
    </el-table-column>

    <el-table-column
      prop="name"
      :label="$t('CUpload.fileList.column.name')"
    ></el-table-column>

    <el-table-column
      prop="thumb"
      :label="$t('CUpload.fileList.column.thumb')"
    >
     <template slot-scope="scope">
       <img v-if="scope.row.thumb" :src="scope.row.thumb" width="40" height="auto" />
     </template>
    </el-table-column>


    <el-table-column
      prop="progress"
      :label="$t('CUpload.fileList.column.progress')"
    >
      <template slot-scope="scope">
        <template v-if="scope.row.error">
          <el-progress
            :percentage="toNumber(scope.row.progress)"
            status="exception"
          ></el-progress>
        </template>

        <template v-if="scope.row.active">
          <el-progress :percentage="ceil(toNumber(scope.row.progress),1)"></el-progress>
        </template>

        <template v-if="scope.row.success">
          <el-progress
            :percentage="toNumber(scope.row.progress)"
            status="success"
          ></el-progress>
        </template>
      </template>
    </el-table-column>

    <el-table-column
      prop="speed"
      :label="$t('CUpload.fileList.column.speed')"
    >
      <template slot-scope="scope">{{scope.row.speed|formatSize}}/s</template>
    </el-table-column>

    <el-table-column :label="$t('CUpload.fileList.column.status')">
      <template slot-scope="scope">
        <template v-if="scope.row.error">error</template>
        <template v-else-if="scope.row.success">success</template>
        <template v-else-if="scope.row.active">active</template>
      </template>
    </el-table-column>

    <el-table-column :label="$t('CUpload.fileList.column.action')" width="200px">
      <template slot-scope="scope">
        <el-button
          v-if="scope.row.active"
          type="danger"
          @click.prevent="stopFile(scope.row, {active: false})"
        >
          <svg-icon icon-class="stop" />{{$t('CUpload.fileList.action.stop')}}
        </el-button>
        <el-button
          type="success"
          class="dropdown-item"
          :disabled="scope.row.success"
          @click.prevent="fileUploadObj.update(scope.row, {active: true, error: '', progress: '0.00'})"
          v-else-if="scope.row.error && scope.row.error !== 'compressing' && fileUploadObj.features.html5||!fileUploadObj || !scope.row.active"
        >
          <svg-icon icon-class="start" />
          <template v-if="scope.row.error && scope.row.error !== 'compressing' && fileUploadObj.features.html5">{{$t('CUpload.fileList.action.reload')}}</template>
          <template v-else-if="!fileUploadObj || !scope.row.active">{{$t('CUpload.fileList.action.start')}}</template>
        </el-button>

        <el-button
          type="danger"
          @click.prevent="fileUploadObj.remove(scope.row)"
        >
          <svg-icon icon-class="stop" />{{$t('CUpload.fileList.action.delete')}}
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import toNumber from 'lodash/toNumber'
import ceil from 'lodash/ceil'
export default {
  props: {
    files: {
      type: Array,
      default: () => []
    },
    fileUploadObj: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    toNumber (data) {
      return toNumber(data)
    },
    ceil (data) {
      return ceil(data)
    },
    stopFile (file, data) {
      // 分片文件上传 暂停，
      file.active = false
      this.fileUploadObj.update(file, data)
    }
  }
};
</script>

