<template>
    <div id="app">
        <div style="margin: 20px; display: inline-flex">
            <textarea style="margin: 10px;width:500px;height:500px;white-space: pre-wrap;" :value="JSON.stringify(myData,null,4)" @blur="myData=JSON.parse($event.target.value)"></textarea>
            <div style="display: block;margin: 10px">
                <div>
                    <t-map :data="myData" :edit_mode="editable" @change="$forceUpdate()" :style="{boxShadow: editable? '0 0 10px 0 green':''}"></t-map>
                </div>
                <div style="margin: 5px">
                    <input type="button" value="edit" style="width: 100px" @click="editable=!editable"/>
                </div>
            </div>
        </div>
        <div>
            <!--<select>-->
                <!--<option>a</option>-->
                <!--<option>bb</option>-->
                <!--<option>cccdfadfa</option>-->
            <!--</select>-->
            <span id="sp" style="display: inline-block"></span>
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
                style: {
                    'background-color': 'rgba(55,55,55, 1)',
                    width: '100px',
                    height: '100px',
                    transition: 'all 0.5s linear',
                }
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
