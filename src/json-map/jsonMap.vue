<template>
    <div :style="container_style" @mouseover.stop="" @mouseout.stop="" @click.stop="">
        <t-flag :color="style_color_rgb"></t-flag>
        <div :style="content_style">
            <template v-if="data && Object.keys(data).length>0">
                <div v-for="(value,key) in data" :key="key">
                    <template v-if="data_is_array">
                        <t-kv :label="key" :value="value" :edit_mode="edit_mode" :label_width="12" @change="onChange" :label_fixed="true"></t-kv>
                    </template>
                    <template v-else>
                        <t-kv :label="key" :value="value" :edit_mode="edit_mode" :label_width="label_width" @change="onChange"></t-kv>
                    </template>
                </div>
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
            data: [Array, Object],
            edit_mode: {style: Boolean, required: false, default: false},
        },
        data(){
            return {
                style_color_rgb: [52, 52, 219],
                content_style: {
                    width: 'auto',
                    padding: '5px',
                    display: 'block',
                },
                reCompute: false,
                data_is_array: false,
            }
        },
        computed: {
            container_style(){
                return {
                    display: 'inline-flex',
                    width: '100%',
                    'border-bottom-right-radius': '3px',
                    'border-top-right-radius': '3px',
                    'border': `1px solid rgba(${this.style_color_rgb},1)`,
                    'box-shadow': `0 0 10px 0 rgba(${this.style_color_rgb}, 0.26)`,
                    transition: 'width 0.5s linear'
                }
            },
            label_width(){
                this.reCompute;
                let wids = [];
                Object.keys(this.data).forEach(d => wids.push(calSentenceLength(d, 12)));
                return Math.max(Math.max(...wids), 24);
            }
        },
        methods: {
            addFirstKv(){
                if (this.data_is_array) {
                    this.data.push('');
                } else {
                    insertProperty(this.data);
                }
                this.$forceUpdate();
                this.$emit('change');
            },
            delThis(){
                this.$emit('change', 'delete')
            },
            onChange(type, key, newVal){
                if (type) {
                    if (this.data_is_array) {
                        if (type === 'delete') {
                            this.data.splice(key, 1);
                            this.$forceUpdate()
                        } else if (type === 'insert') {
                            this.data.splice(key + 1, 0, newVal);
                            this.$forceUpdate()
                        } else if (type === 'update_value') {
                            this.data[key] = newVal === '{}' ? {} : newVal === '[]' ? [] : newVal;
                            this.$forceUpdate()
                        }
                    } else {
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
                    }
                }
                this.$emit('change')
            }
        },
        created(){
            if (this.data instanceof Array) {
                this.style_color_rgb = [121, 85, 72];
                this.data_is_array = true;
            } else {
                this.style_color_rgb = [52, 52, 219];
                this.data_is_array = false;
            }
        },
    }
</script>