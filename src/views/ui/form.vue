<template>
  <div>
    <c-form :model="base"></c-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["base"])
  }
};
</script>

