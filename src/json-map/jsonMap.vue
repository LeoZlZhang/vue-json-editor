<template>
    <div :style="container_style" @mouseover.stop="" @mouseout.stop="" @click.stop="">
        <t-flag :color="style_color_rgb"></t-flag>
        <div :style="content_style">
            <template v-if="data && Object.keys(data).length>0">
                <template v-for="key in Object.keys(data)">
                    <t-kv :label="key" :value="data[key]" :edit_mode="edit_mode" :label_width="label_width" @change="onChange"></t-kv>
                </template>
            </template>
            <template v-else>
                <div style="display: inline-flex " :style="{visibility: edit_mode?'visible':'hidden'}">
                    <div style="margin: 0 2px" @click="addFirstKv">
                        <t-plus-btn></t-plus-btn>
                    </div>
                    <div style="margin: 0 2px" @click="delThis">
                        <t-minus-btn></t-minus-btn>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
    import {calSentenceLength, updateProperty, insertProperty} from './helper'
    export default{
        name: 'jsonMap',
        props: {
            data: [Object],
            edit_mode: {
                style: Boolean,
                required: false,
                default: false
            },
            style_color_rgb: {
                type: Array,
                required: false,
                default: () => {
                    return [52, 52, 219]
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
                    padding: '5px',
                    display: 'block',
                },
                reCompute: false
            }
        },
        computed: {
            label_width(){
                this.reCompute;
                let wids = [];
                Object.keys(this.data).forEach(d => wids.push(calSentenceLength(d, 12)));
                return Math.max(Math.max(...wids), 24);
            }
        },
        methods: {
            addFirstKv(){
                insertProperty(this.data);
                this.$forceUpdate();
                this.$emit('change')
                console.log(JSON.stringify(this.data))
            },
            delThis(){
                this.$emit('change','delete')
            },
            onChange(type, key, newVal){
                if (type === 'delete') {
                    delete this.data[key];
                    this.$forceUpdate()
                } else if (type === 'insert') {
                    insertProperty(this.data, key);
                    this.$forceUpdate()
                } else if (type === 'update_key') {
                    updateProperty(this.data, key, newVal);
                    this.reCompute = !this.reCompute;
                    this.$forceUpdate()
                } else if (type === 'update_value') {
                    this.data[key] = newVal === '{}' ? {} : newVal === '[]' ? [] : newVal;
                    this.$forceUpdate()
                }
                this.$emit('change')
            }
        }
    }
</script>