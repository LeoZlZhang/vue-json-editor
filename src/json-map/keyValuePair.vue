<template>
    <div>
        <div class="kvContainer_style" ref="container"
             @mouseover.stop="show_op_button"
             @mouseout.stop="transparent_op_button">
            <div class="op_outer">
                <div class="op" ref="del"
                     @mouseover="show_container_border(deleting_color)"
                     @mouseout="transparent_container_border"
                     @click.stop="deleting_kv"></div>
            </div>
            <div class="input">
                <template v-if="label_fixed">
                    <div :style="style_label_width" style="white-space: nowrap;color: rgba(121, 85, 72, 1)">{{label}}</div>
                </template>
                <template v-else>
                    <input :style="style_label_width" type="text" :value="label" placeholder="key..."
                           v-if="edit_mode"
                           @mouseover="show_input_border($event.target.parentNode, editing_color)"
                           @mouseout="transparent_input_border($event.target.parentNode, editing_color)"
                           @focus.stop="input_focus_style($event.target.parentNode, editing_color)"
                           @focusout.stop="focus_out_style($event.target.parentNode);keyChanged($event)"/>
                    <div v-else :style="style_label_width" style="white-space: nowrap;">{{label}}</div>
                </template>
            </div>
            <div>
                <div class="semicolon"><strong>:</strong></div>
            </div>
            <div v-if="value instanceof Object" class="input" @mouseout="transparent_input_border($event.target)">
                <t-map :data="value" :edit_mode="edit_mode" @change="onChange"></t-map>
            </div>
            <div v-else class="input">
                <input :style="style_value_width" type="text" :value="value" placeholder="value..."
                       v-if="edit_mode"
                       @mouseover="show_input_border($event.target.parentNode, editing_color)"
                       @mouseout="transparent_input_border($event.target.parentNode)"
                       @focus.stop="input_focus_style($event.target.parentNode, editing_color)"
                       @focusout.stop="focus_out_style($event.target.parentNode)"
                       @input="valueChanged"/>
                <div v-else :style="style_value_width" style="white-space: nowrap;">{{value}}</div>
            </div>
            <div class="pull_right op_outer">
                <div class="op" ref="add"
                     @mouseover="show_container_border(adding_color)"
                     @mouseout="transparent_container_border"
                     @click.stop="adding_new_kv"></div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'keyValuePair',
        props: {
            label_fixed: {type: Boolean, required: false, default: false},
            label: {type: [String, Number, Boolean], required: false, default: null},
            value: [String, Number, Boolean, Object, Array],
            label_width: {type: Number, required: false, default: 6},
            value_width: {type: Number, required: false, default: 36},
            edit_mode: {type: Boolean, required: false, default: false},
        },
        data(){
            return {
                editing_color: [33, 150, 243],
                adding_color: [76, 175, 80],
                deleting_color: [244, 67, 54],
            }
        },
        methods: {
            show_container_border(rgbArray){
                if (this.edit_mode && this.$refs.container) {
                    this.$refs.container.style.borderColor = `rgba(${rgbArray}, 1)`;
                    this.$refs.container.style.boxShadow = `0 0 10px 0 rgba(${rgbArray}, 1)`
                }
            },
            transparent_container_border(){
                if (this.edit_mode && this.$refs.container) {
                    this.$refs.container.style.borderColor = 'transparent';
                    this.$refs.container.style.boxShadow = '0 0 0 0 transparent'
                }
            },
            show_op_button(){
                if (this.edit_mode && this.$refs['add'] && this.$refs['del']) {
                    this.$refs['add'].style.backgroundColor = `rgba(${this.adding_color}, 0.9)`;
                    this.$refs['add'].style.boxShadow = `0 0 3px 0 rgba(${this.adding_color}, 1)`;
                    this.$refs['del'].style.backgroundColor = `rgba(${this.deleting_color}, 0.9)`;
                    this.$refs['del'].style.boxShadow = `0 0 3px 0 rgba(${this.deleting_color}, 1)`
                }
            },
            transparent_op_button(){
                if (this.edit_mode && this.$refs['add'] && this.$refs['del']) {
                    this.$refs['add'].style.backgroundColor = 'transparent';
                    this.$refs['add'].style.boxShadow = '0 0 0 0 transparent';
                    this.$refs['del'].style.backgroundColor = 'transparent';
                    this.$refs['del'].style.boxShadow = '0 0 0 0 transparent'
                }
            },
            show_input_border(node, rgbArray){
                if (node) {
                    node.style.borderColor = `rgba(${rgbArray}, 1)`;
                    node.style.boxShadow = `0 0px 10px 0 rgba(${rgbArray}, 1)`;
                }
            },
            transparent_input_border(node){
                if (node) {
                    node.style.borderColor = 'transparent';
                    node.style.boxShadow = '0 0 0 0 transparent';
                }
            },
            input_focus_style(node, rgbArray){
                if (node) {
                    node.style.backgroundColor = `rgba(${rgbArray},0.5)`;
                }
            },
            focus_out_style(node){
                if (node) {
                    node.style.backgroundColor = 'transparent';
                }
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
            style_label_width(){
                return {width: `${this.label_width}px`}
            },
            style_value_width(){
                return {width: `${this.value_width}px`}
            }
        },
    }
</script>
<style scoped>
    div.kvContainer_style {
        color: black;
        display: flex;
        margin: 1px 0 1px 0;
        padding: 1px 1px;
        border: 1px solid transparent;
        border-radius: 9px;
        box-shadow: 0;
        background-color: transparent;
        transition-property: border, background-color;
        transition-duration: 150ms;
        transition-timing-function: linear;
    }

    div.input {
        border: 1px solid transparent;
        border-radius: 9px;
        padding: 0 7px;
        background-color: transparent;
        transition-property: border, background-color;
        transition-duration: 150ms;
        transition-timing-function: linear;
    }

    div.semicolon {
        margin: 0 1px;
    }

    input {
        font-size: 12px;
        padding: 0;
        outline: none;
        border: 0;
        background: transparent;
        color: #2E7D32;
        transition: width 0.15s linear;
    }

    div.pull_right {
        margin-left: auto;
    }

    div.op_outer{
        padding: 3px 0;
    }

    div.op {
        width: 10px;
        height: 100%;
        border-radius: 5px;
        background-color: transparent;
        box-shadow: 0 0 0 0 transparent;
        cursor: pointer;
    }

    input::-webkit-input-placeholder {
        color: #A5D6A7;
    }
</style>