import Vue from 'vue'
import App from './App.vue'
import TFlag from './json-map/flag.vue'
import TMap from './json-map/jsonMap.vue'
import TArray from './json-map/jsonArray.vue'
import Tkv from './json-map/keyValuePair.vue'
import PlusBtn from './json-map/plus.vue'
import MinusBtn from './json-map/minus.vue'

Vue.component('t-flag',TFlag );
Vue.component('t-map',TMap );
Vue.component('t-array',TArray );
Vue.component('t-kv',Tkv );
Vue.component('t-plus-btn',PlusBtn );
Vue.component('t-minus-btn',MinusBtn );

new Vue({
  el: '#app',
  render: h => h(App)
});
