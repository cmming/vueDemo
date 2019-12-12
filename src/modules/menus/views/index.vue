<template>
    <div>
        当前路径为 {{path}}
    </div>
</template>
<script>
export default {
    computed:{
        path(){
            return this.$route.path
        }
    },
}
</script>
