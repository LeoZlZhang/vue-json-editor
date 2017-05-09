<template>
    <div :style="{'background-color': `rgba(${color}, 0.8)`}"></div>
</template>
<script>
    export default{
        props:{
            color:{
                type:Array,
                require: false,
                default: 'rgba(52, 152, 219, 0.8)'
            }
        },
    }
</script>
<style scoped>
    div {
        width: 6px;
        height: auto;
    }
</style>