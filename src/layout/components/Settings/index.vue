<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">{{$t('layout.setting.title')}}</h3>

      <!-- <div class="drawer-item">
        <span>Theme Color</span>
        <theme-picker style="float: right;height: 26px;margin: -3px 8px 0 0;" @change="themeChange" />
      </div> -->

      <div class="drawer-item">
        <span>{{$t('layout.setting.backgroundSetting')}}</span>
        <el-color-picker style="z-index:99999;float: right;height: 26px;margin: -3px 8px 0 0;" popper-class="zIndex-99999" v-model="settings.menuBg"></el-color-picker>
      </div>

      <div class="drawer-item">
        <span> {{$t('layout.setting.fixedHeader')}}</span>
        <el-switch v-model="settings.fixedHeader" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span> {{$t('layout.setting.fixedMenu')}}</span>
        <el-switch v-model="settings.fixedMenu" class="drawer-switch" />
      </div>

      <!-- <div class="drawer-item">
        <span>Open Tags-View</span>
        <el-switch v-model="tagsView" class="drawer-switch" />
      </div> -->

      <!-- <div class="drawer-item">
        <span>Fixed Header</span>
        <el-switch v-model="fixedHeader" class="drawer-switch" />
      </div> -->

      <!-- <div class="drawer-item">
        <span>Sidebar Logo</span>
        <el-switch v-model="sidebarLogo" class="drawer-switch" />
      </div> -->

    </div>
  </div>
</template>

<script>
// import ThemePicker from '@/components/ThemePicker'
import { mapGetters } from 'vuex'

export default {
  // components: { ThemePicker },
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['settings'])
    // fixedHeader: {
    //   get() {
    //     return this.$store.state.settings.fixedHeader
    //   },
    //   set(val) {
    //     this.$store.dispatch('settings/changeSetting', {
    //       key: 'fixedHeader',
    //       value: val
    //     })
    //   }
    // },
    // tagsView: {
    //   get() {
    //     return this.$store.state.settings.tagsView
    //   },
    //   set(val) {
    //     this.$store.dispatch('settings/changeSetting', {
    //       key: 'tagsView',
    //       value: val
    //     })
    //   }
    // },
    // sidebarLogo: {
    //   get() {
    //     return this.$store.state.settings.sidebarLogo
    //   },
    //   set(val) {
    //     this.$store.dispatch('settings/changeSetting', {
    //       key: 'sidebarLogo',
    //       value: val
    //     })
    //   }
    // }
  },
  methods: {
    themeChange (val) {
      this.$store.dispatch('settings/changeSetting', {
        key: 'theme',
        value: val
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, .85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right
  }
}
</style>
