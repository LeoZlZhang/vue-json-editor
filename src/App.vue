<template>
    <div id="app">
        <div style="margin: 20px; display: inline-flex">
            <textarea style="margin: 10px;width:500px;height:200px;white-space: pre-wrap;" :value="JSON.stringify(myData,null,4)" @blur="myData=JSON.parse($event.target.value)"></textarea>
            <div style="display: block;margin: 10px">
                <div>
                    <t-map :data="myData"
                           instruct="opt"
                           :edit_mode="editable"
                           :query_mode_function="query_mode_function"
                           @change="$forceUpdate()"
                           :style="{boxShadow: editable? '0 0 10px 0 green':''}" ></t-map>
                </div>
                <div style="margin: 5px">
                    <input type="button" value="edit" style="width: 100px" @click="editable=!editable"/>
                </div>
            </div>
        </div>
        <div >
            <span id="sp" style="display: inline-block; visibility: hidden"></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data () {
            return {
                editable: false,
                myData: {},
                value: null,
                style: {
                    'background-color': 'rgba(55,55,55, 1)',
                    width: '100px',
                    height: '100px',
                    transition: 'all 0.5s linear',
                }
            }
        },
        methods:{
            query_mode_function(key){
                if (key && key==='opt')
                    return {mode: 'options_key', keys: null, options: ['hello','world12345','fix','arr']};
                if (key && key==='fix')
                    return {mode: 'fixed_keys', keys: ['k1','k2','k3','opt1'], options: null};
                if (key && key==='k3')
                    return {mode: 'fixed_keys', keys: ['k4','k5','k6','opt'], options: null};
                if (key && key==='arr')
                    return {mode: 'array', keys: null, options: null, instruct:'db'};
                if (key && key==='db')
                    return {mode: 'fixed_keys', keys: ['url','user','pwd'], options: null};
                return {mode: 'free_style', keys: null, options: null};
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        font-size: 12px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /*text-align: center;*/
        color: #2c3e50;
        margin-top: 60px;
    }

    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
