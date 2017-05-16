<template>
    <div :style="container_style" @mouseover.stop="" @mouseout.stop="" @click.stop="">
        <div class="content_style">
            <template v-if="data && Object.keys(data).length>0">
                <div v-for="(value_of_data,key_of_data) in data" :key="key_of_data">
                    <t-kv :label="key_of_data.toString()"
                          :instruct="data_is_array ? operation_mode.instruct : key_of_data"
                          :value="value_of_data"
                          :label_width="label_width_max"
                          :value_width="value_width(value_of_data)"
                          :edit_mode="edit_mode"
                          :mode="operation_mode.mode"
                          :options="operation_mode.options"
                          :query_mode_function="query_mode_function"
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
            label: [String],
            instruct: {type: String, required: false, default: ''},
            data: [Array, Object],
            edit_mode: {type: Boolean, required: false, default: false},
            query_mode_function: {
                type: Function, required: false, default: (key) => {
                    return {mode: 'free_style', keys: null, options: null};
                }
            }
        },
        data(){
            return {
                color_of_object_data: [52, 52, 219],
                color_of_array_data: [121, 85, 72],
                reCompute: false,
                data_is_array: false,
                operation_mode: {mode: 'free_style', keys: null, options: null}
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
                    'border-left': `6px solid rgba(${this.style_color_rgb},1)`,
                    'box-shadow': `0 0 10px 0 rgba(${this.style_color_rgb}, 0.26)`,
                }
            },
            init_btn_style(){
                return {
                    visibility: this.edit_mode ? 'visible' : 'hidden',
                    display: 'flex',
                    'margin-left': '5px'
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
                this.operation_mode.options ?
                    Object.values(this.operation_mode.options).forEach(d => wids.push(measure_width(d))) :
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
                    let wids = [this.label_width_max + this.value_width_max + 80];
                    Object.values(this.$children)
                        .filter(c => c.value instanceof Object && this.data.hasOwnProperty(c.label))
                        .forEach(com_kv => {
                            let child = com_kv.$children[com_kv.$children.length - 1];
                            wids.push(label_max + (child ? child.sub_component_width_max : 0) + 80)
                        });
                    return Math.max(...wids);
                } else {
                    return 80
                }
            },
        },
        methods: {
            addFirstKv(){
                this.data_is_array ? this.onChange('insert', 0, '') : this.onChange('insert');
            },
            delThis(){
                this.$emit('change', 'delete')
            },
            onChange(type, key, newVal){
                if (this.data_is_array) {
                    if (type === 'delete') {
                        this.data.splice(key, 1);
                    } else if (type === 'insert') {
                        this.data.splice(key + 1, 0, this.operation_mode.instruct ? {} : newVal);
                    } else if (type === 'update_value') {
                        this.data[key] = newVal === '{}' ? {} : newVal === '[]' ? [] : newVal;
                    }
                } else {
                    if (type === 'delete') {
                        delete this.data[key];
                    } else if (type === 'insert') {
                        insertProperty(this.data, key);
                    } else if (type === 'update_key' && key !== newVal) {
                        if (this.data.hasOwnProperty(newVal)) {
                            this.$children.filter(c => c.label === key).forEach(c => c.$forceUpdate())
                        } else {
                            let mode_old = this.query_mode_function(key);
                            let mode_new = this.query_mode_function(newVal);
                            if (mode_old.mode !== 'free_style' || this.data[key] instanceof Object) {
                                if (confirm("switch plugin may remove data, ok?")) {
                                    updateProperty(this.data, key, newVal);
                                    if (mode_new.mode !== 'free_style')
                                        this.data[newVal] = mode_new.mode === 'array' ? [] : {};
                                } else {
                                    this.$children.filter(c => c.label === key).forEach(c => c.$forceUpdate())
                                }
                            } else {
                                updateProperty(this.data, key, newVal);
                                if (mode_new.mode !== 'free_style')
                                    this.data[newVal] = mode_new.mode === 'array' ? [] : {};
                            }
                        }
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
        created()
        {
            this.operation_mode = this.query_mode_function(this.instruct);
            if (this.data && Object.keys(this.data).length === 0) {
                if (this.operation_mode.mode === 'fixed_keys') {
                    this.operation_mode.keys.forEach(key => this.data[key] = this.query_mode_function(key).mode === 'free_style' ? '' : {});
                }
            }
            if (this.data instanceof Array) {
                this.data_is_array = true;
                this.operation_mode.mode = 'array'
            } else
                this.data_is_array = false;

        }
        ,
        mounted()
        {
            this.$emit('change')
        }
        ,
    }
</script>
<style scoped>
    div.content_style {
        width: auto;
        padding: 5px 1px;
        display: block;
    }
</style>