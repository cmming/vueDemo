<template>
  <form :action="action">
      <input
        type="submit"
        ref="downloadBtn"
      >
  </form>
</template>
<script>
export default {
  props: {
    action: {
      type: String,
      default: ''
    }
  }
}
</script>
