<template>
    <div :style="container_style" @mouseover.stop="" @mouseout.stop="" @click.stop="">
        <t-flag :color="style_color_rgb"></t-flag>
        <div :style="content_style">
            <div class="arrayElement" v-for="(ele,i) in data">
                <template v-if="!(ele instanceof Object)">
                    <span>{{ele}}</span>
                </template>
                <template v-else>
                    <t-array v-if="ele instanceof Array" :data="ele" :edit_mode="edit_mode"></t-array>
                    <t-map v-else :data="ele" :edit_mode="edit_mode" @change="onChange"></t-map>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'jsonArray',
        props: {
            data: [Array],
            edit_mode: {
                style: Boolean,
                required: false,
                default: false
            },
            style_color_rgb: {
                type: Array,
                required: false,
                default: () => {
                    return [121, 85, 72]
                }
            },
        },
        data(){
            return {
                container_style: {
                    display: 'inline-flex',
                    width: '100%',
                    'border-bottom-right-radius': '3px',
                    'border-top-right-radius': '3px',
                    'border': `1px solid rgba(${this.style_color_rgb},1)`,
                    'box-shadow': `0 0 10px 0 rgba(${this.style_color_rgb}, 0.26)`
                },
                content_style: {
                    width: 'auto',
                    padding: '15px',
                    display: 'block',
                }
            }
        },
        computed: {
            container_style(){
                return {
                    'border': `1px solid rgba(${this.style_color_rgb},0.8)`,
                    'box-shadow': `0 2px 10px 0 rgba(${this.style_color_rgb}, 0.26)`
                }
            }
        },
        methods: {
            onChange(type, key){
//                if (type === 'updated')
                this.$emit('change', key);
            }
        }
    }
</script>
<style scoped>
    div.arrayElement {
        margin-top: 10px;
        border-bottom: 1px solid grey;
    }

</style>