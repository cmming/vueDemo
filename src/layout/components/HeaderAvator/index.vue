<template>
  <el-dropdown
    trigger="click"
    @command="handleSelect"
  >

    <el-tooltip
      effect="dark"
      :content="userName"
      placement="bottom"
    >

      <span class="el-dropdown-link text-white">
        <img
          class="avator"
          src="@/assets/avatar.jpg"
          alt="admin"
        >
        <span style="display:inline-block; max-width:30px">
          {{userName}}
        </span>
      </span>
    </el-tooltip>

    <el-dropdown-menu slot="dropdown">
      <!-- <el-dropdown-item command="editPwd"> {{$t('layout.userPage.header.editPwd')}}</el-dropdown-item> -->
      <el-dropdown-item command="logOut"> {{$t('layout.userPage.header.logOut')}}</el-dropdown-item>
    </el-dropdown-menu>

  </el-dropdown>
</template>
<script>
export default {
  data () {
    return {
      userInfoFormStatus: false
    }
  },
  computed: {
    userName () {
      return storage.get('userInfo') ? storage.get('userInfo').info.name : ''
    }
  },
  methods: {
    // eslint-disable-next-line
    handleSelect(key, keyPath) {
      switch (key) {
        case 'logOut':
          this.$store.dispatch('logout')
          this.$router.push({ path: '/login' })
          break
        case 'editPwd':
          this.$refs.userInfoForm.dialogVisible = true
          this.userInfoFormStatus = true
          break
        default:
          break
      }
    },
    changeStatus (status) {
      this.userInfoFormStatus = status
    }
  }
}
</script>
<style lang="scss" scoped>
.avator {
  width: 26px;
  height: auto;
  margin-right: 5px;
  border-radius: 100%;
  vertical-align: middle;
}
</style>
