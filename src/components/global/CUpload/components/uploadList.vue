<template>
  <el-table
    :data="files"
    style="width: 100%"
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
      prop="progress"
      :label="$t('CUpload.fileList.column.progress')"
    >
      <template slot-scope="scope">
        <template v-if="scope.row.error">
          <el-progress
            :percentage=" _.toNumber(scope.row.progress)"
            status="exception"
          ></el-progress>
        </template>

        <template v-if="scope.row.active">
          <el-progress :percentage=" _.toNumber(scope.row.progress)"></el-progress>
        </template>

        <template v-if="scope.row.success">
          <el-progress
            :percentage=" _.toNumber(scope.row.progress)"
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

    <el-table-column :label="$t('CUpload.fileList.column.action')">
      <template slot-scope="scope">
        <el-button
          v-if="scope.row.active"
          type="danger"
          @click.prevent="fileUploadObj.update(scope.row, {active: false})"
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
  }
};
</script>

