<template>
    <div>
        <t-map :data="ini_data"
               :instruct="instruct"
               :edit_mode="editable"
               :query_mode_function="query_mode_function"
               @change="onChange"
               :style="{boxShadow: editable? '0 0 10px 0 green':''}"></t-map>
        <span id="sp" style="display: inline-block; visibility: hidden;position: absolute"></span>
    </div>
</template>
<script>
    export default{
        props: {
            data: [Object, Array],
            instruct: [String],
            editable: [Boolean],
            query_mode_function: {
                type: Function,
                required: false,
                default: (key) => {
                    return {mode: 'free_style', keys: null, options: null, instruct: null};
                }
            }
        },
        data(){
          return {
              ini_data:{}
          }
        },
        methods:{
            onChange(){
                this.$emit('change')
            }
        },
        mounted(){
            this.ini_data = this.data;
        }
    }
</script>
<style scoped>
    div {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        font-size: 12px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
</style>