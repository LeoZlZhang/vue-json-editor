<template>
    <div :style="container_style" @mouseover.stop="" @mouseout.stop="" @click.stop="">
        <t-flag :color="style_color_rgb"></t-flag>
        <div class="content_style">
            <template v-if="data && Object.keys(data).length>0">
                <div v-for="(value,key) in data" :key="key">
                    <t-kv v-if="data_is_array"
                          :label="key"
                          :label_width="6"
                          :label_fixed="true"
                          :value_width="value_width(value)"
                          :value="value"
                          :edit_mode="edit_mode"
                          @change="onChange"></t-kv>
                    <t-kv v-else
                          :label="key.toString()"
                          :label_width="label_width_max"
                          :value_width="value_width(value)"
                          :value="value"
                          :edit_mode="edit_mode"
                          @change="onChange"></t-kv>
                </div>
            </template>
            <template v-else>
                <div :style="init_btn_style">
                    <div style="margin: 0 2px" @click="addFirstKv">
                        <t-plus-btn></t-plus-btn>
                    </div>
                    <div style="margin: 0 2px" @click="delThis">
                        <t-minus-btn></t-minus-btn>
                    </div>
                </div>
            </template>
            <div :style="width_transition_style"></div>
        </div>
    </div>
</template>
<script>
    import {measure_width, updateProperty, insertProperty} from './helper'
    export default{
        name: 'jsonMap',
        props: {
            data: [Array, Object],
            edit_mode: {type: Boolean, required: false, default: false},
        },
        data(){
            return {
                color_of_object_data :[52, 52, 219],
                color_of_array_data :[121, 85, 72],
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
                }
            },
            init_btn_style(){
                return {
                    visibility: this.edit_mode ? 'visible' : 'hidden',
                    display: 'inline-flex'
                }
            },
            width_transition_style(){
                return {
                    width: `${this.sub_component_width_max}px`,
                    transition: 'width 0.15s linear',
                }
            },
            style_color_rgb(){
                return this.data_is_array ? this.color_of_array_data : this.color_of_object_data;
            },
            label_width_max(){
                this.reCompute;
                let wids = [24];
                Object.keys(this.data).forEach(d => wids.push(measure_width(d)));
                return Math.max(...wids);
            },
            value_width_max(){
                this.reCompute;
                let wids = [36];
                Object.values(this.data).filter(d => !(d instanceof Object)).forEach(d => wids.push(measure_width(d)));
                return Math.max(...wids);
            },
            sub_component_width_max(){
                this.reCompute
                if (Object.keys(this.data).length > 0) {
                    let label_max = this.label_width_max;
                    let wids = [this.label_width_max + this.value_width_max + 60];
                    Object.values(this.$children)
                        .filter(c => c.value instanceof Object && this.data.hasOwnProperty(c.label))
                        .forEach(com_kv => wids.push(label_max + (com_kv.$children[0] ? com_kv.$children[0].sub_component_width_max : 80) + 65));
                    return Math.max(...wids);
                } else {
                    return 80
                }
            }
        },
        methods: {
            addFirstKv(){
                if (this.data_is_array) {
                    this.data.push('');
                } else {
                    insertProperty(this.data);
                }
                this.reCompute = !this.reCompute;
                this.$forceUpdate();
                this.$emit('change');
            },
            delThis(){
                this.$emit('change', 'delete')
            },
            onChange(type, key, newVal){
                if (this.data_is_array) {
                    if (type === 'delete') {
                        this.data.splice(key, 1);
                    } else if (type === 'insert') {
                        this.data.splice(key + 1, 0, newVal);
                    } else if (type === 'update_value') {
                        this.data[key] = newVal === '{}' ? {} : newVal === '[]' ? [] : newVal;
                    }
                } else {
                    if (type === 'delete') {
                        delete this.data[key];
                    } else if (type === 'insert') {
                        insertProperty(this.data, key);
                    } else if (type === 'update_key') {
                        updateProperty(this.data, key, newVal);
                    } else if (type === 'update_value') {
                        this.data[key] = newVal === '{}' ? {} : newVal === '[]' ? [] : newVal;
                    }
                }
                this.$forceUpdate();
                this.reCompute = !this.reCompute;
                this.$emit('change')
            },
            value_width(value){
                return Math.max(measure_width(value), 36)
            },
        },
        created(){
            this.data_is_array = this.data instanceof Array;
        },
        mounted(){
            this.$emit('change')
        },
    }
</script>
<style scoped>
    div.content_style {
        width: auto;
        padding: 5px 1px;
        display: block;
    }
</style>