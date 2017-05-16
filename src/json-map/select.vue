<template>
    <div class="container">
        <input :style="css_input" :value="value" placeholder="key..." :disabled="disabled" @click.stop="mt_focus"/>
        <div class="menu" :style="css_menu_group" v-show="ctl_drop_down" @mouseout.stop="">
            <div class="menu_item" v-for="item in options" :key="item" @click="selecting(item)">{{item}}</div>
        </div>
    </div>
</template>
<script>
    export default{
        props: {
            value: [Number, String],
            width: {type: Number, required: false, default: 200},
            menu_height: {type: Number, required: false, default: 100},
            disabled: {type: Boolean, required: false, default: false},
            options: {
                type: Array, require: false, default: () => {
                    return []
                }
            },
        },
        data(){
            return {
                ctl_drop_down: false,
            }
        },
        computed: {
            css_input(){
                return {width: `${this.width}px`}
            },
            css_menu_group(){
                return {
                    'max-height': `${this.menu_height}px`,
                    'min-height': `15px`,
                }
            }
        },
        methods: {
            mt_focus(){
                this.ctl_drop_down = true;
            },
            selecting(item){
                this.ctl_drop_down = false;
                this.$emit('input', item)
            }
        },
        mounted() {
            let vm = this;
            window.addEventListener('click', () => {
                vm.ctl_drop_down = false
            });
        },
    }
</script>
<style scoped>

    div.container {
        display: block;
    }

    input {
        font-size: 12px;
        padding: 0 10px;
        outline: none;
        border: 0;
        border-radius: 9px;
        background: transparent;
        color: #2E7D32;
        transition: width, background-color 0.15s linear;
    }

    input:focus {
        background: rgba(33, 150, 243, 0.5);
    }

    input::-webkit-input-placeholder {
        color: #A5D6A7;
    }

    input:focus::-webkit-input-placeholder {
        color: white;
    }

    div.menu {
        margin-top: 5px;
        border-radius: 4px;
        box-shadow: 0 0 5px 0 rgba(189, 195, 199, 1);
        background: white;
        overflow: auto;
        position: absolute
    }

    div.menu_item {
        margin: 1px 0;
        padding: 1px 7px;
        border-radius: 7px;
        cursor: pointer;
        transition: background 0.15s linear;
    }

    div.menu_item:hover {
        background: rgba(189, 195, 199, 0.4);
    }

    ::-webkit-scrollbar {
        width: 7px;
        height: 7px;
    }

    ::-webkit-scrollbar-track {
        /*-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);*/
        /*border-radius: 4px;*/
    }

    ::-webkit-scrollbar-thumb {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
        border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 1);
    }


</style>