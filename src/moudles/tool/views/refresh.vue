<template>
  <div></div>
</template>
<script>
export default {
  created() {
    console.log(1)
    this.$router.go(-1);
  }
};
</script>

