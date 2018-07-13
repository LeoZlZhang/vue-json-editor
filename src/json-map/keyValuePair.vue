<template>
    <div>
        <div class="kvContainer_style" ref="container"
             @mouseover.stop="show_op_button"
             @mouseout.stop="transparent_op_button">
            <div class="op_outer">
                <div class="op"
                     :class="{op_ctl:edit_mode && mode !== 'fixed_keys'}"
                     ref="del"
                     @mouseover="show_container_border(deleting_color)"
                     @mouseout="transparent_container_border"
                     @click.stop="deleting_kv"></div>
            </div>
            <div :class="{input:true,input_ctl:edit_mode && (mode ==='free_style' || mode ==='options_key')}">
                <input
                        v-if="mode==='free_style'"
                        :style="style_label_width"
                        type="text"
                        :value="label"
                        placeholder="key..."
                        :disabled="!edit_mode"
                        @focusout="keyChanged($event.target.value)"/>
                <div
                        v-if="mode==='fixed_keys'|| mode==='array'"
                        class="fixed_label"
                        :style="style_label_width">{{label}}
                </div>
                <t-select
                        v-if="mode==='options_key'"
                        :value="label"
                        :width="label_width"
                        :disabled="!edit_mode"
                        :options="options"
                        @input="keyChanged"></t-select>
            </div>
            <div class="semicolon"><strong>:</strong></div>
            <div :class="{input:true,input_ctl:false}" v-if="value instanceof Object">
                <t-map :label="label" :instruct="instruct" :data="value" :edit_mode="edit_mode" :query_mode_function="query_mode_function" @change="onChange"></t-map>
            </div>
            <div :class="{input:true,input_ctl:edit_mode}" v-else>
                <input :style="style_value_width" type="text" :value="value" placeholder="value..." :disabled="!edit_mode" @input="valueChanged"/>
            </div>
            <div class="pull_right op_outer">
                <div class="op"
                     :class="{op_ctl:edit_mode && mode !== 'fixed_keys'}"
                     ref="add"
                     @mouseover="show_container_border(adding_color)"
                     @mouseout="transparent_container_border"
                     @click.stop="adding_new_kv"></div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        props: {
            label: {type: [String, Number, Boolean], required: false, default: null},
            value: [String, Number, Boolean, Object, Array],
            instruct: {type: String, required: false, default: ''},
            label_width: {type: Number, required: false, default: 6},
            value_width: {type: Number, required: false, default: 36},
            edit_mode: {type: Boolean, required: false, default: false},
            mode: {type: String, required: true, default: 1},
            options: {
                type: Array, required: false, default: () => {
                    return []
                }
            },
            query_mode_function: {
                type: Function, required: false, default: (key) => {
                    return {mode: 'free_style', keys: null, options: null};
                }
            }
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
                if (this.edit_mode && this.mode!=='fixed_keys' && this.$refs.container) {
                    this.$refs.container.style.borderColor = `rgba(${rgbArray}, 1)`;
                    this.$refs.container.style.boxShadow = `0 0 10px 0 rgba(${rgbArray}, 1)`
                }
            },
            transparent_container_border(){
                if (this.edit_mode && this.mode!=='fixed_keys' && this.$refs.container) {
                    this.$refs.container.style.borderColor = 'transparent';
                    this.$refs.container.style.boxShadow = '0 0 0 0 transparent'
                }
            },
            show_op_button(){
                if (this.edit_mode && this.mode!=='fixed_keys' && this.$refs['add'] && this.$refs['del']) {
                    this.$refs['add'].style.backgroundColor = `rgba(${this.adding_color}, 0.9)`;
                    this.$refs['add'].style.boxShadow = `0 0 3px 0 rgba(${this.adding_color}, 1)`;
                    this.$refs['del'].style.backgroundColor = `rgba(${this.deleting_color}, 0.9)`;
                    this.$refs['del'].style.boxShadow = `0 0 3px 0 rgba(${this.deleting_color}, 1)`
                }
            },
            transparent_op_button(){
                if (this.edit_mode && this.mode!=='fixed_keys' && this.$refs['add'] && this.$refs['del']) {
                    this.$refs['add'].style.backgroundColor = 'transparent';
                    this.$refs['add'].style.boxShadow = '0 0 0 0 transparent';
                    this.$refs['del'].style.backgroundColor = 'transparent';
                    this.$refs['del'].style.boxShadow = '0 0 0 0 transparent'
                }
            },
            adding_new_kv(){
                if (this.edit_mode && this.mode !== 'fixed_keys')
                    this.$emit('change', 'insert', this.label);
            },
            deleting_kv(){
                if (this.edit_mode && this.mode !== 'fixed_keys')
                    this.$emit('change', 'delete', this.label);
            },
            keyChanged(value){
                this.$emit('change', 'update_key', this.label, value);
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
            },
        },
    }
</script>
<style scoped>
    div.kvContainer_style {
        color: black;
        display: flex;
        margin: 2px 0;
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
        margin: 0 3px;
        border: 0px solid transparent;
        border-radius: 9px;
    }

    div.input_ctl:hover {
        box-shadow: 0 0 10px 0 rgba(33, 150, 243, 0.8);
    }

    input {
        font-size: 12px;
        padding: 0 10px;
        outline: none;
        border: 0px solid transparent;
        border-radius: 9px;
        background-color: transparent;
        color: #2E7D32;
        transition: width, background-color 0.15s linear;
        box-sizing: content-box;
    }

    div.fixed_label {
        white-space: nowrap;
        color: rgba(121, 85, 72, 1);
        padding: 0 10px;
        font-style: italic;
    }

    input:focus {
        background-color: rgba(33, 150, 243, 0.5);
        border-bottom:;
    }

    div.semicolon {
        margin: 0 1px;
    }

    div.pull_right {
        margin-left: auto;
    }

    div.op_outer {
        padding: 2px 0;
    }

    div.op {
        width: 10px;
        height: 100%;
        border-radius: 5px;
        background-color: transparent;
        box-shadow: 0 0 0 0 transparent;
    }

    div.op_ctl {
        cursor: pointer
    }

    input::-webkit-input-placeholder {
        color: #A5D6A7;
    }

    input:focus::-webkit-input-placeholder {
        color: white;
    }
</style>
