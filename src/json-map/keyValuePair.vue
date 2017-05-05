<template>
    <div>
        <div :style="kvContainer_style" ref="container" style="color:#616161" @mouseover.stop="show_op_button" @mouseout.stop="transparent_op_button">
            <div>
                <div class="op" ref="add"
                     @mouseover="show_container_border(adding_color)"
                     @mouseout="transparent_container_border"
                     @click.stop="adding_new_kv"></div>
            </div>
            <div class="input">
                <input :style="{width: `${label_width+9}px`}" type="text" :value="label" placeholder="key..."
                       v-if="edit_mode"
                       @mouseover="show_input_border($event.target.parentNode, editing_color)"
                       @mouseout="transparent_input_border($event.target.parentNode, editing_color)"
                       @focus.stop="input_focus_style($event.target.parentNode, editing_color)"
                       @focusout.stop="focus_out_style($event.target.parentNode, editing_color);keyChanged($event)"/>
                <div v-else :style="{width: `${label_width+9}px`}" style="white-space: nowrap;">{{label}}</div>
            </div>
            <div>
                <div><strong>:</strong></div>
            </div>
            <div v-if="value instanceof Object" class="input" @mouseout="transparent_input_border($event.target)">
                <t-array v-if="value instanceof Array" :data="value" :edit_mode="edit_mode" @change="onChange"></t-array>
                <t-map v-else :data="value" :edit_mode="edit_mode" @change="onChange"></t-map>
            </div>
            <div v-else class="input">
                <input :style="value_width" type="text" :value="value" placeholder="value..."
                       v-if="edit_mode"
                       @mouseover="show_input_border($event.target.parentNode, editing_color)"
                       @mouseout="transparent_input_border($event.target.parentNode)"
                       @input="valueChanged"
                       @focus.stop="input_focus_style($event.target.parentNode, editing_color)"
                       @focusout.stop="focus_out_style($event.target.parentNode, editing_color)"/>
                <div v-else :style="value_width" style="white-space: nowrap;">{{value}}</div>
            </div>
            <div class="pull_right">
                <div class="op" ref="del"
                     @mouseover="show_container_border(deleting_color)"
                     @mouseout="transparent_container_border"
                     @click.stop="deleting_kv"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import {calSentenceLength} from './helper'
    export default{
        name: 'keyValuePair',
        props: {
            label: String,
            value: [String, Number, Boolean, Object, Array],
            label_width: {
                style: Number,
                required: false,
                default: 6
            },
            edit_mode: {
                style: Boolean,
                required: false,
                default: false
            },
        },
        data(){
            return {
                editing_color: [33, 150, 243],
                adding_color: [76, 175, 80],
                deleting_color: [244, 67, 54],
                kvContainer_style: {
                    display: 'flex',
                    margin: '5px 0',
                    border: '1px solid transparent',
                    'border-radius': '9px',
                    'box-shadow': 0,
                    'background-color': 'transparent',
                    'transition-property': 'border, background-color',
                    'transition-duration': '150ms',
                    'transition-timing-function': 'linear',
                }
            }
        },
        methods: {
            show_container_border(rgbArray){
                if (this.edit_mode) {
                    this.$refs.container.style.borderColor = `rgba(${rgbArray}, 1)`;
                    this.$refs.container.style.boxShadow = `0 0 10px 0 rgba(${rgbArray}, 1)`
                }
            },
            transparent_container_border(){
                if (this.edit_mode) {
                    this.$refs.container.style.borderColor = 'transparent';
                    this.$refs.container.style.boxShadow = '0 0 0 0 transparent'
                }
            },
            show_op_button(){
                if (this.edit_mode) {
                    this.$refs['add'].style.backgroundColor = `rgba(${this.adding_color}, 1)`;
                    this.$refs['add'].style.boxShadow = `0 0 3px 0 rgba(${this.adding_color}, 1)`;
                    this.$refs['del'].style.backgroundColor = `rgba(${this.deleting_color}, 1)`;
                    this.$refs['del'].style.boxShadow = `0 0 3px 0 rgba(${this.deleting_color}, 1)`
                }
            },
            transparent_op_button(){
                if (this.edit_mode) {
                    this.$refs['add'].style.backgroundColor = 'transparent';
                    this.$refs['add'].style.boxShadow = '0 0 0 0 transparent';
                    this.$refs['del'].style.backgroundColor = 'transparent';
                    this.$refs['del'].style.boxShadow = '0 0 0 0 transparent'
                }
            },
            show_input_border(node, rgbArray){
                node.style.borderColor = `rgba(${rgbArray}, 1)`;
                node.style.boxShadow = `0 0px 10px 0 rgba(${rgbArray}, 1)`;
            },
            transparent_input_border(node){
                node.style.borderColor = 'transparent';
                node.style.boxShadow = '0 0 0 0 transparent';
            },
            input_focus_style(node, rgbArray){
                node.style.backgroundColor = `rgba(${rgbArray},0.5)`;
            },
            focus_out_style(node){
                node.style.backgroundColor = 'transparent';
            },
            adding_new_kv(){
                this.$emit('change', 'insert', this.label);
            },
            deleting_kv(){
                this.$emit('change', 'delete', this.label);
            },
            keyChanged(e){
                this.$emit('change', 'update_key', this.label, e.target.value);
            },
            valueChanged(e){
                this.$emit('change', 'update_value', this.label, e.target.value);
            },
            onChange(type){
                if (type === 'delete') {
                    this.$emit('change', 'update_value', this.label, '');
                } else {
                    this.$emit('change')
                }
            },
        },
        computed: {
            value_width(){
                return {width: `${Math.max(calSentenceLength(this.value, 12), 36) + 9}px`}
            }
        },
    }
</script>
<style scoped>
    div.input {
        border: 1px solid transparent;
        border-radius: 9px;
        padding: 0 9px;
        background-color: transparent;
        transition-property: border, background-color;
        transition-duration: 150ms;
        transition-timing-function: linear;
    }

    input {
        outline: none;
        border: 0;
        background: transparent;
        color: #616161;
    }

    div.pull_right {
        margin-left: auto;
    }

    div.op {
        margin: 5px 1px 0 1px;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background-color: transparent;
        box-shadow: 0 0 0 0 transparent;
        cursor: pointer;
    }

    input::-webkit-input-placeholder {
        color: #A5D6A7;
    }
</style>