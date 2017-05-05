<template>
  <div id="app">
    <div style="margin: 20px; display: inline-flex">
      <textarea style="margin: 10px;width:500px;height:500px;white-space: pre-wrap;" :value="JSON.stringify(myData,null,4)" @blur="myData=JSON.parse($event.target.value)"></textarea>
      <div style="display: block;margin: 10px">
        <div >
          <t-map :data="myData" :edit_mode="editable" @change="$forceUpdate()" :style="{boxShadow: editable? '0 0 10px 0 green':''}"></t-map>
        </div>
        <div style="margin: 5px">
          <input type="button" value="edit" style="width: 100px" @click="editable=!editable"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
        editable: false,
        myData: {}
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 10px;
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
